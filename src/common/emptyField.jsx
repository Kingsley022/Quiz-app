import emptyFileImg from  '../utils/images/emptyFile.jpg';
import '../styles/common.css';


const EmptyField = () => {
    return ( 
        <div className="emptyFiled">
            <img src={emptyFileImg} alt='noImg'/>
            <p>These Field is empty</p>
        </div>
    );
}
 
export default EmptyField;