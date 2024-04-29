export default class Util {
  NumberToMonth = (num) => {
    const Months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return Months[num];
  };

  getDate = (date) => {
    const month = new Date(date).getMonth() % 12;
    const day = new Date(date).getDate()
    const year = new Date(date).getFullYear()
    return (
      this.NumberToMonth(month) + " " + day + ' , ' + year
    );
  };
  
  getDateDifference = (date) => {
    var creationDate = new Date(
      new Date(date).getMonth() +
        "/" +
        new Date(date).getDate() +
        "/" +
        new Date(date).getFullYear()
    );
    console.log(creationDate);
    console.log(creationDate.getTime() - new Date().getTime() / 31536000000);
  };

}


const validatePassword = (password1, password2) => {
  const MIN_PASSWORD_LENGTH = 8
  if(password1 !== password2){
    return {"error": "Passwords do not match."}
  }
  if (password1.length < MIN_PASSWORD_LENGTH) {
    return {"error" : "Password must be at least 8 characters long."};
  }

  if (!/[a-z]/.test(password1)) {
    return {"error": "Password must contain at least one lowercase letter."};
  }

  if (!/[A-Z]/.test(password1)) {
    return {"error" : "Password must contain at least one uppercase letter."};
  }

  if (!/\d/.test(password1)) {
    return {"error": "Password must contain at least one digit."};
  }

  // Check if password contains at least one special character
  // if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
  //   return {"error" : "Password must contain at least one special character."};
  // }
  return null;
};
