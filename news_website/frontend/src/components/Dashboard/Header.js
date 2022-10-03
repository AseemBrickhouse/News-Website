import React from 'react';
import { connect } from 'react-redux';
import MyAccount from './MyAccount';
import {
  Link,
  withRouter
} from "react-router-dom";
import * as actions from '../../store/actions/auth';

import { 
  Box, Button,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import StickyBox from "react-sticky-box";


const Header = (props) =>{
    const StyledButton = styled(Button)({
      fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
      backgroundColor: "#AD343E",
      width: "110%",
      height: "100%",
      color: "white",
      textDecoration: "none",
      fontSize: "17px",
      fontWeight: "300",
      borderRadius: "50px",
      textTransform: "none",
      textDecoration: "none",
      "&:hover":{
        fontSize: "17px",
        fontWeight: "300",
        color: "white",
        backgroundColor: "black",
      }
    });
    return (
      props.location.pathname != '/Login' && props.location.pathname != '/SignUp' ?
      <React.Fragment>
        <StickyBox offsetTop={0}>
          <Box sx={{
            // zIndex: "100px",
            backgroundColor: "#d9cab3", 
            top: "0px", 
            height: "50px", 
            borderBottom: "1px solid black", 
            display: "flex", 
            flexDirection: "row",
            textOverflow: "hidden",
            // justifyContent:"space-between"
          }}>
            <Box sx={{display: "flex", flexDirection:"row", marginLeft: "15vw",}}>
              <Box sx={{marginLeft: "-5vw"}}>
                <img alt="No Image"></img>
              </Box>
              <Box sx= {{padding: "12px", position: "absolute"}}>
                <Link 
                  style={{
                    textDecoration: 'none',
                    fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                    color: "black",
                    fontSize: "20px",
                    fontWeight: "700",
                  }}
                  to="/"
                >
                  News Wire
                </Link>
              </Box>
            </Box>
            {
                props.isAuthenticated ? 
                  <Box sx={{display: "flex", flexDirection:"row", textAlign:"center", marginLeft: "46vw"}}>
                    <MyAccount {...props}/>
                  </Box>
                :
                <Box sx={{display: "flex", flexDirection:"row", padding: "12px", textAlign:"center", marginLeft: "46vw"}}>
                  <Box sx={{marginRight: "20px"}}>
                    <Link 
                      style={{
                        textDecoration: "none",
                        color: "black",
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                      to=""
                      >
                        Our Mission
                    </Link>
                    {/* <a href="#About us"> About Us </a> */}
                  </Box>
                  <Box sx={{marginRight: "20px"}}>
                    <Link 
                      style={{
                        textDecoration: "none",
                        color: "black",
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                      to="/Login" {...props}>
                          Sign In
                    </Link>
                  </Box>
                  <Box sx={{marginRight: "20px"}}>
                    <Link                     
                      style={{
                        textDecoration: "none",
                        color: "black",
                        fontSize: "15px",
                        fontWeight: "600",
                      }}
                      to="/SignUp"
                    >
                      <StyledButton>
                          Get Started
                      </StyledButton>
                    </Link>
                  </Box>
                </Box>
            }
          </Box>
        </StickyBox>

        {
          props.location.pathname == '/' && !props.isAuthenticated ? 
            <div>            
              <div className='headFull' id='myheadFull'>
              <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in dapibus lacus, 
                  quis commodo ipsum. Curabitur libero purus, tincidunt vitae urna malesuada, 
                  lacinia laoreet lorem. Maecenas nisi libero, venenatis nec erat ut, congue tempor lorem. 
                  Phasellus ullamcorper turpis a orci rutrum congue. Curabitur finibus enim lorem, in 
                  dignissim libero interdum bibendum.</p>
              <div className='HFL'><Link to="/SignUp">Start Now</Link></div>
              </div>
            </div>
          :
          <Box>

          </Box>
        }
      </React.Fragment>
      : <></>
    );
  // }
}
const mapDispatchToProps = dispatch => {
  return {
    logout : () => dispatch(actions.authLOGOUT())
  }
}
export default withRouter(connect(null,mapDispatchToProps)(Header));