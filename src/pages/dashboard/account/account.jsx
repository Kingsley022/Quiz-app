import '../../../styles/account.css';
import Menu from '../menu';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import kid from '../../../utils/images/kid2.png';
import scienceImg from '../../../utils/images/science.png';
import mathImg from '../../../utils/images/math.png';
import entertainmentImg from '../../../utils/images/entertainment.png';
import historyImg from '../../../utils/images/history.png';
import sportsImg from '../../../utils/images/sports.png';
import { AppContext } from './../../../App';
import axios from 'axios';
import EmptyField from '../../../common/emptyField';

const Account = () => {
    const[searchValue, setSearchValue] = useState('');
    const[myQuizzes, setMyQuizzes] = useState(null);
    const[myHistory, setMyHistory] = useState([]);
    const[quizzyPoints, setQuizzyPoints] = useState(0);
    const [participantsCount, setParticipantsCount] = useState([]);
    const navigateTo = useNavigate();
    const{user} = useContext(AppContext);

    const handleQuizDelete = async(id, creatorId )=> {
        try{
            if(user?._id !== creatorId) return;
            const response = await axios.delete(`http://localhost:5000/api/quizzes/${id}`);
            console.log(response?.data);
            window.location.reload();
        }catch(err){
            console.log(err.message);
        }
    }

    // Generates Quiz Image
    const GetCateImg = ({cate}) => {
        let imgSrc;
        if(cate === 'Science'){
            imgSrc = scienceImg
        }
        if(cate === 'Sports'){
            imgSrc = sportsImg
        }
        if(cate === 'Entertainment'){
            imgSrc = entertainmentImg
        }
        if(cate === 'History'){
            imgSrc = historyImg
        }
        if(cate === 'Math'){
            imgSrc = mathImg
        }
        return <img src={imgSrc} alt='hdh' className='cateImg'/>
    }

    // Generates Quiz Status
    const getStatus = (QstartTime,QendTime) => {
        const startTime = new Date(QstartTime);
        const endTime =  new Date(QendTime);
        const currentTime =  new Date();

        let status;
        if(endTime > startTime) status = "SOON";
        if(endTime < startTime) status = "ON";
        if(endTime < currentTime) status = "ENDED";

        return<small className={status === 'ENDED' ? 'fail': 'success'}>{status}</small>
    }

    // Gets Quizzes Created by user
    const fetchMyQuizzes = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/quizzes/creator/${user?._id}`);
          if (response) {
            setMyQuizzes(response?.data);
          }
        } catch (error) {
          console.error(error);
        }
    };
    useEffect(() => { fetchMyQuizzes() }, [setMyQuizzes, user]);

    // Gets users' Quiz Record
    const fetchMyRecords = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/records/user/${user?._id}`);
          if (response) {
            setMyHistory(response?.data);
          }
        } catch (error) {
          console.error(error);
        }
    };
    useEffect(() => { fetchMyRecords() }, [setMyHistory, user]);
    
    // Sums Up Quiz Score
    useEffect(() => {
        if(!myHistory.length) return;
        const totalQuizScore = myHistory?.reduce((accumulator, score) => accumulator + (score?.quizScore || 0), 0);
        setQuizzyPoints(totalQuizScore);
    }, [myHistory, setMyHistory]);

    // Gets all Participants in a quiz competition
    const getParticipants = async (userId, keyword) => {
        try {
          const response = await axios.get('http://localhost:5000/api/records');
          const records = response.data;
          if (!records) return 0;
    
          const filterHistory = records.filter(record => record.keyword === keyword);
          return filterHistory.length;
        } catch (err) {
          console.log(err.message);
          return 0;
        }
    };

    const fetchParticipantsCounts = async () => {
        if (myQuizzes) {
            const counts = await Promise.all(
                myQuizzes.map((myQuiz) => getParticipants(user?._id, myQuiz?.keyword))
            );
            setParticipantsCount(counts);
        }
    };

    useEffect(() => {
        fetchParticipantsCounts();
    }, [myQuizzes, user]);
   
    const filteredQuizzes = myQuizzes?.filter((quiz) => {
        return quiz?.keyword.toLowerCase().includes(searchValue.toLowerCase())||
            quiz?.category.toLowerCase().includes(searchValue.toLowerCase()) 
    });
    return (
        <div className="dashboard">
            <Menu/>
            <div className="main">
                <div className="activities">
                    <div className="uploads-container">
                        <div className="greeting">
                            <div className="text-area">
                                <h2>Hello {user?.firstname}!</h2>
                                <p>It's good to see you again</p>
                            </div>

                            <div className="img-area">
                                <img src={kid} alt='hello'/>
                            </div>
                        </div>

                        <div className="user-quizzes">

                            <p className="sub-heading">Quizzes</p>

                            <div className="uplaods">
                                { filteredQuizzes?.length > 0 ? (filteredQuizzes?.map(( myQuiz, index) => {
                                    
                                        return (
                                            <div className="activity" key={myQuiz?._id}>
                                                    <div className="cate-img">
                                                        {<GetCateImg cate={myQuiz?.category}/>}
                                                        <div className="keyword">
                                                            <h4>{myQuiz?.keyword}</h4>
                                                            <small>{new Date(myQuiz?.timeCreated).toLocaleDateString()}</small>
                                                        </div>
                                                    </div>
        
                                                    {getStatus(myQuiz?.startTime, myQuiz?.endTime)}                              
        
                                                    <div className="participants">
                                                        <i className='fa fa-users'></i>
                                                        <small>{participantsCount[index]}</small>
                                                    </div>
                                                <button onClick={() => handleQuizDelete(myQuiz?._id, myQuiz?.creatorId)}>Delete</button>
                                            </div>
                                        )})
                                ) : <EmptyField/>
                                }
                            </div>

                        </div>
                    </div>

                    <div className="history-container">
                        <div className="search-area">
                            <div className="search-box">
                                <i className="fa fa-search"></i>
                                <input type='search' onChange={(e) => setSearchValue(e.target.value)}/>
                            </div>

                            <div className="notify-profile-area">
                                <div className="new-quiz" onClick={() => navigateTo('/user/new-quiz')}>
                                    <i className="fa fa-plus"></i>
                                    <small>New Quiz</small>
                                </div>
                                <div className="icon" onClick={()=> navigateTo('/dashboard/messages')}>
                                    <i className="fa fa-bell-o"></i>
                                    <small>3</small>
                                </div>

                                <div className="profile-img" onClick={() => navigateTo('/dashboard/setting')}>
                                    <i className='fa fa-cog'></i>
                                </div>
                            </div>
                            
                        </div>

                        <div className="quiz-record-nums">
                            <div className="number-record">
                                <h1>{quizzyPoints}</h1>
                                <p>Quizzy Points</p>
                            </div>

                            <div className="number-record">
                                <h1>{myHistory?.length}</h1>
                                <p>Quizzes Completed</p>
                            </div>
                        </div>

                        {myHistory.length > 0 && (
                            <div className="record">
                                <h3 className='sub-heading'>Quiz Records</h3>
                                <div className="history"> 
                                    {myHistory?.map( hist => (
                                        <div className="hist" key={hist?._id}>
                                            <div className="cat">
                                                <h5>{hist?.keyword}</h5>
                                                <small className={hist?.quizScore >= 8 ? 'success' : 'fail'}><span className='scoreSpan'>score:</span> {hist?.quizScore}</small>
                                            </div>
                                            <small className='date'>{hist?.date}</small>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                    </div>
                </div>
                
            </div>
        </div>
    );
}
 
export default Account;
