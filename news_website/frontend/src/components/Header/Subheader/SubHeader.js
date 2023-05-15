import React from "react";
import { Link } from "react-router-dom";
import "./css/SubHeader.css";

//TODO: Fix Clipping issuse
const SubHeader = (props) => {
  const location = props.location.pathname == "/" && !props.isAuthenticated;

  return location ? (
    <div className="main-container-subheader">
      <h2 className="main-container-subheader-title">
        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.
      </h2>
      <p className="main-container-subheader-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in
        dapibus lacus, quis commodo ipsum. Curabitur libero purus, tincidunt
        vitae urna malesuada, lacinia laoreet lorem.
      </p>
      <div className="main-container-subheader-button">
        <Link className="main-container-subheader-link" to="/SignUp">
          Start Now
        </Link>
      </div>
    </div>
  ) : null;
};
export default SubHeader;
