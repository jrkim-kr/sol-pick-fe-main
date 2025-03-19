import { useState } from "react";
import ButtonS from "../components/common/button/ButtonS";
import ButtonL from "../components/common/button/ButtonL";
import Input from "../components/common/input/Input";
import SelectL from "../components/common/select/SelectL";
import SelectS from "../components/common/select/SelectS";
import Modal from "../components/common/modal/Modal";
import Popup from "../components/common/popup/Popup";
import Header from "../components/common/header/Header";
import backArrow from "../assets/backArrow.svg";
import close from "../assets/close.svg";
import MainHeader from "../components/common/header/MainHeader";
// import noti from "../assets/noti.svg";
// import notiActive from "../assets/notiActive.svg";
// import shop from "../assets/shop.svg";
// import shopActive from "../assets/shopActive.svg";
import Menu from "../components/common/menu/Menu";
import ToastMessage from "../components/common/toastmessage/ToastMessage";
import Chip from "../components/common/chip/Chip";
import SelectSimple from "../components/common/select/SelectSimple";

const Components = () => {
  // 셀렉트 옵션
  const selectOptions = [
    { value: "", label: "대분류" },
    { value: "option1", label: "옵션 1" },
    { value: "option2", label: "옵션 2" },
    { value: "option3", label: "옵션 3" },
  ];

  // 모달 표시 여부를 관리하는 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 팝업 표시 여부를 관리하는 상태
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 팝업 열기
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  // 팝업 닫기
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // 팝업 확인 버튼 클릭
  const handleConfirm = () => {
    // 확인 버튼 클릭 시 수행할 작업
    // 작업 후 팝업 닫기
    closePopup();
  };

  // 토스트 메시지 표시 여부를 관리하는 상태
  const [showToast, setShowToast] = useState(false);

  // 토스트 메시지 표시
  const handleToastMessage = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // 칩 메뉴
  const chipItems = ["전체", "유통기한", "재구매"];

  return (
    <>
      <ButtonS text="ButtonS" />
      <ButtonS text="outlined" variant="outlined" />
      <ButtonS text="disabled" disabled />
      <ButtonS text="사이즈 커스텀" width="200px" height="80px" />
      <ButtonS text="텍스트 볼드" className="bold" />
      <br />

      <ButtonL text="ButtonL" />
      <ButtonL text="outlined" variant="outlined" />
      <ButtonL text="disabled" disabled />
      <br />

      <Input placeholder="플레이스홀더" />
      <br />

      <SelectL options={selectOptions} />
      <br />

      <SelectS options={selectOptions} />
      <br />

      <SelectSimple options={selectOptions} />
      <br />

      <button onClick={openModal}>모달 열기</button>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="모달"
        // height="200px"
      >
        <div>모달 내용</div>
      </Modal>

      <button onClick={openPopup}>팝업 열기</button>
      <Popup
        isOpen={isPopupOpen}
        onClose={closePopup}
        onConfirm={handleConfirm}
        title="팝업"
        description="팝업 내용"
        outlinedButtonText="취소"
        filledButtonText="확인"
      />

      <button onClick={handleToastMessage}>토스트 메시지</button>
      {showToast && (
        <ToastMessage message="토스트 메시지입니다" duration={3000} />
      )}
      <br />

      <Header
        leftIcon={backArrow}
        title="헤더"
        rightIcon={close}
        // onLeftClick={}
        // onRightClick={}
      />
      <br />

      <MainHeader
        // leftIcon={shop}
        // leftIconActive={shopActive}
        // rightIcon={noti}
        // rightIconActive={notiActive}
        // onLeftClick={}
        // onRightClick={}
      />
      <br />

      <div style={{ paddingBottom: "40px" }}>
        <Chip items={chipItems} initialSelected={0} />
        <br />
      </div>

      <Menu />
      <br />
    </>
  );
};

export default Components;
