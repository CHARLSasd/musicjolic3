import React from 'react';

interface InstagramVideoPlayerProps {
  videoUrl: string;
}

const InstagramVideoPlayer: React.FC<InstagramVideoPlayerProps> = ({ videoUrl }) => {
  // Extract the video ID from the Instagram URL
  const videoId = videoUrl.split('/')[4];

  return (
    <div className="aspect-video w-full">
      <iframe
        src={`https://www.instagram.com/reel/${videoId}/embed/`}
        className="w-full h-full"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default InstagramVideoPlayer;