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
    const person = props.location.state.person
    return(
        <Box sx={{display: "flex", flexDirection: "row" ,height: "94vh"}}>
            <Box sx={{width: "35%", backgroundColor:"lightblue", display: "flex", flexDirection: "column", justifyContent: "center",}}>
                <Box sx={{width: "75%", height: "30%", backgroundColor: "white", borderRadius:"25px", marginLeft: "10%", flexDirection:"column", display:"flex", textAlign: "center", dropShadow: "16px 16px 10px black"}}>
                    <Box sx={{width: "100%", height: "50%",  textAlign: "center"}}>
                        {/* { center the cirlce for larger screens} */}
                        <Box sx={{borderRadius:"50%", backgroundColor: "black", width:"100px", height:"100px", marginLeft: "10vw", marginTop: "1vh"}}/>
                    </Box>
                    <Box sx={{width: "100%", height: "25%"}}>
                        <Typography
                            style={{
                                color: "black", 
                                textDecoration: "none",
                                fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                                fontWeight: "600",
                                fontSize: "25px",
                            }}>
                            {person.first_name + " " + person.last_name}
                        </Typography>
                    </Box>
                    <Box sx={{width: "100%", height: "25%"}}>
                        <Typography
                            style={{
                                color: "black", 
                                textDecoration: "none",
                                fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                                fontWeight: "400",
                                fontSize: "25px",
                            }}>
                            {person.occupation}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{width: "75%", height: "60%", backgroundColor: "white", borderRadius:"25px", marginLeft:"10%", marginTop: "5vh"}}>
                <p>tmp</p>

                </Box>
            </Box>
            <Box sx={{width: "65%", backgroundColor: "orange", marginLeft: "10px"}}>
                <p>tmp</p>
            </Box>
        </Box>
    )
}

export default AccountID;