import React from "react";
import "./PointSummary.css";
// import { useNavigate } from "react-router-dom";

const PointSummary = ({ pointSummary }) => {
    // const navigate = useNavigate();

    if (!pointSummary) {
        return <div className="points-loading">포인트 정보를 불러오는 중...</div>;
    }

    // 포인트 포맷팅 (3자리마다 콤마 추가)
    const formatPoints = (points) => {
        return points.toLocaleString();
    };

    // 게임 페이지로 이동
    // const navigateToGame = () => {
    //     navigate("/game");
    // };

    return (
        <div className="points-summary-container">

            {/* 포인트 정보 */}
            <div className="points-summary">
                {/* <div className="points-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#38bdf8" />
                        <path d="M12 17L12.53 15.34C13.11 13.55 14.76 12.62 16.07 11.63C16.87 11.02 16.59 9.82 15.64 9.64C14.06 9.34 12.48 9.61 11 10.42L10.56 10.65L10.1 9.93C9.34 8.71 8.12 7.86 6.7 7.6C5.66 7.4 4.86 8.55 5.32 9.5C6.94 12.54 8.18 14.44 8.95 15.56C9.18 15.89 9.37 16.16 9.52 16.38C9.85 16.83 10.46 17 11 17H12Z" fill="#38bdf8" />
                    </svg>
                </div> */}
                <div className="points-message">
                    저번주보다 3,700원 더 모았어요!
                </div>
                <div className="points-amount">
                    총 <span className="highlight">{formatPoints(pointSummary.currentPoints)}</span>포인트 있어요!
                </div>
            </div>
        </div>
    );
};

export default PointSummary;