import { useState, useCallback, useEffect } from 'react';
import Questions from '../questions';
import quizCompletedImg from '../assets/quiz-complete.png';
import Question from './Question';
import Summary from './Summary';

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestion = userAnswers.length;
    const quizCompleted = activeQuestion === Questions.length;

    useEffect(() => {
        console.log('Active Question:', activeQuestion);
    }, [activeQuestion]);

    const handleAnswer = useCallback(
        function handleAnswer(answer) {
            setUserAnswers((prevAnswers) => [...prevAnswers, answer]);
        }, []
    );

    const handleSkipAnswer = useCallback(() => handleAnswer(null), [handleAnswer]);

    return (
        <>
            {quizCompleted
                ? (
                    <Summary
                        score={userAnswers.filter((ans, index) => ans === Questions[index].answers[0]).length}
                        totalQuestions={Questions.length}
                    />
                )
                : (
                    <div id='quiz'>
                        <Question
                            Questions={Questions}
                            index={activeQuestion}
                            onSelect={handleAnswer}
                            quizCompleted={quizCompleted}
                            onSkip={handleSkipAnswer}
                            key={activeQuestion}
                        />
                    </div>
                )
            }
        </>
    );
}

/**
 * useCallback and useEffect serve different purposes in React:

useCallback
Purpose: Memoizes a function so it’s not recreated on every render unless its dependencies change.
Usage:

const memoizedFn = useCallback(() => { ... }, [deps]);
When to use:
When passing functions as props to child components.
To prevent unnecessary re-renders.

useEffect
Purpose: Runs side effects (code that interacts with the outside world, e.g., data fetching, timers) after render.
Usage:

useEffect(() => { ... }, [deps]);

When to use:
To perform actions after the component renders or when dependencies change.
Summary:

useCallback memoizes functions.
useEffect runs side-effect code after rendering.
They solve different problems in React.
 * 
 */