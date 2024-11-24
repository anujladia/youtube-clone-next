import React from "react";
import { Range, getTrackBackground } from "react-range";

interface SliderProps {
  min: number;
  max: number;
  range: number[];
  onRangeChange: (range: number[]) => void;
  sliderColor?: string;
  sliderHeight?: string;
  showThumbInfo?: boolean;
  thumbStyle?: string;
}

const SliderComponent: React.FC<SliderProps> = ({
  min,
  max,
  range,
  onRangeChange,
  sliderColor = "bg-gradient-to-r from-slider-blue to-slider-purple",
  sliderHeight = "h-2",
  showThumbInfo = false,
  thumbStyle = "h-4 w-4 bg-white border-2 border-red-600"
}: SliderProps) => {

  const handleChange = (values: number[]) => {
    onRangeChange(values);
  };

  return (
    <div className="w-full flex items-center">
      <Range
        step={1}
        min={min}
        max={max}
        values={range}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div
            className={`w-full relative rounded-sm ${sliderColor} ${sliderHeight}`}
            {...props}
            style={{
              background: getTrackBackground({
                values: range,
                colors: ["red-600", "gray-700"],
                min: min,
                max: max
              })
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props, index }) => {
          const { key, ...other } = props;
          return (
            <div
              key={key}
              {...other}
              className={showThumbInfo
                ? "h-6 w-6 bg-white border-2 border-blue-500 rounded-full flex justify-center items-center shadow-md"
                : `rounded-full flex justify-center items-center shadow-md ${thumbStyle}`
              }
            >
              {showThumbInfo
                ? <span className="text-sm text-blue-500">{range[index]}</span>
                : <></>
              }
            </div>
          )
        }}
      />
    </div>
  );
};

export default SliderComponent;
