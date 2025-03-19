import React from "react";

const SteamIcon = ({
    size = 24,
    color = "#333",
    animated = true,
    ...props
}) => {
    return (
        <div className="relative flex justify-center items-end" {...props}>
            <svg
                viewBox="0 0 24 24"
                width={size}
                height={size}
                className="overflow-visible"
            >
                {/* 왼쪽 증기/김 곡선 */}
                <path
                    d="M8 20c0 0-3-5.5-3-8.5S7 6 8 3c0 3 2 5.5 1 8.5S8 20 8 20z"
                    fill="transparent"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className={animated ? "animate-steam-left" : ""}
                />

                {/* 오른쪽 증기/김 곡선 */}
                <path
                    d="M16 20c0 0-3-4.5-2-7.5S17 8 16 5c-1 3 1 5.5 0 8.5S16 20 16 20z"
                    fill="transparent"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className={animated ? "animate-steam-right" : ""}
                />
            </svg>

            {/* 애니메이션용 CSS */}
            <style jsx>{`
        @keyframes steam-left {
          0% {
            opacity: 0;
            transform: translateY(0) scaleY(1);
          }
          15% {
            opacity: 0.8;
            transform: translateY(-1px) scaleY(1.02);
          }
          40% {
            opacity: 0.6;
            transform: translateY(-2px) scaleY(1.05);
          }
          60% {
            opacity: 0.4;
            transform: translateY(-3px) scaleY(1.08);
          }
          80% {
            opacity: 0.2;
            transform: translateY(-4px) scaleY(1.1);
          }
          100% {
            opacity: 0;
            transform: translateY(-5px) scaleY(1.12);
          }
        }

        @keyframes steam-right {
          0% {
            opacity: 0;
            transform: translateY(0) scaleY(1);
          }
          20% {
            opacity: 0.7;
            transform: translateY(-0.5px) scaleY(1.01);
          }
          50% {
            opacity: 0.5;
            transform: translateY(-1.5px) scaleY(1.03);
          }
          70% {
            opacity: 0.3;
            transform: translateY(-2.5px) scaleY(1.06);
          }
          90% {
            opacity: 0.1;
            transform: translateY(-3.5px) scaleY(1.09);
          }
          100% {
            opacity: 0;
            transform: translateY(-4.5px) scaleY(1.1);
          }
        }

        .animate-steam-left {
          animation: steam-left 3s infinite;
        }

        .animate-steam-right {
          animation: steam-right 3.5s infinite 0.5s;
        }
      `}</style>
        </div>
    );
};

export default SteamIcon;