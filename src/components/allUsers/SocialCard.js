import './SocialCard.css';
import Information from './Information';
import Phone from './Phone';

const SocialCard = ({ userData }) => {
    return (
        <div className="card">
            <div className="card__title">{userData.FullName}</div>
            <div className="card__body">
                <Information info={userData.Email}/>
                <Information info={userData.User_Address}/>
                <Information info={userData.User_DOB}/>
                <Phone number={userData.MobileNo} type="Cell"/>
            </div>

        </div>
    )
};

export default SocialCard;
