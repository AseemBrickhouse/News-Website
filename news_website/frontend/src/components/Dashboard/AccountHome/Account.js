import * as React from 'react';
import { connect } from 'react-redux';
import {Switch, BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import { 
    Grid, 
    Box,
} from "@material-ui/core";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

//I DOnt hitnk this file is used
const Account = (props) =>{
    const account = account
    return(
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
                                <Box sx={{marginLeft: "-3vw", marginRight: "3vw"}}> "{account.bio}" </Box>
                        </Box>
                </Box>
                <Box sx={{ display: 'inline-flex', flexDirection: 'column', width:"25vw",  marginTop: "1vh"}}>
                    <Box sx={{display: "inline-flex"}}>
                        <Box sx={{flexGrow: "1", marginLeft: "25%", marginBottom:"3vh"}}>Followers</Box>
                        <Box sx = {{marginRight: "25%"}}>{account.followers}</Box>
                    </Box>
                    <Box sx={{display: "inline-flex"}}>
                        <Box sx={{flexGrow: "1", marginLeft: "25%", marginBottom:"3vh"}}>Following</Box>
                        <Box sx = {{marginRight: "25%"}}>{account.following}</Box>
                    </Box>
                    <Box sx={{display: "inline-flex"}}>
                        <Box sx={{flexGrow: "1", marginLeft: "25%", marginBottom:"3vh"}}>Written Articles</Box>
                        <Box sx = {{marginRight: "25%"}}>{account.written_articles}</Box>
                    </Box>
                </Box>
            </Box>
            <Box className="profileRight"sx={{ flexDirection: 'column', marginLeft: "0vw"}}>
                <Box sx={{ width:"30vw", marginTop: "5vh", marginLeft: "3vw"}}>
                    <Grid container>
                        <Grid xs={6}>
                          <Box sx={{height: "15vh"}}>Name
                            <Box sx={{marginLeft: "2vw", marginTop: "2vh"}}>{account.name}</Box>
                          </Box>
                        </Grid>
                        <Grid xs={6}>
                          <Box sx={{height: "15vh"}}>Email
                            <Box sx={{marginLeft: "2vw", marginTop: "2vh"}}>{account.email}</Box>                    
                          </Box>
                        </Grid>
                        <Grid xs={6}>
                          <Box sx={{height: "15vh"}}>Occupation
                          <Box sx={{marginLeft: "2vw", marginTop: "2vh"}}>{account.occupation}</Box>
                          </Box>
                        </Grid>
                        <Grid xs={6}>
                          <Box sx={{height: "15vh"}}>Account Level
                          <Box sx={{marginLeft: "2vw", marginTop: "2vh"}}>tmp</Box>
                          </Box>
                        </Grid>
                        <Grid xs={6}>
                          <Box sx={{height: "15vh"}}>Phone
                          <Box sx={{marginLeft: "2vw", marginTop: "2vh"}}>{account.phone}</Box>
                          </Box>
                        </Grid>
                        <Grid xs={6}>
                          <Box sx={{height: "15vh"}}>Role
                          <Box sx={{marginLeft: "2vw", marginTop: "2vh"}}>{account.account_role}</Box>
                          </Box>
                        </Grid>
                    </Grid>
                    <Box sx={{marginLeft: "-2vw"}}>
                        <Box sx={{marginTop: "-3vh", marginLeft: "2vw"}}>Popular Articles</Box>
                        {/* <Box><this.Articles/></Box> */}
                    </Box>
                </Box>
            </Box>
        </Box>
    </div>
    )
}
const mapStateToProps = (state) => {
    console.log(state)
    return{
        account: state.auth.account
    }
  }
  
  const mapDispatchToProps = dispatch =>{
    return{

    }
  }
  export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Account));
// TODO: UPDATE THE ENTIRE FILE
// class Account extends React.Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             first_name: "",
//             last_name: "",
//             account_role: "",
//             phone: "",
//         };
//     }
//     componentDidMount(){
//         fetch("/api/current_user/", {
//             method:"POST",
//             headers:{
//               'Accept':'application/json',
//               'Content-Type': 'application/json',
//             },
//                 body: JSON.stringify({
//                     token: localStorage.getItem('token')
//                 })
//             })
//             .then(response =>{
//                 if(response.status > 400){
//                     return this.setState(() => {
//                         return{ placeholder: "Something went wrong!" };
//                     });
//                 }
//                 return response.json();
//             })
//             .then(data =>{
//                 return this.setState({
//                     first_name: data.first_name,
//                     last_name: data.last_name,
//                     account_role: data.role,
//                     phone: data.phone,
//                 })
//             });
            
//     }
//     Articles = () =>{
//         return (
//             <div>
//                 <Card sx={{ maxWidth: 345 }}>
//                   <CardMedia
//                     component="img"
//                     alt="green iguana"
//                     height="140"
//                     image="/static/images/cards/contemplative-reptile.jpg"
//                   />
//                   <CardContent>
//                     <Typography gutterBottom variant="h5" component="div">
//                         Lorem
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                         Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
//                         sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//                     </Typography>
//                   </CardContent>
//                   <CardActions>
//                     <Button size="small">Share</Button>
//                     <Button size="small">Learn More</Button>
//                   </CardActions>
//                 </Card>
//             </div>
//         )
//     }
//     Menu = () =>{
//         return(
//             <div>
//                 <div className='menu'>
//                 <div  className='items'>
//                     <Button href="#text-buttons">My Profile</Button>
//                 </div>
//                 <div  className='items'>
//                     <Button href="#text-buttons">My Articles</Button>
//                 </div>
//                 <div  className='items'>
//                     <Button href="#text-buttons">Followers</Button>
//                 </div>
//                 </div>
//             </div>
//         )
//     }
//     Profile = () => {
//         return(
//             <div className='profile'>
//                 <div className="left">
//                     <div className="iconBack">    
//                     </div>
//                 </div>
//                 <div className="middle">
//                     <div className="middleContent">
//                         <p>Name<br/><br/><span> {this.state.first_name} {this.state.last_name}</span></p>
//                         <p>Email<br/><br/><span> JoeBrown@gmail.com</span></p>
//                         <p>Role<br/><br/><span> {this.state.account_role}</span></p>
//                         <p>Phone<br/><br/><span> {this.state.phone}</span></p>
//                     </div>
//                 </div>
//                 <div className="right">
//                     <div className="rightTitle">
//                         Bio
//                     </div>
//                     <bio>  
//                        <span>"Lorem</span> ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
//                         Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
//                         Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
//                         Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
//                     </bio>
//                 </div>
//              </div>
//         )
//     }
//     render(){
//         return(
//             <div> 
//             {
//                 this.props.isAuthenticated ? 
//                 <div>
//                     <Router>
//                                 <Switch>
//                                     <Route exact path ='/Account/Profile'>
//                                         <Profile {...this.props}/>
//                                     </Route>
//                                     <Route exact path ='/Account/EditAccount'>
//                                         <EditAccount {...this.props}/>
//                                     </Route>
//                                     <Route exact path ='/Account/Articles'>
//                                         <Articles {...this.props}/>
//                                     </Route>
//                                     <Route exact path ='/Account/CreateArticle'>
//                                         <CreateArticle {...this.props}/>
//                                     </Route>
//                                  </Switch>
//                                     <Route exact path={'/Articles/:id'}>
//                                         <ArticleID/>
//                                     </Route>
//                     </Router>
//                 </div>
//                 :
//                 console.log('None')
//                 // <Redirect to="/"/>
//             }
//             </div>
//         )
//     };
// }

// export default Account;