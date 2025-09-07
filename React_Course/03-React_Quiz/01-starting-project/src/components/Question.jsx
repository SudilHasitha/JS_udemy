import QuestionTimer from './OuestionTimer';
import Answers from './Answers';
import { useState } from 'react';

export default function Question({
    Questions,
    index,
    onSelect,
    quizCompleted,
    onSkip
}) {
    const [answered, setAnswered] = useState({
        selectedAnswer: '',
        isCorrect: null
    });

    let timer = 10000; // 10 seconds in milliseconds

    // Handle skipping the question
    if (answered.selectedAnswer) {
        timer = 1000
    }
    if(answered.isCorrect) {
        timer = 2000
    }

    // If the question is completed, skip the timer
    if (quizCompleted) {
        timer = 0;
    }

    const handleAnswer = (answer) => {
        if (quizCompleted || answered.selectedAnswer) return;

        setTimeout(() => {
            setAnswered({
                selectedAnswer: answer,
                isCorrect: answer === Questions[index].answers[0]
            });
        }, 1000);

        setTimeout(() => {
            onSelect(answer);
        }, 2000);
    };

    console.log('Question Component Rendered', Questions[index]?.answers);
    const answeredState = answered.selectedAnswer === ''
                        ? null
                        : answered.isCorrect
                        ? 'correct'
                        : 'wrong'

    return (
        <>
            <QuestionTimer 
                timeLeft={timer} 
                onTimeUp={answered.selectedAnswer === '' ? onSkip : null} 
                key={timer} 
                mode={answeredState} 
            />
            <h2>{Questions[index]?.text}</h2>
            <Answers
                answers={Questions[index]?.answers}
                selectedAnswer={answered.selectedAnswer}
                answerState={answeredState}
                onSelect={handleAnswer}
                quizCompleted={quizCompleted}
            />
        </>
    );
}