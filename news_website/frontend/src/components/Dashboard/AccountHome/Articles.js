import React, {useState, useEffect} from 'react';
import * as request from "./ApiCalls/Requests";
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";
import Utility from '../../Utility';
import StarIcon from '@mui/icons-material/Star';
import { 
  Typography,
  Chip,
  Box,
  styled, 
} from "@material-ui/core";

import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

import * as savedArticleActions from '../../../store/actions/savedArticles'

const Articles = (props) =>{

    const [articles, setArticles] = React.useState(null);
    const [load, setLoad] = React.useState(false);
    useEffect(() =>{
        const Init = async () =>{
          const response = await request.AllUserArticles();
          setArticles(response);
        }
        Init();
        props.getSavedArticles(token);
        // await fetch("/api/AllUserArticles/", {
        //     method: "POST",
        //     headers:{
        //         'Accept':'application/json',
        //         'Content-Type': 'application/json',
        //       },
        //         body: JSON.stringify({
        //             token: localStorage.getItem('token')
        //         })
        // })
        // .then(response =>{
        //     if(response.status > 400){
        //         return this.setState(()=>{
        //             return{ placeholder: "Something went wrong!" };
        //         });
        //     }
        //     return response.json();
        // })
        // .then(data => {
        //     setLoad(true)
        //     setArticles(data)
        // });
    },[load])

    const deleteArticle = async (key) => {
      const response = await request.DeleteArticle(key);
        // fetch("/api/DeleteArticle/", {
        //     method: "POST",
        //     headers:{
        //         'Accept':'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         key: Article_key,
        //     })
        // })
        // .then(response=>{
        //     return response.json()
        // })
        // .then(data=>{
        //     setLoad(false)
        // })
    }

    const saved = props.savedArticles
    const Util = new Utility();
  
    useEffect(async () => {
      // const token = localStorage.getItem('token');
      // props.getSavedArticles(token);
      // setLoad(true);
    },[load]);
  
    const handleBookMark = (key, type) =>{
      request.handleBookMark(key, type);
        // fetch('/api/Bookmark/', {
        //   method: "POST",
        //   headers:{
        //     'Accept':'application/json',
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //       key: key,
        //       token: localStorage.getItem('token')
        //   })
        // })
        // .then(response => {return response.json()})
        // .then(data => {
        //   setLoad(false)
        // })
    }
    // const handleRemoveBookMark = (key) =>{
    //   fetch('/api/RemoveBookmark/', {
    //     method: "POST",
    //     headers:{
    //       'Accept':'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         key: key,
    //         token: localStorage.getItem('token')
    //     })
    //   })
    //   .then(response => {return response.json() })
    //   .then(data => {
    //     setLoad(false)
    //   })
    // }
   
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
        <Box sx={{width: "100%", marginLeft: "0px", flexDirection: "row", display: "flex", flexWrap: "wrap", marginTop: "2vh"}}>
        {
          articles != null ? Object.entries(articles).map(([_, article]) =>{
            return(         
                <Box sx={{backgroundColor: "#D9CAB3", width: "30%", height: "15vw", marginRight: "1vw", marginLeft: "2vw", borderRadius: "25px" , display: "flex", flexDirection:"column", border: "1px solid black", marginTop: "1vh"}}>
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
                                fontWeight: "500",
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
                            fontWeight: "500",
                            textDecoration: "none",
                          }}
                            label={article.tags}
                          />
                        </Box>
                      }
                    </Box>
                    <Box sx={{marginRight: "1vw"}}>
                      {
                      saved[article.key] == undefined? 
                          <Box onClick={() => handleBookMark(article.key, "REMOVE_BOOKMARK")}>
                              <BookmarkIcon style={{color: "#F2AF29"}}/> 
                          </Box>
                          :
                          <Box onClick={() => handleBookMark(article.key, "BOOKMARK_ARTICLE")}>
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
                        <StyledTypographyFooter style={{marginTop: "-2%"}}>
                            {Util.getDate(article.date)}
                        </StyledTypographyFooter>
                        <Box style={{flexGrow: "1"}}>
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
                        <Box sx={{ marginRight: "1vw", marginTop: "-2%"}}>
                            <Chip style={{
                                    backgroundColor: "#AD343E",
                                    fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                                    fontSize: "15px",
                                    fontWeight: "600",
                                    textDecoration: "none",
                                }}
                                onClick={()=> deleteArticle(article.key)}
                                label= {`Delete`}
                            />
                          </Box>
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

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Articles));
