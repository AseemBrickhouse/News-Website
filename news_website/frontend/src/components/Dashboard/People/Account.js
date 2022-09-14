import React, { Component, useState, useEffect, useRef } from 'react';
import { Redirect, Link, Route } from "react-router-dom";
import { 
    Grid, Typography, TextField, 
    FormControlLabel, Avatar, Chip,
    CssBaseline, Box, MenuList, Button,
    Container, Checkbox, MenuItem, NestedMenuItem,
  } from "@material-ui/core";

const AccountID = (props) =>{
    console.log(props.location.state)
    return(
        <Box sx={{display: "flex", flexDirection: "row" , backgroundColor: "red"}}>
            <Box sx={{width: "33%", backgroundColor:"lightblue"}}>
d
            </Box>
            <Box sx={{width: "66%", backgroundColor: "orange", marginLeft: "10px"}}>
g
            </Box>
        </Box>
    )
}

export default AccountID;