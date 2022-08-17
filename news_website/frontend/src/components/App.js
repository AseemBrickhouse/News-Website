import React, { Component }  from 'react';
import HomePage from './HomePage';
import Header from './Dashboard/Header';
import Login from './Buttons/Login';
import SignUp from './Buttons/SignUp';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import Account from './Dashboard/AccountHome/Account';
import BaseRouter from '../routes';
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
            <div>
            <Router>
                <div>
                <Header {...this.props}/>
                    <Switch>
                        <Route exact path="/">
                            <HomePage/>
                        </Route>
                        <Route exact path ="/Account">
                            <Account {...this.props}/>
                        </Route>
                        <Route exact path="/SignUp">
                            <SignUp/>
                        </Route>
                        <Route exact path="/Login">
                            <Login/>
                        </Route>
                    </Switch>
                </div>
            </Router>
            </div>
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
