import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function Answers({
    answers,
    selectedAnswer,
    answerState,
    onSelect,
    quizCompleted
}) {
    return (
        <ul id="answers">
            {answers?.map((answer) => {
                let answerClass = '';
                if (answerState === 'correct' && selectedAnswer === answer) {
                    answerClass = 'correct';
                } else if (answerState === 'wrong' && selectedAnswer === answer) {
                    answerClass = 'wrong';
                } else if (selectedAnswer === answer) {
                    answerClass = 'selected';
                }

                return (
                    <li key={answer} className='answer'>
                        <button
                            onClick={() => onSelect(answer)}
                            className={answerClass}
                            disabled={quizCompleted || !!selectedAnswer}
                        >
                            {answer}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}