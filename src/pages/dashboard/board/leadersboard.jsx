const LeadersBoard = ({leadersBoard}) => {
    return (
        <div className="leaderboard">
            {leadersBoard?.map((leader,index )=> (
                <div className="leader" key={index}>
                    <div className="user">
                        <div className="icons">
                            {index < 3  && <i className='fa fa-star award'></i>}
                            <i className='fa fa-user-o'></i>
                        </div>
                        <p>{leader?.name}</p>
                    </div>
                    <p className='points'>{leader?.totalScore}<span>QPT</span></p>
                </div>
            ))}
        </div>
    );
}
 
export default LeadersBoard;