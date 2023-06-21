import React, { Component, useState, useEffect, useSelector } from 'react';
import SearchBar from "material-ui-search-bar";
import { styled } from "@material-ui/core/styles";
import { 
    Typography, 
    Chip, Avatar,
    Box, Button,
  } from "@material-ui/core";

import "./css/SearchBar.css";

const SearchBarComponent = (props) => {
    const StyledButton = styled(Button)({
        fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
        backgroundColor: "#AD343E",
        width: "75%",
        height: "70%",
        color: "white",
        textDecoration: "none",
        fontSize: "15px",
        fontWeight: "300",
        borderRadius: "50px",
        textTransform: "none",
        textDecoration: "none",
        "&:hover":{
          fontSize: "15px",
          fontWeight: "300",
          color: "white",
          backgroundColor: "black",
        }
  
      });

    return(
        <Box sx={{width: "100%", height:"20%", display: "flex", flexDirection:"column"}}>
            <Box className='main-container-searchbar-sub'>
              <StyledButton>
                Subscribe Today
              </StyledButton>
            </Box>
            <Box className='main-container-searchbar-sub'>
              <SearchBar className='main-container-searchbar-content'
                style={{
                  fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                  borderRadius: "25px",
                }}
              />
            </Box>
        </Box>
    )
}
export default SearchBarComponent;

