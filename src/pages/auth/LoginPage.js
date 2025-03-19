import React from 'react';
import LoginForm from '../../components/login/LoginForm';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import Header from '../../components/common/header/Header';
import backArrow from '../../assets/backArrow.svg';
import Menu from '../../components/common/menu/Menu';

function LoginPage() {
    const navigate = useNavigate();

    // 로그인 성공 시 호출될 콜백 함수
    const handleLoginSuccess = () => {
        // 로그인 성공 후 메인 페이지로 이동
        navigate('/main');
    };

    // 뒤로가기 핸들러
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="login-page-container">
            <Header
                leftIcon={backArrow}
                title="로그인"
                onLeftClick={handleGoBack}
            />

            <div className="login-page-content">
                <div className="login-page-welcome">
                    <h2 className="welcome-title bold">함께하는 순간,</h2>
                    <h2 className="welcome-title bold">SOL Pick이 특별합니다.</h2>
                    <p className="welcome-subtitle">로그인하고 다양한 혜택을 누려보세요.</p>
                </div>

                <div className="login-form-container">
                    <LoginForm onLoginSuccess={handleLoginSuccess} />
                </div>
            </div>

            <Menu />
        </div>
    );
}

export default LoginPage;