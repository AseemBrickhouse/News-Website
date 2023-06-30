import React, { useEffect, useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as request from "../../../../../ApiCalls/Requests";
import { Box } from "@mui/material";

const BookMarkButton = ({article, saved }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isBookmarked, setIsBookMarked] = useState(false) 

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleClick = () => {
    const bookmarkAction = isBookmarked ? "REMOVE_BOOKMARK" : "BOOKMARK_ARTICLE"
    request.handleBookMark(article.key, bookmarkAction)
    setIsBookMarked(!isBookmarked)
  };
  useEffect(() =>{
    if(!saved.loading){
        setIsBookMarked(saved.saved == null || saved.saved[article.key])
    }
  },[saved.loading])

  return (
    <Box sx={{ alignContent: "right", marginTop: "auto" }}>
      <Box onClick={handleClick}>
        {isBookmarked ? (
          <BookmarkIcon
            onL
            aria-owns={open ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            style={{ color: "#F2AF29", fontSize: "35px", zIndex: "1" }}
          />
        ) : (
          <BookmarkAddIcon
            aria-owns={open ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            style={{ color: "#C1BDBD", fontSize: "35px" }}
          />
        )}
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
          <Typography sx={{ p: 1 }}>{isBookmarked ? "Remove" : "Save"}</Typography>
        </Popover>
      </Box>
    </Box>
  );
};
const mapStateToProps = (state) => {
  return {
    saved: state.savedArticles,
  };
};
export default withRouter(connect(mapStateToProps)(BookMarkButton));
