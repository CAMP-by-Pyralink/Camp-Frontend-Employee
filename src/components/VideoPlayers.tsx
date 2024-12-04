import React, { useRef, useState } from "react";
import play from "../assets/play.png";
import pause from "../assets/pause.png";

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null); // Specify the type for the ref
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (videoRef.current) {
      // Check if videoRef.current is not null
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  return (
    <div className="relative mt-7 w-full h-[333px] bg-black rounded-[14px]">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src="https://res.cloudinary.com/dssvrf9oz/video/upload/v1635662987/pexels-pavel-danilyuk-5359634_1_gmixla.mp4"
        muted
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={togglePlayPause}
          className="bg-[#CCCBCB] w-[70px] aspect-square rounded-full shadow-lg hover:bg-gray-200 flex items-center justify-center transition"
        >
          {isPlaying ? (
            <div>
              <div className="w-[50px] rounded-full aspect-square bg-white flex items-center justify-center">
                <div>
                  <img src={pause} alt="" />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="w-[50px] rounded-full aspect-square bg-white flex items-center justify-center">
                <div>
                  <img src={play} alt="" />
                </div>
              </div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
