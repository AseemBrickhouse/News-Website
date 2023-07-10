import React, { useState, useEffect } from "react";
import { Chip, ThemeProvider } from "@mui/material";
import "./css/YouTag.css";

const YouTag = () => {
  return (
    <div>
      <Chip
        label="You"
        variant="filled"
        size="small"
        sx={{
          bgcolor: "hsl(36, 33%, 78%)",
          color: "white",
          fontWeight: 500,
          borderRadius: "5px",
        }}
      />
    </div>
  );
};
export default YouTag;
