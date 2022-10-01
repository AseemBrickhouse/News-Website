import React, {useState, useEffect} from 'react';
import {Box} from "@material-ui/core";
import Card from './Card';

const Following = () => {
    const[people, setPeople] = useState(null);
    const[load, setLoad] = useState(false);

    useEffect(async () =>{
        await fetch("/api/myFollowing/",{
            method: "POST",
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: localStorage.getItem('token'),
            })
        })
        .then(response=> {
            return response.json();
        })
        .then(data=>{
            console.log(data)
            setLoad(true)
            setPeople(data)
        })
    },[load]);
    return(
        <Box sx={{
            flexDirection: "row", 
            justifyContent: "center",
            display: "flex",
            marginLeft: "20vw", 
            marginRight:"20vw", 
            marginTop:"1vh",
            flexWrap: "wrap",
            }}>
            {
            people != null ? Object.entries(people).map(([key, Person]) =>{
                return(
                    <Box sx={{
                        borderRadius: "25px",
                        backgroundColor: "#D9CAB3", 
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        width: "300px",
                        height: "auto",
                        margin: "5px"
                        }}>
                        <Card {...Person}/>
                    </Box>
                )
            })
            : <></>
            }
        </Box>
    )
}

export default Following;