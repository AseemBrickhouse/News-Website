import * as React from 'react';
import {withRouter, Link } from 'react-router-dom';
import * as actions from '../../store/actions/auth';
import { connect } from 'react-redux';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from '@mui/icons-material/Home';
import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";
import { makeStyles, Typography } from '@mui/material';

class MyAccount extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            Account: null,
            first_name: "",
            last_name: "",
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
              })            
            });
            
    }

    DropDown = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);
        const [NestedProfileOpen, NestedSetProfileOpen] = React.useState(false)
        const [NestedArticleOpen, NestedSetArticleOpen] = React.useState(false)
        const [NestedPeopleOpen, NestedSetPeopleOpen] = React.useState(false)

        
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {setAnchorEl(null)};
        const handleNestedProfileClick = () =>{NestedSetProfileOpen(!NestedProfileOpen)}
        const handleNestedArticleClick = () =>{NestedSetArticleOpen(!NestedArticleOpen)}
        const handleNestedPeopleClick = () =>{NestedSetPeopleOpen(!NestedPeopleOpen)}


        return(
            <div>
              <button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <MenuIcon/>
              </button>
              <text> Welcome, {this.state.first_name}</text>
              <Menu
                   id="demo-positioned-menu"
                   aria-labelledby="demo-positioned-button"
                   open={open}
                   onClose={handleClose}
                   transformOrigin={{
                     vertical: 'top',
                     horizontal: 'center',
                   }}
                 >
                  <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <HomeIcon fontSize="small"/>
                        </ListItemIcon>
                      <Link to="/" style={{color: "black", textDecoration: "none"}} underline="none" Icon={HomeIcon}>Home</Link>
                    </MenuItem>
                    <ListItem button onClick={handleNestedProfileClick}>
                      <ListItemText primary="Profile" />
                      {NestedProfileOpen ? <IconExpandLess /> : <IconExpandMore />}
                    </ListItem>
                    <Collapse in={NestedProfileOpen} timeout="auto" unmountOnExit>
                      <Divider />
                      <List component="div" disablePadding>
                        <ListItem>
                          <Link to="/Account/Profile" style={{ textDecoration: 'none' }} underline="none"><Typography style={{color: "black", marginLeft: "1vw", textDecoration: "none"}}>View Profile</Typography></Link>
                        </ListItem>
                        <ListItem >
                          <Link to="/Account/EditAccount" style={{ textDecoration: 'none' }} underline="none"><Typography style={{color: "black", marginLeft: "1vw", textDecoration: "none"}}>Edit Profile</Typography></Link>
                        </ListItem>
                      </List>
                    </Collapse>
                    
                    <ListItem button onClick={handleNestedArticleClick}>
                      <ListItemText primary="Articles" />
                      {NestedArticleOpen ? <IconExpandLess /> : <IconExpandMore />}
                    </ListItem>
                    <Collapse in={NestedArticleOpen} timeout="auto" unmountOnExit>
                      <Divider />
                      <List component="div" disablePadding>
                        <ListItem>
                            <Link to="/Account/Articles" style={{ textDecoration: 'none' }} underline="none"><Typography style={{color: "black", marginLeft: "1vw", textDecoration: "none"}}>My Articles</Typography></Link>
                        </ListItem>
                        <ListItem>
                            <Link to="/Account/CreateArticle/" style={{ textDecoration: 'none' }} underline="none"><Typography style={{color: "black", marginLeft: "1vw", textDecoration: "none"}}>Create Article</Typography></Link>
                        </ListItem>
                        <ListItem>
                            <Link to="/Account/Articles" style={{ textDecoration: 'none' }} underline="none"><Typography style={{color: "black", marginLeft: "1vw", textDecoration: "none"}}>Saved Articles</Typography></Link>
                        </ListItem>
                      </List>
                    </Collapse>
        
                    <ListItem button onClick={handleNestedPeopleClick}>
                      <ListItemText primary="People" />
                      {NestedPeopleOpen ? <IconExpandLess /> : <IconExpandMore />}
                    </ListItem>
                    <Collapse in={NestedPeopleOpen} timeout="auto" unmountOnExit>
                      <Divider />
                      <List component="div" disablePadding>
                        <ListItem>
                            <Link to="/Account/FindPeople" style={{ textDecoration: 'none' }} underline="none"><Typography style={{color: "black", marginLeft: "1vw", textDecoration: "none"}}>Find People</Typography></Link>
                        </ListItem>
                        <ListItem>
                            <Link to="/Account/CreateArticle/" style={{ textDecoration: 'none' }} underline="none"><Typography style={{color: "black", marginLeft: "1vw", textDecoration: "none"}}>My Followers</Typography></Link>
                        </ListItem>
                        <ListItem>
                            <Link to="/Account/Articles" style={{ textDecoration: 'none' }} underline="none"><Typography style={{color: "black", marginLeft: "1vw", textDecoration: "none"}}>Following</Typography></Link>
                        </ListItem>
                      </List>
                    </Collapse>

                     <MenuItem onClick={this.props.logout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
              </Menu>
            </div>
        )
    }
    render(){
        return(
            <div>
                <this.DropDown/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
      logout : () => dispatch(actions.authLOGOUT())
    }
  }
  export default withRouter(connect(null,mapDispatchToProps)(MyAccount));