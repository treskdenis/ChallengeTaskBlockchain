import './SocialCard.css';
import GroupUser from './GroupUser';

const GroupSocialCard = ({ groupData }) => {
    return (
        <div className="card">
            <div className="card__title">{groupData.groupName}</div>
            <div className="card__body">
                <GroupUser owner={true} groupUser={groupData.owner}/>
                {groupData.users.map((user, index) => (
                    <GroupUser key={index} owner={false} groupUser={user} />
                ))}
            </div>

        </div>
    )
};

export default GroupSocialCard;
