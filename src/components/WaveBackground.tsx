// components/WaveBackground.tsx
import React from 'react';

interface WaveBackgroundProps {
  scaleFactor?: number;
  topPosition?: string;
  zIndex?: number;
  isBottomWave?: boolean;
}

const WaveBackground: React.FC<WaveBackgroundProps> = ({
  scaleFactor = 1,
  topPosition = "23%",
  zIndex = 0,
  isBottomWave = false,
}) => {
  if (isBottomWave) {
    return (
      <svg
        width="100%"
        height={`${697 * scaleFactor}px`}
        viewBox="0 0 1632 1235"
        preserveAspectRatio="xMidYMin meet"
        style={{
          position: "absolute",
          top: topPosition,
          height: "100%",
          left: 0,
          zIndex: zIndex,
          transform: "translateY(-50%)",
        }}
      >
        <defs>
          <filter id="filter0_d">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dx="10" dy="7" />
            <feGaussianBlur stdDeviation="15" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
          <linearGradient id="paint0_linear" x1="816" y1="1" x2="816" y2="1234.05" gradientUnits="userSpaceOnUse">
            <stop offset="0.104578" stopColor="#6D1616" />
            <stop offset="0.564762" stopColor="#A51515" />
            <stop offset="1" stopColor="#6D1616" />
          </linearGradient>
        </defs>
        <g filter="url(#filter0_d)">
          <path 
            d="M374 231C211.887 258.406 1 576 1 576V1157.5C24.8763 1146.01 112.441 1125.89 204.5 1135C282.846 1137.95 465.097 1204.04 672 1231.5C878.903 1258.96 1225.2 1055.93 1382.5 1049C1539.8 1042.07 1629.22 1098.97 1631 1115V1C1622.26 19.4628 1119.36 281.614 943 298C766.64 314.386 536.113 203.594 374 231Z" 
            fill="url(#paint0_linear)" 
            stroke="black"
          />
        </g>
      </svg>
    );
  }

  return (
    <svg
      width="100%"
      height={`${567 * scaleFactor}px`}
      viewBox="0 0 1632 1235"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        top: topPosition,
        left: 0,
        zIndex: zIndex,
        transform: "translateY(-50%)",
      }}
    >
      <defs>
        <linearGradient id="paint0_linear" x1="816" y1="1" x2="816" y2="1234.05" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6D1616" />
          <stop offset="1" stopColor="#A51515" />
        </linearGradient>
        <linearGradient id="paint1_linear" x1="816" y1="1" x2="816" y2="1234.05" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6D1616" />
          <stop offset="1" stopColor="#A51515" />
        </linearGradient>
      </defs>
      <path
        d="M374 231C211.887 258.406 1 576 1 576V1157.5C24.8763 1146.01 112.441 1125.89 204.5 1135C282.846 1137.95 465.097 1204.04 672 1231.5C878.903 1258.96 1225.2 1055.93 1382.5 1049C1539.8 1042.07 1629.22 1098.97 1631 1115V1C1622.26 19.4628 1119.36 281.614 943 298C766.64 314.386 536.113 203.594 374 231Z"
        fill="url(#paint0_linear)"
        stroke="url(#paint1_linear)"
        strokeWidth={`${40 * scaleFactor}`}
      />
    </svg>
  );
};

export default WaveBackground;