import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import SignUp from '../Buttons/SignUp';
import Login from '../Buttons/Login';
import TwitterIcon from '@material-ui/icons/Twitter';
import {
  Switch, 
  Route,
  BrowserRouter as Router,
  Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

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
          <img alt="No Image"></img>
          <aTitle className='active'>Lorem</aTitle>
          <a href="#About us"> About Us </a>
          {
            this.props.isAuthenticated ? 
              <a href="#Logout">Logout</a>
            :
            <div>
              <Link to="Login">Login</Link>
              {/* <Route path={"http://127.0.0.1:8000/Login"}>Login</Route> */}
              <SignUp />
            </div>
          }

          <a href="javascript:void(0);" className="icon" onclick={document.getElementById('myTopnav')}>
              <i class="fa fa-bars"></i>
          </a>
        </div>
        <div className='headFull' id='myheadFull'>
          <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in dapibus lacus, 
              quis commodo ipsum. Curabitur libero purus, tincidunt vitae urna malesuada, 
              lacinia laoreet lorem. Maecenas nisi libero, venenatis nec erat ut, congue tempor lorem. 
              Phasellus ullamcorper turpis a orci rutrum congue. Curabitur finibus enim lorem, in 
              dignissim libero interdum bibendum.</p>
          <div className='HFL'><a href="#Start Now">Start Now</a></div>

        </div>
      </React.Fragment>
    );
  }
}

export default Header;
    {/* // <div className={classes.root}>
    //   <AppBar position="static" style={{background: 'rgba(181, 98, 111, 1)'}}>
    //     <Toolbar>
    //         <Menu>

    //         </Menu>
    //         { /*Icon Here*/ }
    //       </IconButton>
    //       <Typography variant="h6" className='header1'>
    //         Test
    //       </Typography>
    //       <Button color="inherit">Login</Button>
    //     </Toolbar>
    //   </AppBar>
    // </div> */}