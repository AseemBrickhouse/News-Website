import React, { Component }  from 'react';
import HomePage from './HomePage';

export default class App extends Component{
    render(){
        return( 
             <div>
                 <HomePage />
             </div>
        );
    }
}

//ReactDOM.render(<App />, document.getElementById('app'));
// const appDiv = document.getElementById("app");
// render(<App />, appDiv);