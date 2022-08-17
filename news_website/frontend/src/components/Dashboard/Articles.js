import React, { Component } from 'react';
import Advertisments from './Advertisments';

export default class Article extends Component{
  constructor(props){
      super(props);
      this.state = {
          data: [],
          loaded: false,
          placeholder: "Loading"
      };
  }

  componentDidMount(){
    fetch("api/AllArticles")
        .then(response =>{
            if(response.status > 400){
                return this.setState(() => {
                    return{ placeholder: "Something went wrong!" };
                });
            }
            return response.json();
        })
        .then(data => {
            this.setState(() =>{
                return{
                    data,
                    loaded: true
                };
            });
        });
  }

  render(){
    console.log(this.state.data)
    return(
      <React.Fragment>
          <div className = 'container'>
            <div className = 'item-left'>
              {this.state.data.map(Article => {
                  return(
                    <div className ='content'>
                      <div className ='article'>
                        <h1>{Article.headline}</h1>
                        <div className = 'description'>
                          <p>
                              {Article.article_description}
                          </p>
                        </div>
                        <div className = 'bottom'>
                          <p1>{Article.date}</p1>
                          <p2>tag1</p2>
                          <p2>tag2</p2>
                          <p3>{Article.reporter_account}</p3> 
                        </div>
                      </div>
                  </div>
                );
              })}
            </div>
            <div className = 'item-middle' id='item-middle'>
              <div className='popTags' id='popTags'>
                  <div className = 'tag'> 
                      <a href='#Tech'> Technology </a>
                  </div>  
                  <div className = 'tag'>
                      <a href='#Life'> Life </a>
                  </div>   
                  <div className = 'tag'> <a href='#Earth'> Earth </a></div>   
                  <div className = 'tag'> <a href='#Word'> Work </a></div>
                  <div className = 'tag'> <a href='#Long'> Long </a></div> 
                  <div className = 'tag'> <a href='#Sciecne'> Science </a></div> 
                  <div className = 'tag'> <a href='#School'> School </a></div>  
              </div>
              <div className='footer'>
                  <a href='#About us'>About Us</a>
                  <a href='#Contact us'>Contact Us</a>
                  <a href='#Careeres'>Careeres</a>
                  <a href='#Account'>Account</a>
                  <a href='#Terms of Service'>Terms of Service</a>
                  <a href='#Find Us'>Find Us</a>
              </div>
            </div>
              <div className = 'item-right' id = 'item-right'>
                  <div className = 'content'>
                      <Advertisments/>
                  </div>
              </div>
          </div>
      </React.Fragment>
    ); 
  }  
}
