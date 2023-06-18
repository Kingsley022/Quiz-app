import '../../../styles/favorite.css';
import { useContext, useEffect, useState } from "react";
import favImg from '../../../utils/images/fav-img.png';
import Menu from '../menu';
import NavBar from './../nav';
import { AppContext } from '../../../App';
import axios from 'axios';
import EmptyField from '../../../common/emptyField';
import ColorfulHeader from '../../../common/colorfulHeader';

const Favorite = () => {
    const{user} = useContext(AppContext);
    const[favorites, setFavorites] = useState([]);

    const fetchFavorites = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/favorites/me/${user?._id}`);
          if (response) {
            setFavorites(response?.data);
          }
        }catch (error) {
          console.error(error);
        }
    };
    useEffect(() => { fetchFavorites() }, [setFavorites, user]);
   
    const handleFavoriteDelete = async(id) => {
        await axios.delete(`http://localhost:5000/api/favorites/${id}`);
        alert('Favorite Deleted');
        window.location.reload();
    }

    return (
        <div className="dashboard">
            <Menu/>
            <div className="main">
                <NavBar/>
                <div className="container">
                {favorites.length ? (
                    <>
                        <ColorfulHeader placeholder="FAVORITES"/>
                        <div className="favorite-container">
                            <div className="favorites">
                                {favorites.map( fav => (
                                    <div className="favorite" key={fav._id}>
                                        <p>{fav?.favorite}</p>
                                        <p className="score">{fav?.score}</p>
                                        <p className="date">{fav?.data}</p>
                                        <p className='delete' onClick={() => handleFavoriteDelete(fav?._id)}>X</p>
                                    </div>
                                ))}
                            </div>

                            <div className="img-area">
                                <img src={favImg} alt="fav"/>
                            </div>
                        </div>
                    </>
                ) : (
                    <EmptyField/>
                )}
                </div>
            </div>
        </div>
    );
}
 
export default Favorite;