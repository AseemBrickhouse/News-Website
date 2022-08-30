import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Redirect, Switch, BrowserRouter as Router, Route, useLocation, Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from "@material-ui/core/styles";

class ArticleID extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ID: 0,
            Article: [],
            placeholder: "Loading",
        };
    };

    getTags = (Article) =>{
        var send = []
        if (Array.isArray(Article.tags)) {
            for(let i = 0; i < Article.tags.length; i++){
                send.push(
                    <span className="tag tag-teal">
                        {Article.tags[i]}
                    </span>
                )
            }
        }else{
            send.push(<span class="tag tag-teal">{Article.tags}</span>)
        }
        return(
            <div>{send}</div>
        )
    }
    scrollToTop() {
        window.scrollTo(0, 0);
    }
    Article = () => {
        this.scrollToTop()
        const location = useLocation().state;
        const info = {
            ID: location.ArticleID,
            Article: location.Article,
            ArticleBody: location.Article.article_body,
            ArticleDate: new Date(location.Article.date).getMonth() + '-' + new Date(location.Article.date).getDate() + '-' + new Date(location.Article.date).getFullYear(),
        }
        console.log(info.ArticleDate)
        console.log(new Date(info.Article.date).getMonth())
        const StyledButton = styled(Button)({
            // fontFamily: "Inter",
            fontFamily: ['Neue Haas Grotesk Display Pro', 'sans-serif'],
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
            <div>
                <div>
                	<div className="container position-relative">
                		<article>
                			<header>
                                <box>
                				    <Link to='/' style={{textDecoration: 'none', width:'10%'}}>
                                        {/* <StyledButton> */}
                                        <p>
                                            <ArrowBackIcon style={{textDecoration: 'none'}} />
                                            All posts
                                        </p>
                                        {/* </StyledButton> */}
                                    </Link>
                                </box>
                				<div className='headline'>{info.Article.headline}</div>
                				<sub>{info.Article.sub_title}</sub>
                				<p class="article-tags">
                                    {this.getTags(info.Article)}
                				</p>
                			</header>
                            <authHeader>
				                <div>
				                	<author>By {info.Article.reporter_account}</author>
				                </div>
				                    <dateline>{info.ArticleDate}</dateline>
                            </authHeader>
                                <main>
				                    <div className='description'>{info.Article.article_description}</div>
                                    <body>{info.ArticleBody}</body>
                                </main>
                        </article>
                    </div>
                </div>
            </div>
        )
    }
    render(){
        return(
            <div>
                <this.Article/>
            </div>
        )
    }
}
export default ArticleID;