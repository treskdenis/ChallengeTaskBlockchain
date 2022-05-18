import React, { useState, useEffect, useRef } from 'react';
import "./App.css";
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";
import { Main } from "./Main";
import TruffleContract from "truffle-contract";
import identityManagerJson from "./backend/build/contracts/IdentityManager.json";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  
  const [loading, setLoading] = useState(true);
  const [identityManagerContract, setIdentityManagerContract] = useState({})

  // let identityManagerContract = useRef({})

  // useEffect(async () => {
  //   await loadWeb3();
  // });

  useEffect(async () => {
    await loadWeb3();
    // setIdentityManagerContract(await loadContract());
    if (loading){
      // identityManagerContract = await loadContract();
      setIdentityManagerContract(await loadContract());
      console.log("Identity Contract:", identityManagerContract);
      setLoading(false);
      // await createTestData(identityManagerContract);
      // console.log(await getUserIdByEmail(identityManagerContract, "test@user.com"));
    }

  });

  // useEffect(async () => {
  //   await testTransaction();
  // });
  const appProps = {
    identityManagerContract: identityManagerContract,
    login: login, 
    addUser: addUser, 
    viewAllUsers: viewAllUsers, 
    viewUserEmail: viewUserEmail, 
    viewUser: viewUser, 
    addGroup: addGroup, 
    viewGroup: viewGroup,
    viewAllGroups: viewAllGroups, 
    addUserToGroup: addUserToGroup, 
    viewUsersForGroup: viewUsersForGroup, 
    viewGroupsForUser: viewGroupsForUser,
    viewGroupsForUserEmail: viewGroupsForUserEmail, 
    getUserIdByEmail:getUserIdByEmail, 
    getGroupId: getGroupId
  };
  
  return (
    // <AppContainer>
    //   <AccountBox />
    // </AppContainer>
    <div className="App">
      {!loading && <Main props={appProps}> </Main>}
    </div>
    
  );
}


async function loadWeb3(){
  if (window.ethereum) {
    try {
      // await window.ethereum.enable()
      // App.web3Provider = window.web3.currentProvider
      console.log(await window.ethereum.enable());

    } catch (error) {
      console.log(error);
    }
  }
}

async function loadContract(){
  // Create a JavaScript version of the smart contract
  let identityManager = TruffleContract(identityManagerJson)
  identityManager.setProvider(window.web3.currentProvider)
  // Hydrate the smart contract with values from the blockchain
  return await identityManager.deployed()
}

async function addUser(contract, email, password, fullName, mobileNO, user_DOB, user_address){
  console.log("adding user:" + email);
  await contract.AddUser(window.ethereum.selectedAddress, email, password, fullName, mobileNO, user_DOB, user_address, {from: window.ethereum.selectedAddress});
}

async function viewAllUsers(contract){
  return await contract.viewAllUsers({from: window.ethereum.selectedAddress}); 
}

async function viewUserEmail(contract, userEmail){
  return await contract.viewUserEmail(userEmail, {from: window.ethereum.selectedAddress});
}

async function viewUser(contract, address, id){
  return await contract.viewUser(address, id, {from: window.ethereum.selectedAddress});
}

async function addGroup(contract, id, groupName){
  console.log("adding group:" + groupName);
  await contract.AddGroup(window.ethereum.selectedAddress, id, groupName, {from: window.ethereum.selectedAddress});
}

async function viewGroup(contract, groupID){
  return await contract.viewGroup(groupID,{from: window.ethereum.selectedAddress});
}

async function viewAllGroups(contract){
  return await contract.viewAllGroups({from: window.ethereum.selectedAddress});
}

async function addUserToGroup(contract, userEmail, groupId){
  return await contract.AddUserToGroup(userEmail, groupId, {from: window.ethereum.selectedAddress});
}

async function viewUsersForGroup(contract, groupId){
  return await contract.viewUsersForGroup(groupId, {from: window.ethereum.selectedAddress});
}

async function viewGroupsForUser(contract, userID){
  return await contract.viewGroupsForUser(userID, {from: window.ethereum.selectedAddress});
}

async function viewGroupsForUserEmail(contract, email){
  return await contract.viewGroupsForUserEmail(email, {from: window.ethereum.selectedAddress});
}

async function login(contract, email, password){
  return await contract.login(email, password, {from: window.ethereum.selectedAddress});
}

async function getUserIdByEmail(contract, email){
  return await contract.getUserIdByEmail(email, {from: window.ethereum.selectedAddress});
}

async function getGroupId(contract, name){
  return await contract.getGroupId(name, {from: window.ethereum.selectedAddress});
}

async function createTestData(identityManagerContract){
    await addUser(identityManagerContract, "test@user.com", "testUser1", "Test User", "12345", "01.01.1970", "test street");

    console.log(await viewAllUsers(identityManagerContract));

    console.log(await viewUserEmail(identityManagerContract, "test@user.com"));

    console.log(await viewUser(identityManagerContract, window.ethereum.selectedAddress, 0));

    await addGroup(identityManagerContract, 0, "Test group");

    console.log(await viewGroup(identityManagerContract, {groupAddress: window.ethereum.selectedAddress, id: 0}));
  
    console.log(await viewAllGroups(identityManagerContract));

    console.log(await addUserToGroup(identityManagerContract, "test@user.com", {groupAddress: window.ethereum.selectedAddress, id: 0}));
  
    console.log(await viewUsersForGroup(identityManagerContract, {groupAddress: window.ethereum.selectedAddress, id: 0}));

    console.log(await viewGroupsForUser(identityManagerContract, {userAddress: window.ethereum.selectedAddress, id: 0}));

    console.log(await viewGroupsForUserEmail(identityManagerContract, "test@user.com"));

    console.log(await getUserIdByEmail(identityManagerContract, "test@user.com"));

}
export default App;