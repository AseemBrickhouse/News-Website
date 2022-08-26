import * as React from 'react';
import * as actions from '../../store/actions/auth';
import CSRFToken from '../../store/actions/csrfToken';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { 
  Grid, Typography, TextField, 
  FormControlLabel, Avatar, 
  Button, CssBaseline, Link, Box, 
  Container, Checkbox,
} from "@material-ui/core";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';


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
          setTimeout(()=>{
            fetch("/api/AccountCreation/", {
              method:"POST",
              headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  first_name: data.get('first_name'),
                  last_name:data.get('last_name'),
                  email: data.get('email'),
                  token: localStorage.getItem('token')
              })
            }).then(response =>{
              console.log(response)
              window.location.reload()
            })
            this.props.history.push('/')
          }, 1000)
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
                <TextField
                  required
                  fullWidth
                  name="first_name"
                  label="first_name"
                  type="first_name"
                  id="first_name"
                  autoComplete="first_name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="last_name"
                  label="last_name"
                  type="last_name"
                  id="last_name"
                  autoComplete="last_name"
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