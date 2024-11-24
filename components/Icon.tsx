import React from "react";

interface IconProps {
  type: string;
  onHandler: () => void;
}

const IconOptions: Record<string, JSX.Element> = {
  play: <path d="M7 6v12l10-6-10-6z" />,
  pause: <path d="M6 6h4v12H6zm8 0h4v12h-4z" />,
};

const Icon: React.FC<IconProps> = ({ type, onHandler }: IconProps) => {
  return (
    <button
      onClick={onHandler}
      className="text-gray-300 hover:text-red-600 transition flex items-center"
      >
      <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="currentColor"
          viewBox="0 0 24 24"
      >
        {IconOptions[type]}
      </svg>
    </button>
  );
};

export default Icon;
