import * as React from 'react';
import CSRFToken from '../../../store/actions/csrfToken';
// import * as actions from '../../../store/actions/auth';
import { 
    TextField, 
    TextareaAutosize,
    Button, 
    Box, 
    FormControl,
    Container,
  } from "@material-ui/core";

  //TODO: Update File Using Account State
  //wanted to update this file but werid things kept happening
  //account not updated on refresh
  //data not being passed around
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
            method:"GET",
            headers:{
              'Accept':'application/json',
              'Content-Type': 'application/json',
              token: localStorage.getItem('token')
            },
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
        console.log(this.state)
        const defaultValues = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            phone: this.state.phone,
            bio: this.state.bio,
            email: this.state.email,
            occupation: this.state.occupation,
        }
        console.log(defaultValues)
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
                window.location.reload()
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
                            label={defaultValues.first_name =='' ? "First Name" :  defaultValues.first_name}
                            type="text"
                            value={formValues.first_name}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            id="last_name"
                            name="last_name"
                            label={defaultValues.last_name  =='' ? " Last Name" :  defaultValues.last_name}
                            type="text"
                            value={formValues.last_name}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            id="phone"
                            name="phone"
                            label={defaultValues.phone  == '' ? "Phone Number" :  defaultValues.phone}
                            type="text"
                            value={formValues.phone}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            id="occupation"
                            name="occupation"
                            label={defaultValues.occupation  =='' ? "Occupation" :  defaultValues.occupation}
                            type="text"
                            value={formValues.occupation}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            id="email"
                            name="email"
                            label={defaultValues.email  =='' ? "Email" :  defaultValues.email}
                            type="text"
                            value={formValues.email}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            id="bio"
                            name="bio"
                            label={defaultValues.bio == '' ? "Bio" : defaultValues.bio}
                            type="text"
                            value={formValues.bio}
                            onChange={handleInputChange}
                            InputProps={{
                                inputComponent: TextareaAutosize,
                                rows: 5
                            }}
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
    test = () => {
        return(
            <div>
                <Container>
                    <Box sx={{display: "inline-flex"}}>
                        <Box maxWidth="row md-12" style={{backgroundColor:"black"}}>
                            <p>Some text</p>
                        </Box>
                        <Box maxWidth="md" style={{backgroundColor:"gray"}}>
                            <p>Some text</p>
                        </Box>
                        <Box maxWidth="md" style={{backgroundColor:"blue"}}>
                            <p>Some text</p>
                        </Box>
                    </Box>
                </Container>
            </div>
        )
    }
    render(){
        return(<this.Form/>)
    }
}
export default EditAccount;