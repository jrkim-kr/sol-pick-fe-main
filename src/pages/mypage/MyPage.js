import React from "react";
// import { useNavigate } from "react-router-dom";
import MainHeader from "../../components/common/header/MainHeader";
import Menu from "../../components/common/menu/Menu";
// import noti from "../../assets/noti.svg";
// import notiActive from "../../assets/notiActive.svg";
// import shop from "../../assets/shop.svg";
// import shopActive from "../../assets/shopActive.svg";
import MyPageContent from "../../components/mypage/MyPageContent";

const MyPage = () => {
    // const navigate = useNavigate();

    // const navigateToShop = () => { };

    // const navigateToNoti = () => {
    //     navigate("/noti");
    // };

    return (
        <>
            <MainHeader
                // leftIcon={shop}
                // leftIconActive={shopActive}
                // rightIcon={noti}
                // rightIconActive={notiActive}
                // onLeftClick={navigateToShop}
                // onRightClick={navigateToNoti}
            />

            <MyPageContent />

            <Menu />
        </>
    );
};

export default MyPage;