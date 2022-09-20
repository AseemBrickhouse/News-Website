import React, { Component }  from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './Home/Routes';
import { connect } from 'react-redux';
import * as authActions from '../store/actions/auth';
import * as articleActions from '../store/actions/article';
import * as savedAction from '../store/actions/savedArticles';

class App extends Component{
    componentDidMount(){
        const token = localStorage.getItem('token');
        this.props.AutoTrySignUp();
        this.props.AllArticles(token);
        this.props.SavedArticles(token);
    }
    render(){
        // console.log(this.props)
        return( 
            <React.Fragment>
                <Router>
                    <Routes {...this.props}/>
                </Router>
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return{
            account: state.auth.account,
            isAuthenticated: state.auth.token !== null ,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        AllArticles: (token) => dispatch(articleActions.getARTICLES(token)),
        AutoTrySignUp: () => dispatch(authActions.authCheckState()),
        SavedArticles: (token) => dispatch(savedAction.getSAVEDARTICLES(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
