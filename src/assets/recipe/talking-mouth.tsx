import React, { useState, useEffect } from "react";

const TalkingMouth = ({ size = 40 }) => {
  const [mouthState, setMouthState] = useState(0);

  // 입 모양의 배열
  const mouthShapes = [
    "M 50,50 Q 75,70 100,50 Q 75,40 50,50", // 약간 닫힌 입
    "M 50,50 Q 75,80 100,50 Q 75,30 50,50", // 중간 정도 열린 입
    "M 50,45 Q 75,90 100,45 Q 75,20 50,45", // 크게 열린 입
    "M 50,50 Q 75,60 100,50 Q 75,45 50,50", // 거의 닫힌 입
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMouthState((prevState) => (prevState + 1) % mouthShapes.length);
    }, 150); // 고정된 속도로 설정

    return () => clearInterval(interval);
  }, [mouthShapes.length]);

  return (
    <svg viewBox="0 0 150 100" width={size} height={size * 0.67}>
      {/* 입 */}
      <path
        d={mouthShapes[mouthState]}
        fill="#FF9999"
        stroke="#333"
        strokeWidth="2"
      />
    </svg>
  );
};

export default TalkingMouth;
