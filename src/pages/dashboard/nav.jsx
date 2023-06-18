import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MenuIcon from "../../common/menuIcon";
import { useContext } from "react";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";

const NavBar = () => {

    const{user} = useContext(AppContext);
    const navigateTo = useNavigate();

    const{data:country, status} = useQuery(['location'], async ()=>{
        const res = await axios.get("http://ip-api.com/json/");
        return res?.data?.countryCode;
    });

    if(status === 'loading'){
        console.log("Offline")
    }


    
    return (
        <div className="nav-container">
            
            <div className="left">
                <MenuIcon />
                <i className="fa fa-search"></i>
            </div>

            <div className="right">
                <img src={`https://flagsapi.com/${country}/flat/24.png`} alt="img"></img>
                <i className="fa fa-bell-o" onClick={() => navigateTo('/dashboard/messages')}></i>
                <i className="fa fa-cog" onClick={() => navigateTo('/dashboard/setting')}></i>
                <div className="user" onClick={() => navigateTo('/dashboard/account')}>
                    <i className="fa fa-user-o"></i>
                    <p>Welcome! <br/><span>{user?.firstname + ' ' + user?.lastname}</span></p>
                </div>
            </div>
        </div>
    );
}
 
export default NavBar;

