import '../styles/common.css';

const Button = ({onClick, placeholder, styleBtn}) => {
    return (
        <button onClick={onClick} className={`G-btn ${styleBtn}`}>{placeholder}</button>
    );
}
 
export default Button;