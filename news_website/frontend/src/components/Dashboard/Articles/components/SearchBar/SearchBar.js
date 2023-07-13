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
      border: "1px solid #AD343E",
      backgroundColor: "#AD343E",
      width: "75%",
      height: "70%",
      color: "white",
      fontSize: "15px",
      fontWeight: "500",
      borderRadius: "10px",
      textTransform: "none",
      zIndex: 2,
      transition: "transform ease 0.2s, box-shadow ease 0.2s",
      "&:hover": {
        fontSize: "15px",
        fontWeight: "500",
        color: "white",
        backgroundColor: "#AD343E",
        transform: "translate(0, -3px)",
        boxShadow: "0 20px 80px -10px #AD343E",
      },
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

