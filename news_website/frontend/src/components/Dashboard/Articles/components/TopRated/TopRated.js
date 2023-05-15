import React, { Component, useState, useEffect, useSelector } from 'react';
import SearchBar from "material-ui-search-bar";
import { styled } from "@material-ui/core/styles";
import { 
    Typography, 
    Chip, Avatar,
    Box, Button,
  } from "@material-ui/core";

import "./css/TopRated.css";
import {
    Route, withRouter, Redirect, Link
  } from "react-router-dom";

const TopRated = (props) => {
    return(
        <Box sx={{marginBottom: "3px"}}>
            <p className='das'>
                Top rated Articles
            </p>
            {
            props.popArticles != null ? Object.entries(props.popArticles).map(([id,Article]) => {
                const reporter = Article.reporter_account
                return(
                <Box className='main-toprated-container'>
                    <Box sx={{display: "flex", flexDirection: "column"}}>
                    <Link className='main-container-link'
                        to={{
                        pathname: '/Account/People/' + reporter.key + '/',
                        state: { 
                            key: reporter.key,
                            person: reporter,
                        },}}>
                        <Box className='main-toprated-container-article-header'>
                            {reporter.profile_pic != null ?
                                <Avatar 
                                    alt={`${reporter.first_name} ${reporter.last_name}`} 
                                    src={reporter.profile_pic}
                                    className='main-toprated-container-profile-pic' />
                                :
                                <Avatar 
                                    alt={`${reporter.first_name} ${reporter.last_name}`} 
                                    src="/images/defaultProfilePic.png" 
                                    className='main-toprated-container-profile-pic'/>}

                            <Typography style={{fontFamily: "Neue Haas Grotesk Display Pro, sans-serif"}}>
                                <span className='main-toprated-container-article-reporter'>{`${reporter.first_name} ${reporter.last_name}`} </span>
                            </Typography>
                        </Box>
                    </Link>
                    <Link className='main-container-link'
                        to={{
                        pathname: '/Articles/' + Article.key + '/',
                        state: { 
                            ArticleID: id,
                            Article: Article,
                        },}}>
                        <Box sx={{width:"100%"}}>
                            <Box className='main-toprated-container-article-headline-container'>
                                <Typography style={{fontFamily: "Neue Haas Grotesk Display Pro, sans-serif"}}>
                                    <span className='main-toprated-container-article-headline-container'>{Article.headline}</span>
                                </Typography>
                            </Box>  
                        </Box>
                    </Link>
                    </Box>
                    <Box sx={{width: "100px", height: "100px", marginRight: "5vw"}}>
                        <Box sx={{width: "100px" , height: "100px"}}>
                            <img 
                                alt={`article_pic`}
                                src={`${Article?.article_pic}`}
                                className='main-toprated-container-article-picture'
                            />
                        </Box>
                    </Box>
                </Box>
                )
            })
            :null}
        </Box>
    )
}
export default TopRated;
