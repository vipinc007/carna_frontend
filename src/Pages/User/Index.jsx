import React, { Component, useContext } from "react";
import { useHistory, Link, NavLink } from "react-router-dom";
import { UserContextProvider } from "../../Components/User/UserContext";
import UserContainer from "../../Components/User/UserContainer";

function UserManage(props) {
  const history = useHistory();
  return (
    <React.Fragment>
      <UserContextProvider>
        <UserContainer />
      </UserContextProvider>
    </React.Fragment>
  );
}

export default UserManage;
