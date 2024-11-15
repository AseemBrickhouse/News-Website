import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import EditOffIcon from "@mui/icons-material/EditOff";
import { styled } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

export const EditAccountButton = ({content, color, fn, spanStyle, isEditing}) => {
    const StyledButton = styled(Button)({
        fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
        border: "1px solid " + color,
        backgroundColor: color,
        width: "100%",
        color: "white",
        fontSize: "15px",
        fontWeight: "600",
        borderRadius: "5px",
        textTransform: "none",
        zIndex: 2,
        transition: "transform ease 0.2s, box-shadow ease 0.2s",
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        "&:hover": {
          fontSize: "15px",
          fontWeight: "600",
          color: "white",
          backgroundColor: color,
          transform: "translate(0, -3px)",
          boxShadow: "0 20px 80px -10px #AD343E",
        },
    });
    return(
        <StyledButton onClick={fn}>
            <span style={spanStyle}>{content}</span>
            {isEditing ? <EditOffIcon/> : <EditIcon/>}
        </StyledButton>
    )
}