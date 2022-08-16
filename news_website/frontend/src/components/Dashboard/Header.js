import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import SignUp from '../Buttons/SignUp';
import Login from '../Buttons/Login';
import TwitterIcon from '@material-ui/icons/Twitter';
import { connect } from 'react-redux';
import MyAccount from './MyAccount';
import {
  Switch, 
  Route,
  BrowserRouter as Router,
  Link,
  withRouter
} from "react-router-dom";
import * as actions from '../../actions/auth';

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
const mapDispatchToProps = dispatch => {
  return {
    logout : () => dispatch(actions.authLOGOUT())
  }
}
export default withRouter(connect(null,mapDispatchToProps)(Header));
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