import { useState, useEffect, useContext } from 'react';
import '../../../styles/newQuiz.css';
import formImage from '../../../utils/images/formImg.png';
import { nanoid } from 'nanoid';
import Menu from '../menu';
import NavBar from './../nav';
import ColorfulHeader from './../../../common/colorfulHeader';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import 'react-datetime/css/react-datetime.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AppContext } from '../../../App';
import axios from 'axios';
import PopUpMessage from '../common/popUpMessage';

const CreateQuiz = () => {

    const[questions, setQuestions] = useState([]);
    const[keyword, setKeyword] = useState('');
    const[keywordError, setKeywordError] = useState('');
    const[storedQuiz, setStoredQuiz] = useState(null);
    const[showPopUP, setShowPopUP] = useState(false);
    const{user} = useContext(AppContext);
    const [options, setOptions] = useState(["", ""]); //Getting each question property
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(() => {
        const date = new Date();
        date.setMinutes(date.getMinutes() + 5);
        return date;
    });

  
  function handleStartTimeChange(date) {
    setStartTime(date);
  }

  function handleEndTimeChange(date) {
    setEndTime(date);
  }    

    //My id generator
    const ranId = nanoid(10);

    //Quetion creation schema 
    const schema = yup.object().shape({
        question: yup.string().required("Question is required"),
        category: yup.string().oneOf(["Math", "Science", "History", "Sports", "Entertainment"],"Please select a valid category").required("Category is required"),
        options: yup.array().of(yup.string().required('Option is required')).required("Options are required"),
        answer: yup.mixed().test("is-valid-option", "Answer must be one of the options", function(value) {const options = this.parent.options;return options.includes(value);}).required("Answer is required")
    });
    

    //Handle quiz review before being published
    const handleQuizPreview = async () => {
        const category = questions[0]?.category;
        console.log(category)
        if (keyword === '' || keyword.length < 5) {
          setKeywordError("Enter a valid keyword");
          return;
        }
        const previewQuestion = { questions, keyword, startTime, endTime, category};
        localStorage.setItem("Quiz", JSON.stringify(previewQuestion));
        const newStoredQuiz = await JSON.parse(localStorage.getItem("Quiz"));
        setStoredQuiz(newStoredQuiz);
        setKeywordError('');
    }

    // Terminates quiz from being submitted
    const handleQuizCancel = () =>{
        localStorage.removeItem("Quiz");
        setStoredQuiz(null);
    }

    // Mounts the user Details
    useEffect(() => {
        const newStoredQuiz = JSON.parse(localStorage.getItem("Quiz"));
        if (newStoredQuiz) {
        setStoredQuiz(newStoredQuiz);
        }
    }, []);

    // Handles Quiz Publish
    const handleQuizPublish = async () => {
        const quiz = {
            creatorId : user?._id,
            creatorName : user?.firstname + ' ' + user?.lastname,
            questions: storedQuiz?.questions,
            keyword: storedQuiz?.keyword,
            category: storedQuiz?.category,
            startTime: storedQuiz?.startTime,
            endTime: storedQuiz?.endTime
        }

        try{
            if(!quiz) return;
            await axios.post('https://quizzy-server-xpay.onrender.com/api/uploadQuiz', quiz);
            setShowPopUP(true);
            setStoredQuiz(null);
        }catch(err){
            console.log(err.message);
        }
    }

      
    const{register, handleSubmit, reset, formState:{errors}} = useForm({resolver: yupResolver(schema), abortEarly: false});


    const handleAddOption = () => {
        if(options.length > 3) return;
        console.log("clicked")
        setOptions([...options, ""]);
    };

    const removeOption = (index) => {
        const newOptions = [...options];
        newOptions.splice(index, 1);
        setOptions(newOptions);
    };

    const handleOptionChange =(e, index)=>{
        const newOptions = [...options]; 
        console.log(newOptions); 
        newOptions[index] = e.target.value; 
        setOptions(newOptions);
    };

    //Handles quetions
    const handleQuestionSubmit = (data) => {
        const newData = {...data, id: ranId}
        setQuestions([...questions, newData]);
        console.log(questions);
        reset();
    };


      const currentDate = new Date();
      const minDate = currentDate.getTime();

      const minTime = {
        hours: currentDate.getHours(),
        minutes: currentDate.getMinutes() + 1
      };
    const maxTime = { 
        hours: 23,
        minutes: 59
    };
    return (
        <div className="dashboard">
            <Menu/>
            <div className="main">
                <NavBar/>
                {!storedQuiz? <div className="newQuiz-container">
                    <div className="input-area">
                        <h2>Set Quiz</h2>

                        <form onSubmit={handleSubmit(handleQuestionSubmit)}>
                            
                            <div className="field">
                                <label htmlFor="question" className='label'>Question</label>
                                <input placeholder="Enter Question" id='question' {...register("question")} className='input'/><br/>
                                {errors.question && <p className='error'>{errors.question.message}</p>}
                            </div>

                            <div className="field">
                                <label htmlFor="category" className='label'>Choose category</label>
                                <select id="category" name="category"  {...register('category')} className='input'>
                                    <option >select category</option>
                                    <option value="Math">Math</option>
                                    <option value="Science">Science</option>
                                    <option value="History">History</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Entertainment">Entertainment</option>
                                </select>
                                {errors.category && <p className='error'>{errors.category.message}</p>}
                            </div>

                            <div className="field">
                                <label htmlFor="options" className='label'>Options</label>
                                <div className="options-container">
                                    {options.map((option, index) => (
                                        <div key={index}>
                                            <input
                                                className='input option'
                                                type="text"
                                                defaultValue={option}
                                                onChange={(e) => handleOptionChange(index)}
                                                {...register(`options[${index}]`)}
                                            />
                                            {options.length > 2 && (
                                            <button type="button" onClick={() => removeOption(index)} className='remove-btn'>
                                                Remove
                                            </button>
                                            )}
                                            {errors.options && errors.options[index] && (
                                                <p className='error'>{errors.options[index].message}</p>
                                            )}
                                        </div>
                                    ))}
                                    <button type="submit" onClick={handleAddOption} className='addoption-btn'> Add Option</button>
                                </div>
                            </div>

                            <div className="field answer">
                                <br/><label htmlFor="answer" className='label'>Answer</label>
                                <input type="text" id="answer" name="answer" {...register('answer')}className='input' placeholder="Answer"/><br/>
                                {errors.answer && <p className='error'>{errors.answer.message}</p>}
                            </div>

                            <button type="submit" className='addQuestion-btn'>Submit</button>
                        </form>
        
      
                    </div>

                    <div className="output-area">
                        { showPopUP ? <PopUpMessage/> : questions.length === 0 ? (
                            <img src={formImage} alt='formImg'/>
                            ) : (
                            <div>
                                <ColorfulHeader placeholder='Questions'/>
                                <div className="output-questions-container">
                                    {questions.map((question, index) => (
                                        <div className="question-container" key={index}>
                                            <p className='outputted-question'><span>{index + 1}. </span>{question.question}</p>
                                            <p className='reviewDetail category'>Category : <span>{question.category}</span></p>
                                            <p className='reviewDetail answer'>Answer : <span>{question.answer}</span></p>
                                            <div className="output-options">
                                                <p className='reviewDetail'>Options : </p>
                                                {question.options.map((option, index) => (
                                                    <div className="option" key={index}>
                                                        <label htmlFor={option}>{option}</label>
                                                        <input type="radio" value={option} id={option} disabled/>
                                                    </div>
                                                ))}
                                            </div>

                                        </div>
                                    ))}

                                            <div className="field">
                                                <label htmlFor="keyword" className='label'>Keyword</label>
                                                <input placeholder="e.g Business Statistics" onChange={(e)=> setKeyword(e.target.value)} id='keyword' className='input'/><br/>
                                                {keywordError && <span className='error'>{keywordError}</span>}
                                            </div>
                                            
                                            <div className="datepicker">
                                                <div className="field">
                                                    <label>Start Time</label>
                                                    <DatePicker
                                                        selected={startTime}
                                                        onChange={handleStartTimeChange}
                                                        showTimeSelect
                                                        dateFormat="Pp"
                                                        minDate={minDate}
                                                        minTime={minTime}
                                                        maxTime={maxTime}
                                                    />
                                                </div>

                                                <div className="field">
                                                    <label>End Time</label>
                                                    <DatePicker
                                                        selected={endTime}
                                                        onChange={handleEndTimeChange}
                                                        showTimeSelect
                                                        dateFormat="Pp"
                                                        minDate={minDate}
                                                        minTime={minTime}
                                                        maxTime={maxTime}
                                                    />
                                                </div>
                                            </div>
                                    <button className='publishBtn' onClick={handleQuizPreview}>Preview</button>
                                </div>
                            </div>)}
                    </div>

                </div> : (
                    <div className="storedQuiz-container">
                        {storedQuiz?.questions?.map((question, index )=>(
                            <div className="question" key={index}>
                                <h2>{index === 0 ? 1: index+1}.{question?.question}</h2>
                                <p><span>Category : </span>{question.category}</p>
                                <p><span> Answer : </span>{question.answer}</p>
                                <div className="option-container">
                                    <p>Options : </p>
                                    {question.options.map((option, index) => (
                                        <div className="option" key={index}>
                                            <label htmlFor={option}>{option}</label>
                                            <input type="radio" value={option} id={option} disabled />
                                        </div>
                                    ))}
                                </div>
                            </div>  
                        ))
                        }
                        <h3 className = "keyword-container"><span className="keyword">Keyword : </span>{storedQuiz?.keyword}</h3>
                        <p className = "keyword-container"><span className="keyword">Start Time : </span>{storedQuiz?.startTime}</p>
                        <p className = "keyword-container"><span className="keyword">End Time : </span>{storedQuiz?.endTime}</p>
                        <div className="btns">
                            <button onClick={handleQuizCancel}>Cancel</button>
                            <button onClick={handleQuizPublish}>Publish</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
 
export default CreateQuiz;