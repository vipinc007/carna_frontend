import React from "react";
import { useHistory, Link, NavLink } from "react-router-dom";

function Home(props) {
  const history = useHistory();
  return (
    <React.Fragment>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Home</h1>
      </div>
      <div className="row">
        <div className="col-sm-4">
          <div className="card border-dark mb-3">
            {/* <div className="card-header">Taxonomy</div> */}
            <div className="card-body text-dark">
              <h5 className="card-title">Users</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => history.replace("/gms/dashboard")}
              >
                Explore
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card border-dark mb-3">
            {/* <div className="card-header">Products</div> */}
            <div className="card-body text-dark">
              <h5 className="card-title">Courses</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => history.replace("/catalog/dashboard")}
              >
                Explore
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
