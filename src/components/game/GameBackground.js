import React, { useEffect, useRef } from "react";
import "./GameBackground.css";

/**
 * 게임 배경 컴포넌트 - 픽셀 아트 스타일의 움직이는 배경을 제공합니다.
 * @returns {JSX.Element} 게임 배경 컴포넌트
 */
const GameBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 모바일 화면에 맞는 크기 조정
    const container = canvas.parentElement;
    const rect = container.getBoundingClientRect();
    const width = (canvas.width = rect.width);
    const height = (canvas.height = rect.height);

    // Canvas 컨텍스트 가져오기
    const ctx = canvas.getContext("2d");

    // 픽셀 아트 스타일을 위한 설정
    ctx.imageSmoothingEnabled = false;

    // 별 파티클 생성
    const stars = Array.from({ length: 50 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.1,
      color: [
        "#ffd866", // 노란색
        "#ff6188", // 분홍색
        "#a9dc76", // 연두색
        "#78dce8", // 하늘색
        "#ab9df2", // 보라색
      ][Math.floor(Math.random() * 5)],
    }));

    // 애니메이션 프레임
    let animationFrameId;
    let frame = 0;

    // 애니메이션 함수
    const render = () => {
      // 배경 색상
      ctx.fillStyle = "#222034";
      ctx.fillRect(0, 0, width, height);

      // 격자 그리기 (8x8 픽셀)
      ctx.strokeStyle = "rgba(69, 40, 60, 0.2)";
      ctx.lineWidth = 1;

      // 수직선
      for (let x = 0; x < width; x += 16) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // 수평선
      for (let y = 0; y < height; y += 16) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 별(파티클) 업데이트 및 그리기
      stars.forEach((star) => {
        // 별 움직임
        star.y += star.speed;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }

        // 깜박임 효과
        const flicker =
          Math.sin(frame * 0.05 + stars.indexOf(star)) * 0.3 + 0.7;

        // 별 그리기 (픽셀 아트 스타일)
        ctx.fillStyle = star.color;
        const size = Math.floor(star.size * flicker);

        // 정사각형 픽셀로 그리기
        ctx.fillRect(Math.floor(star.x), Math.floor(star.y), size, size);
      });

      frame++;
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    // 창 크기 변경 핸들러
    const handleResize = () => {
      const container = canvas.parentElement;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      ctx.imageSmoothingEnabled = false;
    };

    window.addEventListener("resize", handleResize);

    // 정리 함수
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="game-background-container">
      <canvas ref={canvasRef} className="game-background-canvas" />
    </div>
  );
};

export default GameBackground;
