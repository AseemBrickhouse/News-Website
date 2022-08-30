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
                <Box sx={{backgroundColor: "white", display: "flex", flexDirection: "row", height: "70vh", marginTop: "10vh"}}>
                  <Box sx={{backgroundColor: "#F2AF29", width: "30%",}}>
                      <Box component="h1" variant="h5" style={{marginLeft: "0vw", fontSize: "150px"}}>
                        Lorem
                      </Box>
                      <Box>
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
                            hiddenLabel
                            name="username"
                            required
                            id="username"
                            variant="outlined"
                            label="Username"
                            />
                          </Box>
                          <Box>
                            <TextField
                            required
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            variant='outlined'
                            />
                          </Box>
                      </Box>
                      <this.submitButton/>
                  </Box>
                </Box>
              </Container>
            </Box>
      }
    </div>
  )}
}
//     <div>
//     {
//         this.props.loading ? 
//         <Box sx={{ display: 'flex' }}>
//             <CircularProgress />
//         </Box>
//     :
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <Typography component="h1" variant="h5" style={{color: "red"}}>
//             {errMsg}
//           </Typography>
//           <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
//            <CSRFToken />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//             />
//             <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="Remember me"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign In
//             </Button>
//             <Grid container>
//               <Grid item xs>
//                 <Link href="#" variant="body2">
//                   Forgot password?
//                 </Link>
//               </Grid>
//               <Grid item>
//                 <Link href="#" variant="body2">
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//     }
//     </div>
//   );
//  }
// }
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