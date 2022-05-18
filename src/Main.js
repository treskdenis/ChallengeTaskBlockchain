import React from 'react';
import styled from "styled-components";
import { Routes, Route } from 'react-router-dom';

import { AccountBox } from "./components/accountBox";
import { AllUsers } from "./components/allUsers/AllUsers";

import { ManageGroups } from "./components/allUsers/ManageGroups";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Main = (props) => {
  return (
    <Routes> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' element={
      	<AppContainer>
      		<AccountBox props={props}/>
      	</AppContainer> 
      }></Route>
      <Route exact path='/allusers' element={ <AllUsers props={props}/> }></Route>
      <Route exact path='/managegroups' element={ <ManageGroups props={props}/> }></Route>
    </Routes> 
  );
}
