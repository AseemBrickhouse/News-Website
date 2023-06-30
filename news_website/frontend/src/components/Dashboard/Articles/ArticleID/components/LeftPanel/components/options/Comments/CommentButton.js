import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Popover, Box, Typography } from "@mui/material";

import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";

const CommentButton = ({ article, account, isAuthenticated }) => {
  console.log(article, account, isAuthenticated);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const handleOpen = () => {};
  return (
    <div>
      <CommentOutlinedIcon
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick={handleOpen}
        style={{ color: "#474747", fontSize: "24px" }}
      />
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>Comment</Typography>
      </Popover>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    account: state.auth.account,
    isAuthenticated: state?.auth?.token,
  };
};
export default withRouter(connect(mapStateToProps)(CommentButton));
