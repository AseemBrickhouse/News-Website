import * as React from 'react';
import * as actions from '../../store/actions/auth';
import CSRFToken from '../../store/actions/csrfToken';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { styled } from "@material-ui/core/styles";

import { 
  Grid, Typography, TextField, 
  FormControlLabel, Avatar, 
  Button, CssBaseline, Link, Box, 
  Container, Checkbox,
} from "@material-ui/core";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';


// function Copyright(props) {
//     return (
//       <Typography variant="body2" color="text.secondary" align="center" {...props}>
//         {'Copyright © '}
//         <Link color="inherit" href="https://mui.com/">
//           Your Website
//         </Link>{' '}
//         {new Date().getFullYear()}
//         {'.'}
//       </Typography>
//     );
//   }

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
          }, 2000)
        }else{
          console.log("Invalid credentials");
        }
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
                  Sign Up
                </StyledButton>
              </Box>
          </div>
        )
    }

    render(){
        return(
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
                          Create Your Account
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
                      <Box sx={{display: "flex", flexDirection:"row", marginLeft:"50%", width: "100%",  marginTop: "2vh"}}>
                        <Box sx={{marginRight: "2vw", marginLeft: "-2vw"}}>
                        <TextField
                          required
                          fullWidth
                          name="password1"
                          label="Password"
                          type="password"
                          id="password1"
                          autoComplete="new-password"
                          variant="outlined"
                        />
                        </Box>
                        <Box>
                        <TextField
                          required
                          fullWidth
                          name="password2"
                          label="Confirm Password"
                          type="password"
                          id="password2"
                          autoComplete="new-password"
                          variant="outlined"
                        />
                        </Box>
                      </Box>
                      <Box sx={{display: "flex", flexDirection:"row", marginLeft:"50%", width: "100%", marginTop: "2vh"}}>
                        <Box sx={{marginRight: "2vw", marginLeft: "-2vw"}}>
                        <TextField
                          required
                          fullWidth
                          name="first_name"
                          label="First Name"
                          type="first_name"
                          id="first_name"
                          autoComplete="first_name"
                          variant="outlined"
                        />
                        </Box>
                        <Box>
                        <TextField
                          required
                          fullWidth
                          name="last_name"
                          label="Last Name"
                          type="last_name"
                          id="last_name"
                          autoComplete="last_name"
                          variant="outlined"
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
      )
    }
}
{/* <ThemeProvider theme={theme}>
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
} */}

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