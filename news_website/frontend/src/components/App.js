import React, { Component }  from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './Home/Routes';

class App extends Component{
    render(){
        return( 
            <React.Fragment>
                <Router>
                    <Routes/>
                </Router>
            </React.Fragment>
        );
    }
}
export default App;
