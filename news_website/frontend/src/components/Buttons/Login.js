import {Component, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';


const [open, setOpen] = useState(false);

const handleOpen = () => {
    setOpen(true);
};
const handleClose = () => {
    setOpen(false);
};

class Login extends Component{
    constructor(props){
        super(props);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFields((error, values) =>{
            if(!error){
                this.props.onAuth(values.userName, values.password);
                this.props.history.push('/');
            }
        });
    }
    render(){
        return(
              <div>
                  <button onClick={handleOpen}> Login </button>
                  <Modal 
                    open ={open}
                    onClose={handleClose}
                  >
                    <FormControl>
                        <div className = 'modal' id='myModal'>
                            <div className='modal-content'>
                              <div className='modal-header'>
                                <span onClick={handleClose} className='close'>&times;</span>
                                <h2>Login</h2>
                              </div>
                              <div className='modal-body'>
                                <p>Some text in the Modal Body</p>

                                <p>Some other text...</p>
                              </div>
                              <div className='modal-footer'>
                                <h3>Modal Footer</h3>
                              </div>s
                            </div>
                        </div>
                    </FormControl>
                  </Modal>
              </div>
        )
    }
}

// const WrapLogin= FormControl.create()(Login);

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);