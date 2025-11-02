import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Edit3,
  Video,
  Save,
  Play,
  Square,
  Calendar,
  Flame,
  FileText,
  VideoIcon,
  X,
  Download,
  Mic,
  Upload,
  Trash2,
} from "lucide-react";

export default function Progress() {
  const [journalText, setJournalText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [journalStreak, setJournalStreak] = useState(12); // Example streak
  const [lastJournalDate, setLastJournalDate] = useState("Today");
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [savedVideos, setSavedVideos] = useState([]);
  const [pendingStream, setPendingStream] = useState(null);
  const videoRef = useRef(null);
  const previewRef = useRef(null);
  const fileInputRef = useRef(null);

  const startVideoRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: true,
      });

      // Store stream temporarily until dialog opens
      setPendingStream(stream);
      setShowVideoDialog(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert(
        "Unable to access camera and microphone. Please check permissions."
      );
    }
  };

  // Wait until dialog and video element are mounted before starting recording
  useEffect(() => {
    if (showVideoDialog && pendingStream && videoRef.current) {
      // Attach live preview
      videoRef.current.srcObject = pendingStream;

      const recorder = new MediaRecorder(pendingStream, {
        mimeType: "video/webm;codecs=vp9,opus",
      });
      const chunks = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const videoUrl = URL.createObjectURL(blob);
        setRecordedVideoUrl(videoUrl);

        const fileName = `journal-${
          new Date().toISOString().split("T")[0]
        }-${Date.now()}.webm`;

        const link = document.createElement("a");
        link.href = videoUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setSavedVideos((prev) => [
          ...prev,
          {
            id: Date.now(),
            url: videoUrl,
            timestamp: new Date(),
            name: fileName,
            size: blob.size,
          },
        ]);

        // Show success toast
        toast.success("Video journal recorded and downloaded successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });

        pendingStream.getTracks().forEach((t) => t.stop());
        if (videoRef.current) videoRef.current.srcObject = null;
        setShowVideoDialog(false);
        setPendingStream(null);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    }
  }, [showVideoDialog, pendingStream]);

  const stopVideoRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const closeVideoDialog = () => {
    if (isRecording) {
      stopVideoRecording();
    } else {
      setShowVideoDialog(false);
    }
  };

  const saveJournalEntry = () => {
    if (journalText.trim()) {
      // In a real app, this would save to a database
      console.log("Saving journal entry:", journalText);

      // Show success toast
      toast.success("Journal entry saved successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });

      setJournalText("");
      setJournalStreak(journalStreak + 1);
      setLastJournalDate("Today");
    }
  };

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      if (file.type.startsWith("video/")) {
        const videoUrl = URL.createObjectURL(file);
        const newVideo = {
          id: Date.now() + Math.random(),
          url: videoUrl,
          timestamp: new Date(),
          name: file.name,
          size: file.size,
        };

        setSavedVideos((prev) => [...prev, newVideo]);
      }
    });

    if (files.length > 0) {
      // Show success toast
      toast.success(`${files.length} video(s) uploaded successfully!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }

    // Reset file input
    e.target.value = "";
  };

  const deleteVideo = (videoId) => {
    setSavedVideos((prev) => prev.filter((v) => v.id !== videoId));

    toast.info("Video removed from list", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1A3A37] mb-2">
            Your Journal
          </h1>
          <p className="text-gray-600">
            Reflect on your thoughts and record your daily experiences
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Streak Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
            <div className="bg-orange-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Flame className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold text-[#1A3A37]">
              {journalStreak}
            </h3>
            <p className="text-gray-600 text-sm font-medium">Day Streak</p>
            <p className="text-orange-500 text-xs mt-1">Keep it up!</p>
          </div>

          {/* Text Entries */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
            <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-[#1A3A37]">47</h3>
            <p className="text-gray-600 text-sm font-medium">Text Entries</p>
            <p className="text-green-600 text-xs mt-1">Keep writing!</p>
          </div>

          {/* Video Journals */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
            <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <VideoIcon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-[#1A3A37]">
              {savedVideos.length}
            </h3>
            <p className="text-gray-600 text-sm font-medium">Video Journals</p>
            <p className="text-blue-600 text-xs mt-1">Share your story!</p>
          </div>

          {/* Days Active */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
            <div className="bg-purple-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-[#1A3A37]">28</h3>
            <p className="text-gray-600 text-sm font-medium">Days Active</p>
            <p className="text-purple-600 text-xs mt-1">Amazing progress!</p>
          </div>
        </div>

        {/* Text Journal Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-50 p-3 rounded-xl">
              <Edit3 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1A3A37]">
                Write Your Thoughts
              </h2>
              <p className="text-gray-600 text-sm">
                Take a moment to reflect on your day and feelings
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <textarea
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              placeholder="Dear journal, today I feel... What's been on my mind? How did my day go? Take your time to express your thoughts..."
              className="w-full h-64 p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:border-[#1A3A37] focus:ring-1 focus:ring-[#1A3A37] text-sm leading-relaxed"
            />

            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                {journalText.length} characters
              </p>
              <button
                onClick={saveJournalEntry}
                disabled={!journalText.trim()}
                className="flex items-center gap-2 bg-[#1A3A37] text-white px-6 py-2 rounded-full font-medium hover:bg-[#154F4A] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Entry
              </button>
            </div>
          </div>
        </div>

        {/* Video Journal Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-50 p-3 rounded-xl">
              <Video className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1A3A37]">
                Video Journal
              </h2>
              <p className="text-gray-600 text-sm">
                Record yourself talking about your day and experiences
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Video Recording Preview */}
            <div className="bg-gray-100 rounded-xl overflow-hidden">
              <div className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Ready to record your video journal
                  </p>
                  <p className="text-gray-500 text-sm">
                    Click start to begin recording with audio and video
                  </p>
                </div>
              </div>
            </div>

            {/* Video Controls */}
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                HD Video Recording • High Quality Audio • Auto Download
              </div>

              <div className="flex gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                  multiple
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Upload Video
                </button>
                <button
                  onClick={startVideoRecording}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full font-medium hover:bg-red-600 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Start Recording
                </button>
              </div>
            </div>

            {/* Recent Videos */}
            {savedVideos.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-[#1A3A37] mb-4">
                  Recent Video Journals ({savedVideos.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {savedVideos.slice(-6).map((video) => (
                    <div
                      key={video.id}
                      className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-50 p-2 rounded-lg shrink-0">
                          <VideoIcon className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-700 truncate">
                            {video.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {video.timestamp.toLocaleDateString()}{" "}
                            {video.timestamp.toLocaleTimeString()}
                          </p>
                          {video.size && (
                            <p className="text-xs text-gray-400 mt-1">
                              {formatFileSize(video.size)}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => deleteVideo(video.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                          title="Remove video"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Video Recording Dialog */}
        {showVideoDialog && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-5xl w-full max-h-[90vh]">
              {/* Dialog Header */}
              <div className="bg-[#1A3A37] p-8 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                      <Video className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">
                        Video Journal Recording
                      </h3>
                      <p className="text-gray-200 text-base">
                        Express yourself freely and capture your thoughts
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeVideoDialog}
                    className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Video Feed */}
              <div className="relative bg-gray-900">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full h-[500px] object-cover"
                />

                {/* Recording Indicator */}
                {isRecording && (
                  <div className="absolute top-6 left-6 bg-red-500 text-white px-6 py-3 rounded-full text-base font-bold flex items-center gap-3 shadow-lg">
                    <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                    RECORDING
                  </div>
                )}

                {/* Audio Indicator */}
                {isRecording && (
                  <div className="absolute top-6 right-6 bg-green-500 text-white px-6 py-3 rounded-full text-base font-bold flex items-center gap-3 shadow-lg">
                    <Mic className="w-5 h-5" />
                    AUDIO
                  </div>
                )}

                {/* Recording Timer */}
                {isRecording && (
                  <div className="absolute bottom-6 left-6 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                    Recording...
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="p-8 bg-white border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-base text-gray-600">
                    {isRecording ? (
                      <div className="flex items-center gap-3">
                        <span className="text-red-600 font-bold text-lg">
                          🔴 Recording in progress...
                        </span>
                        <span className="text-gray-500">
                          Click "Stop & Save" when you're done
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4 text-gray-600">
                        <div className="flex items-center gap-2">
                          <Video className="w-5 h-5 text-blue-600" />
                          <span>HD Video</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mic className="w-5 h-5 text-green-600" />
                          <span>High Quality Audio</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Download className="w-5 h-5 text-purple-600" />
                          <span>Auto Download</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4">
                    {!isRecording ? (
                      <button
                        onClick={() => {
                          if (mediaRecorder) {
                            mediaRecorder.start();
                            setIsRecording(true);
                          }
                        }}
                        className="flex items-center gap-3 bg-red-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
                      >
                        <Play className="w-6 h-6" />
                        Start Recording
                      </button>
                    ) : (
                      <button
                        onClick={stopVideoRecording}
                        className="flex items-center gap-3 bg-gray-700 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
                      >
                        <Square className="w-6 h-6" />
                        Stop & Save
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
