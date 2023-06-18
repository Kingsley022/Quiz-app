const QuizStatus = ({ startTime, endTime }) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
  
    if (now < start) {
      return <p className="status soon">Soon</p>;
    } else if (now > end) {
      return <p className="status end">Ended</p>;
    } else {
      return <p className="status on">On</p>;
    }
}
 
export default QuizStatus;