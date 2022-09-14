import * as React from 'react';
import CSRFToken from '../../../store/actions/csrfToken';
import { 
    Grid, Typography, TextField, 
    FormControlLabel, Avatar, MenuItem,  TextareaAutosize,
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
        return(
            <div>
                {console.log("here")}
                    <this.Form/>
                {/* <this.test/> */}
            </div>
        )
    }
}
export default EditAccount;


// <div className='container rounded bg-white mt-5 mb-5'>
// <div className="row">
//     <div className="col-md-3 border-right">
//         <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/><span className="font-weight-bold">Edogaru</span><span className="text-black-50">edogaru@mail.com.my</span><span> </span></div>
//     </div>
//     <div className="col-md-5 border-right">
//         <div className="p-3 py-5">
//             <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h4 className="text-right">Profile Settings</h4>
//             </div>
//             <div className="row mt-2">
//                 <div className="col-md-6"><label className="labels">Name</label><input type="text" className="form-control" placeholder="first name" value=""/></div>
//                 <div className="col-md-6"><label className="labels">Surname</label><input type="text" className="form-control" value="" placeholder="surname"/></div>
//             </div>
//             <div className="row mt-3">
//                 <div className="col-md-12"><label className="labels">Mobile Number</label><input type="text" className="form-control" placeholder="enter phone number" value=""/></div>
//                 <div className="col-md-12"><label className="labels">Address Line 1</label><input type="text" className="form-control" placeholder="enter address line 1" value=""/></div>
//                 <div className="col-md-12"><label className="labels">Address Line 2</label><input type="text" className="form-control" placeholder="enter address line 2" value=""/></div>
//                 <div className="col-md-12"><label className="labels">Postcode</label><input type="text" className="form-control" placeholder="enter address line 2" value=""/></div>
//                 <div className="col-md-12"><label className="labels">State</label><input type="text" className="form-control" placeholder="enter address line 2" value=""/></div>
//                 <div className="col-md-12"><label className="labels">Area</label><input type="text" className="form-control" placeholder="enter address line 2" value=""/></div>
//                 <div className="col-md-12"><label className="labels">Email ID</label><input type="text" className="form-control" placeholder="enter email id" value=""/></div>
//                 <div className="col-md-12"><label className="labels">Education</label><input type="text" className="form-control" placeholder="education" value=""/></div>
//             </div>
//             <div className="row mt-3">
//                 <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control" placeholder="country" value=""/></div>
//                 <div className="col-md-6"><label className="labels">State/Region</label><input type="text" className="form-control" value="" placeholder="state"/></div>
//             </div>
//             <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button">Save Profile</button></div>
//         </div>
//     </div>
//     <div className="col-md-4">
//         <div className="p-3 py-5">
//             <div className="d-flex justify-content-between align-items-center experience"><span>Edit Experience</span><span className="border px-3 p-1 add-experience"><i className="fa fa-plus"></i>&nbsp;Experience</span></div><br/>
//             <div className="col-md-12"><label className="labels">Experience in Designing</label><input type="text" className="form-control" placeholder="experience" value=""/></div> <br/>
//             <div className="col-md-12"><label className="labels">Additional Details</label><input type="text" className="form-control" placeholder="additional details" value=""/></div>
//         </div>
//     </div>
// </div>
// </div>