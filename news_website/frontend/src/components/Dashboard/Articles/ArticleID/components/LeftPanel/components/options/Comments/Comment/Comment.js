import * as request from "../ApiCalls";
import React, { useState } from "react";
import moment from "moment";
import { Card, Box, Stack, Typography, Button, TextField, ThemeProvider, Avatar } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import theme from "./CustomStyles";
import YouTag from "./YouTag";
import ReplyAllOutlinedIcon from "@mui/icons-material/ReplyAllOutlined";
import DeleteComment from "./DeleteComment";
import ScoreCard from "./ScoreCard";
import ChildComments from "../CommentSection/ChildComments";

const Comment = ({ comment_id, comment, person, account }) => {
  const [openModal, setOpenModal] = useState(false);
  const [editingComm, setEditingComm] = useState(false);
  const [commentText, setCommentText] = useState(comment.content);
  const [clicked, setClicked] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

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

  return (
    <ThemeProvider theme={theme}>
      <DeleteComment
        onOpen = {openModal}
        onClose = {handleClose}
        account = {account}
        id={comment_id}
      />
      <Card style={{backgroundColor: "custom.dun"}}>
        <Box sx={{ p: "15px" }}>
          <Stack spacing={2} direction="row">
            <Box>
              <ScoreCard comment_rating={comment.rating} />
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
                  <Typography
                    sx={{ color: "custom.black", fontWeight: 500, }}
                  >
                    {`${person.first_name} ${person.last_name}`}
                  </Typography>
                  {person.email === account.email && <YouTag />}
                  <Typography sx={{ color: "custom.outerSpace", fontWeight: 400, }}>
                    {getPostedTime(comment)}
                  </Typography>                  
                  <Typography sx={{ color: "custom.outerSpace", fontWeight: 400,  }}>
                    {comment.is_edited && ("(Edited)")}
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
                      setClicked(!clicked);
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
                      bgcolor: "custom.moderateBlue",
                      color: "neutral.white",
                      p: "8px 25px",
                      "&:hover": {
                        bgcolor: "custom.lightGrayishBlue",
                      },
                    }}
                    onClick={() => {
                      !commentText.trim()
                        ? alert(
                            "If  you want to remove the comment text, just delete the comment."
                          )
                        : setEditingComm(!editingComm);
                    }}
                  >
                    Update
                  </Button>
                </>
              ) : (
                <Typography sx={{ color: "blue", p: "20px 0" }}>
                  {commentText}
                </Typography>
              )}
            </Box>
          </Stack>
        </Box>
        {Object.entries(comment.children).length > 0 && (
          <Button
            onClick={() => {
              setClicked(!clicked);
            }}
          >
            {clicked ? "Hide Replies" : "Show Replies"}
          </Button>
        )}
      </Card>
      {clicked &&
        comment.children &&
        Object.entries(comment.children).length > 0 && (
          <ChildComments
            comment_id={comment_id}
            children={comment.children}
            clicked={clicked}
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

