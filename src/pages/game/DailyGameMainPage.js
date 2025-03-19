import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DailyGameMainPage.css";
import PixelModal from "../../components/game/PixelModal";
import { addFood } from "../../api/GameApi";

// 컴포넌트 및 배경 임포트
import GameBackground from "../../components/game/GameBackground";
import DailyGameMain from "../../components/game/DailyGameMain";
import Header from "../../components/common/header/Header";

// 필요한 아이콘 import
import backArrow from "../../assets/backArrow.svg";
import close from "../../assets/close.svg";

/**
 * 카드 뒤집기 게임 페이지
 * 실제 게임 플레이가 이루어지는 메인 게임 페이지
 */
const DailyGameMainPage = () => {
  const navigate = useNavigate();
  // 게임에서 획득한 사료 개수 상태 관리
  const [earnedFood, setEarnedFood] = useState(0);

  // 모달 상태 관리
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    buttons: [],
  });

  // 모달 닫기 함수
  const closeModal = () => {
    setModalConfig({
      isOpen: false,
      title: "",
      message: "",
      buttons: [],
    });
  };

  // 네비게이션 핸들러
  const handleGoBack = () => {
    // 게임 진행 중 나가기 확인
    if (earnedFood > 0) {
      setModalConfig({
        isOpen: true,
        title: "게임 종료",
        message: "게임을 종료하시겠습니까? 현재까지 획득한 사료는 저장됩니다.",
        buttons: [
          {
            text: "확인",
            onClick: async () => {
              closeModal();
              // 획득한 사료 저장
              try {
                await addFood(earnedFood);
              } catch (error) {
                console.error("사료 저장 중 오류 발생:", error);
              }
              navigate("/game/instructions");
            },
            type: "primary",
          },
          { text: "취소", onClick: () => closeModal(), type: "secondary" },
        ],
      });
    } else {
      navigate("/game/instructions");
    }
  };

  const handleClose = () => {
    // 게임 진행 중 종료 확인
    if (earnedFood > 0) {
      setModalConfig({
        isOpen: true,
        title: "게임 종료",
        message: "게임을 종료하시겠습니까?\n현재까지 획득한 사료는 저장됩니다.",
        buttons: [
          {
            text: "확인",
            onClick: async () => {
              closeModal();
              // 획득한 사료 저장
              try {
                await addFood(earnedFood);
              } catch (error) {
                console.error("사료 저장 중 오류 발생:", error);
              }
              navigate("/game/home");
            },
            type: "primary",
          },
          { text: "취소", onClick: () => closeModal(), type: "secondary" },
        ],
      });
    } else {
      navigate("/game/home");
    }
  };

  // 게임 종료 핸들러
  const handleGameExit = async (totalReward) => {
    try {
      // 획득한 사료 저장
      console.log(`게임 종료: 총 ${totalReward}개의 사료 획득`);
      setEarnedFood(totalReward);

      if (totalReward > 0) {
        // 서버에 사료 추가
        await addFood(totalReward);
      }

      // 확인 메시지 표시 및 게임 홈 화면으로 이동
      setModalConfig({
        isOpen: true,
        title: "게임 완료",
        message: `게임 완료!\n${totalReward}개의 사료를 획득했습니다!`,
        buttons: [
          {
            text: "확인",
            onClick: () => {
              closeModal();
              navigate("/game/home");
            },
            type: "primary",
          },
        ],
      });
    } catch (error) {
      console.error("사료 저장 중 오류 발생:", error);
      setModalConfig({
        isOpen: true,
        title: "오류 발생",
        message: "사료 저장 중 오류가 발생했습니다.",
        buttons: [
          {
            text: "확인",
            onClick: () => {
              closeModal();
              navigate("/game/home");
            },
            type: "primary",
          },
        ],
      });
    }
  };

  // 사료 획득 핸들러
  const handleEarnFood = (amount) => {
    // 사료 획득 처리 및 상태 업데이트
    setEarnedFood((prev) => prev + amount);
    console.log(`${amount}개의 사료 획득! 총 획득량: ${earnedFood + amount}`);
  };

  // 커스텀 헤더 스타일 정의
  const customHeaderStyle = {
    fontFamily: "'Kablammo', cursive",
    fontSize: "24px",
  };

  return (
    <div className="daily-game-main-page-container">
      <Header
        leftIcon={backArrow}
        title="Foody Cat"
        rightIcon={close}
        onLeftClick={handleGoBack}
        onRightClick={handleClose}
        titleStyle={customHeaderStyle}
      />

      <div className="daily-game-main-component-container">
        <GameBackground />
        <div className="daily-game-main-scrollable-content">
          <DailyGameMain
            onGameExit={handleGameExit}
            onEarnFood={handleEarnFood}
          />
        </div>
      </div>

      {/* 픽셀 스타일 모달 */}
      <PixelModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        buttons={modalConfig.buttons}
        onClose={closeModal}
      />
    </div>
  );
};

export default DailyGameMainPage;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./DailyGameMainPage.css";
// import PixelModal from "../../components/game/PixelModal";

// // 컴포넌트 및 배경 임포트
// import GameBackground from "../../components/game/GameBackground";
// import DailyGameMain from "../../components/game/DailyGameMain";
// import Header from "../../components/common/header/Header";

// // 필요한 아이콘 import
// import backArrow from "../../assets/backArrow.svg";
// import close from "../../assets/close.svg";

// /**
//  * 카드 뒤집기 게임 페이지
//  * 실제 게임 플레이가 이루어지는 메인 게임 페이지
//  */
// const DailyGameMainPage = () => {
//   const navigate = useNavigate();
//   // 게임에서 획득한 사료 개수 상태 관리
//   const [earnedFood, setEarnedFood] = useState(0);

//   // 모달 상태 관리
//   const [modalConfig, setModalConfig] = useState({
//     isOpen: false,
//     title: "",
//     message: "",
//     buttons: [],
//   });

//   // 모달 닫기 함수
//   const closeModal = () => {
//     setModalConfig({
//       isOpen: false,
//       title: "",
//       message: "",
//       buttons: [],
//     });
//   };

//   // 네비게이션 핸들러
//   const handleGoBack = () => {
//     // 게임 진행 중 나가기 확인
//     if (earnedFood > 0) {
//       setModalConfig({
//         isOpen: true,
//         title: "게임 종료",
//         message: "게임을 종료하시겠습니까? 현재까지 획득한 사료는 저장됩니다.",
//         buttons: [
//           {
//             text: "확인",
//             onClick: () => {
//               closeModal();
//               navigate("/game/instructions");
//             },
//             type: "primary",
//           },
//           { text: "취소", onClick: () => closeModal(), type: "secondary" },
//         ],
//       });
//     } else {
//       navigate("/game/instructions");
//     }
//   };

//   const handleClose = () => {
//     // 게임 진행 중 종료 확인
//     if (earnedFood > 0) {
//       setModalConfig({
//         isOpen: true,
//         title: "게임 종료",
//         message: "게임을 종료하시겠습니까?\n현재까지 획득한 사료는 저장됩니다.",
//         buttons: [
//           {
//             text: "확인",
//             onClick: () => {
//               closeModal();
//               navigate("/game/home");
//             },
//             type: "primary",
//           },
//           { text: "취소", onClick: () => closeModal(), type: "secondary" },
//         ],
//       });
//     } else {
//       navigate("/game/home");
//     }
//   };

//   // 게임 종료 핸들러
//   const handleGameExit = (totalReward) => {
//     // 실제 구현에서는 여기서 사료 획득 처리 및 저장 로직 추가
//     console.log(`게임 종료: 총 ${totalReward}개의 사료 획득`);
//     setEarnedFood(totalReward);

//     // 확인 메시지 표시 게임 홈 화면으로 이동
//     setModalConfig({
//       isOpen: true,
//       title: "게임 완료",
//       message: `게임 완료!\n${totalReward}개의 사료를 획득했습니다!`,
//       buttons: [
//         {
//           text: "확인",
//           onClick: () => {
//             closeModal();
//             navigate("/game/home");
//           },
//           type: "primary",
//         },
//       ],
//     });
//   };

//   // 사료 획득 핸들러
//   const handleEarnFood = (amount) => {
//     // 사료 획득 처리 및 상태 업데이트
//     setEarnedFood((prev) => prev + amount);
//     console.log(`${amount}개의 사료 획득! 총 획득량: ${earnedFood + amount}`);
//   };

//   // 커스텀 헤더 스타일 정의
//   const customHeaderStyle = {
//     fontFamily: "'Kablammo', cursive",
//     // 필요한 경우 추가 스타일 속성 지정
//     fontSize: "24px",
//   };

//   return (
//     <div className="daily-game-main-page-container">
//       <Header
//         leftIcon={backArrow}
//         title="Foody Cat"
//         rightIcon={close}
//         onLeftClick={handleGoBack}
//         onRightClick={handleClose}
//         titleStyle={customHeaderStyle} // 커스텀 스타일 전달
//       />

//       <div className="daily-game-main-component-container">
//         <GameBackground />
//         <div className="daily-game-main-scrollable-content">
//           <DailyGameMain
//             onGameExit={handleGameExit}
//             onEarnFood={handleEarnFood}
//           />
//         </div>
//       </div>

//       {/* 픽셀 스타일 모달 */}
//       <PixelModal
//         isOpen={modalConfig.isOpen}
//         title={modalConfig.title}
//         message={modalConfig.message}
//         buttons={modalConfig.buttons}
//         onClose={closeModal}
//       />
//     </div>
//   );
// };

// export default DailyGameMainPage;
