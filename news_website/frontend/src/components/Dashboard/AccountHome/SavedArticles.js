import React, { Component, useState, useEffect, useSelector } from 'react';
import { connect } from 'react-redux';
import {
  Route, withRouter, Redirect, Link
} from "react-router-dom";
import ArticleID from '../ArticleID';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import Utility from '../../Utility';
import * as savedArticleActions from '../../../store/actions/savedArticles';
import StarIcon from '@mui/icons-material/Star';
import { 
  Grid, Typography, TextField, 
  FormControlLabel, Avatar, Chip,
  CssBaseline, Box, MenuList, Button,
  Container, Checkbox, MenuItem, NestedMenuItem, styled, 
} from "@material-ui/core";


import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

const SavedArticles = (props) => {
  const [load, setLoad] = useState(false)
  const saved = props.savedArticles
  const Util = new Utility();

  useEffect(async () => {
    const token = localStorage.getItem('token');
    props.getSavedArticles(token);
    setLoad(true);
  },[load]);

  const handleBookMark = (key) =>{
      fetch('/api/Bookmark/', {
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
    fetch('/api/RemoveBookmark/', {
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
    })
  }
 
  const isBookmarked = (key) =>{
    return saved[key] == undefined ? false : true
 }

  const StyledTypographyHeader = styled(Typography)({
      color: "black", 
      textDecoration: "none",
      fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
      fontWeight: "600",
      fontSize: "18px",
      marginRight: "5px",
  })
  const StyledTypographyBody = styled(Typography)({
      color: "black", 
      textDecoration: "none",
      fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
      fontWeight: "500",
      fontSize: "15px",
      marginRight: "5px",
  })
  const StyledTypographyFooter = styled(Typography)({
      color: "black", 
      textDecoration: "none",
      fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
      fontWeight: "500",
      fontSize: "15px",
      marginRight: "5px",
  })
    return(
        <Box sx={{width: "100%", marginLeft: "10px", flexDirection: "row", display: "flex", flexWrap: "wrap", marginTop: "2vh"}}>
          {
            saved != null ? Object.entries(saved).map(([_, article]) =>{
              return(         
                  <Box sx={{backgroundColor: "#D9CAB3", width: "30%", height: "15vw", marginRight: "1vw", marginLeft: "1.5vw", borderRadius: "25px" , display: "flex", flexDirection:"column", border: "1px solid black", marginTop: "1vh"}}>
                      <Box sx={{display: "flex", flexDirection: "row", marginLeft: "5px", justifyContent: "space-between", marginTop: "1vh"}}>
                        <Box sx={{display: "flex", flexDirection: "row"}}>
                        {
                          Array.isArray(article.tags) ?
                          article.tags.map(tag =>{
                            return(
                              <Box sx={{margin: "5px"}}>
                                <Chip style={{
                                  backgroundColor: "#F2AF29",
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
                              backgroundColor: "#F2AF29",
                              fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                              fontSize: "15px",
                              textDecoration: "none",
                            }}
                              label={article.tags}
                            />
                          </Box>
                        }
                      </Box>
                      <Box sx={{marginRight: "1vw"}}>
                        {
                        isBookmarked(article.key) ? 
                            <Box onClick={() => handleRemoveBookMark(article.key)}>
                                <BookmarkIcon style={{color: "#F2AF29"}}/> 
                            </Box>
                            :
                            <Box onClick={() => handleBookMark(article.key)}>
                                <BookmarkAddIcon sx={{color: "#C1BDBD"}}/>
                            </Box>
                        }
                      </Box>
                      </Box>
                      <Box sx={{display: "flex", flexDirection: "row" , justifyContent: "space-between", marginTop: "1vh", marginLeft: "1vw", marginRight: "1vw"}}>
                          <Box sx={{height: "10%"}}>
                            <StyledTypographyHeader>
                                {article.headline}
                            </StyledTypographyHeader>
                          </Box>
                      </Box>
                      <Box sx={{margin: "20px", height: "80%"}}>
                          <StyledTypographyBody>
                              {article.article_description}
                          </StyledTypographyBody>
                      </Box>
                      <Box sx={{marginLeft: "20px", display: "flex", flexDirection: "row", height: "10%"}}>
                          <StyledTypographyFooter>
                              {Util.getDate(article.date)}
                          </StyledTypographyFooter>
                          {                         
                            article.visibility == "FOLLOWER/SUBSCRIBER ONLY" ?
                              <StyledTypographyFooter style={{marginLeft: "10px"}}>
                                <div 
                                  style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      flexWrap: 'wrap',
                                    }}>
                                  <StarIcon fontSize='15px' style={{color: "#F2AF29", marginRight: "5px"}}/>
                                  <span>Members only</span>
                                </div>  
                              </StyledTypographyFooter>
                              : <></>                               
                          }
                      </Box>
                  </Box>
              )
            })
            :
            <></>
          }
        </Box>
    )
}
const mapStateToProps = (state) => {
    return{
      savedArticles: state.savedArticles.saved,
    }
}
const mapDispatchToProps = dispatch =>{
  return{
    getSavedArticles: (token) => dispatch(savedArticleActions.getSAVEDARTICLES(token)),
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SavedArticles));