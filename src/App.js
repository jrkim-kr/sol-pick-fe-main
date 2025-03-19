import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastProvider } from "./context/ToastContext";
import ToastMessage from "./components/common/toastmessage/ToastMessage";

import Layout from "./layout/Layout"; // 전체 레이아웃
import Components from "./pages/Components"; // 공통 컴포넌트

import Onboarding from "./pages/onboarding/Onboarding"; // 온보딩 페이지
import Main from "./pages/main/Main"; // 메인 페이지
import Noti from "./pages/noti/Noti"; // 알림 페이지
import Refrigerator from "./pages/refrigerator/main/Refrigerator"; // 냉장고 메인 페이지
import IngredientAddForm from "./pages/refrigerator/add/IngredientAddForm"; // 식재료 등록 페이지
import IngredientEditForm from "./pages/refrigerator/add/IngredientEditForm"; // 식재료 수정 페이지
import IngredientDetailList from "./pages/refrigerator/list/IngredientDetailList"; // 식재료 상세 목록 페이지

import RecipeSelectionPage from "./pages/game/RecipeSelectionPage"; // 레시피 선택 페이지
import RecipeRecommendation from "./pages/refrigerator/recommendation/RecipeRecommendation";
import RecipeLoading from "./pages/refrigerator/recommendation/RecipeLoading";
import RecipeDetail from "./pages/refrigerator/recommendation/RecipeDetail";

import CardIssuePage from "./pages/card/CardIssuePage"; // 카드 발급 안내 페이지
import CardDetailPage from "./pages/card/CardDetailPage"; // 카드 상세 페이지
import CardDesignSelectionPage from "./pages/card/CardDesignSelectionPage"; // 카드 디자인 선택 페이지
import CardCustomBackgroundPage from "./pages/card/CardCustomBackgroundPage"; // 카드 배경 선택 페이지
import CardCustomStickerPage from "./pages/card/CardCustomStickerPage"; // 카드 스티커 선택 페이지
import CardIdentityVerificationPage from "./pages/card/CardIdentityVerificationPage"; // 본인 인증 페이지
import CardTermsPage from "./pages/card/CardTermsPage"; // 약관 동의 페이지
import CardCreditRatingPage from "./pages/card/CardCreditRatingPage"; // 신용 정보 확인 페이지
import CardApplyInfoPage from "./pages/card/CardApplyInfoPage"; // 카드 신청 정보 입력 페이지
import CardCompletionPage from "./pages/card/CardCompletionPage"; // 카드 발급 완료 페이지 추가

import GameEntryHandler from "./pages/game/GameEntryHandler"; // 게임 진입 처리 컴포넌트
import GameInitPage from "./pages/game/RecipeSelectionPage"; // 레시피 선택 페이지
import CatGreetingPage from "./pages/game/CatGreetingPage"; // 고양이 인사 페이지
import GameIntroPage from "./pages/game/GameIntroPage"; // 게임 안내 페이지
import GameMainPage from "./pages/game/GameMainPage"; // 게임 메인 페이지
import GameInstructionsPage from "./pages/game/GameInstructionsPage"; // 게임 안내 페이지
import DailyGameMainPage from "./pages/game/DailyGameMainPage"; // 카드 뒤집기 게임 페이지
import GameStoragePage from "./pages/game/GameStoragePage"; // 보관함 페이지

import LoginPage from "./pages/auth/LoginPage"; //로그인페이지
import MyPage from "./pages/mypage/MyPage"; //마이페이지
import OrderHistoryPage from "./pages/mypage/OrderHistoryPage";
import PointPage from "./pages/point/PointPage";
import RecipePage from "./pages/recipe/RecipePage"; //레시피북
import FavoritesPage from "./pages/mypage/FavoritesPage"; //레시피

function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route element={<Layout />}>
          {/* 공통 컴포넌트 */}
          <Route path="/components" element={<Components />} />

          {/* 온보딩 */}
          <Route path="/" element={<Onboarding />} />

          {/* 메인 */}
          <Route path="/main" element={<Main />} />

          {/* 로그인 */}
          <Route path="/login" element={<LoginPage />} />

          {/* 마이페이지 */}
          <Route path="/mypage" element={<MyPage />} />

          {/* 마이페이지 / 찜한 레시피 / 레시피북 */}
          <Route path="/mypage/recipe/:id" element={<RecipePage />} />

          {/* 마이페이지/ 찜한 레시피 */}
          <Route path="/mypage/favorites" element={<FavoritesPage />} />

          {/* 마이페이지/결제내역 */}
          <Route path="/mypage/orders" element={<OrderHistoryPage />} />

          {/* 카드/포인트 */}
          <Route path="/card/points" element={<PointPage />} />

          {/* 알림 */}
          <Route path="/noti" element={<Noti />} />

          {/* 냉장고 */}
          <Route path="/refrigerator/add" element={<IngredientAddForm />} />
          <Route
            path="/refrigerator/update/:id"
            element={<IngredientEditForm />}
          />
          <Route path="/refrigerator/list" element={<IngredientDetailList />} />
          <Route path="/refrigerator" element={<Refrigerator />} />

          {/* 레시피 */}
          <Route path="/recipe-loading" element={<RecipeLoading />} />
          <Route
            path="/recipe-recommendation"
            element={<RecipeRecommendation />}
          />
          <Route path="/recipe-detail/:id" element={<RecipeDetail />} />

          {/* 카드 신청 관련 라우트 */}
          <Route path="/card" element={<CardIssuePage />} />
          <Route path="/card/detail" element={<CardDetailPage />} />
          <Route
            path="/card/apply/design"
            element={<CardDesignSelectionPage />}
          />
          <Route
            path="/card/apply/custom/background"
            element={<CardCustomBackgroundPage />}
          />
          <Route
            path="/card/apply/custom/sticker"
            element={<CardCustomStickerPage />}
          />
          <Route
            path="/card/apply/identity-verification"
            element={<CardIdentityVerificationPage />}
          />
          <Route path="/card/apply/terms" element={<CardTermsPage />} />
          <Route
            path="/card/apply/credit-rating"
            element={<CardCreditRatingPage />}
          />
          <Route
            path="/card/apply/apply-info"
            element={<CardApplyInfoPage />}
          />
          <Route
            path="/card/apply/completion"
            element={<CardCompletionPage />}
          />

          {/* 미니 게임 관련 라우트 */}
          <Route path="/game" element={<GameEntryHandler />} />
          <Route path="/game/init" element={<GameInitPage />} />
          <Route path="/game/greeting" element={<CatGreetingPage />} />
          <Route path="/game/intro" element={<GameIntroPage />} />
          <Route path="/game/home" element={<GameMainPage />} />
          <Route path="/game/instructions" element={<GameInstructionsPage />} />
          <Route path="/game/daily-game" element={<DailyGameMainPage />} />
          <Route path="/game/storage" element={<GameStoragePage />} />
        </Route>
      </Routes>
      <ToastMessage />
    </ToastProvider>
  );
}

export default App;
