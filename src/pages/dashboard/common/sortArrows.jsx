import '../../../styles/common.css';
const SortArrows = ({handleAscending, handleDecending, isToggled}) => {

    return (
        <div className="sort">
            <i className={`fa fa-arrow-up ${isToggled && 'active'}`} onClick={handleAscending}></i>
            <i className={`fa fa-arrow-down ${!isToggled && 'active'}`} onClick={handleDecending}></i>
        </div>
    );  
}
 
export default SortArrows;