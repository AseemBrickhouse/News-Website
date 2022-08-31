import * as React from 'react';
import {withRouter, Link, Route} from 'react-router-dom';
import * as actions from '../../store/actions/auth';
import { connect } from 'react-redux';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Box from '@material-ui/core/Box';

import Collapse from "@material-ui/core/Collapse";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from "@material-ui/core/ListItemText";

import HomeIcon from '@mui/icons-material/Home';

import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { hasChildren } from "./util";

import NestedMenuItem from "material-ui-nested-menu-item";

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

    testMenu = () =>{
      const CustomMenu = [
        {
          icon: <HomeIcon fontSize="small"/>,
          title: "Home",
          items: [],
          to: "/"
        },
        {
          icon:  <Avatar sx={{ width: 22, height: 22 }}/>,
          title: "Profile",
          items: [
            {
               title: "View Profile",
               to: '/Account/Profile'
              //  to: <Link to ="/Account/Profile" {...this.props} style={{ textDecoration: 'none' }}/>
            },
            {
              title: "Edit Profile",
              to: "/"
            },
            {
              title: "My Articles",
              to: ""
            }
          ]
        },
        {
          title: "Logout",
        }
      ]
      const CustomMenuItem = ({ item }) =>{
        const Component = hasChildren(item) ? MultiLevel : SingleLevel;
        return <Component item={item} />;
      };
      const SingleLevel = ({ item }) => {
        return (
          <ListItem button componenet={Link} to={item.to}>
            {console.log(item, item.to)}
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        );
      };
      const MultiLevel = ({ item }) => {
        const { items: children } = item;
        const [open, setOpen] = React.useState(false);
      
        const handleClick = () => {
          setOpen((prev) => !prev);
      }; 
      return(
        <React.Fragment>
          <ListItem button onClick={handleClick}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {children.map((child, key) => (
                <CustomMenuItem key={key} item={child} />
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      )
    }
    {console.log(CustomMenu)}
    return(
      CustomMenu.map((item,key) => <CustomMenuItem key={key} item={item}/> )
    )
};
testMenu2 = () =>{
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  return(
    <div>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <HomeIcon fontSize="small"/>
            </ListItemIcon>
          <Link to="/" style={{ textDecoration: 'none' }} underline="none" Icon={HomeIcon}>Home</Link>
        </MenuItem>
        <NestedMenuItem label="Profile">
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <HomeIcon fontSize="small"/>
                </ListItemIcon>
              <Link to="/Account/Profile" style={{ textDecoration: 'none' }} underline="none" Icon={HomeIcon}>View Profile</Link>
            </MenuItem>
        </NestedMenuItem>
      </Menu>
    </div>
  )
}
    DropDown = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
          setAnchorEl(null);
        };
      
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
                  //  anchorEl={anchorEl}
                   open={open}
                   onClose={handleClose}
                  //  anchorOrigin={{
                  //    vertical: 'top',
                  //    horizontal: 'left',
                  //  }}
                  //  transformOrigin={{
                  //    vertical: 'top',
                  //    horizontal: 'center',
                  //  }}
                 >
                  <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <HomeIcon fontSize="small"/>
                        </ListItemIcon>
                      <Link to="/" style={{ textDecoration: 'none' }} underline="none" Icon={HomeIcon}>Home</Link>
                    </MenuItem>
                    <NestedMenuItem 
                      label="Profile"
                      // Icon={<Avatar/>}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      parentMenuOpen={open}
                      anchorReference="anchorPosition"
                      keepMounted
                      anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                      }}
                    >
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                              <Avatar sx={{ width: 22, height: 22 }}/>
                            </ListItemIcon>
                          <Link to="/Account/Profile" style={{ textDecoration: 'none' }} underline="none" Icon={HomeIcon}>View Profile</Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                              <HomeIcon fontSize="small"/>
                            </ListItemIcon>
                          <Link to="/Account/EditAccount" style={{ textDecoration: 'none' }} underline="none" Icon={HomeIcon}>Edit Profile</Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                              <HomeIcon fontSize="small"/>
                            </ListItemIcon>
                          <Link to="/Account/Articles" style={{ textDecoration: 'none' }} underline="none" Icon={HomeIcon}>My Articles</Link>
                        </MenuItem>
                    </NestedMenuItem>
                    <MenuItem onClick={this.props.logout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
              </Menu>
            </div>
            // <div>
            //     <button
            //       id="demo-positioned-button"
            //       aria-controls={open ? 'demo-positioned-menu' : undefined}
            //       aria-haspopup="true"
            //       aria-expanded={open ? 'true' : undefined}
            //       onClick={handleClick}
            //     >
            //       <MenuIcon/>
            //     </button>
            //     <text> Welcome, {this.state.first_name}</text>
            //     <Menu
            //       id="demo-positioned-menu"
            //       aria-labelledby="demo-positioned-button"
            //       anchorEl={anchorEl}
            //       open={open}
            //       onClose={handleClose}
            //       anchorOrigin={{
            //         vertical: 'top',
            //         horizontal: 'left',
            //       }}
            //       transformOrigin={{
            //         vertical: 'top',
            //         horizontal: 'left',
            //       }}
            //     >
            //       <MenuItem onClick={handleClose}>
            //           <ListItemIcon>
            //             <HomeIcon fontSize="small"/>
            //           </ListItemIcon>
            //         <Link to="/" style={{ textDecoration: 'none' }} underline="none" Icon={HomeIcon}>Home</Link>
            //       </MenuItem>
            //         <MenuItem onClick={handleClose} >
            //           <ListItemIcon>
            //             <Avatar sx={{ width: 22, height: 22 }}/>
            //           </ListItemIcon>
            //           <Link to ="/Account/Profile" {...this.props} style={{ textDecoration: 'none' }}>Profile</Link>
            //         </MenuItem>
            //         {/* <MenuItem onClick={handleClose}>About Us</MenuItem> */}
            //         <Divider/>
            //         <MenuItem>
            //           <ListItemIcon>
            //             <Settings fontSize="small" />
            //           </ListItemIcon>
            //           Settings
            //         </MenuItem>
            //       <MenuItem onClick={this.props.logout}>
            //         <ListItemIcon>
            //           <Logout fontSize="small" />
            //         </ListItemIcon>
            //         Logout
            //       </MenuItem>
            //     </Menu>
            // </div>
        )
    }
    render(){
        return(
            <div>
                <this.DropDown/>
                {/* <this.testMenu/> */}
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