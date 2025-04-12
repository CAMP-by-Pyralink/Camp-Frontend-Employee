import React from "react";
import { useTabs } from "../utils/TabContext";

const VideoPlayer: React.FC = () => {
  const { currentLesson } = useTabs();

  if (
    !currentLesson ||
    (currentLesson.lessonType.toLowerCase() !== "video" &&
      currentLesson.lessonType.toLowerCase() !== "link")
  ) {
    return <div>No video content available</div>;
  }

  // Extract video ID if it's a YouTube link
  const getYoutubeVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Check if the URL is a direct video file (mp4, webm, ogg, etc.)
  const isDirectVideoUrl = (url: string) => {
    // Check if it's an S3 URL or other direct file URL
    return (
      url.includes("s3.") ||
      url.endsWith(".mp4") ||
      url.endsWith(".webm") ||
      url.endsWith(".ogg") ||
      url.endsWith(".mov")
    );
  };

  const videoId = getYoutubeVideoId(currentLesson.content);
  const isDirectVideo = isDirectVideoUrl(currentLesson.content);

  return (
    <div className="w-full aspect-video rounded-lg overflow-hidden">
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
        ></iframe>
      ) : isDirectVideo ? (
        // Direct video file
        <video width="100%" height="100%" controls className="w-full h-full">
          <source src={currentLesson.content} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        // Fallback for other types of links
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 p-6">
          <p className="mb-4 text-center">
            Video content available at external link:
          </p>
          <a
            href={currentLesson.content}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline px-4 py-2 bg-white rounded-md shadow"
          >
            Open video link
          </a>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
