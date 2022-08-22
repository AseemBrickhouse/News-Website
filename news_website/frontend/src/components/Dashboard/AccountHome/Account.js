import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Redirect, Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Menu from './Menu';
import Profile from './Profile';
import Articles from './Articles';
import CreateArticle from './CreateArticle';

class Account extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            account_role: "",
            phone: "",
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
                })
            });
            
    }
    Articles = () =>{
        return (
            <div>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Lorem
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
            </div>
        )
    }
    Menu = () =>{
        return(
            <div>
                <div className='menu'>
                <div  className='items'>
                    <Button href="#text-buttons">My Profile</Button>
                </div>
                <div  className='items'>
                    <Button href="#text-buttons">My Articles</Button>
                </div>
                <div  className='items'>
                    <Button href="#text-buttons">Followers</Button>
                </div>
                </div>
            </div>
        )
    }
    Profile = () => {
        return(
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
        )
    }
    render(){
        return(
            <div className='ProfileContainer'> 
            {
                this.props.isAuthenticated ? 
                <div>
                    <Router>
                    <Menu {...this.props}/>
                        <Switch>
                            <Route exact path ='/Account/Profile'>
                                <Profile {...this.props}/>
                            </Route>
                            <Route exact path ='/Account/Articles'>
                                <Articles {...this.props}/>
                            </Route>
                            <Route exact path ='/Account/CreateArticle'>
                                <CreateArticle {...this.props}/>
                            </Route>
                        </Switch>
                    </Router>
                </div>
                :
                console.log('None')
                // <Redirect to="/"/>
            }
            </div>
        )
    };
}

export default Account;