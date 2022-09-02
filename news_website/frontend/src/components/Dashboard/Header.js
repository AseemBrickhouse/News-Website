import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import MyAccount from './MyAccount';
import {
  BrowserRouter as Router,
  Link,
  withRouter
} from "react-router-dom";
import * as actions from '../../store/actions/auth';
import { getTableHeadUtilityClass } from '@mui/material';

import { 
  Grid, Typography, TextField, 
  FormControlLabel, Avatar, 
  CssBaseline, Box, MenuList, Button,
  Container, Checkbox, MenuItem, NestedMenuItem,
} from "@material-ui/core";
//Prob can remove
window.onscroll = function(){
  myFunction();
};
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  } 
}

class Header extends Component{
  constructor(props){
    super(props);
  }
  render(){ 
    return (
      <React.Fragment>
        <div className='topnav' id = "myTopnav">
          {/* src="../../static/images/what.png" */}
          <img alt="No Image"></img>
          {/* <aTitle><Link to="/">Lorem</Link></aTitle> */}
          <home><Link to="/">Lorem</Link></home>
          {
            this.props.isAuthenticated ? 
              <div>
                <MyAccount {...this.props}/>
              </div>
            :
            <div>
              <Link to="/Login" {...this.props}>Login</Link>
              <Link to="/SignUp" {...this.props}>SignUp</Link>
              <a href="#About us"> About Us </a>
            </div>
          }

          <a href="javascript:void(0);" className="icon" onclick={document.getElementById('myTopnav')}>
              <i class="fa fa-bars"></i>
          </a>
        </div>
        {
          this.props.location.pathname == '/' && !this.props.isAuthenticated ? 
            <div>            
              <div className='headFull' id='myheadFull'>
              <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in dapibus lacus, 
                  quis commodo ipsum. Curabitur libero purus, tincidunt vitae urna malesuada, 
                  lacinia laoreet lorem. Maecenas nisi libero, venenatis nec erat ut, congue tempor lorem. 
                  Phasellus ullamcorper turpis a orci rutrum congue. Curabitur finibus enim lorem, in 
                  dignissim libero interdum bibendum.</p>
              <div className='HFL'><Link to="/SignUp" {...this.props}>Start Now</Link></div>
              </div>
            </div>
          :
          <Box>

          </Box>
        }
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    logout : () => dispatch(actions.authLOGOUT())
  }
}
export default withRouter(connect(null,mapDispatchToProps)(Header));