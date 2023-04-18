import React from "react";
import { Link } from "react-router-dom";
import "./css/SubHeader.css";

//TODO: Fix Clipping issuse
const SubHeader = (props) => {
  const location = props.location.pathname == "/" && !props.isAuthenticated;

  return location ? (
    <div className="main-container-subheader">
      <h2 className="main-container-subheader-title">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </h2>
      <p className="main-container-subheader-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in
        dapibus lacus, quis commodo ipsum. Curabitur libero purus, tincidunt
        vitae urna malesuada, lacinia laoreet lorem. Maecenas nisi libero,
        venenatis nec erat ut, congue tempor lorem. Phasellus ullamcorper turpis
        a orci rutrum congue. Curabitur finibus enim lorem, in dignissim libero
        interdum bibendum.
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
