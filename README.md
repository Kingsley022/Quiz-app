 const [quizQuestions, setQuizQuestions] = useState(selectedQuiz.map(question => ({...question, selected: null})));


const handleOptionChange = (questionIndex, optionIndex) => {
  const updatedQuizQuestions = [...quizQuestions];
  const question = updatedQuizQuestions[questionIndex];
  question.selected = question.options[optionIndex].value;
  setQuizQuestions(updatedQuizQuestions);
};

<input
  type="radio"
  value={option.value}
  name={question.answer}
  id={question.answer}
  checked={option.value === question.selected}
  onChange={() => handleOptionChange(index, optionIndex)}
/>



import { useQuery } from 'react-query';
import axios from 'axios';

function useRegisterUser(data) {
  return useQuery(['register'], async () => {
    const response = await axios.post('http://localhost:5000/api/users', data);
    return response.data;
  });
}

function onSubmit(formData) {
  const data = {
    firstname: formData.firstname,
    lastname: formData.lastname,
    email: formData.email,
    password: formData.password,
  };

  const registerQuery = useRegisterUser(data);

  console.log(data);
}





{
  "creatorName": "Luis Kingsley",
  "creatorId": "643d68ec8ad5b18e7899e4b3",
  "keyword": "EnterEntertainment",
  "startTime": "2023-04-18T19:00:00.000Z",
  "endTime": "2023-04-18T19:05:00.000Z",
  "questions": [
    {
      "question": "What is 5+2?",
      "options": [
        "7",
        "4",
        "5",
        "6"
      ],
      "answer": "7"
    },
    {
      "question": "What is the capital of France?",
      "options": [
        "Berlin",
        "Paris",
        "Rome",
        "Madrid"
      ],
      "answer": "Paris"
    }
  ]
}