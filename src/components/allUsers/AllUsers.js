import { useState, useEffect } from "react";
import "./AllUsers.css";
import SocialCard from "./SocialCard";
import { Link, useNavigate } from "react-router-dom"; 

export function AllUsers(props) {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("userId"));
    if (!id) {
      navigate("/")
    }
    
    (async () => {
      let userData = [];
      try {
        // const response = await fetch("https://randomuser.me/api/?results=10");
        // userData = await response.json();
        const contractInterface = props.props.props; 
        userData = await contractInterface.viewAllUsers(contractInterface.identityManagerContract);
        console.log(userData);
      } catch (error) {
        console.log(error);
        userData = [];
      }
      setAllUsers(userData);
      setUsers(userData);
    })();
  }, []);

  const filterCards = event => {
    const value = event.target.value.toLowerCase();
    const filteredUsers = allUsers.filter(user => (`${user.FullName}`.toLowerCase().includes(value)));
    setUsers(filteredUsers);
  }

  return (
    <div className="AllUsers">
      <div className="first-container">
        <h1>All Users</h1>
        <Link to="/managegroups" className="styled-link">Manage Groups</Link>
      </div>
      <input className="search-box" onInput={filterCards} placeholder="Search..."/>
      <div className="cards-container">

      {users.map((user, index) => (
        <SocialCard key={index} userData={user} />
        ))}
      </div>
    </div>
  );
}
