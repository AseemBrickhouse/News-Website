import * as React from 'react';
import {withRouter, Link, Route} from "react-router-dom";
import * as actions from '../../store/actions/auth';
import { connect } from 'react-redux';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';

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
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <HomeIcon fontSize="small"/>
                      </ListItemIcon>
                    <Link to="/" style={{ textDecoration: 'none' }} underline="none">Home</Link>
                  </MenuItem>
                    <MenuItem onClick={handleClose} >
                      <ListItemIcon>
                        <Avatar sx={{ width: 22, height: 22 }}/>
                      </ListItemIcon>
                      <Link to ="/Account" {...this.props} style={{ textDecoration: 'none' }}>Profile</Link>
                    </MenuItem>
                    {/* <MenuItem onClick={handleClose}>About Us</MenuItem> */}
                    <Divider/>
                    <MenuItem>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Settings
                    </MenuItem>
                  <MenuItem onClick={this.props.logout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
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