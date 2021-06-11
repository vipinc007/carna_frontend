import React, { useState, useEffect, useContext } from "react";
import ServiceWrapper from "../Services/ServiceWrapper";
import AppSettings from "../Settings/AppSettings";
import { AppContext } from "../Context/AppContext";

function ObjectManager() {
  const appData = useContext(AppContext);
  var [loadError, setLoadError] = React.useState(false);
  var [objectList, setObjectList] = React.useState("");
  var [loading, setLoading] = React.useState(false);

  async function object_list() {
    setLoading(true);
    var api_base_url = AppSettings.BACKEND_API_URL;
    let ret = await ServiceWrapper.doGet(api_base_url + "object/list");
    setLoadError(ret.errorfound);
    if (!ret.errorfound) {
      setObjectList(ret.data.result);
    }
    setLoading(false);
  }

  async function object_get() {
    setLoading(true);
    var api_base_url = AppSettings.BACKEND_API_URL;
    let ret = await ServiceWrapper.doGet(api_base_url + "object/get");
    if (ret.data.result !== null) {
      appData.store_object(ret.data.result);
      await object_list();
    }
    setLoading(false);
  }

  async function object_create() {
    setLoading(true);
    var api_base_url = AppSettings.BACKEND_API_URL;
    await ServiceWrapper.doGet(api_base_url + "object/create");
    await object_list();
    setLoading(false);
  }

  async function object_free(n) {
    setLoading(true);
    var api_base_url = AppSettings.BACKEND_API_URL;
    await ServiceWrapper.doGet(api_base_url + "object/free/" + n);
    appData.remove_object(n);
    await object_list();
    setLoading(false);
  }

  async function object_reset() {
    setLoading(true);
    var api_base_url = AppSettings.BACKEND_API_URL;
    await ServiceWrapper.doGet(api_base_url + "object/reset");
    appData.store_reset();
    await object_list();
    setLoading(false);
  }

  useEffect(() => {
    object_list();
  }, []);

  return (
    <React.Fragment>
      <div className="row">
        &nbsp;
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
      <div className="row"></div>
      <div className="row"></div>
      <div className="table-responsive">
        {!loadError && (
          <React.Fragment>
            <table className="table table-bordered table-sm">
              <tbody>
                <tr>
                  <td>
                    <strong>List of objects</strong>
                  </td>
                </tr>
                <tr>
                  <td>{JSON.stringify(objectList)}</td>
                </tr>
              </tbody>
            </table>
            <button
              disabled={loading}
              onClick={() => object_create()}
              type="button"
              className="btn btn-success btn-sm"
            >
              Create
            </button>
            &nbsp;
            <button
              disabled={loading}
              onClick={() => object_get()}
              type="button"
              className="btn btn-primary btn-sm"
            >
              Get
            </button>
            &nbsp;
            <button
              disabled={loading}
              onClick={() => object_reset()}
              type="button"
              className="btn btn-secondary btn-sm"
            >
              reset
            </button>
            {appData.get_taken_objects().length > 0 && (
              <>
                <div className="row">&nbsp;</div>
                <table className="table table-bordered table-sm">
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        <strong>List of objects taken</strong>
                      </td>
                    </tr>
                    {appData.get_taken_objects().map((n) => (
                      <React.Fragment key={n}>
                        <tr>
                          <td>{n}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-success btn-sm"
                              onClick={() => object_free(n)}
                              disabled={loading}
                            >
                              Free
                            </button>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

export default ObjectManager;
