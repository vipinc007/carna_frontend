import React, { useEffect, useContext } from "react";
import { useHistory, Link, NavLink } from "react-router-dom";
import { UserContext } from "./UserContext";
import UserAddEdit from "./UserAddEdit";
import UserList from "./UserList";

function UserContainer(props) {
  const Usercontextdata = useContext(UserContext);

  useEffect(() => {
    // object_list();
  }, []);

  return (
    <React.Fragment>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Manage Users</h1>
      </div>
      {console.log("heloo,", Usercontextdata.editingUserID)}
      <div className="row">
        <div className="col-sm-7">
          {Usercontextdata.editingUserID === null && <UserList />}
          {Usercontextdata.editingUserID !== null && <UserAddEdit />}
        </div>
        {/* <div className="col-sm-4"></div> */}
      </div>
    </React.Fragment>
  );
}

export default UserContainer;
