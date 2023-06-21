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
