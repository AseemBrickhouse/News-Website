import * as React from 'react';
import * as actions from '../../store/actions/auth';
import CSRFToken from '../../store/actions/csrfToken';
import {  withRouter } from 'react-router-dom';
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
            Sign in
          </Typography>
          <Typography component="h1" variant="h5" style={{color: "red"}}>
            {errMsg}
          </Typography>
          <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
           <CSRFToken />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    }
    </div>
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
      onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));