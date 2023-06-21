import React, { Component, useState, useEffect, useSelector } from 'react';
import * as actions from '../../store/actions/auth';
import CSRFToken from '../../store/actions/csrfToken';
import {  withRouter, Link, Redirect, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { 
    Grid, Typography, TextField, 
    FormControlLabel, Avatar, 
    Button, CssBaseline, Box, 
    Container, Checkbox,
} from "@material-ui/core";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from "@material-ui/core/styles";
import Loading from './Loading';

const StyledButton = styled(Button)({
  fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
  color: "black",
  textDecoration: "none",
  fontSize: "18px",
  fontWeight: "bold",
  textTransform: "none",
  textDecoration: "none",
});

export const Login = (props) => {
  const [error, setError] = useState(null)
  const [load, setLoad] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(event)
    console.log(event.currentTarget)
    console.log(data.get('email'))
    let userOrEmail = data.get('email').includes('@') ? true : false;
    // console.log({
    //   em: userOrEmail,
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    // setLoad(true)
    props.onAuth(data.get('email'), data.get('password'));
    setTimeout(() => {
      // setLoad(false)
      props.history.push('/')
    }, 3000)

  };
  useEffect(()=>{
    setError(props.error)
  }, [load])
  return(
    <div>
      {
        load ? 
          <Loading/>
        :
        error != null ?
        <div>
          <Redirect to ="/AuthError" {...props}/> 
        </div>
        :
        <Box>
          <Container component="main">
            <Box sx={{backgroundColor: "#E0E0CE", display: "flex", flexDirection: "row", height: "70vh", marginTop: "10vh", borderRadius: "25px"}}>
              <Box sx={{backgroundColor: "#F2AF29", width: "30%", borderRadius: "25px 0 0 25px"}}>
                  <Box component="h1" variant="h5" style={{marginLeft: "0vw", fontSize: "150px"}}>
                    Lorem
                  </Box>
                  <Box sx={{marginLeft: "5px"}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in dapibus lacus, quis commodo ipsum. 
                  </Box>
              </Box>
              <Box component='form' noValidate onSubmit={handleSubmit} xs={{display: "flex", flexDirection:"column", alignItems:"center", justifyContent: "center", width: "100%"}}>
                <Box sx={{marginLeft: "50%", marginTop:"20vh", width: "100%"}}>
                  <Box sx={{marginLeft: "-2vw"}}>
                    <div className="CreateYourAccount">
                      Login to Your Account
                    </div>
                  </Box>
                </Box>
                  <Box sx={{display: "flex", flexDirection:"row", marginLeft:"50%", width: "100%",  marginTop: "2vh"}}>
                      <Box sx={{marginRight: "2vw", marginLeft: "-2vw"}}>
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address or Username"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        variant="outlined"
                        />
                      </Box>
                      <Box>
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        variant='outlined'
                        />
                      </Box>
                  </Box>
                  <Box sx={{display: "flex", flexDirection:"row", marginLeft:"45%", width: "100%", marginTop: "2vh", justifyContent: "center", alignItems:"center"}}>
                     <StyledButton
                       type="submit"
                       fullWidth
                       variant="contained"
                       style={{
                        backgroundColor: "#F2AF29",
                       }}
                       sx={{marginLeft: "-1vw",}}>
                       Log in
                     </StyledButton>
                  </Box>
                  <Box sx={{marginLeft: "50%", width: "100%"}}>
                    <Box sx={{marginRight: "2vw", marginLeft: "2vw", marginTop:"1vh"}}>
                        <Link to ="/SignUp" style={{textDecoration:"none"}}>
                          <StyledButton sx={{
                            backgroundColor: "#E0E0CE"
                          }}>
                            Don't have an account? Sign up today!
                          </StyledButton>
                        </Link> 
                    </Box>
                  </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      }
    </div>
  )
}
const mapStateToProps = (state) =>{
    return{
        loading: state.auth.loading,
        error: state.auth.error,
    }
}
const mapDispatchToProps = dispatch => {
    return {
      onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));


    // if(error){
    //   console.log("error")
    // }
    // <Redirect push to="/AuthError" {...props.error}/>
    // props.history.push('/');
    // localStorage.getItem('token') != null ? this.props.history.push('/') : console.log( localStorage.getItem('token') + "NULLLLL") ;