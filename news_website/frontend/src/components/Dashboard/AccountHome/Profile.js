import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { Redirect, Switch, BrowserRouter as Router, Route } from "react-router-dom";

import { 
    Grid, Typography, TextField, 
    FormControlLabel, Avatar, 
    CssBaseline, Box, MenuList,
    Container, Checkbox, MenuItem, NestedMenuItem,
  } from "@material-ui/core";

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            first_name: "",
            last_name: "",
            account_role: "",
            phone: "",
            bio: "",
            occupation: "",
            email: "",
            popular_articles: [],
            written_articles: "",
        };
    }
    componentDidMount(){
        fetch("/api/current_user/", {
            method:"POST",
            headers:{
              'Accept':'application/json',
              'Content-Type': 'application/json',
            },
                body: JSON.stringify({
                    token: localStorage.getItem('token')
                })
            })
            .then(response =>{
                if(response.status > 400){
                    return this.setState(() => {
                        return{ placeholder: "Something went wrong!" };
                    });
                }
                return response.json();
            })
            .then(data =>{
                return this.setState({
                    name: data.first_name + " " + data.last_name,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    account_role: data.role,
                    phone: data.phone,
                    bio: data.bio,
                    email: data.email,
                    occupation: data.occupation,
                    popular_articles: data.popular_articles,
                    written_articles: data.written_articles,
                })
            });    
    }
    getTags = (Article) =>{
        var send = []
        if (Array.isArray(Article.tags)) {
            for(let i = 0; i < Article.tags.length; i++){
                send.push(<span class="tag tag-teal">{Article.tags[i]}</span>)
            }
        }else{
            send.push(<span class="tag tag-teal">{Article.tags}</span>)
        }
        return(
            <div>{send}</div>
        )
    }
    Articles = () =>{
        return(
            <Box sx={{display: "flex", flexDirection: "row", marginTop: "2vh"}}>
                {
                    Object.entries(this.state.popular_articles).map( ([_, ArticleInfo]) => {
                        return(
                                <div class="card">
                                    <div class="card-body">
                                      {this.getTags(ArticleInfo)}
                                      <h4>{ArticleInfo.headline}</h4>
                                      <p>{ArticleInfo.article_description}</p>
                                      <div class="user">
                                        <div class="user-info">
                                          <h5>{new Date(ArticleInfo.date).getMonth() + '-' + new Date(ArticleInfo.date).getDate() + '-' + new Date(ArticleInfo.date).getFullYear()}</h5>
                                          <small>{ArticleInfo.rating} %</small>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                        );
                    })
                }
            </Box>
        )
    }
    Profile =() =>{
        return (
            <div>
                <Box className = "profileContainerTest" sx={{ display: 'inline-flex', flexDirection: 'row', marginTop: "1vh", width:"75%"}}>
                    <Box className ="profileMiddle" sx={{ flexDirection: 'column', width: "25vw" }}>
                        <Box sx={{width:"25vw", textAlign:"center", height:"25vh"}}>
                            <Box sx={{display: "center", borderRadius:"50%", backgroundColor: "black", width:"50%", height:"100%", alignContent: "center", marginLeft: "25%", marginTop: "1vh"}}>
                            </Box>
                        </Box>
                        <Box sx={{display:"flex", flexDirection: "row", marginTop: "1vh", alignItems: "center", justifyContent: "center"}}>
                            <Box sx={{marginRight: "1vw"}}><TwitterIcon/></Box>
                            <Box sx={{marginRight: "1vw"}}><FacebookIcon/></Box>
                            <Box sx={{marginRight: "1vw"}}><YouTubeIcon/></Box>
                            <Box sx={{marginRight: "1vw"}}><InstagramIcon/></Box>
                        </Box>
                        <Box sx={{ marginTop: "1vw"}}>
                                <Box sx={{marginLeft: "25%"}}>
                                        <Box>Bio</Box>
                                        <Box sx={{marginLeft: "-3vw", marginRight: "3vw"}}> "{this.state.bio}" </Box>
                                </Box>
                        </Box>
                        <Box sx={{ display: 'inline-flex', flexDirection: 'column', width:"25vw",  marginTop: "1vh"}}>
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
                                <Box sx = {{marginRight: "25%"}}>{this.state.written_articles}</Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="profileRight"sx={{ flexDirection: 'column', marginLeft: "0vw"}}>
                        <Box sx={{ width:"30vw", marginTop: "5vh", marginLeft: "3vw"}}>
                            <Grid container>
                                <Grid xs={6}>
                                  <Box sx={{height: "15vh"}}>Name
                                    <Box sx={{marginLeft: "2vw", marginTop: "2vh"}}>{this.state.name}</Box>
                                  </Box>
                                </Grid>
                                <Grid xs={6}>
                                  <Box sx={{height: "15vh"}}>Email
                                    <Box sx={{marginLeft: "2vw", marginTop: "2vh"}}>{this.state.email}</Box>                    
                                  </Box>
                                </Grid>
                                <Grid xs={6}>
                                  <Box sx={{height: "15vh"}}>Occupation
                                  <Box sx={{marginLeft: "2vw", marginTop: "2vh"}}>{this.state.occupation}</Box>
                                  </Box>
                                </Grid>
                                <Grid xs={6}>
                                  <Box sx={{height: "15vh"}}>Account Level
                                  <Box sx={{marginLeft: "2vw", marginTop: "2vh"}}>tmp</Box>
                                  </Box>
                                </Grid>
                                <Grid xs={6}>
                                  <Box sx={{height: "15vh"}}>Phone
                                  <Box sx={{marginLeft: "2vw", marginTop: "2vh"}}>{this.state.phone}</Box>
                                  </Box>
                                </Grid>
                                <Grid xs={6}>
                                  <Box sx={{height: "15vh"}}>Role
                                  <Box sx={{marginLeft: "2vw", marginTop: "2vh"}}>{this.state.account_role}</Box>
                                  </Box>
                                </Grid>
                            </Grid>
                            <Box sx={{marginLeft: "-2vw"}}>
                                <Box sx={{marginTop: "-3vh", marginLeft: "2vw"}}>Popular Articles</Box>
                                <Box><this.Articles/></Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </div>
        )
    }
    render(){
        return(
            <div>
                <this.Profile/>
            </div> 
        )
    }
}
export default Profile;

            // <div>
            //     <div className='profile'>    
            //         <div className="left">
            //             <div className="iconBack">    
            //             </div>
            //         </div>
            //         <div className="middle">
            //             <div className="middleContent">
            //                 <p>Name<br/><br/><span> {this.state.first_name} {this.state.last_name}</span></p>
            //                 <p>Email<br/><br/><span> {this.state.email}</span></p>
            //                 <p>Occupation<br/><br/><span> {this.state.occupation}</span></p>
            //                 <p>Phone<br/><br/><span> {this.state.phone}</span></p>
            //             </div>
            //         </div>
            //         <div className="right">
            //             <div className="rightTitle">
            //                 Bio
            //             </div>
            //             <bio>  
            //                {/* <span>"Lorem</span>  */}
            //                 {this.state.bio}
            //             </bio>
            //         </div>
            //     </div>
            //     <div className='ProfileBottom'>
            //         <div className="followersContent">
            //             <div className='followers'>
            //                 <p>Followers</p>
            //                 <p>53,256</p>
            //                 <p>Following</p>
            //                 <p>843</p>
            //                 <p>Written Articles</p>
            //                 <p>67</p>
            //             </div>
            //             <div class='popArticles'>
            //                 <p style={{marginLeft: "10px"}}>Popular Articles</p>
            //                 <this.Articles/>
            //             </div>
            //         </div>
            //     </div>
            // </div>   