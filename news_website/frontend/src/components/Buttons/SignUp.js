import * as React from 'react';
import * as actions from '../../store/actions/auth';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { styled } from "@material-ui/core/styles";

import { 
  TextField,
  Button, 
  Box, 
  Container,
  Typography,
} from "@material-ui/core";
import Loading from './Loading';

const SignUp = (props) =>{
    const StyledButton = styled(Button)({
      fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
      color: "black",
      textDecoration: "none",
      fontSize: "18px",
      fontWeight: "bold",
      textTransform: "none",
      textDecoration: "none",
      backgroundColor: "#F2AF29",
    })

  const [load, setLoad] = React.useState(false)
  const Checker = (email, password1, password2) => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('username'),
      email: data.get('email'),
      password1: data.get('password1'),
      password2: data.get('password2'),
    });
    if(Checker(data.get('email'), data.get('password1'), data.get('password2') ) ){
      setLoad(true)
      props.onAuth(data.get('username'), data.get('email'), data.get('password1'), data.get('password2'))
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
          if(response.status > 200){
            //Error
          }else if (response.status = 200){
            //Success
          }
        })
        setLoad(false)
        props.history.push('/')
      }, 3000)
    }else{
      console.log("Invalid credentials");
    }
  };
  return(
    <div>
      {
       load ? 
        <Loading/>
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
