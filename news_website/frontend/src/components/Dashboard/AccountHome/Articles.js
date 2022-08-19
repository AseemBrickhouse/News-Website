import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Redirect, Switch } from "react-router-dom";
import Menu from './Menu';

class Articles extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            articles: [],
        };
    }
    componentDidMount(){
        fetch("/api/AllUserArticles/", {
            method: "POST",
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json',
              },
                body: JSON.stringify({
                    token: localStorage.getItem('token')
                })
        })
        .then(response =>{
            if(response.status > 400){
                return this.setState(()=>{
                    return{ placeholder: "Something went wrong!" };
                });
            }
            return response.json();
        })
        .then(data => {
            return this.setState({
                articles: data,
            });
        });
    }
    printArticles = () =>{
        return(
            <div>
                {
                    Object.entries(this.state.articles).map( ([id, ArticleInfo]) =>{
                        return(
                            <div className='ArticleCards'>
                                <div class="Cardcontainer">
                                    <div class="card">
                                        <div class="card-header">
                                          {/* <img src="https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg" alt="rover" /> */}
                                        </div>
                                        <div class="card-body">
                                          <span class="tag tag-teal">Technology</span>
                                          <h4>{ArticleInfo.headline}</h4>
                                          <p>{ArticleInfo.article_description}</p>
                                          <div class="user">
                                            <div class="user-info">
                                              <h5>July Dec</h5>
                                              <small>2h ago</small>
                                            </div>
                                          </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        )
    }

    render(){
        console.log(this.state);
        return(
            <div>
                {
                    this.props.isAuthenticated ?
                        <this.printArticles/>
                    :
                        console.log('here')
                }
            </div>
        )
    }
}
export default Articles;