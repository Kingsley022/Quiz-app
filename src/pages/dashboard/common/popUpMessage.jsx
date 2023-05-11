import { useNavigate } from 'react-router-dom';
import '../../../styles/common.css';
import thanks from '../../../utils/images/thumps-up.png';



const PopUpMessage = () => {
    const navigateTo = useNavigate();
    return (
        <div className="popup-background">
            <div className="greeting">
                <img src={thanks} alt="Thanks" className="thanks-img" />
                <h1 className="heading">Conratulation!</h1>
                <p className="message">You have successfully created a quiz</p>
                <button className="ok-button" onClick={() => navigateTo('/')}>OK</button>
            </div>
        </div>
    );
}
 
export default PopUpMessage;