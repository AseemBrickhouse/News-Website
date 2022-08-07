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

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const theme = createTheme();
class Login extends React.Component{
// export default function NormalLoginForm(){
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
    try {
      this.props.onAuth(data.get('email'), data.get('password')); 
      <Redirect to= {{pathname: '/articles'}}/>
    }catch(error){
      console.log(error);
    }
    // <Navigate to='' replace={true}/>
    this.props.history.push('/');
    // if(this.props.isAuthenticated){
    //   console.log(this.props.isAuthenticated);
    // }
  };
render(){
    let errMsg = null;
    if(this.props.error){
      errMsg = (
          <p>{this.props.message}</p>
      )
    }
  return (
    <div>
        {errMsg} 
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
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
    }
    </div>
  );
 }
}
// const WrappedNormalLoginForm = Form.create()(Login);
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