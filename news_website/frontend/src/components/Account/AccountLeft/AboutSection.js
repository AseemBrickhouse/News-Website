import React, { useState, useEffect } from "react";
import "./css/AccountLeft.css";

const AboutSection = ({person}) =>{
    console.log(person)
    return (
        <div>
            <span className="bio-text">{person.bio}</span> 
        </div>
    )
}
export default AboutSection;