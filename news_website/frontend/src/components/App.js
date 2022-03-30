import React, { Component }  from 'react';
import HomePage from './HomePage';
import Header from './Dashboard/Header';
import { connect } from 'react-redux';
import * as actions from '../actions/auth';

class App extends Component{

    componentDidMount(){
        this.props.AutoTrySignUp();
    }
    render(){
        return( 
             <div>
                <Header {...this.props}/>
                 <HomePage/>
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

export default connect(mapStateToProps, mapDispatchToProps) (App);
//ReactDOM.render(<App />, document.getElementById('app'));
// const appDiv = document.getElementById("app");
// render(<App />, appDiv);