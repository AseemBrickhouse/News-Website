import React, { Component } from 'react';
import Articles from "./Dashboard/Articles";
   
export default class HomePage extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <div>
                <Articles/>
            </div>
        );
    }
}