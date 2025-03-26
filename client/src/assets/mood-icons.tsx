import React from "react";

// 3D-styled SVG icons for movie moods
export const MoodIcons = {
  Relaxing: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <g transform="translate(2 2)">
        <path
          d="M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0Z"
          fill="url(#relaxing-gradient)"
        />
        <path
          d="M14 8C14.5523 8 15 7.55228 15 7C15 6.44772 14.5523 6 14 6C13.4477 6 13 6.44772 13 7C13 7.55228 13.4477 8 14 8Z"
          fill="white"
        />
        <path
          d="M6 8C6.55228 8 7 7.55228 7 7C7 6.44772 6.55228 6 6 6C5.44772 6 5 6.44772 5 7C5 7.55228 5.44772 8 6 8Z"
          fill="white"
        />
        <path
          d="M10 16C12.2091 16 14 14.2091 14 12H6C6 14.2091 7.79086 16 10 16Z"
          fill="white"
        />
        <path
          d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
          fill="transparent"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="0.5"
        />
      </g>
      <defs>
        <linearGradient
          id="relaxing-gradient"
          x1="0"
          y1="0"
          x2="20"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4ECCA3" />
          <stop offset="1" stopColor="#2E8B57" />
        </linearGradient>
      </defs>
    </svg>
  ),

  Exciting: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <g transform="translate(2 2)">
        <path
          d="M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0Z"
          fill="url(#exciting-gradient)"
        />
        <path
          d="M10 2L11.5 7H17L12.5 10L14 15L10 12L6 15L7.5 10L3 7H8.5L10 2Z"
          fill="white"
        />
        <path
          d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
          fill="transparent"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="0.5"
        />
      </g>
      <defs>
        <linearGradient
          id="exciting-gradient"
          x1="0"
          y1="0"
          x2="20"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFD700" />
          <stop offset="1" stopColor="#FFA500" />
        </linearGradient>
      </defs>
    </svg>
  ),

  Thoughtful: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <g transform="translate(2 2)">
        <path
          d="M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0Z"
          fill="url(#thoughtful-gradient)"
        />
        <path
          d="M10 5C11.1046 5 12 4.10457 12 3C12 1.89543 11.1046 1 10 1C8.89543 1 8 1.89543 8 3C8 4.10457 8.89543 5 10 5Z"
          fill="white"
        />
        <path
          d="M10 17C10.5523 17 11 16.5523 11 16C11 15.4477 10.5523 15 10 15C9.44772 15 9 15.4477 9 16C9 16.5523 9.44772 17 10 17Z"
          fill="white"
        />
        <path
          d="M10 14C10 14 14 12 14 9C14 7.34315 12.2091 6 10 6C7.79086 6 6 7.34315 6 9C6 12 10 14 10 14Z"
          fill="white"
        />
        <path
          d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
          fill="transparent"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="0.5"
        />
      </g>
      <defs>
        <linearGradient
          id="thoughtful-gradient"
          x1="0"
          y1="0"
          x2="20"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#818CF8" />
          <stop offset="1" stopColor="#4F46E5" />
        </linearGradient>
      </defs>
    </svg>
  ),

  Uplifting: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <g transform="translate(2 2)">
        <path
          d="M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0Z"
          fill="url(#uplifting-gradient)"
        />
        <path
          d="M10 14C12.7614 14 15 11.7614 15 9C15 6.23858 12.7614 4 10 4C7.23858 4 5 6.23858 5 9C5 11.7614 7.23858 14 10 14Z"
          fill="white"
        />
        <path
          d="M6 9C6 9 8 11 10 11C12 11 14 9 14 9"
          stroke="url(#uplifting-gradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
          fill="transparent"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="0.5"
        />
      </g>
      <defs>
        <linearGradient
          id="uplifting-gradient"
          x1="0"
          y1="0"
          x2="20"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F472B6" />
          <stop offset="1" stopColor="#DB2777" />
        </linearGradient>
      </defs>
    </svg>
  ),

  Intense: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <g transform="translate(2 2)">
        <path
          d="M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0Z"
          fill="url(#intense-gradient)"
        />
        <path
          d="M10 16C10 16 16 12 16 8C16 5.79086 14.2091 4 12 4C11.0238 4 10.1361 4.33361 9.5 4.86667C8.86389 4.33361 7.97619 4 7 4C4.79086 4 3 5.79086 3 8C3 12 10 16 10 16Z"
          fill="white"
        />
        <path
          d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
          fill="transparent"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="0.5"
        />
      </g>
      <defs>
        <linearGradient
          id="intense-gradient"
          x1="0"
          y1="0"
          x2="20"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EF4444" />
          <stop offset="1" stopColor="#B91C1C" />
        </linearGradient>
      </defs>
    </svg>
  ),
};
