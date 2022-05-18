import { useState, useEffect } from "react";
import "./AllUsers.css";
import GroupSocialCard from "./GroupSocialCard";
import { NewGroupCard } from "./NewGroupCard";
import { AddUserCard } from "./AddUserCard";
import { Link, useNavigate } from "react-router-dom"; 

export function ManageGroups(props) {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("userId"));
    if (!id) {
      navigate("/")
    }

    (async () => {
      let groupData = [];
      try {
        // make API call
        const contractInterface = props.props.props; 
        const allGroups = await contractInterface.viewAllGroups(contractInterface.identityManagerContract);
        console.log(allGroups);
        for (let i = 0; i < allGroups.length; i++) {
          const element = allGroups[i];
          const groupId = {groupAddress: element.OwnerAddress, id: element.OwnerId};
          const userIds = await contractInterface.viewUsersForGroup(contractInterface.identityManagerContract, groupId);
          let users = [];
          const owner = await contractInterface.viewUser(contractInterface.identityManagerContract, element.OwnerAddress, element.OwnerId);
          for (let j = 0; j < userIds.length; j++){
            const userId = userIds[j];
            const groupUser = await contractInterface.viewUser(contractInterface.identityManagerContract, userId.userAddress, userId.id)
            users.push({username: groupUser.FullName})
          };
          let newGroup = {
            groupName: element.GroupName, 
            owner: {username: owner.FullName},
            users: users
          }
          groupData.push(newGroup);
        };
      } catch (error) {
        console.log(error);
        groupData = [];
      }
      setGroups(groupData);
    })();
  }, []);

  return (
    <div className="AllUsers">
      <div className="first-container">
        <h1>Manage Groups</h1>
        <Link to="/allusers" className="styled-link">All Users</Link>
      </div>

      <div className="cards-container">

      {groups.map((group, index) => (
        <GroupSocialCard key={index} groupData={group} />
        ))}
      <NewGroupCard props={props} />
      <AddUserCard props={props} />
      </div>
    </div>
  );
}
