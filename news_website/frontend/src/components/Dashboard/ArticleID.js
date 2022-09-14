import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Redirect, Switch, BrowserRouter as Router, Route, useLocation, Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from "@material-ui/core/styles";
import Util from '../Utility';
import { 
 Chip, Box
  } from "@material-ui/core";

const ArticleID = (props) =>{
    const Utility = new Util();
    console.log(props.location.state)
    const Article = props.location.state.Article
    window.scrollTo(0, 0);
    return(
        <div className="container position-relative">
            <article>
            	<header>
                     <box>
            		    <Link to='/' style={{textDecoration: 'none', width:'10%'}}>
                             <p>
                                 <ArrowBackIcon style={{textDecoration: 'none'}} />
                                 All posts
                             </p>
                         </Link>
                     </box>
            		<div className='headline'>{Article.headline}</div>
            		<sub>{Article.sub_title}</sub>
            		<p class="article-tags">
                        <Box sx={{     
                            width: "100%", 
                            minHeight: "30%",
                            height: "30%", 
                            display: "flex", 
                            flexDirection: "row",
                            alignContent: "center",
                        }}>
                        {
                        Array.isArray(Article.tags) ?
                            Article.tags.map(tag =>{
                              return(
                                <Box sx={{margin: "5px"}}>
                                  <Chip style={{
                                    backgroundColor: "#E0E0CE",
                                    fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                                    fontSize: "15px",
                                    textDecoration: "none",
                                  }}
                                  label={tag}
                                  />
                                </Box>
                              )
                            })
                            :
                            <Box sx={{margin: "5px"}}>
                                <Chip style={{
                                    backgroundColor: "#E0E0CE",
                                    fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                                    fontSize: "15px",
                                    textDecoration: "none",
                                  }}
                                    label={Article.tags}
                                />
                            </Box>
                        }
                        </Box>
            		</p>
                        
            	</header>
                 <authHeader>
     	            <div>
     	            	<author>By {Article.reporter_account}</author>
     	            </div>
     	                <dateline>{Utility.getDate(Article.date)}</dateline>
                 </authHeader>
                     <main>
     	                <div className='description'>{Article.article_description}</div>
                         <body>{Article.article_body}</body>
                     </main>
             </article>
        </div>
    )
}
export default ArticleID;