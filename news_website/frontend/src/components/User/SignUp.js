import React, {Component} from "react";
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";


export default class SignUp extends Component {
    default_username = "No"
    default_password = "Noo"
    default_email = "No@gmail.com"
    default_first_name = "No"
    default_last_name = "No"
    default_phone = "444-444-4444"

    constructor(props){
        super(props);

        this.state = {
            username: this.default_username,
            password: this.default_password,
            first_name: this.default_first_name,
            last_name: this.default_last_name,
            email: this.default_email,
            phone: this.default_phone,
         };

         this.handleUsernameChange = this.handleUsernameChange.bind(this);
         this.handlePasswordChange = this.handlePasswordChange.bind(this);
         this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
         this.handleLastNameChange = this.handleLastNameChange.bind(this);
         this.handleEmailChange = this.handleEmailChange.bind(this);
         this.handlePhoneChange = this.handlePhoneChange.bind(this);
    }

    handleUsernameChange(event){
        this.setState({
            username: event.target.value,
        });
    }
    handlePasswordChange(event){
        this.setState({
            password: event.target.value,
        });
    }
    handleFirstNameChange(event){
        this.setState({
            first_name: event.target.value,
        });
    }
    handleLastNameChange(event){
        this.setState({
            last_name: event.target.value,
        });
    }
    handleEmailChange(event){
        this.setState({
            email: event.target.value,
        });
    }
    handlePhoneChange(event){
        this.setState({
            phone: event.target.value,
        });
    }
    handleSignUpPressed(){
        console.log(this)
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                first_name: this.state.first_name,
                last_name : this.state.last_name,
                email: this.state.email,
                phone: this.state.phone,
            }),
        };
        fetch("/api/user", requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .then((data) => this.props.history.push(""))
    }

    render(){
        return(
            <Grid container spacing={1}>
                <FormControl>
                    <TextField
                        require={true}
                        type="text"
                        onChange={this.handleUsernameChange}
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
                    onChange={this.handlePasswordChange}
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
                <FormControl>
                    <TextField
                    require={true}
                    type="text"
                    onChange={this.handleFirstNameChange}
                    defaultValue={this.default_first_name}
                    inputProps={{
                        min: 1,
                        style: {textAlign: "center"},
                    }}  
                    />
                    <FormHelperText>
                        <div>First name</div>
                    </FormHelperText>
                </FormControl>
                <FormControl>
                    <TextField
                    require={true}
                    type="text"
                    onChange={this.handleLastNameChange}
                    defaultValue={this.default_last_name}
                    inputProps={{
                        min: 1,
                        style: {textAlign: "center"},
                    }}  
                    />
                    <FormHelperText>
                        <div>Last name</div>
                    </FormHelperText>
                </FormControl>
                <FormControl>
                    <TextField
                    require={true}
                    type="text"
                    onChange={this.handleEmailChange}
                    defaultValue={this.default_email}
                    inputProps={{
                        min: 1,
                        style: {textAlign: "center"},
                    }}  
                    />
                    <FormHelperText>
                        <div>email</div>
                    </FormHelperText>
                </FormControl>
                <FormControl>
                    <TextField
                    require={true}
                    type="text"
                    onChange={this.handlePhoneChange}
                    defaultValue={this.default_phone}
                    inputProps={{
                        min: 1,
                        style: {textAlign: "center"},
                    }}  
                    />
                    <FormHelperText>
                        <div>phone</div>
                    </FormHelperText>
                </FormControl>
                <Button 
                    color="primary"
                    variant="contained"
                    onClick={this.handleSignUpPressed.bind(this)}
                    >
                    Save
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
        );
    }
}