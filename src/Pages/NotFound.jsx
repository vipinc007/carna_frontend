import React from "react";

function NotFound(props) {
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">&nbsp;</div>
        <div className="row">&nbsp;</div>
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Oops!</h4>
          <p>
            Looks like something went wrong . We are investigating this issue.
            <br />
            Thanks for helping us to find this issue. We are sorry for the
            inconvinience caused
          </p>
          <hr />
          <p className="mb-0">
            If you are lost , Please click&nbsp;
            <a href="/">here</a>&nbsp;to go back to home page
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NotFound;
