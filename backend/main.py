"""
FastAPI application for multimodal mental health analysis pipeline
Combines video emotion detection, audio analysis, transcription, and text analysis
"""

from fastapi import FastAPI, UploadFile, File, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, List, Any
import uvicorn
from pathlib import Path
import json
import uuid
from datetime import datetime
import shutil
import asyncio
from enum import Enum
import sys
from multiprocessing import freeze_support

sys.path.insert(0, str(Path(__file__).parent))

from parallel_pipeline import (
    MultimodalAnalysisPipeline,
    PrivacyMode,
    MultimodalAnalysisResult
)


class PrivacyModeRequest(str, Enum):
    FULL_PRIVACY = "full_privacy"
    ANONYMIZED = "anonymized"


class UploadResponse(BaseModel):
    task_id: str
    message: str
    status: str
    video_path: str
    privacy_mode: str


class StatusResponse(BaseModel):
    task_id: str
    status: str
    progress: float
    message: str
    stage: Optional[str] = None


class AnalysisResultResponse(BaseModel):
    task_id: str
    mental_health_score: int
    risk_level: str
    confidence: float
    video_emotion: str
    audio_emotion: str
    text_emotion: str
    depression_level: str
    key_indicators: List[str]
    recommendations: List[str]
    areas_of_concern: List[str]
    positive_indicators: List[str]


class FileManager:
    """Manages file operations for the application"""
    
    def __init__(self, base_dir: str = "."):
        self.base_dir = Path(base_dir)
        self.uploads_dir = self.base_dir / "uploads"
        self.results_dir = self.base_dir / "results"
        self.status_dir = self.base_dir / "status"
    
    def setup_directories(self):
        """Create necessary directories if they don't exist"""
        self.uploads_dir.mkdir(exist_ok=True)
        self.results_dir.mkdir(exist_ok=True)
        self.status_dir.mkdir(exist_ok=True)
        print(f"Directories initialized:")
        print(f"  - Uploads: {self.uploads_dir}")
        print(f"  - Results: {self.results_dir}")
        print(f"  - Status: {self.status_dir}")
    
    def generate_task_id(self) -> str:
        """Generate a unique task ID"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        unique_id = str(uuid.uuid4())[:8]
        return f"{timestamp}_{unique_id}"
    
    def get_upload_path(self, task_id: str, filename: str) -> Path:
        """Get the path for uploaded video"""
        ext = Path(filename).suffix
        return self.uploads_dir / f"{task_id}{ext}"
    
    def get_result_path(self, task_id: str) -> Path:
        """Get the path for result JSON"""
        return self.results_dir / f"{task_id}_result.json"
    
    def get_status_path(self, task_id: str) -> Path:
        """Get the path for status JSON"""
        return self.status_dir / f"{task_id}_status.json"
    
    def save_result(self, task_id: str, result_data: dict):
        """Save analysis result to JSON file"""
        result_path = self.get_result_path(task_id)
        with open(result_path, 'w') as f:
            json.dump(result_data, f, indent=2)
        print(f"Result saved: {result_path}")
    
    def load_result(self, task_id: str) -> dict:
        """Load analysis result from JSON file"""
        result_path = self.get_result_path(task_id)
        if not result_path.exists():
            raise FileNotFoundError(f"Result not found for task {task_id}")
        with open(result_path, 'r') as f:
            return json.load(f)
    
    def save_status(self, task_id: str, status_data: dict):
        """Save task status to JSON file"""
        status_path = self.get_status_path(task_id)
        status_data['last_updated'] = datetime.utcnow().isoformat()
        with open(status_path, 'w') as f:
            json.dump(status_data, f, indent=2)
    
    def load_status(self, task_id: str) -> dict:
        """Load task status from JSON file"""
        status_path = self.get_status_path(task_id)
        if not status_path.exists():
            raise FileNotFoundError(f"Status not found for task {task_id}")
        with open(status_path, 'r') as f:
            return json.load(f)
    
    def get_video_path(self, task_id: str) -> Path:
        """Find the video file for a given task_id"""
        for file in self.uploads_dir.glob(f"{task_id}.*"):
            return file
        raise FileNotFoundError(f"Video not found for task {task_id}")
    
    def cleanup_task(self, task_id: str, keep_video: bool = True):
        """Delete files associated with a task"""
        if not keep_video:
            for file in self.uploads_dir.glob(f"{task_id}.*"):
                file.unlink()
                print(f"Deleted upload: {file}")
        
        result_path = self.get_result_path(task_id)
        if result_path.exists():
            result_path.unlink()
        
        status_path = self.get_status_path(task_id)
        if status_path.exists():
            status_path.unlink()
        
        print(f"Task {task_id} cleaned up (video kept: {keep_video})")


class MultimodalAnalysisService:
    """Service for managing multimodal analysis pipeline"""
    
    def __init__(self):
        self.pipeline = None
        self._pipeline_loaded = False
    
    def _load_pipeline(self):
        """Lazy load the multimodal analysis pipeline"""
        if not self._pipeline_loaded:
            print("Loading multimodal analysis pipeline...")
            self.pipeline = MultimodalAnalysisPipeline()
            self._pipeline_loaded = True
            print("Pipeline loaded successfully")
    
    async def analyze_video(
        self,
        video_path: Path,
        task_id: str,
        file_manager: FileManager,
        privacy_mode: PrivacyMode,
        interval_seconds: int = 5,
        frame_skip: int = 2
    ) -> dict:
        """
        Perform complete multimodal analysis on video
        
        Args:
            video_path: Path to video file
            task_id: Unique task identifier
            file_manager: File management instance
            privacy_mode: Privacy mode for text analysis
            interval_seconds: Seconds per analysis interval
            frame_skip: Process every Nth frame
        """
        try:
            self._load_pipeline()
            
            file_manager.save_status(task_id, {
                'task_id': task_id,
                'status': 'processing',
                'progress': 10.0,
                'stage': 'initialization',
                'message': 'Starting multimodal analysis'
            })
            
            file_manager.save_status(task_id, {
                'task_id': task_id,
                'status': 'processing',
                'progress': 30.0,
                'stage': 'video_analysis',
                'message': 'Analyzing video emotions'
            })
            
            file_manager.save_status(task_id, {
                'task_id': task_id,
                'status': 'processing',
                'progress': 50.0,
                'stage': 'audio_analysis',
                'message': 'Processing audio and transcription'
            })
            
            loop = asyncio.get_event_loop()
            result = await loop.run_in_executor(
                None,
                self._run_analysis_sync,
                video_path,
                privacy_mode,
                interval_seconds,
                frame_skip
            )
            
            file_manager.save_status(task_id, {
                'task_id': task_id,
                'status': 'processing',
                'progress': 80.0,
                'stage': 'llm_assessment',
                'message': 'Generating final assessment'
            })
            
            result_dict = self._result_to_dict(result)
            
            file_manager.save_status(task_id, {
                'task_id': task_id,
                'status': 'completed',
                'progress': 100.0,
                'stage': 'completed',
                'message': 'Multimodal analysis completed'
            })
            
            return result_dict
            
        except Exception as e:
            print(f"Analysis error: {str(e)}")
            import traceback
            traceback.print_exc()
            
            file_manager.save_status(task_id, {
                'task_id': task_id,
                'status': 'failed',
                'progress': 0.0,
                'stage': 'error',
                'message': f'Analysis failed: {str(e)}'
            })
            raise
    
    def _run_analysis_sync(
        self,
        video_path: Path,
        privacy_mode: PrivacyMode,
        interval_seconds: int,
        frame_skip: int
    ) -> MultimodalAnalysisResult:
        """Synchronous wrapper for pipeline analysis"""
        return self.pipeline.analyze_video(
            video_path=str(video_path),
            privacy_mode=privacy_mode,
            interval_seconds=interval_seconds,
            frame_skip=frame_skip,
            cleanup=True
        )
    
    def _result_to_dict(self, result: MultimodalAnalysisResult) -> dict:
        """Convert MultimodalAnalysisResult to dictionary"""
        from dataclasses import asdict
        return asdict(result)


class VideoService:
    """Service for managing video processing workflow"""
    
    def __init__(self, file_manager: FileManager, analysis_service: MultimodalAnalysisService):
        self.file_manager = file_manager
        self.analysis_service = analysis_service
    
    async def process_upload(
        self,
        file: UploadFile,
        privacy_mode: PrivacyMode,
        interval_seconds: int,
        frame_skip: int,
        background_tasks: BackgroundTasks
    ) -> tuple[str, str, str]:
        """Handle video upload and initiate analysis"""
        task_id = self.file_manager.generate_task_id()
        upload_path = self.file_manager.get_upload_path(task_id, file.filename)
        
        try:
            with open(upload_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            print(f"Video uploaded: {upload_path}")
        finally:
            await file.close()
        
        self.file_manager.save_status(task_id, {
            'task_id': task_id,
            'status': 'queued',
            'progress': 0.0,
            'stage': 'queued',
            'message': 'Video uploaded. Analysis queued.'
        })
        
        background_tasks.add_task(
            self._analyze_and_save,
            task_id=task_id,
            video_path=upload_path,
            privacy_mode=privacy_mode,
            interval_seconds=interval_seconds,
            frame_skip=frame_skip
        )
        
        return task_id, str(upload_path), privacy_mode.value
    
    async def _analyze_and_save(
        self,
        task_id: str,
        video_path: Path,
        privacy_mode: PrivacyMode,
        interval_seconds: int,
        frame_skip: int
    ):
        """Background task: Analyze video and save results"""
        try:
            print(f"Starting multimodal analysis for task: {task_id}")
            
            results = await self.analysis_service.analyze_video(
                video_path=video_path,
                task_id=task_id,
                file_manager=self.file_manager,
                privacy_mode=privacy_mode,
                interval_seconds=interval_seconds,
                frame_skip=frame_skip
            )
            
            self.file_manager.save_result(task_id, results)
            
            print(f"Multimodal analysis completed for task: {task_id}")
            print(f"Video kept at: {video_path}")
            
        except Exception as e:
            print(f"Analysis failed for task {task_id}: {str(e)}")
    
    async def get_task_status(self, task_id: str) -> Dict[str, Any]:
        """Get the current status of an analysis task"""
        try:
            status = self.file_manager.load_status(task_id)
            return status
        except FileNotFoundError:
            return {
                'task_id': task_id,
                'status': 'not_found',
                'progress': 0.0,
                'stage': 'not_found',
                'message': 'Task not found'
            }
    
    async def get_analysis_result(self, task_id: str) -> Dict[str, Any]:
        """Get the complete analysis result"""
        status = await self.get_task_status(task_id)
        
        if status['status'] != 'completed':
            raise Exception(
                f"Analysis not ready. Current status: {status['status']}"
            )
        
        return self.file_manager.load_result(task_id)
    
    async def get_video_path(self, task_id: str) -> Path:
        """Get the path to the uploaded video"""
        return self.file_manager.get_video_path(task_id)
    
    async def cleanup_task(self, task_id: str, delete_video: bool = False):
        """Cleanup task files"""
        self.file_manager.cleanup_task(task_id, keep_video=not delete_video)


app = FastAPI(
    title="Multimodal Mental Health Analysis API",
    description="Comprehensive mental health analysis combining video emotion detection, audio analysis, transcription, and text analysis",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

file_manager = FileManager()
analysis_service = MultimodalAnalysisService()
video_service = VideoService(file_manager, analysis_service)


@app.on_event("startup")
async def startup_event():
    """Initialize required directories on startup"""
    file_manager.setup_directories()
    print("Application started successfully")
    print("Multimodal mental health analysis pipeline ready")
    print("Privacy modes: FULL_PRIVACY and ANONYMIZED available")


@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    print("Shutting down application")


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Multimodal Mental Health Analysis API",
        "version": "1.0.0",
        "features": [
            "Video emotion detection with frame sampling",
            "Audio emotion analysis",
            "Speech-to-text transcription",
            "Text sentiment and depression analysis",
            "Privacy-preserving modes",
            "LLM-powered comprehensive assessment"
        ],
        "endpoints": {
            "upload": "/api/upload-video",
            "status": "/api/status/{task_id}",
            "result": "/api/result/{task_id}",
            "summary": "/api/summary/{task_id}",
            "download": "/api/download-result/{task_id}",
            "video": "/api/video/{task_id}",
            "cleanup": "/api/cleanup/{task_id}"
        }
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "pipeline_loaded": analysis_service._pipeline_loaded
    }


@app.post("/api/upload-video", response_model=UploadResponse)
async def upload_video(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    privacy_mode: PrivacyModeRequest = PrivacyModeRequest.ANONYMIZED,
    interval_seconds: int = 5,
    frame_skip: int = 2
):
    """
    Upload a video for comprehensive multimodal mental health analysis
    
    Parameters:
    - file: Video file (mp4, avi, mov, etc.)
    - privacy_mode: ANONYMIZED (recommended) or FULL_PRIVACY
    - interval_seconds: Video analysis interval duration (default: 5)
    - frame_skip: Process every Nth frame (default: 2)
    
    Returns:
    - task_id: Unique identifier for tracking analysis
    - video_path: Path where video is stored
    - privacy_mode: Selected privacy mode
    """
    try:
        if not file.filename:
            raise HTTPException(status_code=400, detail="No file provided")
        
        allowed_extensions = {'.mp4', '.avi', '.mov', '.mkv', '.flv', '.wmv'}
        file_ext = Path(file.filename).suffix.lower()
        if file_ext not in allowed_extensions:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid file type. Allowed: {', '.join(allowed_extensions)}"
            )
        
        privacy_enum = PrivacyMode(privacy_mode.value)
        
        task_id, video_path, privacy_value = await video_service.process_upload(
            file=file,
            privacy_mode=privacy_enum,
            interval_seconds=interval_seconds,
            frame_skip=frame_skip,
            background_tasks=background_tasks
        )
        
        return UploadResponse(
            task_id=task_id,
            message=f"Video uploaded. Multimodal analysis started with {privacy_mode.value} mode.",
            status="processing",
            video_path=video_path,
            privacy_mode=privacy_value
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")


@app.get("/api/status/{task_id}", response_model=StatusResponse)
async def get_analysis_status(task_id: str):
    """
    Get the status of a multimodal analysis task
    
    Parameters:
    - task_id: Task identifier from upload
    
    Returns:
    - status: queued|processing|completed|failed|not_found
    - progress: Progress percentage (0-100)
    - stage: Current processing stage
    - message: Status message
    """
    try:
        status_info = await video_service.get_task_status(task_id)
        return StatusResponse(**status_info)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))


@app.get("/api/result/{task_id}")
async def get_analysis_result(task_id: str):
    """
    Get the complete multimodal analysis result
    
    Parameters:
    - task_id: Task identifier
    
    Returns:
    - Complete JSON with all analysis components
    """
    try:
        result = await video_service.get_analysis_result(task_id)
        return JSONResponse(content=result)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Result not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/summary/{task_id}", response_model=AnalysisResultResponse)
async def get_analysis_summary(task_id: str):
    """
    Get a simplified summary of the analysis result
    
    Parameters:
    - task_id: Task identifier
    
    Returns:
    - Structured summary with key metrics and recommendations
    """
    try:
        result = await video_service.get_analysis_result(task_id)
        
        summary = result.get('summary', {})
        llm_assessment = result.get('llm_final_assessment', {})
        
        return AnalysisResultResponse(
            task_id=task_id,
            mental_health_score=summary.get('mental_health_score', 0),
            risk_level=summary.get('risk_level', 'unknown'),
            confidence=summary.get('confidence', 0.0),
            video_emotion=summary.get('video_emotion', 'neutral'),
            audio_emotion=summary.get('audio_emotion', 'neutral'),
            text_emotion=summary.get('text_emotion', 'neutral'),
            depression_level=summary.get('depression_level', 'unknown'),
            key_indicators=llm_assessment.get('key_indicators', []),
            recommendations=llm_assessment.get('recommendations', []),
            areas_of_concern=llm_assessment.get('areas_of_concern', []),
            positive_indicators=llm_assessment.get('positive_indicators', [])
        )
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Result not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/download-result/{task_id}")
async def download_result(task_id: str):
    """
    Download the complete analysis result as a JSON file
    
    Parameters:
    - task_id: Task identifier
    
    Returns:
    - JSON file download
    """
    try:
        result_path = file_manager.get_result_path(task_id)
        
        if not result_path.exists():
            raise HTTPException(status_code=404, detail="Result file not found")
        
        return FileResponse(
            path=result_path,
            media_type="application/json",
            filename=f"multimodal_analysis_{task_id}.json"
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/video/{task_id}")
async def get_video(task_id: str):
    """
    Get information about the uploaded video file
    
    Parameters:
    - task_id: Task identifier
    
    Returns:
    - Video file path and metadata
    """
    try:
        video_path = await video_service.get_video_path(task_id)
        return {
            "task_id": task_id,
            "video_path": str(video_path),
            "exists": video_path.exists(),
            "size_mb": round(video_path.stat().st_size / (1024 * 1024), 2) if video_path.exists() else 0
        }
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Video not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/api/cleanup/{task_id}")
async def cleanup_task(task_id: str, delete_video: bool = False):
    """
    Cleanup a task's files
    
    Parameters:
    - task_id: Task identifier
    - delete_video: Whether to delete the video file (default: False)
    
    Returns:
    - Cleanup status
    """
    try:
        await video_service.cleanup_task(task_id, delete_video=delete_video)
        return {
            "message": f"Task {task_id} cleaned up successfully",
            "video_deleted": delete_video
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    freeze_support()
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8001,
        reload=False
    )