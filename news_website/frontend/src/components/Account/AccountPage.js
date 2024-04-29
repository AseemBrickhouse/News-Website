import React from "react";
import "./css/AccountPage.css";
import { Box } from "@mui/material";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AccountLeft from "./AccountLeft/AccountLeft";
import AccountRight from "./AccountRight/AccountRight";
import StickyBox from "react-sticky-box";
// import useAccountArticleFetcher from "../../Hooks/AccountHooks/useAccountArticleFetcher";

const AccountPage = (props) => {
  const { key, person } = props.location.state;
  return (
    <div className="account-page-container">
      <Box className="main-container-leftpanel">
        <AccountLeft key={key} person={person} />
      </Box>
      {/* No Clue why I have to put 2 sticky boxes to make it work */}
      <StickyBox offsetTop={75} 
      style={{
        height: 'fit-content',
      }}
      >
        <StickyBox offsetTop={75}>
          <Box className="main-container-rightpanel">
            <Box
              sx={{
                // alignContent: "flex-start",
                justifyContent: "center",
              }}
            >
              <AccountRight person={person} />
            </Box>
          </Box>
        </StickyBox>
      </StickyBox>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state?.auth?.account,
  };
};
export default withRouter(connect(mapStateToProps)(AccountPage));
