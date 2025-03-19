import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Onboarding.css";
import igloo from "../../assets/logo/igloo.png";
import refrigerator from "../../assets/logo/refrigerator.png";
import { authApi } from "../../api/AuthApi";

const Onboarding = () => {
  const navigate = useNavigate();
  const [opacity, setOpacity] = useState(1);

  // 사용자 로그인 여부 확인
  const isLoggedIn = authApi.isAuthenticated();

  useEffect(() => {
    // 로그인 되어 있을 경우에만 메인으로 이동
    if (isLoggedIn) {
      // 3초 후에 페이드아웃 애니메이션 시작
      const timer = setTimeout(() => {
        setOpacity(0);

        // 애니메이션 완료 후 네비게이션
        setTimeout(() => {
          navigate("/main");
        }, 500); // 애니메이션 지속 시간
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [navigate]);

  return (
    <motion.div
      className="onboarding-container"
      animate={{ opacity }}
      transition={{ duration: 0.8 }}
    >
      <motion.img
        // <img
        src={igloo}
        // src={refrigerator}
        alt="solpickLogo"
        className="solpick-logo"
        스프링
        효과
        animate={{
          scale: [0.7, 1.05, 0.95, 1],
          opacity: [0, 1, 1, 1],
        }}
        transition={{
          duration: 1.2,
          times: [0, 0.4, 0.7, 1],
        }}

        // 커지는 효과
        // initial={{ scale: 0.8 }} // 처음 크기를 0.8로 설정
        // animate={{ scale: 1 }} // 애니메이션 끝에 크기를 1로 설정
        // transition={{
        //   duration: 1.0, // 자연스럽게 커지는 시간
        //   ease: "easeOut", // 부드러운 애니메이션 효과
        // }}
      />

      {!isLoggedIn && (
        <motion.div
          className="get-started-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <button
            onClick={() => navigate("/login")}
            className="get-started-button"
          >
            시작하기
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Onboarding;
