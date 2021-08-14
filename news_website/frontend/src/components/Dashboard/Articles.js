import React, { Component } from 'react'
import {Button, Box, Container, Typography, makeStyles, Grid, Chip} from '@material-ui/core';

const ArticleBox = makeStyles((theme) => ({
    root:{
        flexGrow: 1,
    },
    dropBox: {
        borderRadius: '25px',
        backgroundColor: 'black',
        height: '12vh',
    },
    headline: {
        color: 'white',
    },
    descriptionBox:{
        backgroundColor: 'rgba(181, 98, 111, 1)',
        height: '12vh',
        overflow: 'hidden',
    },
    descriptionText:{
        fontSize: '15px',
    },
    img:{
        height: '12vh',
        width: '12vw',
        borderRadius: '10px     0     0           10px',
        overflow: 'hidden',
    },
    //fix this
    imgOverlayBox:{
        height: '11vh',
        overflow: 'hidden',
        borderRadius: '10px     0     0           10px',
        backgroundColor: 'black',
        opacity: '.5',
        color: 'white',
        position: 'absolute',
        left: '50%',
        width: '11vw',
        transform: 'translate(-50%, -50%)',
        overflow: 'hidden',
    },
    //Fix this
    imgOverlayText:{
        borderRadius: '0     0     0           10px',
        position: 'absolute',
        top: '90%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'hidden',
    },
    container:{
        position:' relative',
        textAlign: 'center',
        color: 'white',
        overflow:'hidden',
    },
    accountBox:{
        borderRadius: '0     10px     10px           0',
        backgroundColor: 'white',
        overflow:'hidden',
        height: '12vh',
        width: '10vw',
    }
}));

const getTags = (ArticleTags) => {
    const classes = ArticleBox();
    let tags=[];
    for(let item of ArticleTags){
        tags.push(
            <li>
                <Chip label={item} variant="outlined" />
            </li>
        );
    }
    return tags;
};
export default function Articles(){
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    const newdate = month + "/" + day + "/" + year;
    const test = {
        Headline: "Test article",
        DateCreate: newdate,
        Reporter: "Jhon Doe",
        Rating: 50,
        Description: "A short description of the article",
        Tags:["Tech", "something", "test"],
    }

    const classes = ArticleBox();
    return (
        <div>
            <Grid container className={classes.dropBox} xs={8}>
                <Grid item xs={2}>
                <div className={classes.container}>
                         <img src = '../../../static/images/test.png' alt="test" className={classes.img}/> 
                        <div className={classes.imgOverlayBox}>
                           <span>{test.DateCreate}</span>
                        </div>
                    </div>
                </Grid>
                <Grid item xs ={8} className={classes.descriptionBox}>
                    <Typography component="div">
                    <h1 className='header1' style={{textAlign:'left', padding: '10px'}}>
                        {test.Headline}
                    </h1>
                        <div className={classes.descriptionText} style={{textAlign:'left', paddingLeft: '10px'}}>
                            <p>{test.Description}</p>
                        </div>
                    </Typography>
                    <div>
                        <ul id="menu">
                            {getTags(test.Tags)}
                        </ul>
                    </div>
                </Grid>
                <Grid item xs= {2} className={classes.accountBox}>
                    <div>
                       
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
