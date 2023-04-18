import React, { Component, useState, useEffect, useSelector } from "react";

export const handleBookMark = async(key) =>{
    const response = await fetch("api/Bookmark/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: key,
        token: localStorage.getItem("token"),
      }),
    })
}

export const handleRemoveBookMark = async(key) =>{

}
