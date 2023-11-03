import * as React from 'react';
import { styled } from "@material-ui/core/styles";
import "./css/Loading.css"
import { 
    Box, 
    Typography,
  } from "@material-ui/core";
  
const StyledTypographyHeader = styled(Typography)({
  color: "black", 
  textDecoration: "none",
  fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
  fontWeight: "900",
  fontSize: "35px",
  fontStyle: "italic",
})
const StyledTypographyBody1 = styled(Typography)({
  color: "black", 
  textDecoration: "none",
  fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
  fontWeight: "600",
  fontSize: "20px",
})
const StyledTypographyBody2 = styled(Typography)({
  color: "black", 
  textDecoration: "none",
  fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
  fontWeight: "800",
  fontSize: "30px",
  fontStyle: "italic",
})

export const Loading = () => {
    return(
        <Box sx={{position: "absolute", top:"50%", left: "50%", transform: "translate(-50%, -50%)", }}>
          <Box sx={{height: "50vh", width: "20vw", display: "flex", flexDirection: "column", borderRadius: "30px", alignContent: "center", justifyContent: "center"}}>
            <Box sx={{marginLeft: "3vw"}}>
              <StyledTypographyHeader>
                News Wire
              </StyledTypographyHeader>
            </Box>
            <Box sx={{marginLeft: "5vw"}}>
              <StyledTypographyBody1>
                Don't wait for opportunity.
              </StyledTypographyBody1>
            </Box>
            <Box sx={{textAlign: "left", marginLeft: "3vw"}}>
              <StyledTypographyBody2>
                Create it!
              </StyledTypographyBody2>
            </Box>
            <div className="loading">
                <span><i></i><i></i><i></i><i></i><i></i></span>
            </div>
          </Box>
        </Box>
    )
}
export default Loading;