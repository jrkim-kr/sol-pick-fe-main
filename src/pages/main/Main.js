import "./Main.css";
import { motion } from "framer-motion";
import MainHeader from "../../components/common/header/MainHeader";
import EventSection from "../../components/main/event-card/EventCard";
import Menu from "../../components/common/menu/Menu";
import { useNavigate } from "react-router-dom";
import ButtonS from "./../../components/common/button/ButtonS";
import { authApi } from "../../api/AuthApi"; // authApi 추가
import { useEffect, useState } from "react";
import RecommendSection from "../../components/main/recommend-section/RecommendSection";

import recipeImage from "../../assets/main/recipe.png";
import cardImage from "../../assets/main/card.png";
import strawberryImage from "../../assets/main/strawberry.png";
import groceryImage from "../../assets/main/grocery.png";
import giftboxImage from "../../assets/main/giftbox.png";
import healthyImage from "../../assets/main/healthy.png";

import class1 from "../../assets/main/class1.jpg";
import class2 from "../../assets/main/class2.jpg";
import class3 from "../../assets/main/class3.jpg";
import class4 from "../../assets/main/class4.jpg";
import class5 from "../../assets/main/class5.jpg";
import class6 from "../../assets/main/class6.jpg";

import mealplanner from "../../assets/main/mealplanner.png";

const Main = () => {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");
  const [closingPhrase, setClosingPhrase] = useState("");

  // 사용자 로그인 여부 확인
  const currentUser = authApi.getCurrentUser();
  const isLoggedIn = authApi.isAuthenticated();

  // 시간대별 인사말과 마무리 문구 생성
  useEffect(() => {
    // 시간대별 인사말 배열들
    const morningGreetings = [
      "상쾌한 아침이에요! 오늘 하루도",
      "싱그러운 아침이에요! 오늘도",
      "햇살 가득한 아침이에요! 오늘도",
    ];

    const afternoonGreetings = [
      "따스한 오후예요! 남은 하루도",
      "햇살이 포근한 오후예요! 오늘도",
      "여유로운 오후예요! 오늘도",
    ];

    const eveningGreetings = [
      "노을지는 저녁이에요! 하루의 마무리를",
      "포근한 저녁이에요! 남은 하루도",
      "조용한 저녁이에요! 하루의 마무리를",
    ];

    const nightGreetings = [
      "별빛 가득한 밤이에요! 내일도",
      "고요한 밤이에요! 내일 하루도",
      "달빛이 잔잔한 밤이에요! 내일도",
    ];

    // 마무리 문구 배열
    const closingPhrases = [
      "설렘으로 가득 채워볼까요?",
      "건강한 맛으로 기운 내볼까요?",
      "SOL Pick과 건강하게 보내볼까요?",
      "맛있는 한 끼로 든든하게 보내볼까요?",
      "신선한 식재료로 힘내볼까요?",
      "SOL Pick과 활기차게 보내볼까요?",
    ];

    // 현재 시간 확인
    const currentHour = new Date().getHours();

    // 시간대에 따라 적절한 인사말 배열 선택
    let timeBasedGreetings;

    if (currentHour >= 5 && currentHour < 12) {
      timeBasedGreetings = morningGreetings;
    } else if (currentHour >= 12 && currentHour < 17) {
      timeBasedGreetings = afternoonGreetings;
    } else if (currentHour >= 17 && currentHour < 22) {
      timeBasedGreetings = eveningGreetings;
    } else {
      timeBasedGreetings = nightGreetings;
    }

    // 인사말에서 랜덤하게 선택
    const randomGreetingIndex = Math.floor(
      Math.random() * timeBasedGreetings.length
    );
    const selectedGreeting = timeBasedGreetings[randomGreetingIndex];

    // 마무리 문구에서 랜덤하게 선택
    const randomClosingIndex = Math.floor(
      Math.random() * closingPhrases.length
    );
    const selectedClosing = closingPhrases[randomClosingIndex];

    setGreeting(selectedGreeting);
    setClosingPhrase(selectedClosing);

    // 10분마다 인사말과 마무리 문구 변경
    const intervalId = setInterval(() => {
      const newGreetingIndex = Math.floor(
        Math.random() * timeBasedGreetings.length
      );
      const newClosingIndex = Math.floor(Math.random() * closingPhrases.length);

      setGreeting(timeBasedGreetings[newGreetingIndex]);
      setClosingPhrase(closingPhrases[newClosingIndex]);
    }, 600000); // 10분

    // 컴포넌트 언마운트 시 인터벌 정리
    return () => clearInterval(intervalId);
  }, []);

  const promo = [
    {
      title: "<span style='color:#74aef0;'>PROMOTION</span>",
      description:
        "<span style='color:#0A84FF; font-weight:bold;'>ReciPICK X 신한카드</span>\nSOL Pick 카드 발급받고\n추가 혜택 챙겨가세요!",
      image: cardImage,
      bgColor: "#e8f4ff",
    },
  ];

  const recipe = [
    {
      title: "<span style='color:#e5c75e;'>RECIPE</span>",
      description:
        "냉장고 속 재료로\n만들 수 있는 SOL Pick만의\n<span style='color:#D6A500; font-weight:bold;'>똑똑한 레시피 추천</span>",
      image: recipeImage,
      bgColor: "#fffde8",
    },
  ];

  const benefit = [
    {
      title: "<span style='color:#f3b35c;'>FRESH ARRIVAL</span>",
      description:
        "<span style='color:#E68A00; font-weight:bold;'>달콤한 제철 딸기 막차!</span>\n이번 주 마지막 기회",
      image: strawberryImage,
      bgColor: "#fff6e8",
      additionalDate: "2025. 3. 17. (월) - 3. 23 (일)",
    },
    {
      title: "<span style='color:#ec7b7b;'>WEEKEND SALE</span>",
      description:
        "주말 특가! 72시간 한정\n인기 식재료 <span style='color:#D91E36; font-weight:bold;'>최대 30%</span> 할인",
      image: groceryImage,
      bgColor: "#ffe8e8",
      additionalDate: "2025. 3. 21. (금) - 3. 23. (일)",
    },
  ];

  const event = [
    {
      title: "<span style='color:#a0c15a;'>POINT</span>",
      description:
        "<span style='color:#6B8E23; font-weight:bold;'>귀여운 푸디캣</span>과 함께하는\n카드 뒤집기 게임에서\n포인트를 모아보세요!",
      image: giftboxImage,
      bgColor: "#F2F8E4",
    },
  ];

  const news = [
    {
      title: "<span style='color:#f29ca8;'>HEALTH NEWS</span>",
      description:
        "<span style='color:#E04A5A; font-weight:bold;'>요즘 HOT한 저속노화</span>\n어떻게 하는 건데?\n함께 알아봐요",
      image: healthyImage,
      bgColor: "#fff0f3",
    },
  ];

  // 추천 메뉴 데이터
  const recommendMenus = [
    {
      id: 1,
      image: class1,
      name: "홍대점",
    },
    {
      id: 2,
      image: class2,
      name: "성수점",
    },
    {
      id: 3,
      image: class3,
      name: "한남점",
    },
    {
      id: 4,
      image: class4,
      name: "강남점",
    },
    {
      id: 5,
      image: class5,
      name: "서촌점",
    },
    {
      id: 6,
      image: class6,
      name: "여의도점",
    },
  ];

  return (
    <>
      <MainHeader />

      <motion.p
        className="greeting-ment bold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {currentUser ? `${currentUser.name}님` : "고객님"}, {greeting} <br />
        {closingPhrase}
      </motion.p>

      {!isLoggedIn && (
        <motion.div
          className="login-banner-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="login-banner-ment">
            지금 바로 로그인하고
            <br />
            SOL Pick의 다양한 혜택을 경험해보세요!
          </p>
          <div className="login-banner-button-container">
            <ButtonS
              text="회원가입"
              variant="outlined"
              width="88px"
              height="24px"
            />
            <ButtonS
              text="로그인"
              width="88px"
              height="24px"
              onClick={() => navigate("/login")}
            />
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        onClick={() => navigate("/")} // 식단 추천 페이지로 이동
      >
        <img src={mealplanner} alt="mealplanner" className="meal-planner" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <EventSection
          sectionTitle="레시픽 회원만을 위한 특별 카드 혜택"
          events={promo}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <EventSection
          sectionTitle="SOL Pick이 제안하는 맞춤 레시피"
          events={recipe}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        <EventSection
          sectionTitle="지금이 딱! 제철 식재료 특가"
          events={benefit}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
      >
        <RecommendSection
          title="SOL Pick을 오프라인에서 만나보세요"
          items={recommendMenus}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
      >
        <EventSection
          sectionTitle="매일매일 포인트로 더 큰 혜택"
          events={event}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
      >
        <EventSection
          sectionTitle="건강한 라이프스타일을 위한 최신 트렌드"
          events={news}
        />
      </motion.div>

      <div style={{ height: "88px" }}></div>

      <Menu />
    </>
  );
};
export default Main;
