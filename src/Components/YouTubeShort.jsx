import React from "react";

const YouTubeShort = ({ videoUrl, description }) => {
  return (
    <div className="relative aspect-w-9 h-80 bg-gray-200 rounded-lg overflow-hidden">
      <iframe
        className="inset-0 w-full h-full"
        src={videoUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        frameBorder="0"
        title={description}
      ></iframe>
    </div>
  );
};

export default YouTubeShort;
