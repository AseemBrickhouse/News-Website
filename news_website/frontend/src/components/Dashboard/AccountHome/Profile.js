import * as React from 'react';
import { 
    Grid, 
    Box,
} from "@material-ui/core";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

//TODO: UPDATE FILE by using the current state
// dont think this is used
class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            first_name: "",
            last_name: "",
            account_role: "",
            phone: "",
            bio: "",
            occupation: "",
            email: "",
            popular_articles: [],
            written_articles: "",
            following: 0,
            followers: 0,
        };
    }
    componentDidMount(){
        fetch("/api/current_user/", {
            method:"GET",
            headers:{
              'Accept':'application/json',
              'Content-Type': 'application/json',
              token: localStorage.getItem('token')
            },
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
                    name: data.first_name + " " + data.last_name,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    account_role: data.role,
                    phone: data.phone,
                    bio: data.bio,
                    email: data.email,
                    occupation: data.occupation,
                    popular_articles: data.popular_articles,
                    written_articles: data.written_articles,
                    followers: data.followers,
                    following: data.following,
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
        return(
            <Box sx={{display: "flex", flexDirection: "row", marginTop: "2vh"}}>
                {
                    Object.entries(this.state.popular_articles).map( ([_, ArticleInfo]) => {
                        return(
                                <div class="card">
                                    <div class="card-body">
                                      {this.getTags(ArticleInfo)}
                                      <h4>{ArticleInfo.headline}</h4>
                                      <p>{ArticleInfo.article_description}</p>
                                      <div class="user">
                                        <div class="user-info">
                                          <h5>{new Date(ArticleInfo.date).getMonth() + '-' + new Date(ArticleInfo.date).getDate() + '-' + new Date(ArticleInfo.date).getFullYear()}</h5>
                                          <small>{ArticleInfo.rating} %</small>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                        );
                    })
                }
            </Box>
        )
    }
    Profile =() =>{
        return (
            <div>
                <Box className = "profileContainerTest" sx={{ display: 'inline-flex', flexDirection: 'row', marginTop: "1vh", width:"75%"}}>
                    <Box className ="profileMiddle" sx={{ flexDirection: 'column', width: "25vw" }}>
                        <Box sx={{width:"25vw", textAlign:"center", height:"25vh"}}>
                            <Box sx={{display: "center", borderRadius:"50%", backgroundColor: "black", width:"50%", height:"100%", alignContent: "center", marginLeft: "25%", marginTop: "1vh"}}>
                            </Box>
                        </Box>
                        <Box sx={{display:"flex", flexDirection: "row", marginTop: "1vh", alignItems: "center", justifyContent: "center"}}>
                            <Box sx={{marginRight: "1vw"}}><TwitterIcon/></Box>
                            <Box sx={{marginRight: "1vw"}}><FacebookIcon/></Box>
                            <Box sx={{marginRight: "1vw"}}><YouTubeIcon/></Box>
                            <Box sx={{marginRight: "1vw"}}><InstagramIcon/></Box>
                        </Box>
                        <Box sx={{ marginTop: "1vw"}}>
                                <Box sx={{marginLeft: "25%"}}>
                                        <Box>Bio</Box>
                                        <Box sx={{marginLeft: "-3vw", marginRight: "3vw"}}> "{this.state.bio}" </Box>
                                </Box>
                        </Box>
                        <Box sx={{ display: 'inline-flex', flexDirection: 'column', width:"25vw",  marginTop: "1vh"}}>
                            <Box sx={{display: "inline-flex"}}>
                                <Box sx={{flexGrow: "1", marginLeft: "25%", marginBottom:"3vh"}}>Followers</Box>
                                <Box sx = {{marginRight: "25%"}}>{this.state.followers}</Box>
                            </Box>
                            <Box sx={{display: "inline-flex"}}>
                                <Box sx={{flexGrow: "1", marginLeft: "25%", marginBottom:"3vh"}}>Following</Box>
                                <Box sx = {{marginRight: "25%"}}>{this.state.following}</Box>
                            </Box>
                            <Box sx={{display: "inline-flex"}}>
                                <Box sx={{flexGrow: "1", marginLeft: "25%", marginBottom:"3vh"}}>Written Articles</Box>
                                <Box sx = {{marginRight: "25%"}}>{this.state.written_articles}</Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="profileRight"sx={{ flexDirection: 'column', marginLeft: "0vw"}}>
                        <Box sx={{ width:"30vw", marginTop: "5vh", marginLeft: "3vw"}}>
                            <Grid container>
                                <Grid xs={6}>
                                  <Box sx={{height: "15vh"}}>Name
                                    <Box sx={{marginLeft: "2vw", marginTop: "2vh"}}>{this.state.name}</Box>
                                  </Box>
                                </Grid>
                                <Grid xs={6}>
                                  <Box sx={{height: "15vh"}}>Email
                                    <Box sx={{marginLeft: "2vw", marginTop: "2vh"}}>{this.state.email}</Box>                    
                                  </Box>
                                </Grid>
                                <Grid xs={6}>
                                  <Box sx={{height: "15vh"}}>Occupation
                                  <Box sx={{marginLeft: "2vw", marginTop: "2vh"}}>{this.state.occupation}</Box>
                                  </Box>
                                </Grid>
                                <Grid xs={6}>
                                  <Box sx={{height: "15vh"}}>Account Level
                                  <Box sx={{marginLeft: "2vw", marginTop: "2vh"}}>tmp</Box>
                                  </Box>
                                </Grid>
                                <Grid xs={6}>
                                  <Box sx={{height: "15vh"}}>Phone
                                  <Box sx={{marginLeft: "2vw", marginTop: "2vh"}}>{this.state.phone}</Box>
                                  </Box>
                                </Grid>
                                <Grid xs={6}>
                                  <Box sx={{height: "15vh"}}>Role
                                  <Box sx={{marginLeft: "2vw", marginTop: "2vh"}}>{this.state.account_role}</Box>
                                  </Box>
                                </Grid>
                            </Grid>
                            <Box sx={{marginLeft: "-2vw"}}>
                                <Box sx={{marginTop: "-3vh", marginLeft: "2vw"}}>Popular Articles</Box>
                                <Box><this.Articles/></Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </div>
        )
    }
    render(){
        // return(<this.Profile/>)
    }
}
export default Profile;