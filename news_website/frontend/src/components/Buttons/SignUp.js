import * as React from 'react';
import * as actions from '../../actions/auth';
import { 
    Grid, ButtonGroup, 
    Typography, TextField, 
    FormControl, FormControlLabel, FormHelperText,
    FormGroup, Avatar, Button, CssBaseline,
    Link, Box, Container, Checkbox, Form,
  } from "@material-ui/core";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import CSRFToken from '../../actions/csrfToken';
import { browserHistory } from 'react-router';
import { Redirect, useHistory, Navigate, withRouter } from 'react-router-dom';
import App from '../App';


function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const theme = createTheme();
class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    Checker = (email, password1, password2) => {
        if(email.includes('@')){
          if(password1 != password2){
            return true; //false
          }
          if(password1.length != 8){
            return true; //false
          }
          return true;
        }
        return true; //false
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          username: data.get('username'),
          email: data.get('email'),
          password1: data.get('password1'),
          password2: data.get('password2'),
        });
        if (this.Checker(data.get('email'), data.get('password1'), data.get('password2') ) ){
          this.props.onAuth(data.get('username'), data.get('email'), data.get('password1'), data.get('password2'))
          fetch("/api/AccountCreation/", {
            method:"POST",
            headers:{
              'Accept':'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: data.get('username'),
                email: data.get('email'),
                password: data.get('password1'),
                token: localStorage.getItem('token')
            })
          })
          this.props.history.push('/')
        }else{
          console.log("Invalid credentials");
        }
    };

    render(){
        return(
        <div>{
            this.props.loading ? 
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        :
<ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password1"
                  label="Password"
                  type="password"
                  id="password1"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    }</div>
        );
    }
}
const mapStateToProps = (state) =>{
    return{
        loading: state.loading,
        error: state.error,
    }
}
const mapDispatchToProps = dispatch => {
    return {
      onAuth: (username, email, password1, password2) => dispatch(actions.authSignUp(username, email, password1, password2))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));