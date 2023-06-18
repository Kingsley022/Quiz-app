import { useContext, useEffect, useState } from 'react';
import { messages } from '../../../data';
import '../../../styles/messages.css';
import messageImg from '../../../utils/images/messagesImg2.svg';
import Menu from '../menu';
import NavBar from '../nav';
import ColorfulHeader from '../../../common/colorfulHeader';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AppContext } from '../../../App';
import EmptyField from '../../../common/emptyField';

const Messages = () => {
    const{user} = useContext(AppContext);
    const[isAdmin, setIsAdmin] = useState(false); //checks if user is admin
    const[adminMessages, setAdminMessages] = useState([]); //messages for admin
    const[selectedMessage, setSelectedMessage] = useState(); //stores admin selected message
    const[userMessages, setUserMessages] = useState([]); //messages for user

    console.log(adminMessages);

    // Checking If is Admin
    useEffect(() => {
        if(user?._id === '643d68ec8ad5b18e7899e4b3'){
            setIsAdmin(true);
        }
    },[user,setIsAdmin]);

    // Getting Admin Messages
    const{data:newAdminMessages, status} =  useQuery(['Messages'], async () => {
        const response = await axios.get('http://localhost:5000/api/uploadQuiz');
        return response?.data;
    });

    useEffect(()=>{
        if(status === 'success'){
            setAdminMessages(newAdminMessages);
        }
    },[status,setAdminMessages]);

    // Getting a single Admin Message
    const getMessage = (message) =>{
        // localStorage.setItem("message", message);
        setSelectedMessage(message);
    }

    // Quiz Approval
    const handleQuizApproval = async () =>{
        if(!selectedMessage) return;
        const approvedQuiz = await axios.post('http://localhost:5000/api/quizzes', selectedMessage);
        const deletedQuiz = await axios.delete(`http://localhost:5000/api/uploadQuiz/${selectedMessage?._id}`);
        const message = {
            recipientId: user?._id,
            message : `Congratulations ${user?.firstname} ${user?.lastname}! your quiz has been approved.`
        }
        const adminMessage = await axios.post('http://localhost:5000/api/messages', message);
        alert("Approved");
        window.location.reload();
    };

    // Quiz Rejection
    const handleQuizDecline = async() =>{
        const deletedQuiz = await axios.delete(`http://localhost:5000/api/uploadQuiz/${selectedMessage?._id}`);
        const message = {
            recipientId: user?._id,
            message : `Sorry ${user?.firstname} ${user?.lastname}! your quiz was declined please follow the terms for quiz creation.`
        }
        const adminMessage = await axios.post('http://localhost:5000/api/messages', message);
        window.location.reload();
    };

    // Getting messages for users
    const { data: myMessages, status: myMessageStatus, error: myMessageError } = useQuery(
        ['userMessages'],
        async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/messages/me/${user?._id}`);
            return response.data;
          } catch (error) {
            console.log(error.message);
          }
        }
      );
      
      useEffect(() => {
        if (myMessageStatus === 'success') {
          setUserMessages(myMessages);
        } else if (myMessageError) {
          console.error(myMessageError);
        }
      }, [myMessageStatus, myMessages, myMessageError, setUserMessages]);

    return (
        <div className="dashboard">
            <Menu/>
            <div className="main">
                <NavBar/>
                {isAdmin ? (
                    <div className="adminMessageConatiner">
                        {/* <ColorfulHeader placeholder="QUIZ REQUESTS"/> */}
                        {selectedMessage ? (
                            <div className="message-details">
                                <div className="details-header">
                                    <div className="texts">
                                        <h2>{selectedMessage?.keyword}</h2>
                                        <p><span>{selectedMessage?.creatorName}</span></p>
                                        <p><span>{selectedMessage?.category}</span></p>
                                    </div>
                                    <div className="message-details-btn">
                                        <button className='decline' onClick={handleQuizDecline}>Decline</button>
                                        <button className='approve' onClick={handleQuizApproval}>Approve</button>
                                    </div>
                                </div>
                                <div className="details-questions">
                                    {selectedMessage?.questions?.map((question,index)=> (
                                        <div className="details-question" key={index}>
                                            <h3>{index === 0 ? 1 : index +1} {question?.question}</h3>
                                            <h4>Options</h4>
                                            <div className="options">
                                                {question?.options?.map((option, index) =>(
                                                    <p key={index}>{String.fromCharCode(97 + index)}. <span>{option}</span></p>
                                                ))}
                                            </div>
                                            <p>Answer : <span>{question?.answer}</span></p>
                                        </div>
                                    ))}
                                </div>

                                <div className="details-time">
                                    <p>StartTime : <span>{selectedMessage?.startTime}</span></p>
                                    <p>EndeTime : <span>{selectedMessage?.endTime}</span></p>
                                </div>
                            </div>

                        ) : adminMessages?.length > 0 ? (
                            <div className="adminMessages">
                                {adminMessages?.map((message, index) => (
                                    <div className="adminMessage" key={index} onClick={() => getMessage(message)}>
                                        <div className="keyword-n-user">
                                            <h2>{message?.keyword}</h2>
                                            <p>{message?.creatorName}</p>
                                        </div>
                                        <i className="fa fa-envelope"></i>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <EmptyField/>
                        )
                    }
                </div>
                
                ) : userMessages.length ? (
                    <div className="messagesContainer">
                        <div className="messages-area">
                            {userMessages?.map((message, index) =>(
                                <div className="message" key={index}>
                                    <p>{message?.message}</p>
                                    <small>{message?.time}</small>
                                    <div className="side-arrow"></div>
                                </div>
                            ))}
                            
                        </div>

                        <div className="img-area">
                            <img src={messageImg}/>
                        </div>
                    </div>
                ): <EmptyField/>}
                
                
            </div>
        </div>
    );
}
 
export default Messages;