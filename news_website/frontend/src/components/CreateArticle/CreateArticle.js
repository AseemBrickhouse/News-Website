import React, { useEffect, useState } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import {
  Input,
  Box,
  RadioGroup,
  Radio,
  FormControlLabel,
  ThemeProvider,
  createTheme,
} from "@material-ui/core";
import "./css/CreateArticle.css";
import * as articleAPI from "../ApiCalls/ArticleAPI";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import TagList from "../TagList/TagList";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import StickyBox from "react-sticky-box";

const theme = {
  overrides: {
    MuiRadio: {
      colorSecondary: {
        "&$checked": {
          color: "#AD343E",
        },
      },
    },
  },
};
const muiTheme = createTheme(theme);
const MAX_SELECTED = 7;
const CreateArticle = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [articleInfo, setArticleInfo] = useState({
    headline: "",
    article_description: "",
    article_body: "",
    visibility: "",
    // isPrivate: false,
    tags: [],
  });
  //For child updating tags
  const updateTags = (key, op) => {
    let updatedTags = articleInfo["tags"];
    if (Object.keys(updateTags).length <= MAX_SELECTED) {
      setError(false);
    }
    if (op === "unselected") {
      delete updatedTags[key];
    } else {
      updatedTags[key] = op;
    }
    setArticleInfo({ ...articleInfo, tags: updatedTags });
  };

  const handleInputChange = (event) => {
    setArticleInfo({ ...articleInfo, [event.target.name]: event.target.value });
    console.log(articleInfo);
  };

  const validateAndSubmit = async (option) => {
    if (
      articleInfo.headline.trim() === "" ||
      articleInfo.article_description.trim() === "" ||
      articleInfo.article_body.trim() === ""
    ) {
      setError(true);
    } else {
      setError(false);
      const keyListLength = Object.keys(articleInfo["tags"]).length;
      if (keyListLength > 7) {
        setError(true);
      } else {
        console.log(articleInfo);
        const response = await articleAPI.CreateNewArticle(articleInfo, {
          isPrivate: option,
        });
      }
    }
  };

  return (
    <ThemeProvider theme={muiTheme}>
      {error ? (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          sx={{ position: "absolute" }}
        >
          <Alert
            sx={{
              mt: 5,
              bgcolor: "#AD343E",
            }}
            variant="filled"
            severity="error"
          >
            <span>{errorMessage}</span>
          </Alert>
        </Snackbar>
      ) : null}
      <Box className="article-container">
        <Box component="form" onSubmit={validateAndSubmit}>
          <div className="article-container-left">
            <Input
              className="article-title"
              multiline
              disableUnderline
              inputProps={{
                style: {
                  fontSize: 40,
                  fontFamily: "neue-haas-grotesk-display-pro",
                  lineHeight: 1.0,
                },
              }}
              InputLabelProps={{ style: { fontSize: 40 } }}
              placeholder="Title"
              id="outlined-basic"
              label="Headline"
              name="headline"
              value={articleInfo["headline"]}
              onChange={handleInputChange}
            />
            <Input
              className="article-description"
              disableUnderline
              multiline
              inputProps={{
                style: {
                  fontSize: 26,
                  fontFamily: "neue-haas-grotesk-display-pro",
                  lineHeight: 1.0,
                },
              }}
              InputLabelProps={{ style: { fontSize: 18 } }}
              placeholder="Description"
              id="outlined-basic"
              label="article_description"
              name="article_description"
              value={articleInfo["article_description"]}
              onChange={handleInputChange}
            />
            <Input
              className="article-body"
              disableUnderline
              multiline
              inputProps={{
                style: {
                  fontSize: 26,
                  fontFamily: "neue-haas-grotesk-display-pro",
                  lineHeight: 1.0,
                },
              }}
              InputLabelProps={{ style: { fontSize: 18 } }}
              placeholder="Start Writing Now!"
              id="outlined-basic"
              label="article_body"
              name="article_body"
              value={articleInfo["article_body"]}
              onChange={handleInputChange}
            />
          </div>
        </Box>
        <StickyBox offsetTop={50} className="article-container-right">
          <Box>
            <span className="article-container-header">Visibility</span>
            <div id="radio-button-options">
              <RadioGroup
                aria-labelledby="radio-buttons-group-label"
                defaultValue="Public"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="PUBLIC"
                  disableRipple
                  control={<Radio disableRipple />}
                  label="Public"
                  name="visibility"
                  onChange={handleInputChange}
                />
                <FormControlLabel
                  value="FOLLOWER/SUBSCRIBER ONLY"
                  control={<Radio />}
                  label="Follower/Subscriber only"
                  name="visibility"
                  onChange={handleInputChange}
                />
                <FormControlLabel
                  value="PRIVATE"
                  control={<Radio />}
                  label="Private"
                  name="visibility"
                  onChange={handleInputChange}
                />
              </RadioGroup>
            </div>
            <span className="article-container-header">Tags</span>
            {Object.keys(articleInfo["tags"]).length > 7 ? (
              <Alert
                sx={{
                  mt: 5,
                  bgcolor: "#AD343E",
                  fontFamily: "neue-haas-grotesk-display-pro",
                }}
                variant="filled"
                severity="error"
              >
                <span>Limit 7</span>
              </Alert>
            ) : null}
            <div className="article-container-right-tag-list">
              <TagList updateTags={updateTags} />
            </div>
            <div
              id="article-options"
              className="article-container-right-options"
            >
              <button
                className="article-container-right-options-button"
                onClick={() => {
                  validateAndSubmit(true);
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  <SaveOutlinedIcon sx={{ marginRight: "10px" }} />
                  <span> Save and Finish later</span>
                </div>
              </button>
              <button
                className="article-container-right-options-button"
                onClick={() => {
                  validateAndSubmit(false);
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  <PublishOutlinedIcon sx={{ marginRight: "10px" }} />
                  <span>Publish</span>
                </div>
              </button>
            </div>
          </Box>
        </StickyBox>
      </Box>
    </ThemeProvider>
  );
};
export default CreateArticle;
