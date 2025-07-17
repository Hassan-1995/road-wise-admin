import React from "react";
import { IconType } from "react-icons";
const colorMap = {
  red: "from-red-600 to-red-900",
  yellow: "from-yellow-600 to-yellow-900",
  green: "from-green-600 to-green-900",
  blue: "from-blue-600 to-blue-900",
  purple: "from-purple-600 to-purple-900",
} as const;
type ColorKey = keyof typeof colorMap;

type PromptCardProps = {
  title: string;
  info: string;
  description: string;
  icon?: IconType;
  color?: ColorKey;
};

const PromptCard = ({
  title,
  info,
  description,
  icon: Icon,
  color = "blue",
}: PromptCardProps) => {
  const gradient = colorMap[color];
  return (
    <div
      className={`bg-gradient-to-r ${gradient} p-5 rounded-2xl w-80 text-white flex-shrink-0 mb-3`}
    >
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-sm">{title}</h1>
        {Icon && <Icon className="text-2xl" />}
      </div>
      <h2 className="font-bold text-3xl mt-2">{info}</h2>
      <p className="mt-1 text-sm">{description}</p>
    </div>
  );
};

export default PromptCard;
