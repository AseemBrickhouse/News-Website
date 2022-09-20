import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import Articles from "../Dashboard/Articles";
import Header from '../Dashboard/Header';

const HomePage = (props) => {
    return (
        <Articles {...props}/>
    );
}
export default HomePage;