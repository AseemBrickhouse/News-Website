import React, {useEffect} from "react";
export default class Util {
    NumberToMonth = (num) => {
        const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        return Months[num];
    }
    getDate = (date) =>{
        return this.NumberToMonth(new Date(date).getMonth()) + ' ' + new Date(date).getDate() + '-' + new Date(date).getFullYear();
    }
    // deleteArticle = (key) =>{
    //   useEffect(async()=>{
    //     fetch("api/DeleteArticle", {
    //         method: "POST",
    //         headers:{
    //             'Accept':'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             key,
    //         })
    //     })
    //     .then(response=>{
    //         return response.json()
    //     })
    //     .then(data=>{console.log(data)})
    // },[])
    // }
    GETAllArticles = () =>{
        console.log("in here")
        let request = {}
        fetch("api/AllArticles/", {
            method: "GET",
            headers:{
              'Accept':'application/json',
              'Content-Type': 'application/json',
            },
          }).then(response =>{
            if(response.status > 400){
                this.setState(() => {
                    return{
                        err: "400"
                    };
                });
            }
            return response.json();
          }).then(data =>{
                request = data
          })
          console.log(request)
          return []
    }
    GETPopularTags = () =>{
        fetch("api/PopularTags/", {
          method: "GET",
          headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json',
          },
        }).then(response =>{
          if(response.status > 400){
              return this.setState(()=>{
                  return{ placeholder: "Something went wrong!" };
              });
          }
          return response.json();
        }).then(data =>{
            this.setState(() =>{
              return{
                  popularTags: data,
                  loaded: true
              };
            });
        })
    }
    
}