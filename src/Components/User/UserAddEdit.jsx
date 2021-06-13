import React, { useState, useEffect, useContext } from "react";
import ServiceWrapper from "../../Services/ServiceWrapper";
import AppSettings from "../../Settings/AppSettings";
import { UserContext } from "./UserContext";

function AddEditUser() {
  const Usercontextdata = useContext(UserContext);
  var [loadError, setLoadError] = React.useState(false);
  var [heading, setHeading] = React.useState("");
  var [userDetail, setuserDetail] = React.useState({});
  var [userDetailCopy, setuserDetailCopy] = React.useState({});
  var [loading, setLoading] = React.useState(false);
  let [savingInfo, setsavingInfo] = React.useState({
    done: null,
    message: "",
  });

  const initial_user_detail = () => {
    var form = {
      id: 0,
      email: "",
      name: "",
      country: "",
    };
    setuserDetail((n) => form);
    setuserDetailCopy((n) => form);
  };

  async function get_user(id) {
    setLoading(true);
    var api_base_url = AppSettings.BACKEND_API_URL;
    let ret = await ServiceWrapper.doGet(api_base_url + "user/list/" + id);
    setLoadError(ret.errorfound);
    if (!ret.errorfound) {
      setuserDetail(ret.data.data);
      setuserDetailCopy(ret.data.data);
    }
    setLoading(false);
  }

  function has_changes() {
    return JSON.stringify(userDetail) !== JSON.stringify(userDetailCopy);
  }
  function cancel_changes() {
    let temp = JSON.parse(JSON.stringify(userDetailCopy));
    setuserDetail(temp);
  }

  async function handle_change(e) {
    let temp = JSON.parse(JSON.stringify(userDetail));
    temp[e.target.name] =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setuserDetail(temp);
  }

  async function save_changes() {
    setsavingInfo(null);

    let api_base_url = AppSettings.BACKEND_API_URL;
    let res = await ServiceWrapper.doPost(
      api_base_url + "user/save/" + Usercontextdata.editingUserID,
      userDetail,
      null,
      null
    );
    if (!res.errorfound) {
      if (res.data.done) {
        setuserDetailCopy((n) => userDetail);
        setsavingInfo({
          done: true,
          message: res.data.message,
        });
      } else {
        setsavingInfo({
          done: false,
          message: res.data.message,
        });
      }
    } else {
      setsavingInfo({
        done: false,
        message: "Error while saving, Please try after some time.",
      });
    }
  }

  useEffect(() => {
    if (Usercontextdata.editingUserID > 0) {
      setHeading("Edit");
      get_user(Usercontextdata.editingUserID);
    } else {
      setHeading("Add");
      initial_user_detail();
    }
  }, [Usercontextdata.editingUserID]);

  return (
    <React.Fragment>
      <div className="card border-dark mb-3">
        <div className="card-header">{heading + " User"}</div>
        <div className="card-body text-dark">
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

          <div className="">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Enter Email"
              name="email"
              value={userDetail.email || ""}
              onChange={(e) => handle_change(e)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Enter Name"
              name="name"
              value={userDetail.name || ""}
              onChange={(e) => handle_change(e)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Country</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Enter Country"
              name="country"
              value={userDetail.country || ""}
              onChange={(e) => handle_change(e)}
            />
          </div>
          <div className="float-end">
            <button
              type="button"
              className="btn btn-success btn-sm"
              disabled={!has_changes()}
              onClick={() => save_changes()}
            >
              <i className="fa fa-check" />
              &nbsp; Save
            </button>
            &nbsp;
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => cancel_changes()}
              disabled={!has_changes()}
            >
              <i className="fa fa-undo" />
              &nbsp; Cancel
            </button>
            &nbsp;
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => Usercontextdata.setEditingUserID(null)}
            >
              <i className="fa fa-times" />
              &nbsp; Close
            </button>
          </div>
          <div className="float-start">
            {savingInfo !== null ? (
              <>
                {savingInfo.done ? (
                  <div className="alert  alert-success small p-1" role="alert">
                    <i className="far fa-check-circle" />
                    &nbsp;
                    <strong>{savingInfo.message}</strong>
                  </div>
                ) : (
                  <>
                    {savingInfo.done === false && (
                      <div
                        className="alert alert-danger small p-1"
                        role="alert"
                      >
                        <span className="fas fa-exclamation-triangle" />
                        &nbsp;
                        <strong>{savingInfo.message}</strong>
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                <div className="alert  alert-light small p-1" role="alert">
                  <span className="fas fa-circle-notch fa-spin" />
                  &nbsp;
                  <strong>Saving your Changes</strong>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddEditUser;
