import React,{ Component}  from 'react';
//import {ReactDOM, render} from 'react-dom';
import HomePage from './HomePage';
import { render } from "react-dom";

class App extends Component{
    render(){
        return( 
            //<Provider store={store} >
                // <Fragment>
                //     <div className="container">
                //         <Header /> 
                //          {/* <Account />  */}
                //          {/* <HomePage />  */}
                //     </div>
                // </Fragment>
             //</Provider>  
             <div><HomePage/></div>
        );
    }
}

//ReactDOM.render(<App />, document.getElementById('app'));
const appDiv = document.getElementById("app");
render(<App />, appDiv);