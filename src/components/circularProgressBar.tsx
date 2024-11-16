import React from "react";
import ReactDOM from "react-dom";
import { Time } from "./../types/types";

type CircularProgressBarProps = {
  timeLeft: Time;
  width: number;
};

//const CircularProgressBar = (params: CircularProgressBarProps) => {
//  const radius = 85;
//  return (
//    <div>
//      <svg
//        width={params.width}
//        height={params.width}
//        viewBox={`0 0 ${params.width} ${params.width}`}
//      >
//        <circle cx={params.width / 2} cy={params.width / 2} strokeWidth="15px" r={radius} />
//      </svg>
//    </div >
//  );
//
//};

const CircularProgressBar = (params: CircularProgressBarProps) => {
  const radius = 85;
  return (
    <div className="flex justify-center items-center">
      <svg
        className="transform -rotate-90"
        width={params.width}
        height={params.width}
        viewBox={`0 0 ${params.width} ${params.width}`}
      >
        <circle
          className="text-gray-300"
          cx={params.width / 2}
          cy={params.width / 2}
          r={radius}
          strokeWidth="15px"
          stroke="currentColor"
          fill="transparent"
        />
        <circle
          className="text-blue-500"
          cx={params.width / 2}
          cy={params.width / 2}
          r={radius}
          strokeWidth="15px"
          strokeDasharray={2 * Math.PI * radius}
          strokeDashoffset={2 * Math.PI * radius * (1 - params.timeLeft.minutes / 100)}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
        />
      </svg>
    </div>
  );
};
export default CircularProgressBar;
