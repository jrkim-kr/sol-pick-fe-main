import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "./ReceiptScanner.css";
import closeIcon from "../../../assets/close.svg";
import noResult from "../../../assets/noResult.svg";
import cameraIcon from "../../../assets/camera.svg";
import ButtonS from "../../common/button/ButtonS";
import { ingredientApi } from "../../../api/IngredientApi";
import { USE_MOCK_DATA } from "../../../config";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../context/ToastContext";

const ReceiptScanner = ({ isOpen, onClose, onScanComplete }) => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [stage, setStage] = useState("camera"); // camera, loading, noIngredients
  const [capturedImage, setCapturedImage] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // 카메라 스트림 시작
  useEffect(() => {
    if (isOpen && stage === "camera") {
      startCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, stage]);

  // 카메라 스트림 시작 함수
  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: "environment", // 후면 카메라 우선 사용
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
    } catch (err) {
      console.error("카메라 접근 오류:", err);
      showToast("카메라에 접근할 수 없습니다.");
    }
  };

  // 카메라 스트림 중지 함수
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  // 사진 촬영 함수
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      // 캔버스 크기를 비디오 크기에 맞춤
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // 비디오 프레임을 캔버스에 그림
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // 캔버스 이미지를 데이터 URL로 변환
      const imageDataUrl = canvas.toDataURL("image/jpeg");
      setCapturedImage(imageDataUrl);

      // 카메라 중지
      stopCamera();

      // 로딩 단계로 전환
      setStage("loading");

      // 로딩 진행 시뮬레이션
      simulateLoading(imageDataUrl);
    }
  };

  // 로딩 시뮬레이션 함수
  const simulateLoading = (imageData) => {
    setLoadingProgress(0);
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);

          // 목업 데이터 사용 여부 확인
          if (USE_MOCK_DATA) {
            setTimeout(() => {
              setLoadingProgress(100);
              // 목업 데이터 (테스트용)
              const mockOcrResult = {
                ingredientNames: ["딸기", "양파"],
              };

              setTimeout(() => {
                if (mockOcrResult.ingredientNames.length > 0) {
                  onScanComplete(imageData, mockOcrResult.ingredientNames);
                } else {
                  // 인식된 식재료 없음
                  setStage("noIngredients");
                }
              }, 500);
            }, 1000);
          } else {
            // 실제 OCR API 호출
            processReceiptOcr(imageData);
          }
          return 90;
        }
        return prev + 5;
      });
    }, 200);
  };

  // 실제 OCR API 호출 함수
  const processReceiptOcr = async (imageData) => {
    try {
      const result = await ingredientApi.processReceiptOcr(imageData);
      setLoadingProgress(100);

      if (result.success) {
        if (result.ingredientNames && result.ingredientNames.length > 0) {
          setTimeout(() => {
            onScanComplete(imageData, result.ingredientNames);
          }, 500);
        } else {
          // 인식된 식재료가 없을 때 noIngredients 상태로 전환
          setStage("noIngredients");
        }
      } else {
        showToast("영수증 인식에 실패했습니다. 다시 시도해주세요.");

        retakePhoto();
      }
    } catch (error) {
      console.error("OCR 처리 오류:", error);
      showToast("영수증 처리 중 오류가 발생했습니다.");

      retakePhoto();
    }
  };

  // 다시 촬영하기
  const retakePhoto = () => {
    setCapturedImage(null);
    setStage("camera");
    startCamera();
  };

  // 버튼 비활성화 상태 계산
  const isRetakeButtonDisabled = loadingProgress > 80;

  // 로딩 상태 메시지 결정
  const getLoadingStatusMessage = () => {
    if (loadingProgress < 30) return "영수증 이미지 분석 중...";
    if (loadingProgress < 60) return "텍스트 인식 중...";
    if (loadingProgress < 90) return "식재료명 정보 추출 중...";
    return "거의 완료되었습니다...";
  };

  return (
    <motion.div
      className="receipt-scanner-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="receipt-scanner-header">
        <h3 className="scanner-title bold">영수증 촬영하기</h3>
        <img
          src={closeIcon}
          alt="Close"
          className="close-icon"
          onClick={onClose}
        />
      </div>

      <div className="receipt-scanner-content">
        {/* 카메라 스테이지 */}
        {stage === "camera" && (
          <div className="camera-view">
            {/* 비디오 미리보기 */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="camera-preview"
              onCanPlay={() => videoRef.current.play()}
            />

            <div className="camera-guidance">
              <div className="guidance-text">
                사각형 안에 구입한 식재료명이
                <br />
                모두 들어오도록 사진을 촬영해주세요.
              </div>
              <div className="receipt-frame"></div>
              <div className="capture-button-container">
                <button className="capture-button" onClick={captureImage}>
                  <img src={cameraIcon} alt="cameraIcon" />
                </button>
              </div>
            </div>

            <canvas ref={canvasRef} style={{ display: "none" }} />
          </div>
        )}

        {/* 로딩 스테이지 */}
        {stage === "loading" && (
          <div className="loading-view">
            <div className="captured-receipt">
              <img src={capturedImage} alt="Captured Receipt" />
              <div className="scan-line"></div>
            </div>
            <div className="loading-progress-container">
              <div
                className="loading-progress-bar"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <div className="loading-status">{getLoadingStatusMessage()}</div>
            <div className="retake-button-container">
              <ButtonS
                text="다시 촬영하기"
                variant="outlined"
                onClick={retakePhoto}
                disabled={isRetakeButtonDisabled}
                width="120px"
                height="40px"
              />
            </div>
          </div>
        )}

        {/* 식재료 0개 인식 스테이지 */}
        {stage === "noIngredients" && (
          <div className="no-ingredients-view">
            <img src={noResult} alt="noResult" className="no-result-icon" />
            <h3 className="no-ingredients-title bold">
              식재료를 인식하지 못했어요
            </h3>
            <p className="no-ingredients-description">
              영수증을 명확하게 촬영해주세요.
              <br />
              글자가 잘 보이도록 빛 반사를 조심하고,
              <br />
              카메라를 가까이 또는 멀리 조절해보세요.
            </p>
            <div className="no-ingredients-actions">
              <ButtonS
                text="직접 입력하기"
                variant="outlined"
                onClick={() => {
                  navigate("/refrigerator/add");
                  onClose(); // 현재 스캐너 닫기
                }}
              />
              <ButtonS
                text="다시 촬영하기"
                variant="filled"
                onClick={retakePhoto}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ReceiptScanner;
