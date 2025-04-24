import React, { useState } from "react";
import { useTabs } from "../utils/TabContext";

const VideoPlayer = () => {
  const { currentLesson } = useTabs();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  if (
    !currentLesson ||
    (currentLesson.lessonType.toLowerCase() !== "video" &&
      currentLesson.lessonType.toLowerCase() !== "link")
  ) {
    return (
      <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No video content available</p>
      </div>
    );
  }

  // Extract video ID if it's a YouTube link
  const getYoutubeVideoId = (url: any) => {
    if (!url) return null;

    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Check if the URL is a direct video file (mp4, webm, ogg, etc.)
  const isDirectVideoUrl = (url: any) => {
    if (!url) return false;

    // Check if it's an S3 URL or other direct file URL
    return (
      url.includes("s3.") ||
      url.endsWith(".mp4") ||
      url.endsWith(".webm") ||
      url.endsWith(".ogg") ||
      url.endsWith(".mov")
    );
  };

  // Check if video is from Vimeo
  const getVimeoId = (url: any) => {
    if (!url) return null;

    const regExp = /vimeo\.com\/([0-9]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setError("Failed to load video. Please try again later.");
  };

  const videoId = getYoutubeVideoId(currentLesson.content);
  const vimeoId = getVimeoId(currentLesson.content);
  const isDirectVideo = isDirectVideoUrl(currentLesson.content);

  return (
    <div className="w-full">
      <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg bg-gray-900">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
            <div className="bg-white p-4 rounded-lg max-w-md text-center">
              <p className="text-red-600 mb-2">{error}</p>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {videoId ? (
          // YouTube Embed
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={currentLesson.lessonTitle}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={handleVideoLoad}
            onError={handleVideoError}
            className="w-full h-full"
          ></iframe>
        ) : vimeoId ? (
          // Vimeo Embed
          <iframe
            width="100%"
            height="100%"
            src={`https://player.vimeo.com/video/${vimeoId}`}
            title={currentLesson.lessonTitle}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            onLoad={handleVideoLoad}
            onError={handleVideoError}
            className="w-full h-full"
          ></iframe>
        ) : isDirectVideo ? (
          // Direct video file
          <video
            controls
            className="w-full h-full"
            poster="/api/placeholder/640/360"
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
          >
            <source src={currentLesson.content} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          // Fallback for other types of links
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900 p-6">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="mb-4 text-center text-white font-medium">
              Video content available at external link
            </p>
            <a
              href={currentLesson.content}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              onClick={() => setIsLoading(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Open video link
            </a>
          </div>
        )}
      </div>

      {/* Video title and description */}
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-800">
          {currentLesson.lessonTitle}
        </h3>
        {currentLesson.description && (
          <p className="mt-2 text-gray-600 text-sm">
            {currentLesson.description}
          </p>
        )}
      </div>

      {/* Video controls and options */}
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-700 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Replay
        </button>

        <button className="inline-flex items-center px-3 py-1 bg-blue-50 hover:bg-blue-100 rounded-md text-sm font-medium text-blue-700 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          Mark as Complete
        </button>

        <button className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-700 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Need Help
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
