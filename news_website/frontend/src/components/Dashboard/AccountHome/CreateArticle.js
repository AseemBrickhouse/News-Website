import React, {useEffect} from 'react';
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { 
    TextField, 
    MenuItem,
    Button,
    FormControl,
    InputLabel,
    Select,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import CSRFToken from '../../../store/actions/csrfToken';
import SaveIcon from '@mui/icons-material/Save';

const CreateArticle = (props) => {
            var defaultValues= {
                key: "-1",    
                headline: "",
                article_description: "",
                article_body: "",
                visibility: "",
                isPrivate: false
            }
            if(typeof(props.location.state) !== "undefined"){
                const Article = props.location.state.props;
                defaultValues = {
                    key: Article.key,
                    headline: Article.headline,
                    article_description: Article.article_description,
                    article_body: Article.article_body,
                    visibility: Article.visibility,
                    isPrivate: false
                };
            }
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
                console.log(formValues)
                fetch("/api/CreateNewArticle/",{
                    method: "POST",
                    headers:{
                        'Accept':'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: localStorage.getItem('token'),
                        key: defaultValues.key,
                        headline: formValues.headline,
                        article_description: formValues.article_description,
                        article_body: formValues.article_body,
                        visibility: formValues.visibility,
                        isPrivate: formValues.isPrivate,
                    })
                }).then(response => {
                    console.log(response)
                });
                props.history.push("/")
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
                            <div className='gridItem'>
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
                                        rows: 5
                                    }}
                                    />
                                </FormControl>
                            </div>
                            <div className='gridItem'>
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
                                        // id="outlined-start-adornment"
                                        focused 
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
export default CreateArticle;
