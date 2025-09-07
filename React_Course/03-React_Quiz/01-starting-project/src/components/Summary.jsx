

export default function Summary({ score, totalQuestions }) {
    return (
        <div className="summary">
            <h2>Quiz Summary</h2>
            <p>Your Score: {score} out of {totalQuestions}</p>
            <p>Thank you for participating!</p>
        </div>
    );
}