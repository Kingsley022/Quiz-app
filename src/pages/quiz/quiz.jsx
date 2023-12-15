import '../../styles/quiz.css';
import { useState, useEffect, useContext} from 'react';
import logo from '../../utils/images/logo5.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../App';
import QuizPreview from './common/quizPreview';
import QuizSummary from './common/quizSummary';
import QuizTimer from './common/quizTimer';

const Quiz = () => {
    const navigateTo = useNavigate();
    const{user} = useContext(AppContext);
    const[quizQuestions, setQuizQuestions] =  useState([]); // Stores api quiz
    const[userSelectedQuiz,setUserSelectedQuiz] = useState(); // local stored quiz
    const[currentIndex, setCurrentIndex] = useState(0);
    const[quizScore, setQuizScore] = useState(0); // Quiz score
    const[quizSummary, setQuizSummary] = useState(); // Quiz summary

    

    // Gets Quiz Questions
    const handleQuizCommence = async () => {
        try{
            const response = await axios.get(`https://quizzy-server-xpay.onrender.com/api/quizzes/${userSelectedQuiz?.id}`);
            const data = response?.data;

            if(data) {
                localStorage.removeItem("selectedQuiz");
                localStorage.setItem("quiz", JSON.stringify(data));
                window.location.reload();
                return;
            }
        }catch(err){
            alert(err.message);
        }
    };

    useEffect(() => {
        const storedQuetions = JSON.parse(localStorage.getItem("quiz"));
        if (storedQuetions) {
            setQuizQuestions(storedQuetions);
        }
    }, [setQuizQuestions]);

    //Terminates Quiz
    const handleQuizTerminate = () => {
        localStorage.removeItem("selectedQuiz");
        navigateTo('/dashboard');
    }
    

    const handlePrevious = () => {
        if(currentIndex === 0) return;
        setCurrentIndex(currentIndex - 1);
    }
    const handleNext = () => {
        if(currentIndex > quizQuestions.length -2) return;
        setCurrentIndex(currentIndex + 1);
    }

    // Checks for correct Quiz Score
    const handleQuestion = (value, answer)=>{
        if(value === answer){
            setQuizScore(prev => prev + 5);
        }
    }

    // Handles Quiz Submit
    const handleQuizSubmit = async () =>{
        const storedQuetions = JSON.parse(localStorage.getItem("quiz"));
        // if(!user || storedQuetions) return console.log('Did continoued');
        const quizRecord = {
            userId : user?._id,
            name : user?.firstname + " " + user?.lastname,
            quizScore,
            keyword : storedQuetions?.keyword
        };
        try{
            if(!quizRecord) return;
            await axios.post('https://quizzy-server-xpay.onrender.com/api/records', quizRecord);
            localStorage.setItem("quizSummary", JSON.stringify(quizRecord));
            localStorage.removeItem("quiz");
            localStorage.removeItem("timeRemaining");
            window.location.reload();
        }catch(err){
            console.log(err.message);
        }
    }
    useEffect(() => {
        const storedSummary = JSON.parse(localStorage.getItem("quizSummary"));
        if (storedSummary) {
            setQuizSummary(storedSummary);
            localStorage.removeItem("timeRemaining");
        }
    }, [setQuizSummary]);

    useEffect(() => {
        const selectedQuiz = JSON.parse(localStorage.getItem("selectedQuiz"));
        if (selectedQuiz) {
            setUserSelectedQuiz(selectedQuiz);
        }
    }, [setUserSelectedQuiz]);


    return (
        <>
        {quizSummary ? (
            <QuizSummary quiz={quizSummary}/>
        ) : userSelectedQuiz ? (
            <QuizPreview userSelectedQuiz={userSelectedQuiz} handleQuizCommence={handleQuizCommence} handleQuizTerminate={handleQuizTerminate}/>
           ) :(
            <div className="take-quiz-container">
                <div className="logo-n-time">
                    <img src={logo} alt='img'/>
                    <QuizTimer quiz={quizQuestions} handleQuizSubmit={handleQuizSubmit}/>
                </div>
                <div className="quizz-questions">
                    
                    {quizQuestions?.questions?.map((question, index) => (
                        <div className={`questionn-container ${currentIndex === index && 'active-question'}`} key={question?._id}>
                            <h3 className='questionn'>{index === 0 ? 1 : index+1}. {question?.question}</h3>

                            <div className="optionss">
                                {question?.options?.map((option, index) => (
                                    <div className="optionn" key={index}>
                                        <label htmlFor={`option-${index}-${option}`}>{String.fromCharCode(97 + index)}. {option}</label>
                                        <input 
                                            type='radio' 
                                            value={option} 
                                            name={question?.answer} 
                                            id={`option-${index}-${option}`} 
                                            onChange={(e)=>handleQuestion(e.target.value, question?.answer)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='button-area'>
                        <div className="buttons">
                            {currentIndex !== 0 && <button className="prev" onClick={handlePrevious}>Previous</button>}
                            <p>{currentIndex === 0 ? 1 : currentIndex + 1} / {quizQuestions?.questions?.length}</p>
                            {currentIndex !== quizQuestions?.questions?.length-1 && <button className="next" onClick={handleNext}>Next</button>}
                        </div>
                        {currentIndex === quizQuestions?.questions?.length-1 && <button className='submit' onClick={handleQuizSubmit}>Submit</button>}
                </div>
            </div>
        )}
        </>
    );
}
 
export default Quiz;