import React, {Component} from "react";
import {
    BrowserRouter as Router, 
    Switch, 
    Route, 
    Link, 
    Redirect
} from "react-router-dom";
import { 
    Grid, Button, ButtonGroup, 
    Typography, TextField, FormControl,
    FormHelperText, 
} from "@material-ui/core";


export default class Login extends Component {
    default_username = "username"
    default_password = "password"


    constructor(props){
        super(props);

        this.state = {
            username: this.default_username,
            password: this.default_password,
         };
    }

    handleUsername(event){
        this.setState({
            username: event.target.value,
        });
    };
    handlePassword(event){
        this.setState({
            password: event.target.value,
        });
    };
    handleLogin(){
        console.log(this)
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
        };
        fetch("/api/login", requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data))
    }
    render(){
        return(
            <div>
                <Grid>
                    <FormControl>
                        <TextField
                            require={true}
                            type="text"
                            onChange={this.handleUsername.bind(this)}
                            defaultValue={this.default_username}
                            inputProps={{
                                min: 1,
                                style: {textAlign: "center"},
                            }}  
                        />
                        <FormHelperText>
                            <div align="center">Username</div>
                        </FormHelperText>
                    </FormControl>
                    <FormControl>
                        <TextField
                        require={true}
                        type="text"
                        onChange={this.handlePassword.bind(this)}
                        defaultValue={this.default_password}
                        inputProps={{
                            min: 1,
                            style: {textAlign: "center"},
                        }}  
                        />
                        <FormHelperText>
                            <div>password</div>
                        </FormHelperText>
                    </FormControl>
                    <Button 
                    color="primary"
                    variant="contained"
                    onClick={this.handleLogin.bind(this)}
                    >
                        Login
                    </Button>
                    <Button 
                    color="secondary"
                    variant="contained"
                    to="/"
                    component={Link}
                    >
                    back
                    </Button>
                </Grid>
            </div>
        );
    }
}