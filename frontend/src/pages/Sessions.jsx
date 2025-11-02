import React, { useState, useRef } from "react";
import { Send, Paperclip, X, FileText, Image, File } from "lucide-react";

export default function Sessions() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "Hello! I'm here to support you. How are you feeling today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const hardcodedResponses = [
    "I understand how you're feeling. It's completely normal to have ups and downs.",
    "Thank you for sharing that with me. Can you tell me more about what's been on your mind?",
    "That sounds challenging. Remember, you're not alone in this journey.",
    "It's great that you're taking time to reflect on your feelings. Self-awareness is an important step.",
    "I appreciate you opening up. How has this been affecting your daily routine?",
    "Your feelings are valid. Would you like to try a breathing exercise together?",
    "I'm here to listen. Sometimes talking through our thoughts can help clarify them.",
  ];

  const getRandomResponse = () => {
    return hardcodedResponses[
      Math.floor(Math.random() * hardcodedResponses.length)
    ];
  };

  const handleSendMessage = () => {
    if (inputValue.trim() || uploadedFiles.length > 0) {
      // Add user message
      const userMessage = {
        id: messages.length + 1,
        type: "user",
        content: inputValue,
        files: uploadedFiles.length > 0 ? [...uploadedFiles] : null,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);

      // Simulate bot response after a delay
      setTimeout(() => {
        const botMessage = {
          id: messages.length + 2,
          type: "bot",
          content: getRandomResponse(),
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      }, 1000);

      // Clear input and files
      setInputValue("");
      setUploadedFiles([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (fileId) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith("image/")) return <Image className="w-4 h-4" />;
    if (fileType.includes("pdf") || fileType.includes("document"))
      return <FileText className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-[#1A3A37]">
          Chat With Maitri - Your Digital Companion
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          Share your thoughts and feelings in a safe space
        </p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                message.type === "user"
                  ? "bg-[#1A3A37] text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {message.content && (
                <p className="text-sm leading-relaxed">{message.content}</p>
              )}

              {/* Display uploaded files */}
              {message.files && message.files.length > 0 && (
                <div className="mt-2 space-y-2">
                  {message.files.map((file) => (
                    <div
                      key={file.id}
                      className={`flex items-center space-x-2 p-2 rounded-lg ${
                        message.type === "user"
                          ? "bg-white bg-opacity-20"
                          : "bg-white"
                      }`}
                    >
                      <div
                        className={
                          message.type === "user"
                            ? "text-white"
                            : "text-gray-600"
                        }
                      >
                        {getFileIcon(file.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-xs font-medium truncate ${
                            message.type === "user"
                              ? "text-white"
                              : "text-gray-700"
                          }`}
                        >
                          {file.name}
                        </p>
                        <p
                          className={`text-xs ${
                            message.type === "user"
                              ? "text-white text-opacity-80"
                              : "text-gray-500"
                          }`}
                        >
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <p
                className={`text-xs mt-2 ${
                  message.type === "user"
                    ? "text-white text-opacity-70"
                    : "text-gray-500"
                }`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* File Upload Preview */}
      {uploadedFiles.length > 0 && (
        <div className="border-t border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-2">Files to send:</p>
          <div className="space-y-2">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-gray-500">{getFileIcon(file.type)}</div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(file.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-gray-200 p-6">
        <div className="flex items-end space-x-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            multiple
            className="hidden"
            accept="image/*,.pdf,.doc,.docx,.txt"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex-shrink-0 p-3 text-gray-500 hover:text-[#1A3A37] hover:bg-gray-100 rounded-full transition-colors"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <div className="flex-1">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:border-[#1A3A37] focus:ring-1 focus:ring-[#1A3A37] text-sm"
              rows="1"
              style={{
                minHeight: "48px",
                maxHeight: "120px",
                height: "auto",
              }}
            />
          </div>

          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() && uploadedFiles.length === 0}
            className="flex-shrink-0 p-3 bg-[#1A3A37] text-white rounded-full hover:bg-[#154F4A] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-2 text-center">
          Press Enter to send • Shift + Enter for new line
        </p>
      </div>
    </div>
  );
}
