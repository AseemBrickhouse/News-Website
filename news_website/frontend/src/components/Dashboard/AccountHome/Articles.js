import React, {useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Redirect, Switch, Link, Route } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { styled } from "@material-ui/core/styles";
import Article from '../Articles';
import ArticleID from '../ArticleID';
import Util from '../../Utility';
import { 
    Grid, Typography, TextField, 
    FormControlLabel, Avatar, Chip,
    CssBaseline, Box, MenuList, Button,
    Container, Checkbox, MenuItem, NestedMenuItem,
  } from "@material-ui/core";
import CreateArticle from './CreateArticle';
import { padding } from '@mui/system';

const Articles = () =>{
    // constructor(props){
    //     super(props)
    //     this.state = {
    //         articles: [],
    //     };
    // }
    const [articles, setArticles] = React.useState(null);
    const [load, setLoad] = React.useState(false);
    useEffect(async() =>{
        await fetch("/api/AllUserArticles/", {
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
            setLoad(true)
            setArticles(data)
        });
    },[load])

    const deleteArticle = (Article_key) =>{
        fetch("/api/DeleteArticle/", {
            method: "POST",
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key: Article_key,
            })
        })
        .then(response=>{
            return response.json()
        })
        .then(data=>{
            setLoad(false)
        })
        // window.location.reload();
    }
    const Utility = new Util();
    const handleView = (id) =>{
        <Route exact path={'/Articles/' + id + '/'}>
            <ArticleID/>
        </Route>
    }
    // const Button = () =>{
    //     const StyledButton = styled(Button)({
    //         // fontFamily: "Inter",
    //         color: "black",
    //         textDecoration: "underline",
    //         fontSize: "18px",
    //         fontWeight: "bold",
    //         // letterSpacing: ".1rem",
    //         textTransform: "none",
    //         textUnderlineOffset: "3px",
    //         padding: "10px 25px",
    //         textDecoration: "none",
    //       });
    //       return(
    //         <div className='createArticle'>
    //             <Link to="/Account/CreateArticle">
    //                 <StyledButton>
    //                     <AddIcon/>
    //                     Create New Article
    //                 </StyledButton>
    //             </Link>
    //         </div>
    //       )
    // }
    return(
        <div>
            {/* <this.Button/> */}
            <Box sx={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignContent: "center"}}>
            {
            articles != null ? Object.entries(articles).map( ([id, Article]) =>{
                return(
                    <Link 
                    style={{
                      textDecoration: "none",
                      color: "black",
                      underline: "none",
                    }}
                    to={{
                      pathname: '/Articles/' + Article.key + '/',
                      state: { 
                        ArticleID: id,
                        Article: Article,
                    },   
                  }}>
                    <Box sx={{marginLeft:"1vw", marginTop: "1vh"}}>
                        <div className="card">
                            <Box sx= {{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                padding: "20px"
                            }}>
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
                                   <h4>{Article.headline}</h4>
                                   <p>{Article.article_description}</p>
                                   <Box sx={{display: "flex", flexDirection:"row", justifyContent:"space-between", width:"100%"}}>
                                        <Box>
                                            <h5>{ Utility.getDate(Article.date)}</h5>
                                        </Box>
                                        <Box>
                                            <h5>{Article.rating}%</h5>
                                        </Box>
                                   </Box>
                                   <Box sx={{justifyContent: "space-between", flexDirection: "row", display: "flex", width: "100%"}}>
                                        <Box sx={{backgroundColor: "#E0E0CE", padding: "1px 12px", borderRadius: "25px"}}>
                                            <Link
                                            style={{
                                                    textDecoration: "none",
                                                    color: "black",
                                                    underline: "none",
                                            }}
                                            to={{
                                                pathname: "/Account/CreateArticle",
                                                state: {
                                                    props: Article
                                                } 
                                            }}
                                            >
                                                Edit
                                            </Link>
                                        </Box>
                                        <Box sx={{backgroundColor: "#AD343E", padding: "1px 12px", borderRadius: "25px"}}>
                                            <Link
                                                style={{
                                                    textDecoration: "none",
                                                    color: "black",
                                                    underline: "none",
                                                }}
                                                onClick={()=> deleteArticle(Article.key)}
                                            >
                                                Delete
                                            </Link>
                                        </Box>
                                   </Box>
                                   {/* <div class="user">
                                     <div class="user-info">
                                       <h5>{ Utility.getDate(Article.date)}</h5>
                                     </div>
                                     <div>
                                        <small>{Article.rating}%</small>
                                     </div>
                                   </div> */}
                             </Box>
                        </div>
                        </Box>
                    </Link>
                )
            })
        :
        <>
        </>}
            </Box>
        </div>
    )
}
    // componentDidMount(){
    //     fetch("/api/AllUserArticles/", {
    //         method: "POST",
    //         headers:{
    //             'Accept':'application/json',
    //             'Content-Type': 'application/json',
    //           },
    //             body: JSON.stringify({
    //                 token: localStorage.getItem('token')
    //             })
    //     })
    //     .then(response =>{
    //         if(response.status > 400){
    //             return this.setState(()=>{
    //                 return{ placeholder: "Something went wrong!" };
    //             });
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         return this.setState({
    //             articles: data,
    //         });
    //     });
    // Button = () =>{
    //     const StyledButton = styled(Button)({
    //         // fontFamily: "Inter",
    //         color: "black",
    //         textDecoration: "underline",
    //         fontSize: "18px",
    //         fontWeight: "bold",
    //         // letterSpacing: ".1rem",
    //         textTransform: "none",
    //         textUnderlineOffset: "3px",
    //         padding: "10px 25px",
    //         textDecoration: "none",
    //       });
    //       return(
    //         <div className='createArticle'>
    //             <Link to="/Account/CreateArticle">
    //                 <StyledButton>
    //                     <AddIcon/>
    //                     Create New Article
    //                 </StyledButton>
    //             </Link>
    //         </div>
    //       )
    // }
    // getTags = (Article) =>{
    //     var send = []
    //     if (Array.isArray(Article.tags)) {
    //         for(let i = 0; i < Article.tags.length; i++){
    //             send.push(<span class="tag tag-teal">{Article.tags[i]}</span>)
    //         }
    //     }else{
    //         send.push(<span class="tag tag-teal">{Article.tags}</span>)
    //     }
    //     return(
    //         <div>{send}</div>
    //     )
    // }

    // printArticles = () =>{
    //     const Utility = new Util();
    //     const handleView = (id) =>{
    //         <Route exact path={'/Articles/' + id + '/'}>
    //             <ArticleID/>
    //         </Route>
    //     }
    //     return(
    //         <div>
    //             {/* <this.Button/> */}
    //             <Box sx={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
    //             {
    //             Object.entries(this.state.articles).map( ([id, Article]) =>{
    //                 return(
    //                     <Link 
    //                     style={{
    //                       textDecoration: "none",
    //                       color: "black",
    //                       underline: "none",
    //                     }}
    //                     to={{
    //                       pathname: '/Articles/' + Article.key + '/',
    //                       state: { 
    //                         ArticleID: id,
    //                         Article: Article,
    //                     },   
    //                   }}>
    //                     <Box sx={{marginLeft:"1vw", marginTop: "1vh"}}>
    //                         <div className="card">
    //                              <div class="card-body">
    //                                 <Box sx={{                            
    //                                     width: "100%", 
    //                                     height: "30%", 
    //                                     display: "flex", 
    //                                     flexDirection: "row",
    //                                     alignContent: "center",
    //                                 }}>
    //                                 {
    //                                 Array.isArray(Article.tags) ?
    //                                     Article.tags.map(tag =>{
    //                                       return(
    //                                         <Box sx={{margin: "5px"}}>
    //                                           <Chip style={{
    //                                             backgroundColor: "#C1BDBD",
    //                                             fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
    //                                             fontSize: "15px",
    //                                             textDecoration: "none",
    //                                           }}
    //                                           label={tag}
    //                                           />
    //                                         </Box>
    //                                       )
    //                                     })
    //                                     :
    //                                     <Box sx={{margin: "5px"}}>
    //                                       <Chip style={{
    //                                         backgroundColor: "#C1BDBD",
    //                                         fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
    //                                         fontSize: "15px",
    //                                         textDecoration: "none",
    //                                       }}
    //                                       label={Article.tags}
    //                                       />
    //                                     </Box>
    //                                 }
    //                                 </Box>                                      
    //                                    <h4>{Article.headline}</h4>
    //                                    <p>{Article.article_description}</p>
    //                                    <Box sx={{display: "flex", flexDirection:"row", justifyContent:"space-between", width:"100%"}}>
    //                                         <Box>
    //                                             <h5>{ Utility.getDate(Article.date)}</h5>
    //                                         </Box>
    //                                         <Box>
    //                                             <h5>{Article.rating}%</h5>
    //                                         </Box>
    //                                    </Box>
    //                                    <Box>
    //                                         <Link
    //                                         style={{
    //                                                 textDecoration: "none",
    //                                                 color: "black",
    //                                                 underline: "none",
    //                                         }}
    //                                         to={{
    //                                             pathname: "/Account/CreateArticle",
    //                                             state: {
    //                                                 props: Article
    //                                             } 
    //                                         }}
    //                                         >
    //                                             Edit
    //                                         </Link>
    //                                         <Link
    //                                         style={{
    //                                                 textDecoration: "none",
    //                                                 color: "black",
    //                                                 underline: "none",
    //                                         }}
    //                                         onClick={()=> deleteArticle(Article.key)}
    //                                         >
    //                                             Delete Article
    //                                         </Link>
    //                                    </Box>
    //                                    {/* <div class="user">
    //                                      <div class="user-info">
    //                                        <h5>{ Utility.getDate(Article.date)}</h5>
    //                                      </div>
    //                                      <div>
    //                                         <small>{Article.rating}%</small>
    //                                      </div>
    //                                    </div> */}
    //                              </div>
    //                         </div>
    //                     </Box>
    //                     </Link>
    //                 );
    //             })}
    //             </Box>
    //         </div>
    //     )
    // }

    // render(){
        // return(
        //     <div className='CardContainer'>
        //         <this.printArticles/>
        //     </div> 
        // )
    // }
// }
export default Articles;