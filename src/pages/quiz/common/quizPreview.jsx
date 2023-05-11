const QuizPreview = ({userSelectedQuiz, handleQuizCommence, handleQuizTerminate}) => {
    return (
        <div className="questionpreview">
                <h1>{userSelectedQuiz?.keyword}</h1>
                <p>You gain 5 Quizzy Points for each correct answer</p>
                <p>Total Questions : {userSelectedQuiz?.no_questions}</p>
                <p>Quiz Category : {userSelectedQuiz?.category}</p>
                <p>Time Limit : {userSelectedQuiz?.no_questions > 8 ? 10 : 5} Minutes</p>
                <div className="previewBtns">
                    <button onClick={handleQuizCommence}>Continue</button>
                    <button onClick={handleQuizTerminate} className='tBtn'>Cancel</button>
                </div>
        </div>
    );
}
 
export default QuizPreview;