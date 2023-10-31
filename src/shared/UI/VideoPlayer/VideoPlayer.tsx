import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './VideoPlayer.module.scss';
import YouTube from 'react-youtube';

interface VideoPlayerProps {
  className?: string;
  trailerURL: string;
  isPlaying?: boolean | null;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  className,
  trailerURL,
  isPlaying,
}) => {
  const opts = {
    playerVars: {
      autoplay: isPlaying ? true : false,
    },
  };
  return (
    <div className={classNames(cls.VideoPlayer, {}, [className as string])}>
      return trailerURL ? <YouTube videoId={trailerURL} opts={opts} /> : null;
    </div>
  );
};

export default VideoPlayer;
