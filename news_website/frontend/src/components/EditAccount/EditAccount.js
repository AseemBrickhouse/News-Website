import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./css/EditAccount.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CustomTabPanel from "../CustomTab/CustomTab";
import Account from "./Account";
import { EditAccountButton } from "../Buttons/EditAccount/EditAccountButton";
import * as accountApi from "../../Services/ApiCalls/AccountApi";
import * as authActions from "../../store/actions/auth";

const EditAccount = ({ account, ...props}) => {
  const [isEditing, setIsEditing] = useState(false);

  const [accountData, setAccountData] = useState(account)
  const [updateAccountData, setUpdateAccountData] = useState(account)

  useEffect(()=>{
    if(isEditing){
      setAccountData(updateAccountData)
      setIsEditing(!isEditing)
    }else{
      setAccountData(account)
    }
  },[account])

  const [tab, setTab] = useState(0);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  const updateValue = (key, value) => {
    setUpdateAccountData({...updateAccountData, [key]: value})
  };
  const handleSubmit = async () => {
    if(isEditing){
      await accountApi.EditAccount(updateAccountData)
      setAccountData(updateAccountData)
      props.updateStateAccountInformation(updateAccountData)
    }
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
              textAlign: "left",
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
              padding: "15px",
              alignItems: 'flex-end',
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
              padding: "15px",
              alignItems: 'flex-end',
            }}
            label="Login Details"
            disableRipple
            {...a11yProps(0)}
          />
        </Tabs>
      </div>
      <div className="account-middle-tab-panel">
        <CustomTabPanel value={tab} index={0}>
          <Account account={account} isEditing={isEditing} updateValue={updateValue} />
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={1}>
          
        </CustomTabPanel>
      </div>
      <div className="edit-btn-right">
        {!isEditing ? (
          <EditAccountButton
            content={"Edit"}
            color="#AD343E"
            fn={() => setIsEditing(!isEditing)}
            spanStyle={
              {marginRight: "5px",}
            }
            isEditing={isEditing}
          />

        ) : (
          <div>
            <EditAccountButton
              content={"Edit"}
              color="#B2D9C1"
              fn={() => setIsEditing(!isEditing)}
              isEditing={isEditing}
            />
            <EditAccountButton
              style={{
                marginTop: '10px'
              }}
              content={"Save"}
              color="#AD343E"
              fn={() => {handleSubmit()}}
              spanStyle={
                {marginRight: "5px",}
              }
            />
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
const mapDispatchToProps = (dispatch) => {
  return {
    updateStateAccountInformation: (updateAccountData) => dispatch(authActions.updateAuthInformation(updateAccountData)),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditAccount));
