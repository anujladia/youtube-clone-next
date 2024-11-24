'use client'

import { createContext, useContext, useState } from 'react';

import { Video } from '@/types/video';

type VideoContextType = {
  selectedVideo: Video;
  setSelectedVideo: (video: Video) => void;
};

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export function VideoProvider({ children }: { children: React.ReactNode }) {
  const [selectedVideo, setSelectedVideo] = useState({});

  return (
    <VideoContext.Provider value={{ selectedVideo: selectedVideo as Video, setSelectedVideo: setSelectedVideo as (video: Video) => void }}>
      {children}
    </VideoContext.Provider>
  );
}

export function useVideo() {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
}