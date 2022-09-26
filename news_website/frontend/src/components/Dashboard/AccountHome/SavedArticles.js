import React, { Component, useState, useEffect, useSelector } from 'react';
import { connect } from 'react-redux';
import {
  Route, withRouter, Redirect, Link
} from "react-router-dom";
import ArticleID from '../ArticleID';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';


import { 
  Grid, Typography, TextField, 
  FormControlLabel, Avatar, Chip,
  CssBaseline, Box, MenuList, Button,
  Container, Checkbox, MenuItem, NestedMenuItem,
} from "@material-ui/core";


const SavedArticles = (props) => {
    const [saved, setSaved] = useState(null)
    const [load, setLoad] = useState(false)
    //Handle Error takes place in parrent 
    // const x = () =>{
    //     !props.isAuthenticated ? <Redirect to ='/'/> : console.log("nothing")
    // }
    // var loggedIn = setTimeout(() =>{ 
    //     x()
    // }, 100) 
    // if (!props.isAuthenticated){
    //     return(
    //         <Redirect to ='/'/>
    //     )
    // }else{
    //     return(
    //         <div>

    //         </div>
    //     )
    // }
    console.log(props.savedArticles)
    return(
        <div>

        </div>
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