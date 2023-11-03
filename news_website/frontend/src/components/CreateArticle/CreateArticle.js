import React, { useEffect, useState } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import {
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  Input,
  Box,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  ThemeProvider,
  createTheme,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import CSRFToken from "../../store/actions/csrfToken";
import SaveIcon from "@mui/icons-material/Save";
import "./css/CreateArticle.css";
import * as articleAPI from "../ApiCalls/ArticleAPI";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import TagList from "../TagList/TagList";
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

const CreateArticle = () => {
  const [articleInfo, setArticleInfo] = useState({
    headline: "",
    article_description: "",
    article_body: "",
    visibility: "",
    isPrivate: false,
  });
  const [tags, setTags] = useState({})
  const updateTags = (key, op) => {
    const updatedTags = {...tags}
    if(op === 'unselected'){
      delete updatedTags[key];
      setTags(updatedTags)
    }else{
      setTags({...tags, [key]: op})
    }
  }
  const handleInputChange = (event) => {
    setArticleInfo({ ...articleInfo, [event.target.name]: event.target.value });
    console.log(articleInfo);
  };
  const handleSubmit = async (isPrivate) => {
    setArticleInfo({...articleInfo,['isPrivate']: isPrivate})
    console.log(articleInfo, tags);
    const response = await articleAPI.CreateNewArticle(...articleInfo, ...tags);
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <Box className="article-container">
        <Box component="form" onSubmit={handleSubmit}>
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
        <Box className="article-container-right">
          <span className="article-container-visibility">Visibility</span>

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
          <span className="article-container-visibility">Tags</span>
          <div className="article-container-right-tag-list">
            <TagList updateTags={updateTags}/>
          </div>
          <div id="article-options" className="article-container-right-options">
            <button
              className="article-container-right-options-button"
              onClick={() => handleSubmit(true)}
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
              onClick={ () => handleSubmit(false)}
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
      </Box>
    </ThemeProvider>
  );
};
export default CreateArticle;
{
  /* const y = (props) => {
  var defaultValues = {
    key: "-1",
    headline: "",
    article_description: "",
    article_body: "",
    visibility: "",
    isPrivate: false,
  };
  if (typeof props.location.state !== "undefined") {
    const Article = props.location.state.props;
    defaultValues = {
      key: Article.key,
      headline: Article.headline,
      article_description: Article.article_description,
      article_body: Article.article_body,
      visibility: Article.visibility,
      isPrivate: false,
    };
  }
  const [formValues, setFormValues] = React.useState(defaultValues);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await articleAPI.CreateNewArticle();
    // console.log(formValues);
    // fetch("/api/CreateNewArticle/", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     token: localStorage.getItem("token"),
    //     key: defaultValues.key,
    //     headline: formValues.headline,
    //     article_description: formValues.article_description,
    //     article_body: formValues.article_body,
    //     visibility: formValues.visibility,
    //     isPrivate: formValues.isPrivate,
    //   }),
    // }).then((response) => {
    //   console.log(response);
    // });
    // props.history.push("/");
  };
  //Add Functionalty to save and finish later
  const handleSave = (event) => {
    this.defaultValues[isPrivate] = true;
    handleSubmit(event);
  };
  const StyledButton = styled(Button)({
    // fontFamily: "Inter",
    color: "black",
    textDecoration: "underline",
    fontSize: "18px",
    fontWeight: "bold",
    // letterSpacing: ".1rem",
    textTransform: "none",
    textUnderlineOffset: "3px",
    marginLeft: "15px",
    padding: "10px 25px",
    textDecoration: "none",
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CSRFToken />
        <div className="createArticleContainer">
          <div className="createArticleLeft">
            <div className="gridItem">
              <FormControl fullWidth>
                <TextField
                  focused
                  id="headline"
                  name="headline"
                  label="Headline"
                  type="text"
                  value={formValues.headline}
                  onChange={handleInputChange}
                />
              </FormControl>
            </div>
            <div className="gridItem">
              <FormControl fullWidth>
                <TextField
                  focused
                  id="article_description"
                  name="article_description"
                  label="Article Description"
                  value={formValues.article_description}
                  onChange={handleInputChange}
                  InputProps={{
                    inputComponent: TextareaAutosize,
                    rows: 5,
                  }}
                />
              </FormControl>
            </div>
            <div className="gridItem">
              <FormControl fullWidth>
                <InputLabel id="visibility">Visibility</InputLabel>
                <Select
                  focused
                  labelId="visibility"
                  name="visibility"
                  id="visibility"
                  value={formValues.visibility}
                  label="Visibility"
                  onChange={handleInputChange}
                >
                  <MenuItem value={"PUBLIC"}>Public</MenuItem>
                  <MenuItem value={"FOLLOWER/SUBSCRIBER ONLY"}>
                    Follower/Subscriber
                  </MenuItem>
                  <MenuItem value={"PRIVATE"}>Private</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="createArticleRight">
            <div className="gridItem">
              <FormControl fullWidth>
                <TextField
                  // id="outlined-start-adornment"
                  focused
                  id="article_body"
                  name="article_body"
                  label="Article Body"
                  value={formValues.article_body}
                  onChange={handleInputChange}
                  InputProps={{
                    inputComponent: TextareaAutosize,
                    rows: 30,
                  }}
                />
              </FormControl>
            </div>
            <div className="gridItem">
              <div className="createArticleButtons">
                <StyledButton
                  variant="outlined"
                  color="primary"
                  type="submit"
                  onClick={handleSave}
                >
                  <SaveIcon />
                  Save and Finish later
                </StyledButton>
                <StyledButton variant="outlined" color="primary" type="submit">
                  Publish
                </StyledButton>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default CreateArticle; */
}
