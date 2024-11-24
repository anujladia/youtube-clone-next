"use client"

import { useRef, useState, useEffect } from "react";
import { useParams } from "next/navigation"
import YouTube from "react-youtube";

import { useVideo } from "@/contexts/video/VideoContext";

import Layout from "@/components/Layout";
import VideoControlBar from '@/components/VideoControlBar';
import Trimmer from "@/components/Trimmer";

import { saveTrimData, getTrimData } from '@/utils/trimStorage';

import { Video } from "@/types/video";
import type { YouTubePlayer } from 'react-youtube/dist/YouTube';

interface PlayerRef {
  seekTo: (time: number) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  getCurrentTime: () => number;
  getDuration: () => number;
}

interface YouTubeEvent {
  target: PlayerRef;
  data?: number;
}

const Page: React.FC = () => {
  const playerRef = useRef<PlayerRef | null>(null);
  const params = useParams<{ id: string }>();

  const { selectedVideo }: { selectedVideo: Video } = useVideo();
  const { id: videoId }: { id: string } = params;

  const [startTime, setStartTime]: [number, (startTime: number) => void] = useState(0);
  const [endTime, setEndTime]: [number, (endTime: number) => void] = useState(0);
  const [currentTime, setCurrentTime]: [number, (currentTime: number) => void] = useState(0);
  const [duration, setDuration]: [number, (duration: number) => void] = useState(1);
  const [intervalId, setIntervalId]: [NodeJS.Timeout | null, (intervalId: NodeJS.Timeout | null) => void] = useState<NodeJS.Timeout | null>(null);
  const [range, setRange]: [[number, number], (range: [number, number]) => void] = useState([0, 1]);
  const [playing, setPlaying]: [boolean, (playing: boolean) => void] = useState(false);

  useEffect(() => {
    getStoredData(videoId);
    // setStartTime(0);
    // setEndTime(0);
    // setCurrentTime(0);
    setDuration(1);
    if (intervalId) clearInterval(intervalId);
    // setRange([0, 1]);
    setPlaying(false);
  }, [videoId]);

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  const getStoredData = (videoId: string) => {
    if (videoId) {
      const savedTrimData = getTrimData(videoId);
      if (savedTrimData) {
        const { startTime, endTime } = savedTrimData;
        setRange([startTime, endTime]);
        setStartTime(startTime);
        setEndTime(endTime);
      } else {
        handleRangeChange([0, 1]);
      }
    }
  }

  // Handle slider range change
  const handleRangeChange = (newRange: [number, number]) => {
    setRange(newRange);

    // Save the new trim positions
    if (videoId) {
      saveTrimData(videoId, newRange[0], newRange[1]);
    }

    if (!playerRef.current) return;

    setPlaying(false);
    if (startTime !== newRange[0]) {
      seekVideo(newRange);
    }

    if (endTime !== newRange[1]) {
      setEndTime(newRange[1]);
    }
  };

  const onPlayerReady = (event: YouTubeEvent) => {
    playerRef.current = event.target;
    const video_duration = event.target.getDuration();
    setDuration(video_duration);

    if (range[0] === 0 || range[1] === 1) {
      setEndTime(video_duration);
      setRange([0, video_duration]);
    }
  };

  const playVideo = () => {
    if (!playerRef.current) return;

    setPlaying(true);
    playerRef.current.seekTo(range[0]);
    playerRef.current.playVideo();

    if (intervalId) clearInterval(intervalId);

    const id = setInterval(() => {
      if (!playerRef.current) return;

      const time = playerRef.current.getCurrentTime();
      setCurrentTime(time);

      if (time >= range[1]) {
        playerRef.current.pauseVideo();
        setPlaying(false);
        clearInterval(id);
      }
    }, 100);

    setIntervalId(id);
  };

  const pauseVideo = () => {
    if (!playerRef.current) return;

    setPlaying(false);
    setStartTime(currentTime);
    playerRef.current.pauseVideo();
    if (intervalId) clearInterval(intervalId);
  };

  const seekVideo = (time: [number, number]) => {
    if (!playerRef.current) return;
  
    setStartTime(time[0]);
    setCurrentTime(time[0]);
    playerRef.current.seekTo(time[0]);
  };

  const onStateChange = (event: YouTubeEvent) => {
    if (!playerRef.current) return;

    if (event.data === 1) {
      setPlaying(true);
    } else if (event.data === 2) {
      setStartTime(currentTime);
    } else if (event.data === 5) {
      seekVideo(range);
    }
  }

  const opts: YouTubePlayer.Options = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
      controls: 0,
      rel: 0,
    },
  };

  return (
    <Layout>
      <div className="flex flex-col items-center p-4">
        <div className="w-full aspect-w-16 aspect-h-9">
          <YouTube
            videoId={videoId}
            opts={opts}
            onReady={onPlayerReady}
            onStateChange={onStateChange}
          />
        </div>

        <div className="flex flex-col w-full">
          <VideoControlBar
            playVideo={playVideo}
            pauseVideo={pauseVideo}
            playing={playing}
            min={0}
            max={duration}
            currentTime={currentTime}
            seekVideo={seekVideo}
            duration={duration}
          />

          <div className="mt-6 w-full">
            <div className="relative w-full">
              <Trimmer
                min={0}
                max={duration}
                range={range}
                onRangeChange={handleRangeChange}
              />
            </div>
          </div>

          <hr className="border-1 border-gray-500 my-4" />

          <div className="flex flex-col w-full">
            <h2 className="font-semibold text-2xl uppercase text-gray-200">
              {selectedVideo?.snippet?.title}
            </h2>
            <p className="text-l normal-case text-gray-300">
              {selectedVideo?.snippet?.description}
            </p>

            <p className="text-l normal-case text-gray-300">
              {selectedVideo?.snippet?.channelTitle}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
