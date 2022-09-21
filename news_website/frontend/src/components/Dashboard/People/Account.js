import React, { Component, useState, useEffect, useRef } from 'react';
import { Redirect, Link, Route } from "react-router-dom";
import { 
    Grid, Typography, TextField, 
    FormControlLabel, Avatar, Chip,
    CssBaseline, Box, MenuList, Button,
    Container, Checkbox, MenuItem, NestedMenuItem,
  } from "@material-ui/core";

const AccountID = (props) =>{
    const [load, setLoad] = useState(false)
    useEffect(()=>{
        
    }, [load])
    console.log(props.location.state)
    const person = props.location.state.person
    return(
        <Box sx={{display: "flex", flexDirection: "row" ,height: "94vh"}}>
            <Box sx={{width: "35%", backgroundColor:"lightblue", display: "flex", flexDirection: "column", justifyContent: "center",}}>
                <Box sx={{width: "75%", height: "30%", backgroundColor: "white", borderRadius:"25px", marginLeft: "10%", flexDirection:"column", display:"flex", textAlign: "center", dropShadow: "16px 16px 10px black"}}>
                    <Box sx={{width: "100%", height: "50%",  textAlign: "center"}}>
                        {/* { center the cirlce for larger screens} */}
                        {/* <Box sx={{borderRadius:"50%", backgroundColor: "black", width:"100px", height:"100px", marginLeft: "10vw", marginTop: "1vh"}}/> */}
                        <p>Account img</p>
                    </Box>
                    <Box sx={{width: "100%", height: "20%"}}>
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
                <Box sx={{width: "75%", height: "60%", backgroundColor: "white", borderRadius:"25px", marginLeft:"10%", marginTop: "5vh", flexDirection: "column", display: "flex"}}>
                    <Box sx={{marginLeft: "10px", marginRight: "10px"}}>
                    <p>{person.bio}</p>
                    </Box>
                    <Box sx={{justifyContent: "space-between", display: "flex", flexDirection: "row", marginLeft: "10px", marginRight: "10px"}}>
                        <p>Email: </p>
                        <p>{person.email}</p>
                    </Box>
                    <Box sx={{justifyContent: "space-between", display: "flex", flexDirection: "row", marginLeft: "10px", marginRight: "10px"}}>
                        <p>Phone: </p>
                        <p>{person.phone}</p>
                    </Box>

                </Box>
            </Box>
            <Box sx={{width: "65%", backgroundColor: "orange", marginLeft: "10px"}}>
                <p>tmp</p>
            </Box>
        </Box>
    )
}

export default AccountID;