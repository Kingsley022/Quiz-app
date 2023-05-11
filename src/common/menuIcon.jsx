import '../styles/menuIcon.css';

const MenuIcon = ({onClick}) => {
    return (
        <div className="menu-icon-container" onClick={onClick}>
            <div className="menu-icon"></div>
            <div className="menu-icon"></div>
            <div className="menu-icon"></div>
        </div>
    );
}
 
export default MenuIcon;