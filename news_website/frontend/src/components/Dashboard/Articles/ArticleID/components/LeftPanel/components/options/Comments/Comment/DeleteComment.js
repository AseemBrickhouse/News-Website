import React, { useContext } from "react";
import {
  Button,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

const DeleteComment = ({ onOpen, onClose, id, account }) => {
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
              bgcolor: "blue",
              "&:hover": { bgcolor: "blue" },
            }}
            onClick={onClose}
          >
            No, cancel
          </Button>
          <Button
            variant="contained"
            disableElevation
            sx={{
              bgcolor: "custom.softRed",
              "&:hover": { bgcolor: "custom.softRed" },
            }}
            onClick={() => {
              //TODO: Add delete functionality
              //   onDel ? onDel(comId) : deleteComment(id);
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
