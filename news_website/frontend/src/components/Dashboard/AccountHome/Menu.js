import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from "@material-ui/core/styles";
import { Redirect, Link } from "react-router-dom";

class Menu extends React.Component{
    constructor(props){
        super(props)
    }
    Menu = () =>{
        const StyledButton = styled(Button)({
            // fontFamily: "Inter",
            color: "black",
            textDecoration: "underline",
            fontSize: "18px",
            fontWeight: "bold",
            // letterSpacing: ".1rem",
            textTransform: "none",
            textUnderlineOffset: "3px",
            padding: "10px 25px"
          });

        return(
            <div>
                <div className='menu'>
                <div  className='items'>
                    <Link to ='/Account/Profile' {...this.props}><StyledButton href="#text-buttons">My Profile</StyledButton></Link>
                </div>
                <div  className='items'>
                    <Link to ='/Account/Articles'  {...this.props}><StyledButton href="#text-buttons">My Articles</StyledButton></Link>
                </div>
                <div  className='items'>
                    <Link to ='/Account/Followers'  {...this.props}><StyledButton href="#text-buttons">Followers</StyledButton></Link>
                </div>
                </div>
            </div>
        )
    }
    render(){
        return(
            <div>
                <this.Menu />
            </div>
        )
    }
}
export default Menu