import * as React from 'react';
import * as actions from '../../store/actions/auth';
import CSRFToken from '../../store/actions/csrfToken';
import {  withRouter, Link } from 'react-router-dom';
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


const theme = createTheme();
class Login extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let userOrEmail = data.get('email').includes('@') ? true : false;
    console.log({
      em: userOrEmail,
      email: data.get('email'),
      password: data.get('password'),
    });
    this.props.loading = true;
    //FIX ERROR HANDLE
    this.props.onAuth(data.get('email'), data.get('password'));
    this.props.history.push('/');
    localStorage.getItem('token') != null ? this.props.history.push('/') : console.log( localStorage.getItem('token') + "NULLLLL") ;
  };

  submitButton = () =>{
    const StyledButton = styled(Button)({
        fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
        color: "black",
        textDecoration: "none",
        fontSize: "18px",
        fontWeight: "bold",
        // letterSpacing: ".1rem",
        textTransform: "none",
        textDecoration: "none",
        backgroundColor: "#F2AF29",

      });
      return(
        <div>
           <Box sx={{display: "flex", flexDirection:"row", marginLeft:"45%", width: "100%", marginTop: "2vh", justifyContent: "center", alignItems:"center"}}>
              <StyledButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{marginLeft: "-1vw"}}
              >
                Log in
              </StyledButton>
            </Box>
        </div>
      )
  }
  signUp = () =>{
    const StyledButton = styled(Button)({
      fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
      color: "black",
      textDecoration: "none",
      fontSize: "18px",
      fontWeight: "bold",
      // letterSpacing: ".1rem",
      textTransform: "none",
      textDecoration: "none",
      backgroundColor: "#E0E0CE",

    });
    return(
    <Box sx={{marginLeft: "50%", width: "100%"}}>
      <Box sx={{marginRight: "2vw", marginLeft: "2vw", marginTop:"1vh"}}>
          <Link to ="/SignUp" style={{textDecoration:"none"}}>
            <StyledButton>
              Don't have an account? Sign up today!
            </StyledButton>
          </Link> 
      </Box>
    </Box>
    )
  }
render(){
    let errMsg = null;
    if(this.props.error){
       errMsg = (
           <p>Invalid Username and/or password</p>
      )
    }
  return (
    <div>
      {
        this.props.loading ? 
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
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
                  <Box component='form' noValidate onSubmit={this.handleSubmit} xs={{display: "flex", flexDirection:"column", alignItems:"center", justifyContent: "center", width: "100%"}}>
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
                      <this.submitButton/>
                      <this.signUp/>
                  </Box>
                </Box>
              </Container>
            </Box>
      }
    </div>
  )}
}
const mapStateToProps = (state) =>{
    return{
        loading: state.loading,
        error: state.error,
    }
}
const mapDispatchToProps = dispatch => {
    return {
      onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));