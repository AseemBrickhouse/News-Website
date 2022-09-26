import React, { Component, useState, useEffect, useRef } from 'react';
import { Redirect, Link, Route } from "react-router-dom";
import { 
    Grid, Typography, TextField, 
    FormControlLabel, Avatar, Chip,
    CssBaseline, Box, MenuList, Button,
    Container, Checkbox, MenuItem, NestedMenuItem,
  } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

const Following = () => {
    const[people, setPeople] = useState(null);
    const[load, setLoad] = useState(false);

        useEffect(async () =>{
        await fetch("/api/myFollowing/",{
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
            console.log(data)
            setLoad(true)
            setPeople(data)
        })
    },[load]);
    const StyledTypography = styled(Typography)({
        color: "black", 
        textDecoration: "none",
        fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
        fontWeight: "400",
    })
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
                console.log(data)
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
                people != null ? Object.entries(people).map(([key, Person]) =>{
                    return(
                        <Box sx={{
                            borderRadius: "25px",
                            backgroundColor: "#D9CAB3", 
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
                                <Box sx={{width: "35%", height: "100%"}}>
                                    <Box sx={{
                                        marginLeft: "50%",
                                        marginTop: "25%",
                                        height: "50px",
                                        width: "50px",
                                        // backgroundColor: "black",
                                        borderRadius: "50%",
                                    }}>  
                                        {
                                            Person.profile_pic != null ?
                                            <Avatar 
                                                alt={Person.first_name = Person.last_name} 
                                                src={Person.profile_pic}
                                                sx={{
                                                    width: 125,
                                                    height: 125,
                                                }}
                                            />
                                            :
                                            <Avatar 
                                                alt={Person.first_name = Person.last_name} 
                                                src="/images/defaultProfilePic.png"
                                                sx={{
                                                    margin: "auto",
                                                    width: 125,
                                                    height: 125,
                                                }}
                                            />
                                        }
                                    </Box>
                                    </Box>
                                    <Box sx={{
                                        width: "75%",
                                        height: "100%",
                                        // backgroundColor: "lightskyblue",
                                        marginTop: "5%"
                                    }}>
                                        <Box sx={{textAlign: "center"}}>
                                            <StyledTypography>
                                                {Person.first_name} {Person.last_name}
                                            </StyledTypography>
                                        </Box>
                                        <Box sx={{textAlign: "center"}}>
                                            <StyledTypography>
                                                {Person.occupation}
                                            </StyledTypography>
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
                                        <StyledTypography>
                                            {Person.followers}
                                        </StyledTypography>
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
                                        <StyledTypography>
                                            {Person.written_articles}
                                        </StyledTypography>
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
                : <></>
            }
        </Box>
    )
}

export default Following;