import React, {useState} from "react";
import { Popover, Box, Typography } from "@mui/material";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";

const CommentButton = () => {
  const scrollTo = window.document.getElementById("Comment-Section");
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const handleClick = () => {
    scrollTo.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
  };
  return (
    <>
      <CommentOutlinedIcon
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick={handleClick}
        style={{ color: "#474747", fontSize: "24px" }}
      />
      <Popover
        id="mouse-over-popover"
        open={open}
        anchorEl={anchorEl}
        sx={{
          pointerEvents: "none",
        }}
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
    </>
  );
};

export default CommentButton;
