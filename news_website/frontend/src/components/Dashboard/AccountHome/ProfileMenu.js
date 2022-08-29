import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from "@material-ui/core/styles";
import { Redirect, Link } from "react-router-dom";
import { 
    Grid, Typography, TextField, 
    FormControlLabel, Avatar, 
    CssBaseline, Box, MenuList,
    Container, Checkbox, MenuItem, NestedMenuItem,
  } from "@material-ui/core";

import CircleIcon from '@mui/icons-material/Circle';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

class ProfileMenu extends React.Component{
    constructor(props){
        super(props)
    }
    Menu = () =>{
        const StyledButton = styled(Button)({
            // fontFamily: "Inter",
            color: "black",
            textDecoration: "underline",
            fontSize: "18px",
            fontWeight: "bold",
            // letterSpacing: ".1rem",
            textTransform: "none",
            textUnderlineOffset: "3px",
            padding: "10px 25px",
            textDecoration: "none",
          });

        return(
            <div>
                {/* <div className='menu'>
                    <div  className='items'>
                        <Link to ='/Account/Profile' {...this.props}><StyledButton>My Profile</StyledButton></Link>
                        <Link to ='/Account/EditAccount' {...this.props}><StyledButton>Edit Account</StyledButton></Link>
                    </div>
                    <div  className='items'>
                        <Link to ='/Account/Articles'  {...this.props}><StyledButton>My Articles</StyledButton></Link>
                    </div>
                    <div  className='items'>
                        <Link to ='/Account/Followers'  {...this.props}><StyledButton>Followers</StyledButton></Link>
                    </div>
                </div> */}
                <div>

                </div>

            </div>
        )
    }
    test =() =>{
        return (
            <div>
                <Box className = "profileContainerTest" sx={{ display: 'inline-flex', flexDirection: 'row', marginTop: "1vh"}}>
                    <Box className="profileLeft"sx={{ flexDirection: 'column',  height: "90vh"}}>
                        <MenuList>
                            <MenuItem>
                                    Profile
                            </MenuItem>
                            <MenuItem>
                                    Edit Profile
                            </MenuItem>
                            <MenuItem>
                                <Typography>
                                    My Articles
                                </Typography>
                            </MenuItem>
                            <MenuItem>
                                <Typography>
                                    Followers
                                </Typography>
                            </MenuItem>
                        </MenuList>
                    </Box>
                    <Box className ="profileMiddle" sx={{ flexDirection: 'column', width: "25%" }}>
                        <Box sx={{width:"25vw", textAlign:"center", backgroundColor: "white", height:"25vh"}}>
                            <Box sx={{display: "center", borderRadius:"50%", backgroundColor: "black", width:"50%", height:"100%", alignContent: "center", marginLeft: "25%", marginTop: "1vh"}}>
                            </Box>
                        </Box>
                        <Box sx={{display:"flex", flexDirection: "row", marginTop: "1vh", alignItems: "center", justifyContent: "center"}}>
                            <Box sx={{marginRight: "1vw"}}><TwitterIcon/></Box>
                            <Box sx={{marginRight: "1vw"}}><FacebookIcon/></Box>
                            <Box sx={{marginRight: "1vw"}}><YouTubeIcon/></Box>
                            <Box sx={{marginRight: "1vw"}}><InstagramIcon/></Box>
                        </Box>
                        <Box sx={{backgroundColor: "purple", marginTop: "1vw"}}>
                                <Box sx={{marginLeft: "25%"}}>
                                        <Box>Bio</Box>
                                </Box>
                        </Box>
                        <Box sx={{backgroundColor: "orange", display: 'inline-flex', flexDirection: 'column', width:"25vw",  marginTop: "1vh"}}>
                            <Box sx={{display: "inline-flex"}}>
                                <Box sx={{flexGrow: "1", marginLeft: "25%", marginBottom:"3vh"}}>Followers</Box>
                                <Box sx = {{marginRight: "25%"}}>53,256</Box>
                            </Box>
                            <Box sx={{display: "inline-flex"}}>
                                <Box sx={{flexGrow: "1", marginLeft: "25%", marginBottom:"3vh"}}>Following</Box>
                                <Box sx = {{marginRight: "25%"}}>843</Box>
                            </Box>
                            <Box sx={{display: "inline-flex"}}>
                                <Box sx={{flexGrow: "1", marginLeft: "25%", marginBottom:"3vh"}}>Written Articles</Box>
                                <Box sx = {{marginRight: "25%"}}>67</Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="profileRight"sx={{ flexDirection: 'column', marginLeft: "3vw"}}>
                        <Box sx={{ backgroundColor: "yellow", width:"30vw"}}>
                            <Grid container>
                                <Grid xs={6}>
                                  <Box sx={{backgroundColor:"red", height: "15vh"}}>Name</Box>
                                </Grid>
                                <Grid xs={6}>
                                  <Box sx={{height: "15vh"}}>Email</Box>
                                </Grid>
                                <Grid xs={6}>
                                  <Box sx={{height: "15vh"}}>Occupation</Box>
                                </Grid>
                                <Grid xs={6}>
                                  <Box sx={{backgroundColor:"red", height: "15vh"}}>Account Level</Box>
                                </Grid>
                                <Grid xs={6}>
                                  <Box sx={{backgroundColor:"red", height: "15vh"}}>Phone</Box>
                                </Grid>
                                <Grid xs={6}>
                                  <Box sx={{height: "15vh"}}>Role</Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </div>
        )
    }
    render(){
        return(
            <div>
                {/* <this.Menu /> */}
                {/* <this.test/> */}
                <Box className="profileLeft"sx={{ flexDirection: 'column'}}>
                        <MenuList>
                            <MenuItem>
                                    Profile
                            </MenuItem>
                            <MenuItem>
                                    Edit Profile
                            </MenuItem>
                            <MenuItem>
                                <Typography>
                                    My Articles
                                </Typography>
                            </MenuItem>
                            <MenuItem>
                                <Typography>
                                    Followers
                                </Typography>
                            </MenuItem>
                        </MenuList>
                </Box>
            </div>
        )
    }
}
export default ProfileMenu;