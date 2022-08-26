import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { 
  Grid, Typography, TextField, 
  FormControlLabel, Avatar, MenuItem,
  Button, CssBaseline, Link, Box, FormControl,
  Container, Checkbox, InputLabel, Select,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import CSRFToken from '../../../store/actions/csrfToken';
import SaveIcon from '@mui/icons-material/Save';

class CreateArticle extends React.Component{
    constructor(props){
        super(props);
    }

    Form = () =>{
            const defaultValues = {
                headline: "",
                article_description: "",
                article_body: "",
                visibility: "",
                isPrivate: false
            };
            const [formValues, setFormValues] = React.useState(defaultValues);
            const handleInputChange = (event) =>{
                const {name, value} = event.target;
                setFormValues({
                    ...formValues,
                    [name]: value,
                });
            };
            const handleSubmit = (event) => {
                event.preventDefault();
                console.log(formValues);
                fetch("/api/CreateNewArticle/",{
                    method: "POST",
                    headers:{
                        'Accept':'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: localStorage.getItem('token'),
                        headline: formValues.headline,
                        article_description: formValues.article_description,
                        article_body: formValues.article_body,
                        visibility: formValues.visibility,
                        isPrivate: formValues.isPrivate,
                    })
                }).then(response => {
                    console.log(response)
                });
                <Redirect to='/'/>
            }
            //Add Functionalty to save and finish later
            const handleSave = (event) =>{
                this.defaultValues[isPrivate] = true
                handleSubmit(event)
            }
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
    
        return(
            <div>
                <form onSubmit={handleSubmit}>
                    <CSRFToken/>
                    <div className='createArticleContainer'>
                        <div className='createArticleLeft'>
                            <div className='gridItem'>
                                <FormControl fullWidth>
                                <TextField
                                    id="headline"
                                    name="headline"
                                    label="Headline"
                                    type="text"
                                    value={formValues.headline}
                                    onChange={handleInputChange}
                                />
                                </FormControl>
                            </div>
                            <div className='gridItem'>
                                <FormControl fullWidth>
                                    <TextField
                                    id="article_description"
                                    name="article_description"
                                    label="Article Description"
                                    value={formValues.article_description}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        inputComponent: TextareaAutosize,
                                        rows: 5
                                    }}
                                    />
                                </FormControl>
                            </div>
                            <div className='gridItem'>
                                <FormControl fullWidth>
                                    <InputLabel id="visibility">Visibility</InputLabel>
                                    <Select
                                      labelId="visibility"
                                      name="visibility"
                                      id="visibility"
                                      value={formValues.visibility}
                                      label="Visibility"
                                      onChange={handleInputChange}
                                    >
                                      <MenuItem value={"PUBLIC"}>Public</MenuItem>
                                      <MenuItem value={"FOLLOWER/SUBSCRIBER ONLY"}>Follower/Subscriber</MenuItem>
                                      <MenuItem value={"PRIVATE"}>Private</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className='createArticleRight'>
                            <div className='gridItem'>
                                <FormControl fullWidth>
                                    <TextField
                                        id="article_body"
                                        name="article_body"
                                        label="Article Body"
                                        value={formValues.article_body}
                                        onChange={handleInputChange}
                                        InputProps={{
                                            inputComponent: TextareaAutosize,
                                            rows: 30
                                        }}
                                    />
                                </FormControl>
                            </div>
                            <div className='gridItem'>
                                <div className='createArticleButtons'>
                                    <StyledButton variant="outlined" color="primary" type="submit" onClick={handleSave}>
                                        <SaveIcon/>
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
        )
    }

    render(){
        console.log("Here");
        return(
            <div>
                <this.Form/>
            </div>
        )
    }
}
export default CreateArticle;

                // visibility: data.get('visibility'),
                // article_description: data.get('article_description'),
                // article_body: data.get('article_body')
            // fetch("/api/CreateNewArticle/", {
            //     method: "POST",
            //     headers:{
            //       'Accept':'application/json',
            //       'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         token: localStorage.getItem('token'),
            //         headline: data.get('headline'),
            //         // visibility: data.get('visibility'),
            //         // article_description: data.get('article_description'),
            //         // article_body: data.get('article_body'),
            //     })
            // })
            // .then(response =>{
            //     console.log(response)
            // })
            // .then(data =>{
            //     console.log(data)
            // })
            // console.log("Createsddfds");
            // this.props.history.push('/')
            // <Redirect to="/Account/Articles/"/>