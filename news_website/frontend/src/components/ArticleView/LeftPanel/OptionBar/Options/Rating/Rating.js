import React from "react";
import "./css/Rating.css"
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

const Rating = ({article}) => {
  return (
    <div className="main-container-rating">
      <ThumbUpOffAltIcon style={{ color: "#B2D9C1", fontSize: "24px" }} />
      <ThumbDownOffAltIcon style={{ color: "#AD343E", fontSize: "24px" }} />
    </div>
  );
};
export default Rating;
