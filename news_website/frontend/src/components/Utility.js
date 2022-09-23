import React, {useEffect} from "react";
export default class Util {
    NumberToMonth = (num) => {
        const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        return Months[num];
    }
    getDate = (date) =>{
        return this.NumberToMonth(new Date(date).getMonth()) + ' ' + new Date(date).getDate() + '-' + new Date(date).getFullYear();
    }
    getDateDifference = (date)=>{
      var creationDate = new Date(new Date(date).getMonth() + "/" + new Date(date).getDate() + "/" + new Date(date).getFullYear()) 
      console.log(creationDate)
      console.log( (creationDate.getTime() - new Date().getTime() / 31536000000) )
    }    
}