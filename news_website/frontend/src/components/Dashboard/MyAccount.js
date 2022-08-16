import * as React from 'react';
import {withRouter} from "react-router-dom";
import * as actions from '../../actions/auth';
import { connect } from 'react-redux';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { func } from 'prop-types';

class MyAccount extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            Account: null,
        };
        this.fn = this.fn.bind(this);
        // this.getUser = this.getUser.bind(this);
    }
    fn = () =>{
        const [open, setOpen] = React.useState(null);
        handleClose = () => {
            setOpen(false);
        };
        handleOpen = () => {
            setOpen(true);
        };
    }

    getUser = () =>{
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
                console.log(data)
                return {
                    data
                };
            });
            
    }
    render(){
        const drop = () =>{
            const [open, setOpen] = React.useState(null);
            handleClose = () => {
                setOpen(false);
            };
            handleOpen = () => {
                setOpen(true);
            };
        }
        var person = this.getUser();
        console.log(person);
        return(
            <div>
                <div>
                    {console.log(this.props)}
                    <button> </button>
                    <button onClick={this.fn} ><MenuIcon/></button>

                    <Menu
                        
                    >
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>My account</MenuItem>
                        <MenuItem>Logout</MenuItem>
                    </Menu>
                    <button onClick={this.props.logout}>Logout</button>
                </div>
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