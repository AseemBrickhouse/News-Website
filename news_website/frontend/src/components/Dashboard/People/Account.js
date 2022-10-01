import React, {useState, useEffect} from 'react';
import {withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { 
   Typography,Box,styled,
} from "@material-ui/core";
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import Utility from '../../Utility';
import StarIcon from '@mui/icons-material/Star';
import * as savedAction from '../../../store/actions/savedArticles';
import Avatar from '@mui/material/Avatar';

const AccountID = (props) =>{
    const person = props.location.state.person
    const [articles, setArticles] = useState(false)
    const [load, setLoad] = useState(false)
    const Util = new Utility();
    useEffect(async () => {
        console.log(props)
        const token = localStorage.getItem('token');
        props.SavedArticles(token);
        setLoad(true);
    },[load]);

    useEffect(()=>{
        fetch('/api/GetUserArticles/', {
            method: "POST",
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key: person.key,
            })
        })
        .then(response=> {
            return response.json();
        })
        .then(data=>{
            setLoad(true)
            setArticles(data)
        })
    }, [load])
    const handleBookMark = (key) =>{
        fetch('/api/Bookmark/', {
          method: "POST",
          headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              key: key,
              token: localStorage.getItem('token')
          })
        })
        .then(response => {return response.json()})
        .then(data => {
          setLoad(false)
          console.log(data)
        })
    }
    const handleRemoveBookMark = (key) =>{
      fetch('/api/RemoveBookmark/', {
        method: "POST",
        headers:{
          'Accept':'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            key: key,
            token: localStorage.getItem('token')
        })
      })
      .then(response => {return response.json() })
      .then(data => {
        setLoad(false)
        console.log(data)
      })
  }

    const StyledTypographyHeader = styled(Typography)({
        color: "black", 
        textDecoration: "none",
        fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
        fontWeight: "600",
        fontSize: "18px",
        marginRight: "5px",
    })
    const StyledTypographyBody = styled(Typography)({
        color: "black", 
        textDecoration: "none",
        fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
        fontWeight: "500",
        fontSize: "15px",
        marginRight: "5px",
    })
    const StyledTypographyFooter = styled(Typography)({
        color: "black", 
        textDecoration: "none",
        fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
        fontWeight: "500",
        fontSize: "15px",
        marginRight: "5px",
    })
    // const savedArticles = props.saved.saved;

    const isBookmarked = (key) =>{
       return props.saved.saved[key] == undefined ? false : true
    }
    return(
        <Box sx={{display: "flex", flexDirection: "row" ,height: "94vh"}}>
            <Box sx={{width: "35%", 
             display: "flex", flexDirection: "column", justifyContent: "center",}}>
                <Box sx={{width: "75%", height: "30%", 
                backgroundColor: "#D9CAB3", 
                border: "1px solid black",
                borderRadius:"25px", marginLeft: "10%", flexDirection:"column", display:"flex", textAlign: "center", dropShadow: "16px 16px 10px 10px black"}}>
                    <Box sx={{width: "100%", height: "50%", marginTop: "20px"}}>
                        {
                            person.profile_pic != null ?
                            <Avatar 
                                alt={person.first_name + person.last_name} 
                                src={person.profile_pic}
                                sx={{
                                    margin: "auto",
                                    width: 125,
                                    height: 125,
                                }}
                            />
                            :
                            <Avatar 
                                alt={person.first_name + person.last_name} 
                                src="/images/defaultProfilePic.png"
                                sx={{
                                    margin: "auto",
                                    width: 125,
                                    height: 125,
                                }}
                            />
                        }
                    </Box>
                    <Box sx={{width: "100%", height: "20%"}}>
                        <Typography
                            style={{
                                color: "black", 
                                textDecoration: "none",
                                fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                                fontWeight: "600",
                                fontSize: "25px",
                            }}>
                            {person.first_name + " " + person.last_name}
                        </Typography>
                    </Box>
                    <Box sx={{width: "100%", height: "25%"}}>
                        <Typography
                            style={{
                                color: "black", 
                                textDecoration: "none",
                                fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                                fontWeight: "400",
                                fontSize: "25px",
                            }}>
                            {person.occupation}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{width: "75%", height: "60%", 
                backgroundColor: "#D9CAB3", 
                border: "1px solid black",
                borderRadius:"25px", marginLeft:"10%", marginTop: "5vh", flexDirection: "column", display: "flex"}}>
                    <Box sx={{marginLeft: "10px", marginRight: "10px"}}>
                    <p>{person.bio}</p>
                    </Box>
                    <Box sx={{justifyContent: "space-between", display: "flex", flexDirection: "row", marginLeft: "10px", marginRight: "10px"}}>
                        <p>Email: </p>
                        <p>{person.email}</p>
                    </Box>
                    <Box sx={{justifyContent: "space-between", display: "flex", flexDirection: "row", marginLeft: "10px", marginRight: "10px"}}>
                        <p>Phone: </p>
                        <p>{person.phone}</p>
                    </Box>
                </Box>
            </Box>
            <Box sx={{width: "65%", 
            marginLeft: "10px", flexDirection: "row", display: "flex", flexWrap: "wrap", marginTop: "2vh"}}>
                {
                    articles != null ? Object.entries(articles).map(([key, article]) =>{
                        return(
                            <Box sx={{backgroundColor: "#D9CAB3", width: "45%", height: "15vw", marginRight: "1vw", marginLeft: "1.5vw", borderRadius: "25px" , display: "flex", flexDirection:"column", border: "1px solid black"}}>
                                <Box sx={{display: "flex", flexDirection: "row" , justifyContent: "space-between", marginTop: "1vh", marginLeft: "1vw", marginRight: "1vw"}}>
                                    <Box sx={{height: "10%"}}>
                                        <StyledTypographyHeader>
                                            {article.headline}
                                        </StyledTypographyHeader>
                                    </Box>
                                    <Box>
                                        {
                                        isBookmarked(article.key) ? 
                                            <Box onClick={() => handleRemoveBookMark(article.key)}>
                                                <BookmarkAddOutlinedIcon style={{color: "#F2AF29"}}/> 
                                            </Box>
                                            :
                                            <Box onClick={() => handleBookMark(article.key)}>
                                                <BookmarkAddOutlinedIcon sx={{color: "#C1BDBD"}}/>
                                            </Box>
                                        }
                                    </Box>
                                </Box>
                                <Box sx={{margin: "20px", height: "80%"}}>
                                    <StyledTypographyBody>
                                        {article.article_description}
                                    </StyledTypographyBody>
                                </Box>
                                <Box sx={{marginLeft: "20px", display: "flex", flexDirection: "row", height: "10%"}}>
                                    <StyledTypographyFooter>
                                        {Util.getDate(article.date)}
                                    </StyledTypographyFooter>
                                    {                         
                                        article.visibility == "FOLLOWER/SUBSCRIBER ONLY" ?
                                          <StyledTypographyFooter style={{marginLeft: "10px"}}>
                                            <div 
                                              style={{
                                                  display: 'flex',
                                                  alignItems: 'center',
                                                  flexWrap: 'wrap',
                                                }}>
                                              <StarIcon fontSize='15px' style={{color: "#F2AF29", marginRight: "5px"}}/>
                                              <span>Members only</span>
                                            </div>  
                                          </StyledTypographyFooter>
                                          : <></>                               
                                    }
                                </Box>
                            </Box>
                        )
                    })
                    :
                    <></>
                }
            </Box>
        </Box>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return{
        saved: state.savedArticles
    }
  }
  
  const mapDispatchToProps = dispatch =>{
    return{
        SavedArticles: (token) => dispatch(savedAction.getSAVEDARTICLES(token)),
    }
  }
  export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AccountID));