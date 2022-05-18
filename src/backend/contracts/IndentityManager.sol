pragma solidity >=0.4.22 <0.9.0;

contract IdentityManager{

    address ContractOwner;

    function IdentityManagement () public{
        ContractOwner = msg.sender;
    }

    struct UserInfo{
        uint id;
        string Email;
        string Password;
        string FullName; 
        uint MobileNo;
        string User_DOB;
        string User_Address;
    }

    struct UserIdentity{
        address userAddress; 
        uint id;
    }

    struct Group{
        uint GroupID; 
        address OwnerAddress;
        uint OwnerId;
        string GroupName;
        // UserIdentity [] Users; 
        // mapping(uint => UserIdentity) users;
        // uint usercount;
    }

    struct GroupIdentity{
        address groupAddress; 
        uint id;
    }

    mapping(address => UserInfo[]) UserMap;
    mapping(address => Group[]) GroupMap;
    mapping(address => mapping(uint => GroupIdentity[])) UserGroups;
    mapping(address => mapping(uint => UserIdentity[])) GroupUsers; 
    mapping(string => UserIdentity) emailToUser; 
    mapping(string => GroupIdentity) nameToGroup;

    address[] private userAddresses;
    UserInfo[] private all_users;
    Group[] private all_groups; 

    function AddUser (address UserAddress,string memory Email, string memory Password, string memory FullName, uint MobileNo, string memory User_DOB, string memory User_Address) public
    {
        uint user_id = UserMap[UserAddress].length;
        UserMap[UserAddress].push(UserInfo(user_id,Email, Password, FullName, MobileNo, User_DOB, User_Address));
        all_users.push(UserInfo(user_id, Email, "", FullName, MobileNo, User_DOB, User_Address));
        emailToUser[Email] = UserIdentity(UserAddress, user_id);
        bool present = false;
        for (uint i = 0; i < userAddresses.length; i++){
            if (userAddresses[i] == UserAddress){
                present = true;
                break;
            }
        }
        if (!present){
            userAddresses.push(UserAddress);
        }
    }

    function viewUser(address userAddress, uint id) public view returns(string memory FullName, uint MobileNo, string memory User_DOB, string memory User_Address)
    {
        UserInfo memory ThisUser=UserMap[userAddress][id];
        return (ThisUser.FullName, ThisUser.MobileNo, ThisUser.User_DOB, ThisUser.User_Address);
    }

    function viewUserEmail(string memory Email) public view returns(string memory FullName, uint MobileNo, string memory User_DOB, string memory User_Address)
    {
        return viewUser(emailToUser[Email].userAddress, emailToUser[Email].id);
    }

    function viewAllUsers() public view returns(UserInfo [] memory users){
        return all_users;
    }

    function viewGroupsForUser(UserIdentity memory userID) public view returns(GroupIdentity[] memory groupForUser){
        GroupIdentity [] memory uids = UserGroups[userID.userAddress][userID.id];
        return uids;
    }

    function viewGroupsForUserEmail(string memory Email) public view returns(GroupIdentity[] memory groupForUser){
        return viewGroupsForUser(emailToUser[Email]);
    }

    function login(string memory Email, string memory password) public view returns(bool result){
        UserIdentity memory userid = emailToUser[Email];
        if (keccak256(bytes(UserMap[userid.userAddress][userid.id].Password)) == keccak256(bytes(password))){
            return true;
        }
        return false; 
    }

    function getUserIdByEmail(string memory Email) public view returns(UserIdentity memory userId){
        return emailToUser[Email];
    }
    // function returnGroupsForUser() public view returns()

    // function editUser(address UserAddress, uint UserId, string calldata Login, string memory Password, string memory FullName,string memory EmailID,uint MobileNo, string memory User_DOB, string memory User_Address) 
    //         public returns(string memory Message){
    //     if (msg.sender != UserAddress){
    //         return "You don't have access to modify this user"; 
    //     }
    //     else{
    //         if (Login.length > 0)
    //             UserMap[UserAddress][UserId].Login = Login;
    //         UserMap[UserAddress][UserId].Password = Password;
    //         UserMap[UserAddress][UserId].FullName = FullName;

    //     }
    // }

    function AddGroup(address UserAddress, uint Owner_ID, string memory Group_Name) public{
        uint GroupId = GroupMap[UserAddress].length;
        GroupMap[UserAddress].push(Group(GroupId, UserAddress, Owner_ID, Group_Name));
        // GroupMap[UserAddress][GroupId].Users.push(UserIdentity(UserAddress, Owner_ID));
        GroupUsers[UserAddress][GroupId].push(UserIdentity(UserAddress, Owner_ID));
        UserGroups[UserAddress][Owner_ID].push(GroupIdentity(UserAddress, GroupId));
        all_groups.push(GroupMap[UserAddress][GroupId]);
        nameToGroup[Group_Name] = GroupIdentity(UserAddress, GroupId);
    }

    function AddUserToGroup(string memory newUserEmail, GroupIdentity memory groupId) public returns (bool succeeded){
        UserIdentity memory newUser = emailToUser[newUserEmail];
        if (groupId.groupAddress != msg.sender && groupId.groupAddress != tx.origin){
            return false; 
        } else {
            // GroupMap[groupId.groupAddress][groupId.id].Users.push(newUser);
            GroupUsers[groupId.groupAddress][groupId.id].push(newUser);
            UserGroups[newUser.userAddress][newUser.id].push(groupId);
            return true;
        }
    }

    function viewGroup(GroupIdentity memory groupID) public view returns (Group memory group){
        return GroupMap[groupID.groupAddress][groupID.id];
    }

    function getGroupId(string memory name) public view returns(GroupIdentity memory group){
        return nameToGroup[name];
    }
    
    function viewAllGroups() public view returns (Group[] memory allgGroups){
        return all_groups;
    }

    function viewUsersForGroup(GroupIdentity memory groupID) public view returns(UserIdentity[] memory usersForGroup){
        UserIdentity [] memory uids = GroupUsers[groupID.groupAddress][groupID.id];
        return uids;
    }
}
