import { useState, useEffect } from 'react';

export default function QuestionTimer({ timeLeft, onTimeUp, mode }) {
    const [timer, setTimer] = useState(timeLeft);
    // why useEffect here?
    // You want this side effect to run whenever timeLeft or onTimeUp changes, not on every render.
    useEffect(() => {
        console.log('Setting Timeout');
        const timeout = setTimeout(onTimeUp,timeLeft)
        //clear the timeout when the component unmounts or when timeLeft changes
        // This is important to avoid memory leaks or unexpected behavior
        return () => {
            console.log('Clearing Timeout');
            clearTimeout(timeout);
        }
    }, [timeLeft, onTimeUp]);

    // why useEffect here?
    // You want this to run only once when the component mounts, so you use an empty dependency array 
    useEffect(() => {
        console.log('Setting Interval');
        const interval = setInterval(() => {
            setTimer((prev) => prev -100);
        }, 100);
        // clear the interval when the component unmounts
        // avoid double execution of the interval
        return () => {
            console.log('Clearing Interval');
            clearInterval(interval);
        }
    },[]);

    return <progress id='question-timer' max={timeLeft} value={timer} className={mode}/>;
}
