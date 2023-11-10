import React, { useEffect, useState } from "react";
import useTagFetcher from "../hooks/useTagFetcher";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import "./css/TagList.css";

const DELETE_COLOR = "#AD343E";

const Clicked = Object.freeze({
  SELECTED: "selected",
  UNSELECTED: "unselected",
});

const TagList = ({ updateTags }) => {
  const[numberSelected, setNumberSelected] = useState(0)
  const createMapping = (tags) => {
    let mapping = {};
    tags &&
      tags.forEach((tag) => {
        mapping[tag] = Clicked.UNSELECTED;
      });
    return mapping;
  };
  const tags = useTagFetcher().tags;
  const [clickedTag, setClickedTag] = useState({});

  useEffect(() => {
    setClickedTag(createMapping(tags))
  }, [tags]);

  const toggleTagSelection = (key) => {
    return clickedTag[key] === Clicked.UNSELECTED
      ? Clicked.SELECTED
      : Clicked.UNSELECTED;
  };

  const handleChipClick = (key) => {
    const op = toggleTagSelection(key);
    if(op === Clicked.SELECTED){
      delete clickedTag[key]
      setClickedTag({[key]: op, ...clickedTag})
    }else{
      delete clickedTag[key]
      setClickedTag({...clickedTag, [key]: op})
    }
    updateTags(key, op);
  };
  

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="baseline"
      flexWrap="wrap"
    >
      {clickedTag &&
        Object.entries(clickedTag).map(([key, value]) => (
          <Chip
            className="chip"
            key={key}
            label={key}
            onClick={() => handleChipClick(key)}
            onDelete={
              clickedTag[key] !== Clicked.UNSELECTED
                ? () => handleChipClick(key)
                : undefined
            }
            sx={{
              m: "1px",
              fontFamily: "neue haas grotesk display pro",
              fontSize: "1rem",
              fontWeight: 500,
              "& .MuiChip-deleteIcon": {
                color: DELETE_COLOR,
              },
            }}
          />
        ))}
    </Stack>
  );
};
export default TagList;
