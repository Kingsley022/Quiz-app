import ColorfulHeader from '../../../common/colorfulHeader';
import gold from '../../../utils/images/gold.png';
import silver from '../../../utils/images/silver.png';
import bronze from '../../../utils/images/bronze.png';
import Quizzes from './quizzes';
import SortArrows from '../common/sortArrows';
import { awardwinners, leaderboard as board } from '../../../data';
import { useEffect, useState} from 'react';
import {quizzes as quizlist} from '../../../data';
import Menu from '../menu';
import NavBar from '../nav';
import '../../../styles/dashboard.css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LeadersBoard from './leadersboard';


const Board = () => {

    const[leadersBoard, setLeadersBoard] = useState(board);
    const[quizzes, setQuizzes] =  useState(quizlist);
    const [sortOrder, setSortOrder] = useState({ quizzes: null, leaderboard: null });
    const[isArrowToggle, setIsArrowToggle] = useState(null);
    const[isArrowToggled2, setIsArrowToggled2] = useState(true);
    const[newQuizzes, setNewQuizzes] = useState(null);
    const[searchValue, setSearchValue] = useState('');

    // fetching Quizzes
    const{data: quizData, status:quizStatus} = useQuery(['quizzes'], async () => {
        const response = await axios.get('http://localhost:5000/api/quizzes');
        return response?.data;
    });
    useEffect(() => {
        if (quizStatus === 'success') {
          setNewQuizzes(quizData)   
        }
    }, [quizStatus, quizData]);

    // Fetching Leaders Board
    const{data: leaders, status:leaderStatus} = useQuery(['leadersBoard'], async () => {
        const response = await axios.get('http://localhost:5000/api/leadersboard');
        return response?.data;
    });
    useEffect(() => {
        if (leaderStatus === 'success') {
            setLeadersBoard(leaders)   
        }
    }, [leaderStatus, leaders]);

    // Sorting Quizzes(Arrow Sorting)
    const handleQuizDecending = () => {
        const sortedQuizzes = [...newQuizzes]?.sort((a, b) => (a?.startTime > b?.startTime) ? -1 : 1);
        console.log(sortedQuizzes)
        setNewQuizzes(sortedQuizzes);
        setIsArrowToggle(false);
    }

    const handleQuizAscending = () => {
        const sortedQuizzes = [...newQuizzes]?.sort((a, b) => (a?.startTime < b?.startTime) ? -1 : 1);
        console.log(sortedQuizzes)
        setNewQuizzes(sortedQuizzes);
        setIsArrowToggle(true);
    }

    // Sorting leaders board(Arrow Sorting)
    const handleLeadDecending = () => {
        const newBoard = [...leadersBoard]?.sort((a, b) => (a?.totalScore > b?.totalScore) ? -1 : 1);
        setLeadersBoard(newBoard);
        setIsArrowToggled2(true);
    }
    const handleLeadAscending = () => {
        const newBoard = [...leadersBoard]?.sort((a, b) => (a?.totalScore < b?.totalScore) ? -1 : 1);
        setLeadersBoard(newBoard);
        setIsArrowToggled2(false);
    }
    // const handleSort = (type, order) => {
    //     const sortedData = [...type].sort((a, b) =>
    //       order === 'asc' ? (a.time < b.time ? -1 : 1) : a.time > b.time ? -1 : 1
    //     );
    //     type === quizzes ? setQuizzes(sortedData) : setBoard(sortedData);
    //     setSortOrder({ ...sortOrder, [type === quizzes ? 'quizzes' : 'leaderboard']: order });
    // };

    // HandlesQuizSearch
    const handleSearchValue = e =>{
        setSearchValue(e.target.value);
        console.log(searchValue);
    }
    const filteredQuizzes = newQuizzes?.filter((quiz) => {
        return quiz?.creatorName.toLowerCase().includes(searchValue.toLowerCase())||
            quiz?.category.toLowerCase().includes(searchValue.toLowerCase())|| 
            quiz?.keyword.toLowerCase().includes(searchValue.toLowerCase())
    });

    return (
        <div className="dashboard">
            <Menu/>
            <div className="main">
                <div className="quizzes">
                        <div className="quiz-left">
                            <div className="quiz-header">
                                <ColorfulHeader placeholder='QUIZ BOARD'/>
                                <div className="search-sort">
                                    <div className="search">
                                        <input  value={searchValue} placeholder='Search...' onChange={handleSearchValue}></input>
                                        <button className='fa fa-search'></button>
                                    </div>

                                    <SortArrows handleDecending={handleQuizDecending} handleAscending={handleQuizAscending} isToggled={isArrowToggle}/>
                                </div>
                            </div>

                            <div className="award-winners">
                                {awardwinners.map(awardWinner => (
                                    <div className="winner" key={awardWinner.id}>
                                        <div className="award">
                                            <img src={awardWinner.medal}/>
                                            <p>{awardWinner.award}</p>
                                        </div>
                                        <p className='wname'>{awardWinner.name}</p>
                                        <p className='wpoints'>{awardWinner.points} QPS</p>
                                        <p className='wquizzes'>{awardWinner.quizzes}Q</p>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="quiz-body">
                                <ColorfulHeader placeholder="Quizzes"/>
                                <Quizzes quizzes={filteredQuizzes} setQuizzes={setQuizzes} />
                            </div>
                        </div>

                        <div className="quiz-right">
                            <div className="right-header">
                                <ColorfulHeader placeholder="LEADERBOARD"/>
                                <div className="sort">
                                    <i className={`fa fa-arrow-down ${!isArrowToggled2 && 'active'}`} onClick={handleLeadAscending}></i>
                                    <i className={`fa fa-arrow-up ${isArrowToggled2 && 'active'}`} onClick={handleLeadDecending}></i>
                                </div>
                            </div>
                            <LeadersBoard leadersBoard={leadersBoard}/>
                            
                            <div className="awards">
                                <ColorfulHeader placeholder="AWARDS"/>
                                <div className="award-list">
                                    <div className="award">
                                        <img src={gold}/>
                                        <p>Gold</p>
                                    </div>

                                    <div className="award">
                                        <img src={silver}/>
                                        <p>Silver</p>
                                    </div>

                                    <div className="award">
                                        <img src={bronze}/>
                                        <p>Bronze</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                </div>
            </div>
        </div>
        
    );
}
 
export default Board;