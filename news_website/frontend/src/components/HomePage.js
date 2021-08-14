import React, { Component } from 'react';
import {Provider} from 'react-redux';
import SignUp from "./User/SignUp";
import Login from "./User/Login";
import Header from "./Dashboard/Header";
import Account from "./User/account";
import store from "../store";
import Articles from "./Dashboard/Articles";

import {
    BrowserRouter as Router, 
    Switch, 
    Route, 
    Link, 
    Redirect
} from "react-router-dom";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
   
export default class HomePage extends Component{
    constructor(props){
        super(props);
    }

    renderHomePage(){
   
        return(
            <Grid>
                <h1>This is home</h1>
                <Button color="primary" to="/signup" component={Link}> Sign up </Button> 
                <Button color="secondary" to="/login" component={Link}> Login </Button>  
                {/* <Login /> */}
                {/* <div>
                    <div className="btn" onClick={this.togglePop}>
                        <Button> Login </Button> 
                    </div>
                    {this.state.seen ? <PopUp toggle={this.togglePop}/> : null} 
                </div> */}
            </Grid>
            
        );
    }

    render(){
        return (
            <div className='background'>
            <Provider store={store}>
                <Router>
                    <Header/>
                    <br/>
                    <Grid xs={14}>
                        <Grid Item xs={10}>
                            <Articles/>
                        </Grid>
                    </Grid>
                        <Switch>
                            {/* <Route exact path='/' component={this.renderHomePage}/> */}
                            <Route path='/signup' component={SignUp} />
                            <Route path='/login' component={Login}/>
                        </Switch>
                    
                </Router>
                </Provider>
            </div>
        );
    }
}