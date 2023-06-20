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
import RightPanel from './components/RightPanel/RightPanel';
import LeftPanel from './components/LeftPanel/LeftPanel';
import * as request from "../ApiCalls/Requests"
import { GetPerson } from './components/RightPanel/Requests';
const ArticleID = (props) =>{
    const Article = props.location.state.Article
    return(
      //Rewrite article header to match with website
      Article != null && (
        <React.Fragment>
          <div className='container'>
                {/* <RightPanel person = {reporter} /> */}
                <LeftPanel article = {Article}/>
                <RightPanel reporter = {Article.reporter_account}/>
          </div>
        </React.Fragment>
      )
    )
}

const mapStateToProps = (state) => {
  return{
    account: state.auth.account,
  }
}

export default withRouter(connect(mapStateToProps,null)(ArticleID));