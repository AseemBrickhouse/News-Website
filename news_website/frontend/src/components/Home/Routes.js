import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
import {
    BrowserRouter as Router,
    Switch, 
    Route,
    withRouter
  } from "react-router-dom";
import HomePage from './HomePage';
import Header from '../Dashboard/Header';
import Account from '../Dashboard/AccountHome/Account';
import ArticleID from '../Dashboard/ArticleID';
import Articles from '../Dashboard/AccountHome/Articles';
import EditAccount from '../Dashboard/AccountHome/EditAccount';
import CreateArticle from '../Dashboard/AccountHome/CreateArticle';
import Login from '../Buttons/Login';
import SignUp from '../Buttons/SignUp';
import FindPeople from '../Dashboard/People/FindPeople';
import AccountID from '../Dashboard/People/Account';
class Routes extends React.Component{
        componentDidMount(){
        this.props.AutoTrySignUp();
    }
    render(){
        return(
        <React.Fragment>
            <Router>
                <Header {...this.props}/>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/SignUp" component={SignUp}/>
                    <Route exact path="/Login" component={Login}/>
                    <Route exact path ='/Account/EditAccount' component={EditAccount}/>
                    <Route exact path='/Account/CreateArticle' component={CreateArticle}/>
                    <Route exact path={'/Articles/:id'} component={ArticleID}/>
                    <Route exact path='/Account/FindPeople' component={FindPeople}/>
                    <Route exact path={'/Account/People/:key'} component={AccountID}/>
                    <Route exact path ='/Account/Articles'>
                        <Articles {...this.props}/>
                    </Route>
                    <Route path ='/Account/Profile'>
                        <Account {...this.props}/>
                    </Route>
                </Switch>
            </Router>
        </React.Fragment>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(Routes);

