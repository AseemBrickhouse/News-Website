import React, { useState, useEffect } from "react";
import * as accountApi from "../../Services/ApiCalls/AccountApi";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./css/EditAccount.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CustomTabPanel from "../CustomTab/CustomTab";
import Account from "./Account";
import { Box, Button, Avatar } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import EditIcon from "@mui/icons-material/Edit";
import EditOffIcon from "@mui/icons-material/EditOff";

const EditAccount = ({ account }) => {
  const StyledButton = styled(Button)({
    fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
    border: "1px solid #AD343E",
    backgroundColor: "#AD343E",
    width: "100%",
    color: "white",
    fontSize: "15px",
    fontWeight: "600",
    borderRadius: "5px",
    textTransform: "none",
    zIndex: 2,
    transition: "transform ease 0.2s, box-shadow ease 0.2s",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    "&:hover": {
      fontSize: "15px",
      fontWeight: "600",
      color: "white",
      backgroundColor: "#AD343E",
      transform: "translate(0, -3px)",
      boxShadow: "0 20px 80px -10px #AD343E",
    },
  });
  const [edit, setEdit] = useState(false);
  const [update, setUpdate] = useState(account)
  useEffect(()=>{
    setUpdate(account)
  },[account])
  console.log(update);
  const [tab, setTab] = useState(0);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  const updateValue = (key, value) => {
    setUpdate({...update, [key]: value})
  };
  const handleSubmit = (content) => {
    console.log(content);
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  return (
    <div className="edit-account-container">
      <div className="edit-account-tabs">
        <Tabs
          value={tab}
          onChange={handleChange}
          orientation="vertical"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#AD343E",
            },
          }}
          variant="soft"
          textColor="black"
          indicatorColor="#AD343E"
        >
          <Tab
            sx={{
              fontSize: "18px",
              fontWeight: "600",
              padding: "0px",
            }}
            variant="soft"
            label="Account"
            disableRipple
            {...a11yProps(0)}
          />
          <Tab
            sx={{
              fontSize: "18px",
              fontWeight: "600",
              padding: "0px",
            }}
            label="Login Details"
            disableRipple
            {...a11yProps(0)}
          />
        </Tabs>
      </div>
      <div className="account-middle-tab-panel">
        <CustomTabPanel value={tab} index={0}>
          <Account account={update} edit={edit} updateValue={updateValue} />
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={1}></CustomTabPanel>
      </div>
      <div className="edit-btn-right">
        {!edit ? (
          <StyledButton
            onClick={() => {
              setEdit(!edit);
            }}
          >
            <span style={{ marginRight: "5px" }}>Edit</span>
            <EditIcon />
          </StyledButton>
        ) : (
          <div>
            <StyledButton
              onClick={() => {
                setEdit(!edit);
              }}
            >
              <span style={{ marginRight: "5px" }}>Editing</span>
              <EditOffIcon />
            </StyledButton>
            <div style={{ marginTop: "5px" }}>
              <StyledButton>
                <span>Save</span>
              </StyledButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    account: state?.auth?.account,
  };
};
export default withRouter(connect(mapStateToProps)(EditAccount));
