import React, { Component } from 'react';
import Advertisments from './Advertisments';
import { Redirect, Link } from "react-router-dom";
import {
  Route,
} from "react-router-dom";
import ArticleID from './ArticleID';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';

import { 
  Grid, Typography, TextField, 
  FormControlLabel, Avatar, Chip,
  CssBaseline, Box, MenuList, Button,
  Container, Checkbox, MenuItem, NestedMenuItem,
} from "@material-ui/core";

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { display } from '@mui/system';


export default class Article extends Component{
  constructor(props){
      super(props);
      this.state = {
          data: [],
          article: [],
          loaded: false,
          placeholder: "Loading",
          popularTags: [],
      };
  }

  componentDidMount(){
    fetch("api/AllArticles/", {
      method: "GET",
      headers:{
        'Accept':'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response =>{
      if(response.status > 400){
          return this.setState(()=>{
              return{ placeholder: "Something went wrong!" };
          });
      }
      return response.json();
    }).then(data =>{
        this.setState(() =>{
          return{
              data,
          };
        });
    })
    fetch("api/PopularTags/", {
      method: "GET",
      headers:{
        'Accept':'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response =>{
      if(response.status > 400){
          return this.setState(()=>{
              return{ placeholder: "Something went wrong!" };
          });
      }
      return response.json();
    }).then(data =>{
        this.setState(() =>{
          return{
              popularTags: data,
              loaded: true
          };
        });
    })
  }
  Articles = () =>{
    const handleView = (id)=>{
      <Route exact path={'/Articles/' + id + '/'}>
          <ArticleID/>
      </Route>
    }
    const getMon = (num) =>{
      const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      return Months[num]
    }
    return(
      <React.Fragment>
        <div className= 'container'>
        <Box sx={{display: "flex", marginLeft: "25vw", flexDirection: "column", marginTop:"1px",}}>
          {
            Object.entries(this.state.data).map(([id,Article]) => {
              return(
                  <Link 
                    style={{
                      textDecoration: "none",
                      color: "black",
                      underline: "none",
                    }}
                    to={{
                      pathname: '/Articles/' + id + '/',
                      state: { 
                        ArticleID: id,
                        Article: Article,
                    },   
                  }}>
                    <Box onClick={() => handleView(id)} 
                      sx={{
                         width: "35vw", height: "25vh", backgroundColor: "white",
                         display: "flex", flexDirection:"column", borderTop: "solid 1px black", borderBottom: "solid 1px black"
                      }}>
                        <Box sx={{width: "100%", height: "20%", flexDirection: "row", display:"flex", whiteSpace:"pre-wrap", marginTop: "4px"}}>
                            <Box>
                              {Article.reporter_account} {/* Put Work Affilation hwwwwwwere*/}
                            </Box>
                            <Box sx={{marginLeft: "5px"}}>•</Box>
                            <Box sx={{marginLeft: "5px"}}>
                              {getMon(new Date(Article.date).getMonth()) + ' ' + new Date(Article.date).getDate() + ', ' + new Date(Article.date).getFullYear()}
                            </Box>
                            <Box>
                              {/* Center the items*/}
                              {
                                Article.visibility == "FOLLOWER/SUBSCRIBER ONLY" ?
                                  <Box sx={{marginLeft: "5px"}}>
                                    ☆ Members only
                                  </Box>
                                  : <></>
                              }
                            </Box>
                        </Box>
                        <Box sx={{width: "100%", height: "60%", display:"flex", flexDirection:"column"}}>
                              <Box sx={{
                                fontSize: "25px",
                                fontWeight: "500",
                                marginLeft: "3%"
                              }}>
                                {Article.headline}
                              </Box>
                              <Box sx={{
                                fontSize: "16px",
                                marginLeft: "5%",
                                marginRight: "4%",
                                mt: "1%"
                              }}>
                                {Article.article_description}
                              </Box>
                        </Box>
                        <Box sx={{
                          // backgroundColor: "blue", 
                          width: "100%", 
                          height: "20%", 
                          display: "flex", 
                          flexDirection: "row",
                          alignContent: "center",
                          justifyContent: "space-between"
                          }}>
                          <Box sx={{
                            width: "100%", 
                            height: "20%", 
                            display: "flex", 
                            flexDirection: "row",
                            alignContent: "center",
                          }}>
                            {
                              Array.isArray(Article.tags) ?
                                  Article.tags.map(tag =>{
                                    return(
                                      <Box sx={{margin: "5px"}}>
                                        <Chip style={{
                                          backgroundColor: "#C1BDBD",
                                          fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                                          fontSize: "15px",
                                          textDecoration: "none",
                                        }}
                                        label={tag}
                                        />
                                      </Box>
                                    )
                                  })
                              :
                              <Box sx={{margin: "5px"}}>
                                <Chip style={{
                                  backgroundColor: "#C1BDBD",
                                  fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                                  fontSize: "15px",
                                  textDecoration: "none",
                                }}
                                label={Article.tags}
                                />
                              </Box>
                            }
                          </Box>
                          <Box sx={{alignContent: "right"}}>
                            <BookmarkAddOutlinedIcon sx={{color: "#C1BDBD", fontSize: "35px"}}/>
                          </Box>
                        </Box>
                    </Box>
                  </Link>
              )
            })
          }
        </Box>
        <div className = 'item-middle' id='item-middle'>
          <div className='popTags' id='popTags'>
              <div className = 'tagHome'> 
                  <a href='#Tech'> Technology </a>
              </div>  
              <div className = 'tagHome'>
                  <a href='#Life'> Life </a>
              </div>   
              <div className = 'tagHome'> <a href='#Earth'> Earth </a></div>   
              <div className = 'tagHome'> <a href='#Word'> Work </a></div>
              <div className = 'tagHome'> <a href='#Long'> Long </a></div> 
              <div className = 'tagHome'> <a href='#Sciecne'> Science </a></div> 
              <div className = 'tagHome'> <a href='#School'> School </a></div>  
          </div>
          <div className='footer'>
              <a href='#About us'>About Us</a>
              <a href='#Contact us'>Contact Us</a>
              <a href='#Careeres'>Careeres</a>
              <a href='#Account'>Account</a>
              <a href='#Terms of Service'>Terms of Service</a>
              <a href='#Find Us'>Find Us</a>
          </div>
        </div>
        <div className = 'item-right' id = 'item-right'>
            <div className = 'content'>
                <Advertisments/>
            </div>
        </div>
        </div>
      </React.Fragment>
    )
  }

  render(){
    return(
      <this.Articles/>
    ); 
  }  
}
