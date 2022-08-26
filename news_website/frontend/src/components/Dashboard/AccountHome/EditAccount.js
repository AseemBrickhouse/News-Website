import * as React from 'react';

import CSRFToken from '../../../store/actions/csrfToken';


import { 
    Grid, Typography, TextField, 
    FormControlLabel, Avatar, MenuItem,
    Button, CssBaseline, Link, Box, FormControl,
    Container, Checkbox, InputLabel, Select,
  } from "@material-ui/core";


class EditAccount extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            account_role: "",
            phone: "",
            bio: "",
            occupation: "",
            email: "",
        };
    }
    componentDidMount(){
        fetch("/api/current_user/", {
            method:"POST",
            headers:{
              'Accept':'application/json',
              'Content-Type': 'application/json',
            },
                body: JSON.stringify({
                    token: localStorage.getItem('token')
                })
            })
            .then(response =>{
                if(response.status > 400){
                    return this.setState(() => {
                        return{ placeholder: "Something went wrong!" };
                    });
                }
                return response.json();
            })
            .then(data =>{
              return this.setState({
                first_name: data.first_name,
                last_name: data.last_name,
                account_role: data.role,
                phone: data.phone,
                bio: data.bio,
                email: data.email,
                occupation: data.occupation,
              })            
            });
            
    }

    Form = () =>{
        const defaultValues = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            phone: this.state.phone,
            bio: this.state.bio,
            email: this.state.email,
            occupation: this.state.occupation,
        }
        const [formValues, setFormValues] = React.useState(defaultValues);
        const handleInputChange = (event) =>{
            const {name, value} = event.target;
            setFormValues({
                ...formValues,
                [name]: value,
            });
        };
        const handleSubmit = (event) =>{
            event.preventDefault();
            console.log(formValues);
            fetch("/api/EditAccount/" , {
                method: "POST",
                headers:{
                    'Accept':'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: localStorage.getItem('token'),
                    first_name: formValues.first_name,
                    last_name: formValues.last_name,
                    phone: formValues.phone,
                    bio: formValues.bio,
                    email: formValues.email,
                    occupation: formValues.occupation,
                })
            }).then(response=>{
                console.log(response)
            })
        }
        return(
            <div>
                <div className='editaccount'>
                <form onSubmit={handleSubmit}>
                    <CSRFToken/>
                    <FormControl fullWidth>
                        <TextField
                            id="first_name"
                            name="first_name"
                            label="first_name"
                            type="text"
                            value={formValues.first_name}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            id="last_name"
                            name="last_name"
                            label="last_name"
                            type="text"
                            value={formValues.last_name}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            id="phone"
                            name="phone"
                            label="phone"
                            type="text"
                            value={formValues.phone}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            id="bio"
                            name="bio"
                            label="bio"
                            type="text"
                            value={formValues.bio}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            id="email"
                            name="email"
                            label="email"
                            type="text"
                            value={formValues.email}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            id="occupation"
                            name="occupation"
                            label="occupation"
                            type="text"
                            value={formValues.occupation}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <div className='createArticleButtons'>
                        <Button variant="outlined" color="primary" type="submit">
                            Publish
                        </Button>
                        </div>
                </form>
                </div>
            </div>
        )
    }
    render(){
        return(
            <div>
                <this.Form/>
            </div>
        )
    }
}
export default EditAccount