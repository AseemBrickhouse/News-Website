import React, { Component } from 'react';
import Advertisments from './Advertisments';
import { Redirect, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import {
  Route,
} from "react-router-dom";
import ArticleID from './ArticleID';

export default class Article extends Component{
  constructor(props){
      super(props);
      this.state = {
          data: [],
          article: [],
          loaded: false,
          placeholder: "Loading",
      };
  }

  componentDidMount(){
    fetch("api/AllArticles/", {
      method: "GET",
      headers:{
        'Accept':'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response =>{
      if(response.status > 400){
          return this.setState(()=>{
              return{ placeholder: "Something went wrong!" };
          });
      }
      return response.json();
    }).then(data =>{
        this.setState(() =>{
          return{
              data,
              loaded: true
          };
        });
    })
  }
  getTags = (Article) =>{
    var send = []
    if (Array.isArray(Article.tags)) {
        for(let i = 0; i < Article.tags.length; i++){
            send.push(<span class="tag tag-teal">{Article.tags[i]}</span>)
        }
    }else{
        send.push(<span class="tag tag-teal">{Article.tags}</span>)
    }
    return(
        <div>{send}</div>
    )
  }
  Articles = () => {
    const handleView = (id)=>{
      <Route exact path={'/Articles/' + id + '/'}>
          <ArticleID/>
      </Route>
    }
    return(
      <React.Fragment>
          <div className = 'container'>
            <div className = 'item-left'>
              {Object.entries(this.state.data).map(([id,Article]) => {
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
                          <p1>{new Date(Article.date).getMonth() + '-' + new Date(Article.date).getDate() + '-' + new Date(Article.date).getFullYear()}</p1>
                            {this.getTags(Article)}
                          <p3>{Article.reporter_account}</p3> 
                        </div>
                        <Link to={{
                          pathname: '/Articles/' + id + '/',
                          state: { 
                            ArticleID: id,
                            Article: Article,
                          },
                          }}>
                          <Button onClick={ () => handleView(id)}>
                            View
                          </Button>
                        </Link>


                      </div>
                  </div>
                );
              })}
            </div>
            <div className = 'item-middle' id='item-middle'>
              <div className='popTags' id='popTags'>
                  <div className = 'tagHome'> 
                      <a href='#Tech'> Technology </a>
                  </div>  
                  <div className = 'tagHome'>
                      <a href='#Life'> Life </a>
                  </div>   
                  <div className = 'tagHome'> <a href='#Earth'> Earth </a></div>   
                  <div className = 'tagHome'> <a href='#Word'> Work </a></div>
                  <div className = 'tagHome'> <a href='#Long'> Long </a></div> 
                  <div className = 'tagHome'> <a href='#Sciecne'> Science </a></div> 
                  <div className = 'tagHome'> <a href='#School'> School </a></div>  
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
    )
  }
  render(){
    return(
      <this.Articles/>
    ); 
  }  
}
