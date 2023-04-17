import React, { Component, useState, useEffect, useSelector } from 'react';
import { connect } from 'react-redux';
import {
  Route, withRouter, Redirect, Link
} from "react-router-dom";
import AdSense from 'react-adsense';
import ArticleID from '../ArticleID';
import styles from "./css/Article.module.css"
import Util from '../../Utility';
import { 
  Typography, 
  Chip, Avatar,
  Box, Button,
} from "@material-ui/core";
import StickyBox from "react-sticky-box";
import { styled } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";
import * as articleActions from '../../../store/actions/article';
import * as savedArticleActions from '../../../store/actions/savedArticles';
import StarIcon from '@mui/icons-material/Star';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

const Article = (props) => {

    const StyledButton = styled(Button)({
      fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
      backgroundColor: "#AD343E",
      width: "75%",
      height: "70%",
      color: "white",
      textDecoration: "none",
      fontSize: "15px",
      fontWeight: "300",
      borderRadius: "50px",
      textTransform: "none",
      textDecoration: "none",
      "&:hover":{
        fontSize: "15px",
        fontWeight: "300",
        color: "white",
        backgroundColor: "black",
      }

    });
    const StyledTypographyFooter = styled(Typography)({
      color: "black", 
      textDecoration: "none",
      fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
      fontWeight: "500",
      fontSize: "15px",
      marginRight: "5px",
  })
  
    const [load, setLoad] = useState(true);
  
    const Utility= new Util();

    useEffect(async () => {
        const token = localStorage.getItem('token');
        props.getArticles(token);
        props.getSavedArticles(token);
        setLoad(true);
    },[load]);

    const handleBookMark = (key) =>{
        fetch('api/Bookmark/', {
          method: "POST",
          headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              key: key,
              token: localStorage.getItem('token')
          })
        })
        .then(response => {return response.json()})
        .then(data => {
          setLoad(false)
        })
    }
    const handleRemoveBookMark = (key) =>{
      fetch('api/RemoveBookmark/', {
        method: "POST",
        headers:{
          'Accept':'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            key: key,
            token: localStorage.getItem('token')
        })
      })
      .then(response => {return response.json() })
      .then(data => {
        setLoad(false)
        // console.log(data)
      })
  }
  const isBookmarked = (key) =>{
    // if (props.saved.saved == null) {
    //   return false
    // }
    // if (props.saved.saved[key] === undefined){
    //     return false
    // }else{
    //     return true
    // }
    return props.saved.saved == null || props.saved.saved[key] === undefined ? false : true
}
    return(
      <React.Fragment>
        <div className='container'>
        <Box className='main-article-container'>
          { 
            props.allArticles != null ? Object.entries(props.allArticles).map(([id,Article]) => {
              const reporter = Article.reporter_account
              return(
                <Box  
                  sx={{
                    width: "40vw", height: "25vh",
                     //  backgroundColor: "lightblue",
                    marginRight: "20px",
                    display: "flex", 
                    flexDirection:"row", 
                    borderTop: "solid 1px black", 
                    borderBottom: "solid 1px black",
                    borderRight: "solid 2px black", 
                    paddingRight: "2vw"
                }}>
                <Link 
                  style={{
                    textDecoration: "none",
                    color: "black",
                    underline: "none",
                  }}
                  to={{
                    pathname: '/Articles/' + Article.key + '/',
                    state: { 
                      ArticleID: Article.key,
                      Article: Article,
                  },   
                }}>
                  <Box sx={{width: "100%", height: "20%", flexDirection: "row", display:"flex", whiteSpace:"pre-wrap", marginTop: "4px"}}>
                    {/* Put Work Affilation here*/}
                    {`${reporter.first_name} ${reporter.last_name}   •   ${Utility.getDate(Article.date)} `}
                      {
                        Article.visibility == "FOLLOWER/SUBSCRIBER ONLY" ?
                          <StyledTypographyFooter style={{marginLeft: "10px"}}>
                            <div 
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                              }}>
                              <StarIcon style={{color: "#F2AF29", marginRight: "5px", fontSize: '10px' }}/>
                              <span>Members only</span>
                            </div>  
                          </StyledTypographyFooter>
                        : <></>
                      }
                  </Box>
                  <Box sx={{width: "40vw", height: "60%", display:"flex", flexDirection:"column"}}>
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
                      marginRight: "5%",
                      mt: "1%"
                    }}>
                      {Article.article_description}
                    </Box>
                  </Box>
                  <Box sx={{
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
                  </Box>
                </Link>
                <Box sx={{alignContent: "right", marginTop: "auto", marginRight: "0%"}}>
                {
                  isBookmarked(Article.key) ? 
                    <Box onClick={() => handleRemoveBookMark(Article.key)}>
                      <BookmarkIcon style={{color: "#F2AF29", fontSize: "35px"}}/>
                    </Box>
                  : 
                    <Box onClick={() => handleBookMark(Article.key)}>
                      <BookmarkAddIcon style={{color: "#C1BDBD", fontSize: "35px"}}/>
                    </Box>
                }
                </Box>
                </Box>
              )
            })
            : <></>
          }
        </Box>
          <StickyBox offsetTop={50}>
            <Box sx= {{display: "flex", flexDirection:"column", width:"25vw", height:"90vh", marginTop: "1px", marginLeft: "1vw",}}>
              <Box sx={{width: "100%", height:"20%", display: "flex", flexDirection:"column"}}>
                <Box sx={{marginLeft: "12.5%", marginTop: "1vh"}}>
                  <StyledButton>
                    Subscribe Today
                  </StyledButton>
                </Box>
                <Box sx={{marginLeft: "12.5%", marginTop: "1vh"}}>
                  <SearchBar
                    style={{
                      borderStyle: "inset",
                      fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                      width: "75%",
                      height: "70%",
                      borderRadius: "25px",
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{width: "100%", height:"40%",}}>
                <Box sx={{marginBottom: "3px"}}>
                  <Typography 
                    style={{
                      color: "black", 
                      marginLeft: "25%", 
                      textDecoration: "none",
                      fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                      fontWeight: "600",
                    }}>
                      Top rated Articles
                  </Typography>
                </Box>
                {
                  props.popArticles != null ? Object.entries(props.popArticles).map(([id,Article]) => {
                    const reporter = Article.reporter_account
                    return(
                      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "2vh"}}>
                        <Box sx={{display: "flex", flexDirection: "column"}}>
                          <Link
                            style={{
                              textDecoration: "none",
                              color: "black",
                              underline: "none",
                            }}
                            to={{
                              pathname: '/Account/People/' + reporter.key + '/',
                              state: { 
                                key: reporter.key,
                                person: reporter,
                            },}}
                          >
                            <Box sx={{display: "flex", flexDirection: "row"}}>
                              {
                                reporter.profile_pic != null ?
                                <Avatar 
                                  alt={`${reporter.first_name} ${reporter.last_name}`} 
                                  src={reporter.profile_pic}
                                  style={{
                                    width: '20px',
                                    height: '20px',
                                  }}
                                />
                                :
                                <Avatar 
                                  alt={`${reporter.first_name} ${reporter.last_name}`} 
                                  src="/images/defaultProfilePic.png"
                                  style={{
                                      width: '20px',
                                      height: '20px',
                                  }}
                                />
                              }
                              <Typography 
                                style={{
                                  color: "black", 
                                  textDecoration: "none",
                                  fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                                  fontWeight: "400",
                                  fontSize: "18px",
                                  marginLeft: "5px",
                                }}>
                                {`${reporter.first_name} ${reporter.last_name}`} 
                              </Typography>
                            </Box>
                          </Link>
                          <Link 
                            style={{
                              textDecoration: "none",
                              color: "black",
                              underline: "none",
                            }}
                            to={{
                              pathname: '/Articles/' + Article.key + '/',
                              state: { 
                                ArticleID: id,
                                Article: Article,
                            },}}
                          >
                            <Box sx={{width:"100%"}}>
                              <Box sx={{marginLeft: "5%", marginBottom: "3%"}}>
                                <Typography 
                                  style={{
                                    color: "black", 
                                    textDecoration: "none",
                                    fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                                    fontWeight: "600",
                                }}>
                                  {Article.headline}
                                </Typography>
                              </Box>  
                            </Box>
                          </Link>
                        </Box>
                        <Box sx={{width: "100px", height: "100px", marginRight: "5vw"}}>
                          <Box sx={{width: "100px" , height: "100px"}}>
                            {
                              Article.article_pic != null ?
                              <img 
                                alt={`article_pic`}
                                src={`${Article.article_pic}`}
                                style={{
                                  width: "100px",
                                  height: "100px"
                                }}
                              />
                              :
                              <></>
                            }
                          </Box>
                        </Box>
                      </Box>
                    )
                  })
                  : <></>
                }
              </Box>
            </Box>
          </StickyBox>
          <StickyBox offsetTop={50}>
            <Box sx={{backgroundColor: "orange", marginLeft: "10px", marginTop: "1vh"}}>
              <AdSense.Google
                client='ca-pub-7292810486004926'
                slot='7806394673'
                style={{ width: 250, height: 600, float: 'left' }}
                format='fluid'
              />
            </Box>
          </StickyBox>
        </div>
      </React.Fragment>
    )
  }

const mapStateToProps = (state) => {
  return{
        allArticles: state.articles.allArticles,
        popArticles: state.articles.popArticles,
        saved: state.savedArticles
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    getSavedArticles: (token) => dispatch(savedArticleActions.getSAVEDARTICLES(token)),
    getArticles: (token) => dispatch(articleActions.getARTICLES(token))
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Article));

