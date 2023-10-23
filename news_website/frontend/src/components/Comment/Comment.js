import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Card,
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  ThemeProvider,
  Avatar,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import theme from "./components/CustomStyles";
import YouTag from "./components/YouTag";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";
import DeleteComment from "./components/DeleteComment"
import ScoreCard from "./components/ScoreCard";
import ChildComments from "./ChildComments";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import AddComment from "./AddComment";
import * as request from "../ApiCalls/Comment";
const Comment = ({
  comment_id,
  comment,
  person,
  account,
  article,
  parentName,
  onUpdateComments,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [editingComm, setEditingComm] = useState(false);
  const [commentText, setCommentText] = useState(comment.content);
  const [clicked, setClicked] = useState(false);
  const [openReply, setOpenReply] = useState(false);
  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleReplySubmit = () => {
    setOpenReply(!openReply)
    setClicked(true)
  }
  const getPostedTime = ({ created_at }) => {
    const createdAtDate = new Date(created_at);
    const currentDate = new Date();

    const timeDiff = currentDate - createdAtDate;

    const seconds = Math.floor(timeDiff / 1000) % 60;
    const minutes = Math.floor(timeDiff / 1000 / 60) % 60;
    const hours = Math.floor(timeDiff / 1000 / 60 / 60) % 24;
    const days = Math.floor(timeDiff / 1000 / 60 / 60 / 24);

    let formattedTimeAgo;

    if (days > 1) {
      formattedTimeAgo = `${days} days`;
    } else if (hours >= 1) {
      formattedTimeAgo = `${hours} hours`;
    } else if (minutes >= 1) {
      formattedTimeAgo = `${minutes} minutes`;
    } else {
      formattedTimeAgo = `${seconds} seconds`;
    }
    return <span>{formattedTimeAgo} ago</span>;
  };
  const UpdateComment = async () => {
    setEditingComm(!editingComm);
    await request.UpdateComment(comment_id, article?.key, commentText);
  };
  return (
    <ThemeProvider theme={theme}>
      <DeleteComment
        deleteRef={onUpdateComments}
        onOpen={openModal}
        onClose={handleClose}
        account={account}
        id={comment_id}
        article={article}
      />
      <Card style={{ backgroundColor: "custom.dun", borderRadius: "15px" }}>
        <Box
          sx={{
            p: "15px",
            boxShadow: "inset 0px 0px .5px .2px black",
            borderRadius: "15px",
          }}
        >
          <Stack spacing={2} direction="row">
            <Box>
              <ScoreCard
                comment_id={comment_id}
                article_key={article.key}
                comment_rating={comment.rating}
                comment_vote={comment.comment_vote}
              />
            </Box>
            <Box sx={{ width: "100%" }}>
              <Stack
                spacing={2}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack spacing={2} direction="row" alignItems="center">
                  <Avatar
                    alt={`${person.first_name} ${person.last_name}`}
                    src={person.profile_pic || "/images/defaultProfilePic.png"}
                    style={{
                      height: "40px",
                      width: "40px",
                    }}
                  />
                  <Typography sx={{ color: "custom.black", fontWeight: 500 }}>
                    {`${person.first_name} ${person.last_name}`}
                  </Typography>
                  {person.email === account.email && <YouTag />}
                  <Typography
                    sx={{ color: "custom.outerSpace", fontWeight: 400 }}
                  >
                    {getPostedTime(comment)}
                  </Typography>
                  <Typography
                    sx={{ color: "custom.outerSpace", fontWeight: 400 }}
                  >
                    {comment.is_edited && "(Edited)"}
                  </Typography>
                </Stack>
                {person.email === account.email ? (
                  <Stack direction="row" spacing={1}>
                    <Button
                      startIcon={<Delete />}
                      sx={{
                        color: "custom.cardinal",
                        fontWeight: 500,
                        textTransform: "capitalize",
                      }}
                      onClick={() => {
                        handleOpen();
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="text"
                      disabled={editingComm}
                      sx={{
                        fontWeight: 500,
                        textTransform: "capitalize",
                        color: "custom.dun",
                      }}
                      startIcon={<Edit />}
                      onClick={() => setEditingComm(!editingComm)}
                    >
                      Edit
                    </Button>
                  </Stack>
                ) : (
                  <Button
                    onClick={() => {
                      setOpenReply(!openReply);
                    }}
                    variant="text"
                    sx={{
                      fontWeight: 500,
                      textTransform: "capitalize",
                      color: "custom.dun",
                    }}
                    startIcon={<ReplyAllOutlinedIcon />}
                  >
                    Reply
                  </Button>
                )}
              </Stack>
              {editingComm ? (
                <>
                  <TextField
                    sx={{ p: "20px 0" }}
                    multiline
                    fullWidth
                    minRows={4}
                    id="outlined-multilined"
                    placeholder="Don't leave this blank!"
                    value={commentText}
                    onChange={(e) => {
                      setCommentText(e.target.value);
                    }}
                  />
                  <Button
                    sx={{
                      float: "right",
                      color: "custom.dun",
                      p: "8px 25px",
                      "&:hover": {
                        bgcolor: "white",
                      },
                    }}
                    onClick={() => {
                      !commentText.trim()
                        ? alert(
                            "If  you want to remove the comment text, just delete the comment."
                          )
                        : UpdateComment();
                    }}
                  >
                    Update
                  </Button>
                </>
              ) : (
                <Typography sx={{ p: "20px 0px" }}>
                  {parentName && (
                    <span
                      style={{ color: "hsl(355, 54%, 44%)", fontWeight: "600" }}
                    >{`@${parentName} `}</span>
                  )}
                  <span style={{ color: "custom.black", fontWeight: "400" }}>
                    {commentText}
                  </span>
                </Typography>
              )}
              <Stack style={{ justifyContent: "left" }}>
                {Object.entries(comment.children).length > 0 && (
                  <Button
                    style={{ justifyContent: "left" }}
                    onClick={() => {
                      setClicked(!clicked);
                    }}
                    sx={{
                      "&:hover": {
                        backgroundColor: "white",
                      },
                    }}
                  >
                    <Stack
                      sx={{
                        fontWeight: 500,
                        textTransform: "capitalize",
                        color: "custom.dun",
                      }}
                    >
                      {clicked ? (
                        <Stack direction="row" spacing={1}>
                          <VisibilityOffOutlinedIcon />
                          <span>{`Hide replies`}</span>
                        </Stack>
                      ) : (
                        <Stack direction="row" spacing={1}>
                          <VisibilityOutlinedIcon />
                          <span>{`Show replies ( ${
                            Object.entries(comment.children).length
                          } )`}</span>
                        </Stack>
                      )}
                    </Stack>
                  </Button>
                )}
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Card>
      {openReply && (
        <AddComment
          article={article}
          parentID={comment_id}
          onClose={handleReplySubmit}
          onUpdateComments={onUpdateComments}
        />
      )}
      {clicked &&
        comment.children &&
        Object.entries(comment.children).length > 0 && (
          <ChildComments
            comment_id={comment_id}
            children={comment.children}
            clicked={clicked}
            article={article}
            parentName={`${comment.commenter_account.first_name} ${comment.commenter_account.last_name}`}
            onUpdateComments={onUpdateComments}
          />
        )}
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state?.auth?.account,
  };
};

export default withRouter(connect(mapStateToProps)(Comment));
