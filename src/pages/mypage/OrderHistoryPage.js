import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderHistoryPage.css";
import Header from "../../components/common/header/Header";
import backArrow from "../../assets/backArrow.svg";
import Menu from "../../components/common/menu/Menu";
import OrderHistoryList from "../../components/mypage/order/OrderHistoryList";
import { authApi } from "../../api/AuthApi";
import { orderApi } from "../../api/OrderApi";

const OrderHistoryPage = () => {
    const navigate = useNavigate();
    const [orderHistory, setOrderHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 사용자 인증 확인
        const currentUser = authApi.getCurrentUser();
        if (!currentUser) {
            navigate("/login");
            return;
        }

        // 주문 내역 가져오기
        fetchOrderHistory(currentUser.id);
    }, [navigate]);

    const fetchOrderHistory = async () => {
        setLoading(true);
        try {
            // API 클라이언트를 통해 주문 내역 가져오기
            const data = await orderApi.getOrderHistory();
            setOrderHistory(data);
        } catch (err) {
            console.error("주문 내역 조회 오류:", err);
            setError("주문 내역을 불러오는데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header
                leftIcon={backArrow}
                title="결제 내역"
                onLeftClick={() => navigate("/mypage")}
            />

            <div className="order-history-container">
                {loading ? (
                    <div className="loading-text">로딩 중...</div>
                ) : error ? (
                    <div className="order-error-message">
                        <p>{error}</p>
                        <p>잠시 후 다시 시도해주세요.</p>
                    </div>
                ) : orderHistory.length === 0 ? (
                    <div className="no-order-message">
                        <p>결제 내역이 없습니다.</p>
                    </div>
                ) : (
                    <OrderHistoryList orderHistory={orderHistory} />
                )}
            </div>

            <Menu />
        </>
    );
};

export default OrderHistoryPage;