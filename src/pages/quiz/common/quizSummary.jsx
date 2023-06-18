import { useNavigate } from 'react-router-dom';
import greenTick from '../../../utils/images/tick.png';
import { useContext } from 'react';
import { AppContext } from './../../../App';
import axios from 'axios';
import Swal from 'sweetalert2';

const QuizSummary = ({quiz}) => {
    const navigateTo = useNavigate();
    const{ user } = useContext(AppContext);

    const handleRedirect = () =>{
      localStorage.removeItem("quizSummary");
      navigateTo('/dashboard');
    }

    const handleAddToFavorite = async (quiz) =>{
      const favorite = {
        favorite: quiz?.keyword,
        score: quiz?.quizScore,
        userId: quiz?.userId
      }
      if(!favorite) return;
      await axios.post('http://localhost:5000/api/favorites', favorite);
      Swal.fire({
        icon: 'success',
        title: 'Added to favorites',
      });
      localStorage.removeItem("quizSummary");
      navigateTo('/dashboard');
    }

    return (
        <div className="summary-container">
          <div className="summary-image">
            <img src={greenTick} alt='img' />
          </div>
            <div className="summary-content">
              <h2>Congratulations <span>{user?.firstname}</span>!</h2>
              <p>You have completed the quiz.</p>
              <p className='points'>Quizzy Points : {quiz?.quizScore}</p>
              <button onClick={handleRedirect}>Ok</button>
              <p onClick={() => handleAddToFavorite(quiz)}>Add to favorites</p>
            </div>
        </div>
    );
}
 
export default QuizSummary;