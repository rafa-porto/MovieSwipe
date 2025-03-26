import React from "react";

// 3D-styled SVG icons for streaming services
export const StreamingIcons = {
  Netflix: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <g transform="translate(2 2)">
        <path
          d="M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0Z"
          fill="url(#netflix-gradient)"
        />
        <path d="M6 4L6 16L8 16L8 10L14 16L14 4L12 4L12 10L6 4Z" fill="white" />
        <path
          d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
          fill="transparent"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="0.5"
        />
      </g>
      <defs>
        <linearGradient
          id="netflix-gradient"
          x1="0"
          y1="0"
          x2="20"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E50914" />
          <stop offset="1" stopColor="#B81D24" />
        </linearGradient>
      </defs>
    </svg>
  ),

  Prime: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <g transform="translate(2 2)">
        <path
          d="M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0Z"
          fill="url(#prime-gradient)"
        />
        <path d="M5 7H15V9H5V7Z" fill="white" />
        <path d="M10 14L5 11V9L10 12L15 9V11L10 14Z" fill="white" />
        <path
          d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
          fill="transparent"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="0.5"
        />
      </g>
      <defs>
        <linearGradient
          id="prime-gradient"
          x1="0"
          y1="0"
          x2="20"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00A8E1" />
          <stop offset="1" stopColor="#0066B2" />
        </linearGradient>
      </defs>
    </svg>
  ),

  "Disney+": () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <g transform="translate(2 2)">
        <path
          d="M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0Z"
          fill="url(#disney-gradient)"
        />
        <path d="M5 8H7V12H5V8Z" fill="white" />
        <path d="M8 8H10V12H8V8Z" fill="white" />
        <path d="M11 8H15L13 10L15 12H11V8Z" fill="white" />
        <path
          d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
          fill="transparent"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="0.5"
        />
      </g>
      <defs>
        <linearGradient
          id="disney-gradient"
          x1="0"
          y1="0"
          x2="20"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1F3278" />
          <stop offset="1" stopColor="#0A1A5E" />
        </linearGradient>
      </defs>
    </svg>
  ),

  Hulu: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <g transform="translate(2 2)">
        <path
          d="M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0Z"
          fill="url(#hulu-gradient)"
        />
        <path d="M6 8H8V12H6V8Z" fill="white" />
        <path d="M12 8H14V12H12V8Z" fill="white" />
        <path d="M9 8H11V14H9V8Z" fill="white" />
        <path
          d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
          fill="transparent"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="0.5"
        />
      </g>
      <defs>
        <linearGradient
          id="hulu-gradient"
          x1="0"
          y1="0"
          x2="20"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3DBB3D" />
          <stop offset="1" stopColor="#1F991F" />
        </linearGradient>
      </defs>
    </svg>
  ),

  "HBO Max": () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <g transform="translate(2 2)">
        <path
          d="M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0Z"
          fill="url(#hbo-gradient)"
        />
        <path d="M5 8H7V12H5V8Z" fill="white" />
        <path d="M8 8H10V12H8V8Z" fill="white" />
        <path d="M11 8H13V12H11V8Z" fill="white" />
        <path
          d="M10 6C12.2091 6 14 7.79086 14 10C14 12.2091 12.2091 14 10 14C7.79086 14 6 12.2091 6 10C6 7.79086 7.79086 6 10 6Z"
          fill="transparent"
          stroke="white"
          strokeWidth="1"
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
          id="hbo-gradient"
          x1="0"
          y1="0"
          x2="20"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8A2BE2" />
          <stop offset="1" stopColor="#4B0082" />
        </linearGradient>
      </defs>
    </svg>
  ),

  "Apple TV+": () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <g transform="translate(2 2)">
        <path
          d="M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0Z"
          fill="url(#apple-gradient)"
        />
        <path
          d="M10 5C11.1046 5 12 5.89543 12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5Z"
          fill="white"
        />
        <path
          d="M7 10C7 10 8 11 10 11C12 11 13 10 13 10V14C13 14 12 15 10 15C8 15 7 14 7 14V10Z"
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
          id="apple-gradient"
          x1="0"
          y1="0"
          x2="20"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#555555" />
          <stop offset="1" stopColor="#000000" />
        </linearGradient>
      </defs>
    </svg>
  ),
};
