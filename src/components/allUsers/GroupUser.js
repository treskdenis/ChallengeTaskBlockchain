import './Location.css';

const GroupUser = ({ groupUser, owner }) => {
  return <div className="location">
  	  {owner && <p>Owner: <strong>{groupUser.username}</strong></p>}
  	  {!owner && <p>{groupUser.username}</p>}
    </div>;
};

export default GroupUser;
