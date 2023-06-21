import * as React from 'react';
// import * as actions from '../../store/actions/auth';
import { withRouter, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { styled } from "@material-ui/core/styles";
import { Box } from '@material-ui/core';



const ErrorTemplate = (props) => {
    console.log(props.error)
    if (props.error === null){
        
        <Redirect to="/"/>
    }
    const error = props.error.response
    console.log(error)
    
    // DATA
    const DATA = [error.data][0]

    // HEADERS
    const ALLOWED = [error.headers["allow"]]
    const DATE = error.headers["date"]

    // CONFIG
    const HEADER_ACCEPT = [error.config.headers["Accept"]]
    const CONTENT_TYPE = [error.config.headers["Content-Type"]]
    const GIVEN_METHOD = error.config["method"].toUpperCase()
    const URL = error.config["url"]

    // REQUESTS
    const DATA_RESPONSE = error.request["response"]

    // STATUS-STATUS ERROR
    const STATUS = [error["status"], error["statusText"]]
    console.log(DATA)
    return(
        <div className='errorContainer'>
            <Box className='errorBox'>
                <Box className='errorBoxHeader'>
                    {/* <back> Home </back> */}
                    <h1>{`${STATUS[0]}`}</h1>
                    <Box sx={{display: "flex", flexDirection: "column", marginLeft: "25px"}}>
                        <p>{`${STATUS[1]} at URL: ${URL}`}</p>
                        <p>{`
                            Accepted request: [${ALLOWED}] 
                            Given request: [${GIVEN_METHOD}]
                        `}</p>
                    </Box>
                </Box>
                <Box className='errorBoxBody'>
                    <Box sx={{display: "flex", flexDirection: "column", width: "50%"}}>
                        <p>{`${HEADER_ACCEPT}`}</p>
                        <p>{`${CONTENT_TYPE}`}</p>
                    </Box>
                    <Box sx={{display: "flex", flexDirection: "column", width: "50%"}}>
                    {
                        DATA != null ? Object.entries(DATA).map(([FIELD, ERROR]) =>{
                            return(
                                <p>{`${FIELD.toUpperCase()}: ${ERROR}`}</p>
                            )
                        }):<></>
                    }
                    </Box>
                </Box>
                <Box className='errorBoxFooter'>
                    <p>{`${DATE}`}</p>

                </Box>
            </Box>
        </div>
    )
}
export default ErrorTemplate;
