import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../api/AuthApi';
import './LoginForm.css';
import ButtonL from '../../components/common/button/ButtonL';

function LoginForm({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // 간단한 클라이언트 측 유효성 검사
        if (!email || !password) {
            setError('이메일과 비밀번호를 모두 입력해주세요.');
            return;
        }

        setIsLoading(true);
        setError(''); // 이전 에러 메시지 초기화

        try {
            const response = await authApi.login(email, password);
            console.log('로그인 성공:', response);
            console.log('저장된 사용자 정보:', response.data);

            // 로그인 성공 콜백이 있으면 실행 (드로어 닫기 등)
            if (onLoginSuccess) {
                onLoginSuccess();
            } else {
                // onLoginSuccess가 없을 경우 기본 동작으로 메인 페이지로 이동
                navigate('/main');
            }
        } catch (err) {
            console.error('로그인 에러:', err);

            // 서버 응답에 따른 더 구체적인 에러 메시지 처리
            if (err.response) {
                if (err.response.status === 401) {
                    setError('이메일 또는 비밀번호가 올바르지 않습니다.');
                } else if (err.response.status === 403) {
                    setError('접근이 거부되었습니다. 관리자에게 문의하세요.');
                } else if (err.response.status >= 500) {
                    setError('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
                } else {
                    setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
                }
            } else {
                // 네트워크 오류 등의 경우
                setError('서버에 연결할 수 없습니다. 인터넷 연결을 확인해주세요.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
                <label htmlFor="email">이메일</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일 주소를 입력해주세요"
                    disabled={isLoading}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">비밀번호</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호를 입력해주세요"
                    disabled={isLoading}
                    required
                />
            </div>

            {error && <p className="error-message">{error}</p>}

            <ButtonL
                text={isLoading ? "로그인 중..." : "로그인"}
                type="submit"
                disabled={isLoading}
                width="100%"
            />

            <div className="login-options">
                <span className="login-option-link" /*onClick={handleForgotPassword}*/>비밀번호 찾기</span>
                <span className="separator">|</span>
                <span className="login-option-link" /*onClick={handleSignup}*/>회원가입</span>
            </div>
        </form>
    );
}

export default LoginForm;