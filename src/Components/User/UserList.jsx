import React, { useState, useEffect, useContext } from "react";
import ServiceWrapper from "../../Services/ServiceWrapper";
import AppSettings from "../../Settings/AppSettings";
import { UserContext } from "./UserContext";

function UserList() {
  const Usercontextdata = useContext(UserContext);
  var [loadError, setLoadError] = React.useState(false);
  var [userList, setuserList] = React.useState([]);
  var [loading, setLoading] = React.useState(false);

  async function get_user_list() {
    setLoading(true);
    var api_base_url = AppSettings.BACKEND_API_URL;
    let ret = await ServiceWrapper.doGet(api_base_url + "user/list");
    if (!ret.errorfound) {
      setuserList(ret.data.data);
    }
    setLoading(false);
  }

  async function delete_user(id) {
    if (!window.confirm("Do you really want to delete the selected user ?"))
      return;
    var api_base_url = AppSettings.BACKEND_API_URL;
    let ret = await ServiceWrapper.doGet(api_base_url + "user/delete/" + id);
    if (!ret.errorfound) {
      get_user_list();
    }
    setLoading(false);
  }

  async function remove_all_users() {
    if (!window.confirm("Do you really want to remove all users ?")) return;
    var api_base_url = AppSettings.BACKEND_API_URL;
    let ret = await ServiceWrapper.doGet(api_base_url + "user/reset");
    if (!ret.errorfound) {
      get_user_list();
    }
  }

  useEffect(() => {
    get_user_list();
  }, []);

  return (
    <React.Fragment>
      <div className="card border-dark mb-3">
        <div className="card-header">
          <strong>User list</strong>&nbsp;&nbsp;
          <span className="float-end">
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
          </span>
        </div>
        <div className="card-body text-dark">
          {!loading && (
            <>
              <div className="float-end">
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  onClick={() => Usercontextdata.setEditingUserID(0)}
                >
                  Add
                </button>
                {userList.length > 0 && (
                  <>
                    &nbsp;
                    <button
                      type="button"
                      className="btn btn-warning btn-sm"
                      onClick={() => remove_all_users()}
                    >
                      Remove All
                    </button>
                    &nbsp;
                    <button
                      type="button"
                      className="btn btn-light btn-sm"
                      onClick={() => get_user_list()}
                    >
                      Refresh
                    </button>
                  </>
                )}
              </div>
            </>
          )}

          <div class="table-responsive">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th scope="col">Email</th>
                  <th scope="col">Name</th>
                  <th scope="col">Country</th>
                  <th width="12%"></th>
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
                        className="fas fa-edit"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          Usercontextdata.setEditingUserID(n.id);
                        }}
                      />
                      &nbsp;
                      <i
                        className="fas fa-trash text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          delete_user(n.id);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UserList;
