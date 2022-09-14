import React, { Component, useState, useEffect, useRef } from 'react';
import { Redirect, Link, Route } from "react-router-dom";
import { 
    Grid, Typography, TextField, 
    FormControlLabel, Avatar, Chip,
    CssBaseline, Box, MenuList, Button,
    Container, Checkbox, MenuItem, NestedMenuItem,
  } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { height, textAlign } from '@mui/system';
const FindPeople = () => {
    const[people, setPeople] = useState(null);
    const StyledButton = styled(Button)({
        backgroundColor: "black",
        textDecoration: "none",
        fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
        fontWeight: "300",
        borderRadius: "50px",
        width: "auto",
        fontSize: "15px",
        color: "white",
        marginLeft: "10%"
    });
        useEffect(async () =>{
        await fetch("/api/AllAccounts/",{
            method: "GET"
        })
        .then(response=> {
            return response.json();
        })
        .then(data=>setPeople(data))
    },[]);

    console.log(people)
    return(
        <Box sx={{
            flexDirection: "row", 
            justifyContent: "center",
            display: "flex",
            marginLeft: "20vw", 
            marginRight:"20vw", 
            marginTop:"1vh"}}>
            {
                people != null ? Object.entries(people).map(([id, Person]) =>{
                    return(
                        <Box sx={{
                            borderRadius: "25px",
                            backgroundColor: "#E0E0CE", 
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden",
                            width: "300px",
                            height: "auto",
                            margin: "5px"
                            }}>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                // backgroundColor: "purple",
                                width: "100%",
                                height: "auto"
                            }}>
                                <Box sx={{width: "100%",height:"150px", display: "flex", flexDirection: "row"}}>
                                    <Box sx={{width: "35%",}}>
                                        <Box sx={{
                                            marginLeft: "25%",
                                            marginTop: "25%",
                                            height: "50px",
                                            width: "50px",
                                            backgroundColor: "black",
                                            borderRadius: "50%",
                                        }}>  
                                        </Box>
                                    </Box>
                                    <Box sx={{
                                        width: "75%",
                                        height: "auto",
                                        // backgroundColor: "lightskyblue",
                                    }}>
                                        <Box sx={{textAlign: "center"}}>
                                            <Typography
                                            style={{
                                                marginTop: "10%",
                                                color: "black",  
                                                textDecoration: "none",
                                                fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                                                fontWeight: "400",
                                            }}
                                            >
                                                {Person.first_name} {Person.last_name}
                                            </Typography>
                                        </Box>
                                        <Box sx={{textAlign: "center"}}>
                                            <Typography
                                            style={{
                                                color: "black", 
                                                textDecoration: "none",
                                                fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                                                fontWeight: "400",
                                            }}
                                            >
                                                {Person.occupation}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box sx={{width: "100%",maxHeight:"30%", display: "flex", flexDirection: "row"}}>
                                    <Box sx={{width: "50%", textAlign: "center"}}>
                                        <Typography
                                            style={{
                                                marginTop: "3px",
                                                color: "black", 
                                                textDecoration: "none",
                                                fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                                                fontWeight: "600",
                                            }}
                                        >
                                            Followers
                                        </Typography>
                                        <Typography
                                            style={{
                                                color: "black", 
                                                textDecoration: "none",
                                                fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                                                fontWeight: "400",
                                            }}
                                        >
                                            1249104
                                        </Typography>
                                    </Box>
                                    <Box sx={{width: "50%", textAlign: "center"}}>
                                        <Typography
                                            style={{
                                                marginTop: "3px",
                                                color: "black", 
                                                textDecoration: "none",
                                                fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                                                fontWeight: "600",
                                            }}
                                        >
                                            Written Articles
                                        </Typography>
                                        <Typography
                                            style={{
                                                color: "black", 
                                                textDecoration: "none",
                                                fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                                                fontWeight: "400",
                                            }}
                                        >
                                            {Person.written_articles}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{
                                // backgroundColor: "red",
                                display: "flex",
                                flexDirection: "row",
                                width: "100%",
                                height: "50%",
                                overflow: "hidden",
                                justifyContent: "center"
                                }}>
                                    <Box sx={{width: "100%", height:"100%", display: "flex", flexDirection:"row",marginTop: "5px"}}>
                                        <Box sx ={{width:"50%", backgroundColor: "lightblue", height:"100%", textAlign: "center", margin: "auto"}}>
                                            Follow
                                        </Box>
                                        <Box sx ={{width:"50%", backgroundColor: "lightgreen"}}>  
                                            View Profile
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    )
                })
                : console.log(people)
            }
        </Box>
    )
}

export default FindPeople;