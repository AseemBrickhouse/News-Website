import React, { Component } from 'react';
import SignUp from "./User/SignUp";
import Login from "./User/Login";
import Header from "./Dashboard/Header";
import Account from "./User/account";
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
    
    render(){
        return (
            <div>
                        <Header/>
                        {/* <Grid xs={14}>
                            <Grid Item xs={10}> */}
                                <Articles/>
                            {/* </Grid>
                        </Grid> */}
                            {/* <Switch> */}
                                {/* <Route exact path='/' component={this.renderHomePage}/> */}
                                {/* <Route path='/signup' component={SignUp} />
                                <Route path='/login' component={Login}/>
                            </Switch>   */}
            </div>
        );
    }
}