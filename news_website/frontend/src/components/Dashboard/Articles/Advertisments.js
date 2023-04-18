import AdSense from 'react-adsense';
import React from 'react';
import StickyBox from "react-sticky-box";
import { Box } from "@material-ui/core";

const Advertisments = () =>{
    return(
        <StickyBox offsetTop={50}>
            <Box sx={{backgroundColor: "orange", marginLeft: "10px", marginTop: "1vh"}}>
              <AdSense.Google
                client='ca-pub-7292810486004926'
                slot='7806394673'
                style={{ width: 250, height: 600, float: 'left' }}
                format='fluid'
              />
            </Box>
        </StickyBox>
    )
}
export default Advertisments;