import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import Articles from "./Dashboard/Articles";
import Header from './Dashboard/Header';

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