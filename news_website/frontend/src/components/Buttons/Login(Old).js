import React, {Component, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';
import SignUp from './Signup';
import { 
  Grid, ButtonGroup, 
  Typography, TextField, FormControl,
  FormHelperText,
  FormGroup, 
} from "@material-ui/core";
import {
  Switch, 
  Route,
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import { $CombinedState } from 'redux';

import { Button, Checkbox, Form, Input } from 'antd';

const App = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;



// class Login extends Component{

//     // handleSubmit = (event) => {
//     //     event.preventDefault();
//     //     this.props.form.validateFields((error, values) =>{
//     //         if(!error){
//     //             this.props.onAuth(values.userName, values.password);
//     //             this.props.history.push('/');
//     //         }
//     //     });
//     // }

//     // connect(mapStateToProps, mapDispatchToPsrops)(Login);
//     constructor(props){
//       super(props);
//     }
//     // submitForm(){
//     //   $.post('/api.Account', {}, (response) =>{});
//     // };

//     render(){
//         return(
//           // <FormControl>
//           //   <TextField>
//           //     <FormHelperText>
//           //       <p>Username</p>
//           //     </FormHelperText>
//           //   </TextField>
//           //   <TextField>
//           //     <FormHelperText>
//           //       <p>Password</p>
//           //     </FormHelperText>
//           //   </TextField>
//           //   <TextField>
//           //     <FormHelperText>
//           //       <p align='center'>Password (again) </p>
//           //     </FormHelperText>
//           //   </TextField>
//           //   <TextField>
//           //     <FormHelperText>
//           //       <p>Emai;</p>
//           //     </FormHelperText>
//           //   </TextField>
//           <FormGroup>
//             <div className='Login'>
//                   <div className='box'>
//                     <div className='box-top'>
//                         <h1>Login</h1>
//                     </div>
//                     <div className='box-mid'>
//                       <div className='box-mid-item'>     
//                         <TextField className='hhh'>
//                         <FormHelperText>
//                           <p>UserName</p>
//                         </FormHelperText>
//                         </TextField>
//                       </div>
//                       <div className='box-mid-item'>                     
//                         <TextField>
//                         <FormHelperText>
//                           <p>Password</p>
//                         </FormHelperText>
//                         </TextField>
//                       </div>
//                     </div>
//                     <div className='box-bot'>
//                       <a href="/"><p>Back</p></a>
//                       <button>Submit</button>
//                       <Link to=" ">
//                         <p>Don't have an accout?</p>
//                       </Link>
//                     </div>
//                   </div> 
//               </div>
//             </FormGroup>
//           // </FormControl>
//         ) 
//     }   
// }

// // const WrapLogin= FormControl.create()(Login);
// const handleOpen = () => {
//   setOpen(true);
// };
// const handleClose = () => {
//   setOpen(false);
// };

// const mapStateToProps = (state) => {
//     return {
//         loading: state.loading,
//         error: state.error
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         onAuth: (username, password) => dispatch(actions.authLogin(username, password)) 
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Login);

//                   {/* <Modal 
//                   >
//                         <div className = 'modal' id='myModal'>
//                             <div className='modal-content'>
//                               <div className='modal-header'>
//                                 <span  className='close'>&times;</span>
//                                 <h2>Login</h2>
//                               </div>
//                               <div className='modal-body'>
//                                 <p>Some text in the Modal Body</p>

//                                 <p>Some other text...</p>
//                               </div>
//                               <div className='modal-footer'>
//                                    <span>Need an account</span>
//                                     <button ><SignUp/></button>
//                                 <h3>Modal Footer</h3>
//                               </div>
//                             </div>
//                         </div>
//                   </Modal> */}