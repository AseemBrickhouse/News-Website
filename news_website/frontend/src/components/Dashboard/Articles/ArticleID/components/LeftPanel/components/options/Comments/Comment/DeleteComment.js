import React, {} from "react";
import {
  Button,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import * as request from "../ApiCalls";

const DeleteComment = ({ onOpen, onClose, id, article, deleteRef }) => {

  const handleDelete = async () => {
    await request.DeleteComment(id, article?.key);
    if (deleteRef) {
      deleteRef();
    }
    
  };
  return (
    <Dialog open={onOpen} onClose={onClose}>
      <DialogContent sx={{ maxWidth: "430px" }}>
        <DialogTitle sx={{ p: "0", marginBottom: "20px" }}>
          Delete comment
        </DialogTitle>
        <Typography
          component="p"
          sx={{ marginBottom: "20px", color: "neutral.grayishBlue" }}
        >
          Are you sure you want to delete this comment? This will remove the
          comment and it can't be undone.
        </Typography>
        <Stack direction="row" display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            disableElevation
            sx={{
              bgcolor: "custom.dun",
              transition: "transform ease 0.2s, box-shadow ease 0.2s",
              "&:hover": {
                bgcolor: "custom.dun",
                transform: "translate(0, -3px)",
                boxShadow: "0 20px 80px -10px #D9CAB3",
              },
            }}
            onClick={onClose}
          >
            No, cancel
          </Button>
          <Button
            variant="contained"
            disableElevation
            sx={{
              bgcolor: "custom.cardinal",
              transition: "transform ease 0.2s, box-shadow ease 0.2s",
              "&:hover": {
                bgcolor: "custom.cardinal",
                transform: "translate(0, -3px)",
                boxShadow: "0 20px 80px -10px #AD343E",
              },
            }}
            onClick={() => {
              handleDelete();
              onClose();
            }}
          >
            Yes, delete
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteComment;
