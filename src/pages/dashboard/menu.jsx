import logo from '../../utils/images/logo5.png';
import { useState } from "react";
import { useNavigate, useLocation} from 'react-router-dom';
import { menu as menulist } from './../../data';
import { useEffect } from 'react';
import MenuIcon from '../../common/menuIcon';

const Menu = () => {

    const[menu, setMenu] = useState(menulist);
    const[isMenuToggled, setMenuToggled] = useState(false);
    const navigateTo = useNavigate();
    const location = useLocation();

    const handleMenuActive = id =>{
        const newMenu = menu.map(menu => {
            if(location.pathname === menu.path){
                return {...menu, isActive: true}
            }else{
                return {...menu, isActive: false}
            }
        });
        setMenu(newMenu);
    }
    useEffect(handleMenuActive, [location.pathname]);

    const handleMenuToggle = () =>{
        setMenuToggled(prev => !prev);
    }
    useEffect(() => {
        setMenuToggled(false);
    }, []);

    return (
        <div className="menu-container">
                <img src={logo} onClick={() => navigateTo('/')} alt='logo'/>

                <div className={`menu-list ${isMenuToggled && 'menu-toggle'}`}>
                    {menu.map(menu =>(
                        <div className={`menu ${menu.isActive && 'active'}`} key={menu.id} onClick={() => handleMenuActive(menu.id)}>
                            <div className="menu-icon-text" onClick={() => navigateTo(menu.path)}>
                                <i className={menu.icon}></i>
                                <p>{menu.title}</p>
                            </div>
                            <i className='greater-than'>&#62;</i>
                        </div>
                    ))}
                </div>
                {isMenuToggled ? <i className='fa fa-times' onClick={handleMenuToggle}></i> : <MenuIcon onClick={handleMenuToggle}/>}
            </div>
    );
}
 
export default Menu;