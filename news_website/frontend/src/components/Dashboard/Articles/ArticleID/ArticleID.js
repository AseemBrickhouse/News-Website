import React, { useEffect } from 'react';
import {Link, withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Util from '../../../Utility';
import { 
 Chip, Box, Typography, Button, Avatar
} from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import { styled } from "@material-ui/core/styles";
import StickyBox from "react-sticky-box";
import RightPannel from './components/RightPannel/RightPannel';
const ArticleID = (props) =>{
    const Utility = new Util();
    // console.log(props)
    const account = props.account
    const StyledButtonSubscribe = styled(Button)({
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
    const StyledButtonFollow = styled(Button)({
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
      // transform: "translate(-00%, -0%)",
      "&:hover":{
        fontSize: "15px",
        fontWeight: "300",
        color: "white",
        backgroundColor: "black",
      }
    });
    const StyledButtonFollowing = styled(Button)({
      fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
      // backgroundColor: "#AD343E",
      border: "1px solid #AD343E",
      width: "75%",
      height: "70%",
      color: "#AD343E",
      textDecoration: "none",
      fontSize: "15px",
      fontWeight: "500",
      borderRadius: "50px",
      textTransform: "none",
      textDecoration: "none",
      // transform: "translate(-50%, -0%)",
      // "&:hover":{
      //   fontSize: "15px",
      //   fontWeight: "300",
      //   color: "white",
      //   backgroundColor: "black",
      // }
    });
    const StyledTypographyHeader1 = styled(Typography)({
      fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
      textTransform: "none",
      textDecoration: "none",
      fontSize: "17px",
      fontWeight: "500",
      // textAlign: "center",
    })
    const StyledTypographyHeader2 = styled(Typography)({
        fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
        textTransform: "none",
        textDecoration: "none",
        fontSize: "17px",
        fontWeight: "500",
        color: "grey",
    })
    const StyledTypographySideHealine = styled(Typography)({
      fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
      textTransform: "none",
      textDecoration: "none",
      fontSize: "18px",
      fontWeight: "600",
      color: "black",
    })
    const Article = props.location.state.Article
    window.scrollTo(0, 0);
    const [reporter, setReporter] = React.useState(Article.reporter_account);
    const [reporterArticles, setReporterArticles] = React.useState([]);
    const [load, setLoad] = React.useState(true);
    useEffect(() =>{
        fetch("/api/GetPerson/",{
          method: "POST",
          headers:{
              'Accept':'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              token: localStorage.getItem('token'),
              first_name: reporter.first_name,
              last_name: reporter.last_name,
              email: reporter.email,
          })
        })
        .then(response=> {
            return response.json();
        })
        .then(data=>{
            console.log(data)
            setReporter(data)
        })
        fetch("/api/GetUserArticles/",{
          method: "POST",
          headers:{
              'Accept':'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              key: reporter.key
          })
        })
        .then(response=> {
            return response.json();
        })
        .then(data=>{
        //   console.log(data)
          setLoad(true)
          setReporterArticles(data)
        })
    },[load]);
    const handleFollow = (person) =>{
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
      setLoad(false);
    }
    const handleUnfollow = (person) => {
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
      setLoad(false);
    }

    return(
      //Rewrite article header to match with website
      <React.Fragment>
      <div className='container'>
            <RightPannel {...props}/>
      </div>
      </React.Fragment>
    )
}

const mapStateToProps = (state) => {
  console.log(state)
  return{
    account: state.auth.account,
  }
}

export default withRouter(connect(mapStateToProps,null)(ArticleID));