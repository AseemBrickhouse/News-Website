import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import theme from "./components/CustomStyles";
import * as request from "../../Services/ApiCalls/CommentApi";

import {
  Avatar,
  Button,
  Card,
  Stack,
  TextField,
  ThemeProvider,
  Box,
} from "@mui/material";

const AddComment = ({ article, account, isAuthenticated, onUpdateComments, parentID, onClose }) => {
  const [commentText, setCommentText] = useState("");
  const handleCreateComment = async () => {
    const trimmedCommentText = commentText.trim();
    if (trimmedCommentText !== "") {
      const requestParams = [
        article.key, 
        trimmedCommentText,
        parentID,
      ]
      await request.CreateComment(...requestParams);
      setCommentText("");
      if (onUpdateComments) {
        onUpdateComments();
        onClose();
      }
    }
  };
  return isAuthenticated && (
    <ThemeProvider theme={theme} id="add-comment">
      <Card>
        <Box sx={{ p: "15px" }}>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Avatar
              alt={`${account.first_name} ${account.last_name}`}
              src={account.profile_pic || "/images/defaultProfilePic.png"}
              style={{
                height: "40px",
                width: "40px",
              }}
            />
            <TextField
              multiline
              fullWidth
              minRows={4}
              id="outlined-multilined"
              placeholder="Add a comment"
              value={commentText}
              onChange={(e) => {
                setCommentText(e.target.value);
              }}
            />
            <Button
              size="large"
              sx={{
                bgcolor: "custom.dun",
                color: "white",
                p: "8px 25px",
                "&:hover": {
                  bgcolor: "custom.cardinal",
                },
              }}
              onClick={(e) => {
                !commentText.trim()
                  ? e.preventDefault()
                  : handleCreateComment();
                setCommentText("");
              }}
            >
              Send
            </Button>
          </Stack>
        </Box>
      </Card>
    </ThemeProvider>
  );
};
const mapStateToProps = (state) => {
  return {
    account: state.auth.account,
    isAuthenticated: state?.auth?.token,
  };
};
export default withRouter(connect(mapStateToProps)(AddComment));
