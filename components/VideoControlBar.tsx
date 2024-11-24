import React, { useState, useEffect } from "react";

import SliderComponent from "@/components/SliderComponent";
import Icon from "@/components/Icon";

import formatTime from "@/utils/formatTime";

const VideoControlBar = ({
  playVideo,
  pauseVideo,
  playing,
  min,
  max,
  currentTime,
  seekVideo,
  duration,
}) => {

  const onPlayButton = () => {
    if (playing) {
      pauseVideo();
    } else {
      playVideo();
    }
  };

  return (
    <div className="flex justify-center mt-4 w-full">
      <div>
        {!playing
          ? <Icon
            type="play"
            onHandler={onPlayButton}
          />
          : <Icon
            type="pause"
            onHandler={onPlayButton}
          />
        }
      </div>
      <div className="text-gray-400 w-[160px] flex items-center mr-4">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
      <SliderComponent
        min={min}
        max={max}
        range={[currentTime]}
        onRangeChange={seekVideo}
        sliderColor="bg-gray-300"
        sliderHeight="h-1"
      />
    </div>
  );
};

export default VideoControlBar;
