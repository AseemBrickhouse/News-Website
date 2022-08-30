import React, { Component }  from 'react';
import HomePage from './HomePage';
import Header from './Dashboard/Header';
import Login from './Buttons/Login';
import SignUp from './Buttons/SignUp';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import Account from './Dashboard/AccountHome/Account';
import BaseRouter from '../routes';
import ArticleID from './Dashboard/ArticleID';

import {
    BrowserRouter as Router,
    Switch, 
    Route,
    Link
  } from "react-router-dom";

class App extends Component{

    componentDidMount(){
        this.props.AutoTrySignUp();
    }
    render(){
        return( 
            <Router>
                <Header {...this.props}/>
                    <Switch>
                        <Route exact path="/">
                            <HomePage/>
                        </Route>
                        <Route exact path ="/Account/Profile">
                            <Account {...this.props}/>
                        </Route>
                        <Route exact path="/SignUp">
                            <SignUp/>
                        </Route>
                        <Route exact path="/Login">
                            <Login/>
                        </Route>
                        <Route exact path={'/Articles/:id'}>
                            <ArticleID/>
                        </Route>
                    </Switch>
            </Router>
        );
    }
}

const mapStateToProps = state => {
    return{
        isAuthenticated: state.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return{
        AutoTrySignUp: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
