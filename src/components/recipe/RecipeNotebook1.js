import React, { useState } from 'react';
import './RecipeNotebook.css';
import notebookBackground from '../../assets/recipe/notebook-background.png';
import postItYellow from '../../assets/recipe/postit-yellow.png';
import yellowPostIt from '../../assets/recipe/yellow-postit.png';
import SteamIcon from '../../assets/recipe/steam-icon.js';
import forkImage from '../../assets/recipe/fork.png';
import plateImage from '../../assets/recipe/plate.png';
import eyesImage from '../../assets/recipe/eyes.png';
import TalkingMouth from '../../assets/recipe/talking-mouth.tsx';

// 레시피 노트북 컴포넌트
const RecipeNotebook = ({ recipe }) => {
    const [completedSteps, setCompletedSteps] = useState({});

    if (!recipe) return null;

    // 체크박스 클릭 핸들러
    const toggleStep = (stepId) => {
        setCompletedSteps(prev => ({
            ...prev,
            [stepId]: !prev[stepId]
        }));
    };

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
                        <img
                            src={recipe.mainImage}
                            alt={recipe.name}
                            className="recipe-image"
                        />
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
                                <img
                                    src={plateImage}
                                    alt="Plate"
                                    className="plate-image"
                                    onLoad={(e) => {
                                        console.log('Image details:', {
                                            naturalWidth: e.target.naturalWidth,
                                            naturalHeight: e.target.naturalHeight,
                                            clientWidth: e.target.clientWidth,
                                            clientHeight: e.target.clientHeight,
                                            computedStyle: window.getComputedStyle(e.target)
                                        });
                                    }}
                                />
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
                    {/* 조리 단계 */}
                    <div className="recipe-section">
                        <h3 className="recipe-method-title">💡 요리 방법</h3>
                        <br></br>
                        <div className="steps-list">
                            {recipe.steps.map((step) => (
                                <div key={step.id} className="step-item">
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