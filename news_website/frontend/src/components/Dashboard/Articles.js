import React from 'react';
import {Button, Box, Container, Typography, makeStyles, Grid, Chip} from '@material-ui/core';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbsUpDownIcon from "@material-ui/icons/ThumbsUpDown";

const ArticleBox = makeStyles((theme) => ({
   
      Ttags: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        "& > *": {
          margin: theme.spacing(0.5)
        }
      },
      tagRow: {
        resize: "horizontal",
        display: "flex"
      },
      AccountIcon: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        left: "0%"
      },
      AccountName: {
        textAlign: "center",
        position: "relative",
        top: "0px"
      },
      AccountSocials: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        spacing: "10px",
        textAlign: "center"
      },
      ArticleRating: {
        textAlign: "center",
        display: "center",
        position: "relative",
        top: "-10%"
      },
      ArticleRating2: {
        textAlign: "center",
        display: "center",
        position: "relative",
        top: "-30%"
      },
      AccountGrid: {
        justifyContent: "center"
      },
      LikeDislike: {
        textAlign: "center",
        top: "0%"
      },
      img: {
        width: "100%",
        height: "100%",
        borderRadius: "25px 0 0 25px"
      }
}));

export default function Articles(){

    const classes = ArticleBox();

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
  
    const newdate = month + "/" + day + "/" + year;
    const test = {
      Headline: "Test article",
      DateCreate: newdate,
      Reporter: "John Doe",
      Rating: 60,
      Description: "yes",
      Tags: ["Tech", "something", "test", "science", "life", "gaming", "store"],
      Socials: [
        { Name: "Twitter", Has: false, Link: "NA" },
        { Name: "Instagram", Has: false, Link: "NA" },
        {
          Name: "Youtube",
          Has: true,
          Link: "https://www.youtube.com/channel/UCR9SdrOUrUWVTB81-ry9T6Q"
        }
      ]
    };
    const handleTwitter = (event, link) => {
        window.open(link);
   };
   const handleYoutube = (event) => {
        let link = GetLinks("Youtube");
        window.open(link);
   };
   //Gets the link for the given social button
   const GetLinks = (target) => {
    let link='';
        for(let item of test.Socials){
            if(item.Name === target){
                link = item.Link;
            }
        }
    return link;
   }
   const GetTags = (ArticleTags) => {
     let tags = [];
     for (let item of ArticleTags) {
       tags.push(
         <div className={classes.tagRow}>
           <Chip
             label={item}
             variant="outlined"
             size="small"
             className={classes.tagRow}
           />
         </div>
       );
     }
     return tags;
   };
   //Displays the icons given the right Socials
   const GetSocials = (Socials) => {
     let socials = [];
 
     for (let item of Socials) {
       if (item.Has) {
         Links(item);
         function Links(item) {
           if (item.Name === "Youtube") {
             socials.push(
            //    <YouTubeIcon fontSize="small" onClick={handleTwitter} />
               <Button onClick={handleYoutube}>yt</Button>
             );
           }
           if (item.Name === "Twitter") {
             socials.push(
            //    <TwitterIcon fontSize="small" onClick={handleYoutube} />
             );
           }
           if (item.Name === "Instagram") {
            //  socials.push(<InstagramIcon fontsize="small" />);
           }
         }
       }
     }
     return socials;
   };
 
   const GetRating = (rating) => {
     let thumb = [];
     if (rating <= 39) {
       thumb.push(
         <div>
           <ThumbDownIcon fontSize="small" /> {rating} %
         </div>
       );
     }
     if (rating >= 40 && rating <= 59) {
       thumb.push(
         <div>
           <ThumbsUpDownIcon fontSize="small" /> {rating} %
         </div>
       );
     }
     if (rating >= 60) {
       thumb.push(
         <div>
           <ThumbUpIcon fontSize="small" /> {rating} %
         </div>
       );
     }
     return thumb;
   };
   function MakeBox() {
    return (
        
      <React.Fragment>
        <Grid item xs={2} className='left'>
          <img
            src="https://www.draft-js-plugins.com/images/canada-landscape-small.jpg"
            alt="landscape"
            className={classes.img}
          />
        </Grid>
        <Grid item xs={8} className='middle'>
          <div className='header1'>{test.Headline}</div>
          <div className='description' style={{color: "white"}}>{test.Description}</div>
          <Grid>
            <br />
          </Grid>
          <Grid item container>
            <div className={classes.Ttags}>{GetTags(test.Tags)}</div>
          </Grid>
        </Grid>
        <Grid item xs={2} className='right'>
           <Account /> 
        </Grid>
      </React.Fragment>
    );
  }
   function Account() {
    return (
      <div>
        <Grid container xs={12} ClassName={classes.AccountGrid}>
          <Grid item xs={12} className={classes.AccountIcon}>
            {/* <AccountCircleIcon /> */}
          </Grid>
          <Grid item xs={12} className={classes.AccountName}>
            {test.Reporter}
          </Grid>
          <Grid item xs={12} className={classes.AccountSocials}>
            {GetSocials(test.Socials)} 
          </Grid>
          <Grid item xs={12}>
            <p className={classes.ArticleRating}>Article Rating</p>

            <div className={classes.ArticleRating2}>
              {/* {GetRating(test.Rating)} */}
            </div>
            {/* <div className={classes.LikeDislike}>
              <ThumbUpIcon fontSize="small" />
              <ThumbDownIcon fontSize="small" />
            </div> */}
          </Grid>
        </Grid>
      </div>
    );
  }
    return (
        <div className='root'>
        <Grid container>
          <Grid container item xs={7} className='back'>
            <MakeBox />
          </Grid>
        </Grid>
      </div>
    )
}
