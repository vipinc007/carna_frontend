import React, { useState, useEffect, useContext } from "react";
import ServiceWrapper from "../../Services/ServiceWrapper";
import AppSettings from "../../Settings/AppSettings";
import { AppContext } from "../../Context/AppContext";
import { UserContext } from "./UserContext";

function UserList() {
  const appData = useContext(AppContext);
  const Usercontextdata = useContext(UserContext);
  var [loadError, setLoadError] = React.useState(false);
  var [userList, setuserList] = React.useState([]);
  var [loading, setLoading] = React.useState(false);

  async function get_user_list() {
    setLoading(true);
    var api_base_url = AppSettings.BACKEND_API_URL;
    let ret = await ServiceWrapper.doGet(api_base_url + "user/list");
    setLoadError(ret.errorfound);
    if (!ret.errorfound) {
      setuserList(ret.data.result);
    }
    setLoading(false);
  }

  useEffect(() => {
    get_user_list();
  }, []);

  return (
    <React.Fragment>
      <div className="card border-dark mb-3">
        <div className="card-header">User list</div>
        <div className="card-body text-dark">
          <div className="float-start">
            {loading && (
              <>
                <span
                  className="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
                Loading.....
              </>
            )}
          </div>
          <div className="float-end">
            <button
              type="button"
              className="btn btn-success btn-sm"
              onClick={() => Usercontextdata.setEditingUserID(0)}
            >
              <i className="fa fa-check" />
              &nbsp; Add
            </button>
          </div>

          <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">Email</th>
                <th scope="col">Name</th>
                <th scope="col">Country</th>
                <th width="2%"></th>
              </tr>
            </thead>
            <tbody>
              {userList.map((n) => (
                <tr key={n.id}>
                  <td>{n.email}</td>
                  <td>{n.name}</td>
                  <td>{n.country}</td>
                  <td>
                    <i
                      className="fas fa-edit fa-sm float-end"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        Usercontextdata.setEditingUserID(n.id);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UserList;
