import * as React from 'react';
import {withRouter} from "react-router-dom";
import * as actions from '../../actions/auth';
import { connect } from 'react-redux';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

class MyAccount extends React.Component {
    constructor(props){
        super(props);
        //this.handleOpen = this.handleOpen.bind(this);
        this.fn = this.fn.bind(this);
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
        return(
            <div>
                <div>
                    <button 
                        onClick={this.fn}
                    >
                        MyAccount
                    </button>
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