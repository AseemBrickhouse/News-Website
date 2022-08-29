import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Redirect, Switch, Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { styled } from "@material-ui/core/styles";
import Article from '../Articles';

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
    Button = () =>{
        const StyledButton = styled(Button)({
            // fontFamily: "Inter",
            color: "black",
            textDecoration: "underline",
            fontSize: "18px",
            fontWeight: "bold",
            // letterSpacing: ".1rem",
            textTransform: "none",
            textUnderlineOffset: "3px",
            padding: "10px 25px",
            textDecoration: "none",
          });
          return(
            <div className='createArticle'>
                <Link to="/Account/CreateArticle">
                    <StyledButton>
                        <AddIcon/>
                        Create New Article
                    </StyledButton>
                </Link>
            </div>
          )
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
    printArticles = () =>{
        return(
            <div>
                <this.Button/>
                <div className='ArticleCards'>
                {Object.entries(this.state.articles).map( ([_, ArticleInfo]) =>{
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
                                      <small>{ArticleInfo.rating}%</small>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                </div>
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