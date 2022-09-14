import React, { Component, useState, useEffect, useRef } from 'react';
import { Redirect, Link, Route } from "react-router-dom";
import { 
    Grid, Typography, TextField, 
    FormControlLabel, Avatar, Chip,
    CssBaseline, Box, MenuList, Button,
    Container, Checkbox, MenuItem, NestedMenuItem,
  } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

const FindPeople = () => {
    const[people, setPeople] = useState(null);
    const[load, setLoad] = useState(false);

        useEffect(async () =>{
        await fetch("/api/AllAccounts/",{
            method: "POST",
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: localStorage.getItem('token'),
            })
        })
        .then(response=> {
            return response.json();
        })
        .then(data=>{
            // console.log(data)
            setLoad(true)
            setPeople(data)
        })
    },[load]);

    const follow = (person) =>{
            fetch("/api/Follow/", {
                method: "POST",
                headers:{
                    'Accept':'application/json',
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({
                    token: localStorage.getItem('token'),
                    toFollow: person,
                })
            })
            .then(response=>{
                return response.json()
            })
            .then(data=>{
                setLoad(false)
                // console.log(data)
            })

    }
    const unFollow = (person)=>{
        fetch("/api/unFollow/", {
            method: "POST",
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                token: localStorage.getItem('token'),
                toUnFollow: person,
        })
        })
        .then(response=>{
            return response.json()
        })
        .then(data=>{
            setLoad(false)
            // console.log(data)
        })
    }

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
                                            {Person.followers}
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
                                display: "flex",
                                flexDirection: "row",
                                width: "100%",
                                height: "50%",
                                overflow: "hidden",
                                justifyContent: "center"
                                }}>
                                    <Box sx={{width: "100%", height:"100%", display: "flex", flexDirection:"row",marginTop: "5px"}}>
                                        {
                                            Person.is_following == true ?
                                            <Box sx ={{
                                            width:"50%", 
                                            // backgroundColor: "lightblue", 
                                            height:"100%", 
                                            textAlign: "center", 
                                            "&:hover":{
                                                content: "Following",
                                                color: 'gray',
                                                backgroundColor: "#AD343E",
                                            },
                                            }}
                                            onClick={()=>unFollow(Person)}
                                            >
                                                <Typography style={{
                                                    marginTop: "25%",
                                                    color: "black", 
                                                    textDecoration: "none",
                                                    fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                                                    fontWeight: "600",

                                                }}>
                                                    Unfollow
                                                </Typography>
                                            </Box>
                                            :
                                            <Box sx ={{
                                                width:"50%", 
                                                // backgroundColor: "lightblue", 
                                                height:"100%", 
                                                textAlign: "center", 
                                                "&:hover":{
                                                    color: 'gray',
                                                    backgroundColor: "#F2AF29"
                                                },
                                            }}
                                            onClick={()=>follow(Person)}
                                            >
                                                <Typography style={{
                                                    marginTop: "25%",
                                                    color: "black", 
                                                    textDecoration: "none",
                                                    fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                                                    fontWeight: "600",
    
                                                }}>
                                                    Follow
                                                </Typography>
                                            </Box>
                                        }
                                        <Box sx={{
                                            width:"50%",
                                            height:"100%",
                                            "&:hover":{
                                                color: 'gray',
                                                backgroundColor: "#F2AF29"
                                            },
                                        }}>
                                        <Link
                                            style={{
                                                textDecoration: "none",
                                                color: "black",
                                                underline: "none",
                                              }}
                                              to={{
                                                pathname: '/Account/People/' + Person.key + '/',
                                                state: { 
                                                  key: Person.key,
                                                  person: Person,
                                                },  
                                               }}
                                            >
                                            <Box sx ={{
                                                width:"100%", 
                                                // backgroundColor: "lightgreen", 
                                                height:"100%", 
                                                textAlign: "center",
                                                "&:hover":{
                                                  color: 'gray',
                                                  backgroundColor: "#F2AF29"
                                                },
                                            }}>  
                                                <Typography style={{
                                                    marginTop: "25%",
                                                    color: "black", 
                                                    textDecoration: "none",
                                                    fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                                                    fontWeight: "600",
                                                }}>
                                                    View Profile
                                                </Typography>
                                            </Box>
                                        </Link>
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