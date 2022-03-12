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
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
        };
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
            // <div className = 'background'>
            //     <ul>
            //         {this.state.data.map(Article => {
            //             return(
            //                 <li key = {Article.id}>
            //                     {Article.headline}
            //                     {Article.article_description}
            //                 </li>
            //             );
            //         })}
            //     </ul>
            // </div>  
        );
    }
}