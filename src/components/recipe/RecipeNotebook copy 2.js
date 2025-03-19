import React, { useState, useEffect, useRef } from 'react';
import './RecipeNotebook.css';
import notebookBackground from '../../assets/recipe/notebook-background.png';
import postItYellow from '../../assets/recipe/postit-yellow.png';
import yellowPostIt from '../../assets/recipe/yellow-postit.png';
import SteamIcon from '../../assets/recipe/steam-icon.js';
import forkImage from '../../assets/recipe/fork.png';
import plateImage from '../../assets/recipe/plate.png';
import eyesImage from '../../assets/recipe/eyes.png';
import TalkingMouth from '../../assets/recipe/talking-mouth.tsx';
import playButton from '../../assets/recipe/play-button.svg'; // 재생 버튼 아이콘 필요
import pauseButton from '../../assets/recipe/pause-button.svg'; // 일시 정지 버튼 아이콘 필요
import stopButton from '../../assets/recipe/stop-button.svg'; // 중지 버튼 아이콘 필요

// 레시피 노트북 컴포넌트
const RecipeNotebook = ({ recipe }) => {
    const [completedSteps, setCompletedSteps] = useState({});
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const timerRef = useRef(null);
    const speechSynthesisRef = useRef(null);

    if (!recipe) return null;

    // 체크박스 클릭 핸들러
    const toggleStep = (stepId) => {
        setCompletedSteps(prev => ({
            ...prev,
            [stepId]: !prev[stepId]
        }));
    };

    // TTS 시작 핸들러
    const startTTS = () => {
        if (recipe.steps.length === 0) return;

        setIsPlaying(true);
        setCurrentStep(0);
        playStep(0);
    };

    // TTS 일시 정지 핸들러
    const pauseTTS = () => {
        if (speechSynthesis.speaking) {
            speechSynthesis.pause();
        }
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        setIsPlaying(false);
    };

    // TTS 재개 핸들러
    const resumeTTS = () => {
        if (speechSynthesis.paused) {
            speechSynthesis.resume();
        }
        setIsPlaying(true);

        // 타이머가 실행 중이었다면 재개
        if (timeLeft > 0) {
            startTimer(timeLeft);
        }
    };

    // TTS 중지 핸들러
    const stopTTS = () => {
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
        }
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        setIsPlaying(false);
        setCurrentStep(0);
        setTimeLeft(0);
    };

    // 스텝을 TTS로 읽기
    const playStep = (index) => {
        if (index >= recipe.steps.length) {
            setIsPlaying(false);
            return;
        }

        const step = recipe.steps[index];
        setCurrentStep(index);

        // 현재 단계 체크하기
        setCompletedSteps(prev => ({
            ...prev,
            [step.id]: true
        }));

        // 스텝 텍스트를 TTS로 읽기
        const utterance = new SpeechSynthesisUtterance(step.description);
        utterance.lang = 'ko-KR'; // 한국어 설정

        // 읽기가 끝난 후 처리
        utterance.onend = () => {
            // 스텝에 지정된 시간이 있으면 타이머 시작
            if (step.time && step.time > 0) {
                setTimeLeft(step.time);
                startTimer(step.time);
            } else {
                // 지정된 시간이 없으면 바로 다음 스텝으로
                setTimeout(() => playStep(index + 1), 1000);
            }
        };

        speechSynthesisRef.current = utterance;
        speechSynthesis.speak(utterance);
    };

    // 타이머 시작 함수
    const startTimer = (seconds) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        if (seconds <= 0) {
            // 타이머 종료 시 다음 스텝으로
            playStep(currentStep + 1);
            return;
        }

        setTimeLeft(seconds);

        timerRef.current = setTimeout(() => {
            startTimer(seconds - 1);
        }, 1000);
    };

    // 타이머 포맷팅 함수
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    // 컴포넌트 unmount 시 정리
    useEffect(() => {
        return () => {
            if (speechSynthesis.speaking) {
                speechSynthesis.cancel();
            }
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    return (
        <div className="notebook-outer-container">
            {/* 포스트잇 영역 - 노트북 바깥에 절대 위치로 배치 */}
            <div className="postit-container">
                {/* 왼쪽 포스트잇 - 이미지 포함 */}
                <div className="postit-wrapper">
                    <img src={postItYellow} alt="Post-it" className="postit-background" />
                    <div className="postit-pin"></div>
                    <div className="postit-content">
                        <div className="steam-container">
                            <div className="steam-container">
                                <SteamIcon size={75} color="#000" />
                            </div>
                        </div>
                        <div className="recipe-image-container">
                            <img
                                src={recipe.mainImage}
                                alt={recipe.name}
                                className="recipe-image"
                            />
                        </div>
                    </div>
                </div>

                {/* 오른쪽 포스트잇 - 접시와 포크, 눈과 입 포함 */}
                <div className="postit-wrapper">
                    <img src={yellowPostIt} alt="Post-it" className="postit-background" />
                    <div className="postit-pin"></div>
                    <div className="postit-content">
                        <div className="plate-container">
                            <img src={forkImage} alt="Left Fork" className="fork-left" />
                            <div className="plate-wrapper">
                                <img src={plateImage} alt="Plate" className="plate-image" />
                                <div className="plate-face">
                                    <img src={eyesImage} alt="Eyes" className="eyes-image" />
                                    <div className="mouth-container">
                                        <TalkingMouth size={40} />
                                    </div>
                                </div>
                            </div>
                            <img src={forkImage} alt="Right Fork" className="fork-right" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 노트북 컨테이너 - 포스트잇 아래에 배치 */}
            <div className="notebook-container">
                <img
                    src={notebookBackground}
                    alt="Notebook"
                    className="notebook-background"
                />

                {/* 노트북 콘텐츠 영역 */}
                <div className="notebook-content">
                    {/* TTS 컨트롤 */}
                    <div className="tts-controls">
                        {!isPlaying ? (
                            <button onClick={startTTS} className="tts-button play-button">
                                <img src={playButton} alt="Start" className="tts-icon" /> 요리 시작
                            </button>
                        ) : (
                            <>
                                <button onClick={pauseTTS} className="tts-button pause-button">
                                    <img src={pauseButton} alt="Pause" className="tts-icon" /> 일시정지
                                </button>
                                <button onClick={stopTTS} className="tts-button stop-button">
                                    <img src={stopButton} alt="Stop" className="tts-icon" /> 중지
                                </button>
                            </>
                        )}
                        {timeLeft > 0 && (
                            <div className="tts-timer">
                                <span className="timer-label">남은 시간: </span>
                                <span className="timer-value">{formatTime(timeLeft)}</span>
                            </div>
                        )}
                    </div>

                    {/* 조리 단계 */}
                    <div className="recipe-section">
                        <h3 className="recipe-method-title">💡 요리 방법</h3>
                        <br></br>
                        <div className="steps-list">
                            {recipe.steps.map((step, index) => (
                                <div
                                    key={step.id}
                                    className={`step-item ${index === currentStep && isPlaying ? 'current-step' : ''}`}
                                >
                                    <div
                                        className={`step-checkbox ${completedSteps[step.id] ? 'checked' : ''}`}
                                        onClick={() => toggleStep(step.id)}
                                    >
                                        {completedSteps[step.id] && <span className="checkmark">✓</span>}
                                    </div>
                                    <div className="step-content">
                                        <p className={`step-description ${completedSteps[step.id] ? 'completed' : ''}`}>
                                            {step.description}
                                        </p>
                                        {step.time > 0 && (
                                            <span className="step-time">{step.time}초</span>
                                        )}
                                        {step.image && (
                                            <img src={step.image} alt={`Step ${step.id}`} className="step-image" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeNotebook;