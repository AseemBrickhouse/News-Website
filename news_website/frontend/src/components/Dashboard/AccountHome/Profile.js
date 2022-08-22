import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Redirect, Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Menu from './Menu';

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            account_role: "",
            phone: "",
            bio: "",
            occupation: "",
            email: "",
            popular_articles: [],
        };
    }
    componentDidMount(){
        fetch("/api/current_user/", {
            method:"POST",
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
                    return this.setState(() => {
                        return{ placeholder: "Something went wrong!" };
                    });
                }
                return response.json();
            })
            .then(data =>{
                return this.setState({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    account_role: data.role,
                    phone: data.phone,
                    bio: data.bio,
                    email: data.email,
                    occupation: data.occupation,
                    popular_articles: data.popular_articles,
                })
            });    
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
    Articles = () =>{
        // console.log(Object.entries(this.state.popular_articles));
        // var Articles = Object.entries(this.state.popular_articles);
        // for (const [key, value] of Articles){
        //     console.log(key , value.headline);
        // }
        return(
            <div>
                {
                    Object.entries(this.state.popular_articles).map( ([_, ArticleInfo]) => {
                        return(

                            <div class="Cardcontainer">
                                <div class="card">
                                    <div class="card-header">
                                      {/* <img src="https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg" alt="rover" /> */}
                                    </div>
                                    <div class="card-body">
                                      {this.getTags(ArticleInfo)}
                                      <h4>{ArticleInfo.headline}</h4>
                                      <p>{ArticleInfo.article_description}</p>
                                      <div class="user">
                                        <div class="user-info">
                                          <h5>July Dec</h5>
                                          <small>{ArticleInfo.rating} %</small>
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
        return(
            <div>
                <div className='profile'>
                    <div className="left">
                        <div className="iconBack">    
                        </div>
                    </div>
                    <div className="middle">
                        <div className="middleContent">
                            <p>Name<br/><br/><span> {this.state.first_name} {this.state.last_name}</span></p>
                            <p>Email<br/><br/><span> {this.state.email}</span></p>
                            <p>Occupation<br/><br/><span> {this.state.occupation}</span></p>
                            <p>Phone<br/><br/><span> {this.state.phone}</span></p>
                        </div>
                    </div>
                    <div className="right">
                        <div className="rightTitle">
                            Bio
                        </div>
                        <bio>  
                           {/* <span>"Lorem</span>  */}
                            {this.state.bio}
                        </bio>
                    </div>
                </div>
                <div className='ProfileBottom'>
                    <div className="followersContent">
                        <div className='followers'>
                            <p>Followers</p>
                            <p>53,256</p>
                            <p>Following</p>
                            <p>843</p>
                            <p>Written Articles</p>
                            <p>67</p>
                        </div>
                        <div class='popArticles'>
                            <p style={{marginLeft: "10px"}}>Popular Articles</p>
                            <this.Articles/>
                        </div>
                    </div>
                </div>
            </div>    
        )
    }
}
export default Profile;
