import React, { Component }  from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './Home/Routes';
import { connect } from 'react-redux';
import * as authActions from '../store/actions/auth';
import * as articleActions from '../store/actions/article';

class App extends Component{
    componentDidMount(){
        this.props.AutoTrySignUp();
        // this.props.AllArticles();
    }
    render(){
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
    // console.log(state)
    return{
        // isAuthenticated: state.auth.token !== null 
            isAuthenticated: state.auth.token !== null 
    }
}

const mapDispatchToProps = dispatch => {
    return{
        // AllArticles: () => dispatch(articleActions.getARTICLES()),
        AutoTrySignUp: () => dispatch(authActions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
