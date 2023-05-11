import React from 'react';
import science from '../utils/images/science.png';
import history from '../utils/images/history.png';
import math from '../utils/images/math.png';
import logo from '../utils/images/logo5.png';
import logop from '../utils/images/logo3.png';
import aboutImg from '../utils/images/about.png';
import ongoing from '../utils/images/ongoing.png';
import contactImg from '../utils/images/contact.png';
import "../styles/home.css";
import Button from '../common/button';
import { useContext, useEffect, useState } from 'react';
import CountdownTimer from '../common/timer';
import { onGoingQuiz, reviews } from '../data';
import { useNavigate } from 'react-router-dom';
import { navbars } from '../data';
import { Link, animateScroll as scroll } from "react-scroll";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AppContext } from './../App';
import MenuIcon from '../common/menuIcon';
import ContactForm from './contactForm';

const Home = () => {
    const[navs, setNavs] = useState(navbars);
    const[winScroll, setWinScroll] = useState(false);
    const[menuToggle, setMenuToggle] = useState(false);
    const navigateTo = useNavigate();
    const{user} = useContext(AppContext);

   
    
    //************ Activates NavScroll **********//
    const handleWindowsScroll = () => {
        if(window.scrollY > 25){
            setWinScroll(true);
        }else{
            setWinScroll(false);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleWindowsScroll);
        return () => {window.removeEventListener('scroll', handleWindowsScroll);}
    },[]);
    useEffect(() => {
        AOS.init({
          duration: 2000,
          easing: 'ease-in-out',
          delay:0,
          once: false,
        });
      }, []);

    const handleActiveNav = id =>{
        const updatedNavs = navs.map(nav => {
            if(nav.id === id){
                return {...nav, isToggled : true}
            }else{
                return {...nav, isToggled : false}
            }
        });
        setNavs(updatedNavs);
    }

    const handleMenuToggle = () => {
        setMenuToggle(prev => !prev)
    }
    
    const handleLinkClick = () => {
        setMenuToggle(false);
      };

    useEffect(() => {
        setMenuToggle(false);
    }, [winScroll]);

    return (
        <div className="home-container">
            <div className="landing-page" id="HOME">
                <div className={`header ${winScroll && 'winScrolled'}`}>
                <Link to="HOME" spy={true} smooth={true} duration={200} offset={-70}> <img src={logo} className="logo" onClick={() => navigateTo('/')}/> </Link>
                    <div className={`nav-bars ${menuToggle && 'menu-active'}`}>
                        {navs.map((nav, index)=> (
                            <React.Fragment key={index}>
                                {nav.isScrollTag ? (
                                    <Link 
                                        activeClass='navActive' 
                                        className='links' 
                                        to={nav.text} 
                                        spy={true} 
                                        smooth={true} 
                                        offset={-87.3} 
                                        duration={1000}
                                        onClick={handleLinkClick}
                                    >
                                        {nav.text}
                                    </Link>
                                ) : (
                                    <p onClick={() => navigateTo(nav.page)}>
                                        {nav.text}
                                    </p>
                                )}
                            </React.Fragment>
                        ))}

                        {user ? (
                            <div className={`profille-container ${winScroll && 'profille-active'}`} onClick={() => navigateTo('/dashboard/account')}>
                                <i className="fa fa-user-o"></i>
                                <p>ACCOUNT</p>
                            </div>
                        ): (
                            <Button placeholder="Sign In" onClick={() => navigateTo('/auth')} styleBtn={`signIn ${winScroll && 'signInC'}`}/>
                        )}                        
                    </div>

                    {menuToggle ? <i className='fa fa-times' onClick={handleMenuToggle}></i> : <MenuIcon onClick={handleMenuToggle}/>}
                </div>
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className='svg-top'>
                    <path fill="#FA4D56" d="M38.5,-57.1C46.6,-47.1,47.6,-31.4,55.3,-16C63,-0.6,77.3,14.6,76.5,27.3C75.7,39.9,59.7,50.1,44.5,61.8C29.2,73.4,14.6,86.5,1.9,83.9C-10.8,81.3,-21.6,63,-37.3,51.5C-52.9,39.9,-73.4,35.2,-80.1,23.9C-86.8,12.5,-79.6,-5.5,-70.9,-20.1C-62.2,-34.8,-51.9,-46,-39.8,-54.7C-27.7,-63.5,-13.8,-69.8,0.7,-70.7C15.2,-71.6,30.4,-67.2,38.5,-57.1Z" transform="translate(100 100)" />
                </svg>
                <div className="landing-view">
                    <h1>Expand Your Knowledge with Our <br/>General Knowledge Quiz.</h1>
                    <p>Our quiz will help you unlock your potential and discover just how much you know about a wide range of subjects</p>
                    <p> With questions from different categories, you'll be able to put your skills to the test</p>
                    <p>Take the quiz today and unleash your inner genius!</p>
                    <h2>Are you ready to put your general knowledge to the test?</h2>
                    <Button placeholder="Take Quiz" onClick={() => navigateTo('/dashboard')} styleBtn={'styleBtn'}/>
                </div>

                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className='svg-bottom'>
                    <path fill="#0F62FE" d="M38.5,-57.1C46.6,-47.1,47.6,-31.4,55.3,-16C63,-0.6,77.3,14.6,76.5,27.3C75.7,39.9,59.7,50.1,44.5,61.8C29.2,73.4,14.6,86.5,1.9,83.9C-10.8,81.3,-21.6,63,-37.3,51.5C-52.9,39.9,-73.4,35.2,-80.1,23.9C-86.8,12.5,-79.6,-5.5,-70.9,-20.1C-62.2,-34.8,-51.9,-46,-39.8,-54.7C-27.7,-63.5,-13.8,-69.8,0.7,-70.7C15.2,-71.6,30.4,-67.2,38.5,-57.1Z" transform="translate(100 100)" />
                </svg>
            </div>

            <div className="categories">
                <div className="category science">
                    <img src={science}/>
                    <p>SCIENCE</p>
                </div>
                <div className="category math">
                    <img src={math}/>
                    <p>MATH</p>
                </div>
                <div className="category history">
                    <img src={history}/>
                    <p>HISTORY</p>
                </div>
            </div>
            
            <div className="lquizzes-container" data-aos="zoom-in">
                <div className="subHeader-container">
                    <h2 className="sub-header"><span className='fa fa'>~</span> Live Quizzes <span className='fa fa'>~</span></h2>
                    <button onClick={() => navigateTo('/dashboard')}>SEE ALL <span>&gt;</span></button>
                </div>
                
                <div className="lquizzes">
                    {onGoingQuiz.map( quiz => (
                        <div className="lquiz-container" key={quiz.id} onClick={() => navigateTo('/dashboard')}>
                            <img src={quiz.img}/>
                            <p className='lkeyword'>{quiz.keyword}</p>
                            <small className='lcreator'>By {quiz.creator}</small><br/>
                            <CountdownTimer days={quiz.day} hours={quiz.hour} minutes={quiz.minute} seconds={quiz.second}/>
                            <div className="stakes">
                                <p className="participants">{quiz.participants}+ <span>Quizzers</span></p>
                                <p className='stake'>{quiz.stake}<span>QPS</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="description" data-aos="fade-up">
                <div className="img-area">
                    <img src={ongoing}/>
                </div>
                
                <div className="txt-area">
                     <h2 className='sub-header'><span className='fa fa'>~</span> How It Works <span className='fa fa'>~</span></h2>
                    
                    <div className="step">
                        <h3><i className="fa fa-user"></i>Create an Account</h3>
                        <p>To save your quiz results and keep track of your progress, create a free account by providing your basic information.</p>
                    </div>

                    <div className="step">
                        <h3><i className='fa fa-pencil'></i>Take a Quiz</h3>
                        <p>Choose a quiz from our wide selection of categories and start answering questions to test your knowledge and gain more QUIZZYPOINTS.</p>
                    </div>
                    
                    <div className="step">
                        <h3><i className="fa fa-share-alt"></i>Share Results</h3>
                        <p>After taking a quiz, share your results on social media to challenge your friends and compete for the top score.</p>
                    </div>
                </div>

            </div>
            
            <div className="about-us" id='ABOUT US' data-aos="fade-up">
                <div className="txt-area">
                <h2 className="sub-header"><span className='fa fa'>~</span> About Us <span className='fa fa'>~</span></h2>
                <p><b>Quizzy</b> is a platform that provides a fun and interactive way to test your knowledge and learn new things. Our mission is to make education and self-improvement accessible to everyone.</p>
                <p>Here, we believe that learning should be an enjoyable and rewarding experience. That's why we offer a wide range of quizzes and trivia games on various topics, from <b>Math, Science, History</b> to <b>Pop Culture</b> and <b>Sports.</b></p>
                <p>Our team consists of passionate educators, developers, and designers who are committed to creating the best learning experience for our users. We strive to constantly improve our platform and make it more user-friendly and engaging.</p>
                </div>

                <div className="img-area">
                    <img src={aboutImg}/>
                </div>
            </div>

            <div className="user-reviews" id='REVIEWS' data-aos="fade-up">
                <h2 className="sub-header"><span className='fa fa'>~</span> Reviews <span className='fa fa'>~</span></h2>
                <p className='subp'>What other quiz takers have to say about our quizzes and the overall experience</p>
                <div className="reviews">
                    {reviews.map(review =>(
                        <div className="review" key={review.id}>
                            <img src={review.img}/>
                            <div className="review-text">
                                <blockquote>{review.qoute}</blockquote>
                                <cite>- {review.name}</cite>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="contact" data-aos="fade-up" id='CONTACT'>
                <div className="img">
                    <img src={contactImg}/>
                </div>
                <ContactForm/>
                
            </div>

        <div className="footer">
            <div className="top-footer">
                <div className="socials">
                    <img src={logo}/>
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <i className="fa fa-facebook"></i>
                        <i className="fa fa-instagram"></i>
                        <i className="fa fa-linkedin"></i>
                        <i className='fa fa-twitter'></i>
                    </div>
                </div>

                <div className="quickLinks">
                    <h3>Quick Links</h3>
                    <div className="Qlinks">
                    <Link to="HOME" spy={true} smooth={true} duration={500} offset={-70}> <p><i className='fa fa-arrow-up'></i>Home</p> </Link>
                    <Link to="ABOUT US" spy={true} smooth={true} duration={500} offset={-70}> <p><i className='fa fa-arrow-up'></i>About Us</p> </Link>
                    <Link to="REVIEWS" spy={true} smooth={true} duration={500} offset={-70}> <p><i className='fa fa-arrow-up'></i>Reviews</p> </Link>
                    <Link to="CONTACT" spy={true} smooth={true} duration={500} offset={-70}> <p><i className='fa fa-arrow-up'></i>Contact Us</p> </Link>
                    </div>
                </div>

                <div className="contacts-Container">
                    <h3>Contact Info</h3>
                    <div className="contacts">
                        <p><i className='fa fa-envelope'></i> Quizzy@Quizzy.com</p>
                        <p><i className='fa fa-phone'></i> +234-91-2913-1925</p>
                        <p><i className='fa fa-map-marker'></i> 27 Ziks Avenue Enugu, Nigeria</p>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="bottom-footer">
                <small>&copy; 2023 Quizzy Quizzy. All Rights Reserved.</small>
            </div>
        </div>
        </div>
    );
}
 
export default Home;