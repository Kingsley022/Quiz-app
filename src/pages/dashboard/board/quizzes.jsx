import { useContext, useEffect } from "react";
import sports from '../../../utils/images/sports.png';
import science from'../../../utils/images/science.png';
import math from '../../../utils/images/math.png';
import culture from  '../../../utils/images/entertainment.png';
import history from '../../../utils/images/history.png';
import QuizTime from "./quizTime";
import QuizStatus from "./quizStatus";
import { AppContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


const Quizzes = ({quizzes, setQuizzes}) => {

  const{user} = useContext(AppContext);
  const navigateTo = useNavigate();

  // category checker
const categoryChecker = (quiz) => {
  if (quiz.category === "Science") {
    return <img src={science} alt="Science" />;
  } else if (quiz.category === "History") {
    return <img src={history} alt="History" />;
  } else if (quiz.category === "Math") {
    return <img src={math} alt="Math" />;
  } else if (quiz.category === "Entertainment") {
    return <img src={culture} alt="Entertainment" />;
  } else if (quiz.category === "Sports") {
    return <img src={sports} alt="Sports" />;
  }
};

const handleGetQuiz = (quiz)=> {
  if(!user) {
    alert('Sign In') 
    return;
  }
  
  if (quiz?.creatorId === user?._id) {
    Swal.fire({
      icon: 'error',
      title: 'Unauthorized',
      text: 'You are not authorized to perform this action',
    });
    return;
  }
  
  const selectedQuiz = {
    id: quiz?._id,
    no_questions: quiz?.questions.length,
    keyword: quiz?.keyword,
    category: quiz?.category
  };
  if(!selectedQuiz) return;
  localStorage.setItem("selectedQuiz", JSON.stringify(selectedQuiz));
  navigateTo('/quiz');
}

function isQuizActive(startTime, endTime) {
  const now = Date.now();
  const quizStart = Date.parse(startTime);
  const quizEnd = Date.parse(endTime);
  return now >= quizStart && now <= quizEnd;
}

    return (
        <div className="quiz-data">
            {quizzes?.map( (quiz, index)=> (
                <div className="quiz" key={quiz?._id}>
                    {categoryChecker(quiz, index)}
                    <div className="keyword-creator">
                        <p>{quiz?.keyword}</p>
                        <span>by {quiz?.creatorName}</span>
                    </div>
                    <QuizTime startTime={quiz?.startTime} endTime={quiz?.endTime}/>
                    <QuizStatus startTime={quiz?.startTime} endTime={quiz?.endTime}/>
                    <button 
                    disabled={!isQuizActive(quiz?.startTime, quiz?.endTime)}
                    className={`${!isQuizActive(quiz?.startTime, quiz?.endTime) && 'disabledBtn'}`} 
                    onClick={() => handleGetQuiz(quiz)}>
                      Take Quiz
                    </button>
                </div>
            ))}
        </div>

    );
}
 
export default Quizzes;