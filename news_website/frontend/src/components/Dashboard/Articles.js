import React, { Component, useState, useEffect, useRef } from 'react';
import Advertisments from './Advertisments';
import { Redirect, Link } from "react-router-dom";
import {
  Route,
} from "react-router-dom";
import ArticleID from './ArticleID';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import Util from '../Utility';
import { 
  Grid, Typography, TextField, 
  FormControlLabel, Avatar, Chip,
  CssBaseline, Box, MenuList, Button,
  Container, Checkbox, MenuItem, NestedMenuItem,
} from "@material-ui/core";
import StickyBox from "react-sticky-box";
import { styled } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Article = () => {
  // const Articles = () => {
    const StyledButton = styled(Button)({
      fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
      backgroundColor: "black",
      width: "75%",
      height: "70%",
      color: "white",
      textDecoration: "none",
      fontSize: "15px",
      fontWeight: "300",
      borderRadius: "50px",
      textTransform: "none",
      textDecoration: "none",

    });
    const [data, setAllArticles] = useState(null);
    const [tags, setTags] = useState(null);
    const [picks, setPicks] = useState(null);
    useEffect(async () => {
      await fetch("api/AllArticles/", {
        method: "POST",
        headers:{
          'Accept':'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tags: [tags]
        })
      }).then(response =>{
        return response.json();
      }).then(data => setAllArticles(data));
    }, [tags]);

    useEffect(async () =>{
      await fetch("api/PopularArticles/", {
        method: "GET",
        headers:{
          'Accept':'application/json',
          'Content-Type': 'application/json',
        },
      }).then(response =>{
        return response.json();
      }).then(data => setPicks(data));
    },[])
    // console.log(this.state)
    // console.log(data)
    const Utility= new Util();
    const handleView = (id)=>{
      <Route exact path={'/Articles/' + id + '/'}>
          <ArticleID/>
      </Route>
    }
    return(
      <React.Fragment>
        <div className='container'>
        <Box sx={{display: "flex", marginLeft: "20vw", flexDirection: "column", marginTop:"1px",}}>
          { 
            data != null ? Object.entries(data).map(([id,Article]) => {
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
                         width: "40vw", height: "25vh",
                         display: "flex", flexDirection:"column", borderTop: "solid 1px black", borderBottom: "solid 1px black",borderRight: "solid 2px black", paddingRight: "2vw"
                      }}>
                        <Box sx={{width: "100%", height: "20%", flexDirection: "row", display:"flex", whiteSpace:"pre-wrap", marginTop: "4px"}}>
                            <Box>
                              {Article.reporter_account} {/* Put Work Affilation hwwwwwwere*/}
                            </Box>
                            <Box sx={{marginLeft: "5px"}}>•</Box>
                            <Box sx={{marginLeft: "5px"}}>
                              {Utility.getDate(Article.date)}
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
                                marginRight: "10%",
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
                          <Box sx={{alignContent: "right", marginRight: "10%"}}>
                            <BookmarkAddOutlinedIcon sx={{color: "#C1BDBD", fontSize: "35px"}}/>
                          </Box>
                        </Box>
                    </Box>
                  </Link>
              )
            })
            : console.log(data)
          }
        </Box>
          <StickyBox offsetTop={50}>
            <Box sx= {{display: "flex", flexDirection:"column", backgroundColor: "orange", width:"20vw", height:"90vh", marginTop: "1px"}}>
              <Box sx={{width: "100%", height:"20%", display: "flex", flexDirection:"column"}}>
                <Box sx={{marginLeft: "12.5%", marginTop: "1vh"}}>
                  <StyledButton>
                    Subscribe Today
                  </StyledButton>
                </Box>
                <Box sx={{marginLeft: "12.5%", marginTop: "1vh"}}>
                    <SearchBar
                        style={{
                          fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                          width: "75%",
                          height: "70%",
                          borderRadius: "25px",
                        }}
                    />
                </Box>
              </Box>
              <Box sx={{backgroundColor: "grey", width: "100%", height:"20%"}}>
                {
                  picks != null ? Object.entries(picks).map(([id,Article]) => {
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
                          <Box onClick={() => handleView(id)} sx={{width:"100%"}}>
                              <Box>
                                  {Article.headline}
                              </Box>  
                          </Box>
                      </Link>
                    )
                  })
                  : <></>
                }
              </Box>
              <Box sx={{backgroundColor: "purple", width: "100%", height:"20%"}}>
                connect account
              </Box>
            </Box>
          </StickyBox>
        {/* <div className = 'item-middle' id='item-middle'>
          <div className='popTags' id='popTags'>
              <div className = 'tagHome'> 
                  <a href='#Tech'> Technology </a>
              </div>  
              <div className = 'tagHome'>
                  <a href='#Life'> Life </a>
              </div>   
              <div className = 'tagHome'> <a href='#Earth'> Earth </a></div>   
              <div className = 'tagHome'> 
                <a onClick={ () => setTags('Work')}> Work </a>
              </div>
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
          </div> */}
          <div className = 'item-right' id = 'item-right'>
              <div className = 'content'>
                  <Advertisments/>
              </div>
          </div>

        </div>
      </React.Fragment>
    )
  }

    // return(
    //   <Articles/>
    // );   
// }
export default Article;

// constructor(props){
//   super(props);
//   this.state = {
//       data: [],
//       article: [],
//       loaded: false,
//       placeholder: "Loading",
//       popularTags: [],
//   };
// }

// componentDidMount(){
// const Utility= new Util();
// this.setState(() =>{
//  return{
//    data: Utility.GETAllArticles(),
//    popularTags: Utility.GETPopularTags()        
//  };
// });
// fetch("api/AllArticles/", {
//   method: "GET",
//   headers:{
//     'Accept':'application/json',
//     'Content-Type': 'application/json',
//   },
// }).then(response =>{
//   if(response.status > 400){
//       return this.setState(()=>{
//           return{ placeholder: "Something went wrong!" };
//       });
//   }
//   return response.json();
// }).then(data =>{
//     this.setState(() =>{
//       return{
//           data,
//       };
//     });
// })

// fetch("api/PopularTags/", {
//   method: "GET",
//   headers:{
//     'Accept':'application/json',
//     'Content-Type': 'application/json',
//   },
// }).then(response =>{
//   if(response.status > 400){
//       return this.setState(()=>{
//           return{ placeholder: "Something went wrong!" };
//       });
//   }
//   return response.json();
// }).then(data =>{
//     this.setState(() =>{
//       return{
//           popularTags: data,
//           loaded: true
//       };
//     });
// })
// }