import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Redirect, Switch, Link, Route } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { styled } from "@material-ui/core/styles";
import Article from '../Articles';
import ArticleID from '../ArticleID';
import { 
    Grid, Typography, TextField, 
    FormControlLabel, Avatar, 
    CssBaseline, Box, MenuList, Button,
    Container, Checkbox, MenuItem, NestedMenuItem,
  } from "@material-ui/core";

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
        const handleView = (id) =>{
            <Route exact path={'/Articles/' + id + '/'}>
                <ArticleID/>
            </Route>
        }
        return(
            <div>
                {/* <this.Button/> */}
                <Box sx={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                {
                Object.entries(this.state.articles).map( ([id, ArticleInfo]) =>{
                    return(
                        <Box sx={{marginLeft:"1vw", marginTop: "1vh"}}>
                            <div className="card">
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
                                       <div>
                                       <Link to={{
                                        pathname: '/Articles/' + id + '/',
                                        state: { 
                                          ArticleID: id,
                                          Article: ArticleInfo,
                                        },
                                        }}>
                                            <Button onClick={() => handleView(id)}>
                                                {console.log(id)}
                                                View
                                            </Button>
                                        </Link>
                                       </div>
                                 </div>
                            </div>
                        </Box>
                    );
                })}
                </Box>
            </div>
        )
    }

    render(){
        console.log(this.state);
        return(
            <div className='CardContainer'>
                <this.printArticles/>
            </div> 
        )
    }
}
export default Articles;