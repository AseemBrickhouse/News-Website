import React, { useEffect, useState } from "react";
import useTagFetcher from "../../Hooks/ArticleHooks/useTagFetcher";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import "./css/TagList.css";

const DELETE_COLOR = "#AD343E";

const Clicked = Object.freeze({
  SELECTED: "selected",
  UNSELECTED: "unselected",
});

const TagList = ({ updateTags, currentTags }) => {

  const tags = useTagFetcher().tags;
  const [clickedTag, setClickedTag] = useState({});

  useEffect(() => {
    const createMapping = (tags) => {
      let mapping = {};
      tags &&
        tags.forEach((tag) => {
          mapping[tag] = Clicked.UNSELECTED;
        });
      currentTags &&
        Object.keys(currentTags).forEach((tag) => {
          delete mapping[tag];
          updateTags(tag, Clicked.SELECTED);
        });
      return { ...currentTags, ...mapping };
    };

    setClickedTag(createMapping(tags));
  }, [tags]);

  const toggleTagSelection = (key) => {
    return clickedTag[key] === Clicked.UNSELECTED
      ? Clicked.SELECTED
      : Clicked.UNSELECTED;
  };

  const handleChipClick = (key) => {
    const op = toggleTagSelection(key);
    setClickedTag((prevClickedTag) => {
      const newClickedTag = { ...prevClickedTag };
      delete newClickedTag[key];
      return { [key]: op, ...newClickedTag };
    });
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

// TagList.propTypes = {
//   updateTags: PropTypes.func.isRequired,
//   currentTags: PropTypes.object.isRequired,
// };

export default TagList;
