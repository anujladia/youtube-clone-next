import React from "react";
import SliderComponent from "@/components/SliderComponent";

import formatTime from "@/utils/formatTime";

interface TrimmerProps {
  min: number;
  max: number;
  range: number[];
  onRangeChange: (range: number[]) => void;
}

const Trimmer: React.FC<TrimmerProps> = ({ min, max, range, onRangeChange }: TrimmerProps) => {
  return (
    <div className="flex w-full items-center">
      <div className="flex items-center mr-6">
        <span className="text-xl font-bold text-gray-200">Trimmer</span>
      </div>
      <div className="flex flex-col w-full">
        <SliderComponent
          min={min}
          max={max}
          range={range}
          onRangeChange={onRangeChange}
          showThumbInfo={false}
          thumbStyle="h-6 w-6 bg-white border-2 border-blue-500"
        />
        <div className="flex justify-between w-full mt-4">
          <span className="text-gray-400">Start: {formatTime(range[0])}</span>
          <span className="text-gray-400">End: {formatTime(range[1])}</span>
        </div>
      </div>
    </div>
  );
};

export default Trimmer;
