import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SignUp(){
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // var modal = document.getElementById("myModal");
    // var btn = document.getElementById("myBtn");
    // var span = document.getElementById("close")[0];
  
    // btn.onclick = function(){
      
    // }
    return(
          <div>
              <button onClick={handleOpen}> Sign Up </button>
              <Modal 
                open ={open}
                onClose={handleClose}
              >
                  <div className = 'modal' id='myModal'>
                    <div className='modal-content'>
                      <div className='modal-header'>
                        <span onClick={handleClose} className='close'>&times;</span>
                        <h2>Sign Up</h2>
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
              </Modal>
          </div>
      )
    

}
{/* <div class = "modal" id="myModal">
                <div class="modal-content">
                    <div class="modal-header">
                      <span class="close">&times;</span>
                      <h2>Sign Up</h2>
                    </div>
                    <div class="modal-body">
                      <p>Some text in the Modal Body</p>
                    
                      <p>Some other text...</p>
                    </div>
                    <div class="modal-footer">
                      <h3>Modal Footer</h3>
                    </div>
                </div>
            </div>  */}

          //   function Sign(){
          //     var modal = document.getElementById("myModal");
      
          //     // Get the button that opens the modal
          //     var btn = document.getElementById("myBtn");
              
          //     // Get the <span> element that closes the modal
          //     var span = document.getElementsByClassName("close")[0];
              
          //     // When the user clicks the button, open the modal 
          //     btn.onclick = function() {
          //       modal.style.display = "block";
          //     }
              
          //     // When the user clicks on <span> (x), close the modal
          //     span.onclick = function() {
          //       modal.style.display = "none";
          //     }
              
          //     // When the user clicks anywhere outside of the modal, close it
          //     window.onclick = function(event) {
          //       if (event.target == modal) {
          //         modal.style.display = "none";
          //       }
          //     }
          // };