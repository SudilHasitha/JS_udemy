import React from 'react';
import logoImg from '../assets/quiz-logo.png';
import Quiz from './Quiz';

export default function Header() {
    return (
        <header>
            <img src={logoImg} alt="Logo" />
            <h1>React Quize</h1>
            <Quiz />
        </header>
    );
}