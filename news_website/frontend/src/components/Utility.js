
export default class Util {
    NumberToMonth = (num) => {
        const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        return Months[num];
    }
    getDate = (date) =>{
        return this.NumberToMonth(new Date(date).getMonth()) + ' ' + new Date(date).getDate() + '-' + new Date(date).getFullYear();
    }
    
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
                return data.json()
          })
          console.log(request)
          return []
    }
}