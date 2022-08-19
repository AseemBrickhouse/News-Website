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
                    popular_articles: data.popular_articles,
                })
            });    
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
                    Object.entries(this.state.popular_articles).map( ([Article, ArticleInfo]) => {
                        return(
                            // <div className='cardBox'>
                            //     <Card sx={{ maxWidth: 300 }}>
                            //       <CardMedia
                            //         component="img"
                            //         alt="green iguana"
                            //         height="250vw"
                            //         // image="/static/images/cards/contemplative-reptile.jpg"
                            //       />
                            //       <CardContent>
                            //         <Typography gutterBottom variant="h5" component="div">
                            //             {ArticleInfo.healine}
                            //         </Typography>
                            //         <Typography variant="body2" color="text.secondary">
                            //             {ArticleInfo.article_description}
                            //         </Typography>
                            //       </CardContent>
                            //       <CardActions>
                            //         <p>{ArticleInfo.rating}</p>
                            //         <Button size="small">Learn More</Button>
                            //       </CardActions>
                            //     </Card>
                            // </div>
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
                            <p>Email<br/><br/><span> JoeBrown@gmail.com</span></p>
                            <p>Role<br/><br/><span> {this.state.account_role}</span></p>
                            <p>Phone<br/><br/><span> {this.state.phone}</span></p>
                        </div>
                    </div>
                    <div className="right">
                        <div className="rightTitle">
                            Bio
                        </div>
                        <bio>  
                           <span>"Lorem</span> ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
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
                            <p>Popular Articles</p>
                            <this.Articles/>
                        </div>
                    </div>
                </div>
            </div>    
        )
    }
}
export default Profile;
