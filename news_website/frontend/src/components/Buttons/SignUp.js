import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export default function SignUp() {
    // var modal = document.getElementById("myModal");
    // var btn = document.getElementById("myBtn");
    // var span = document.getElementById("close")[0];
  
    // btn.onclick = function(){
      
    // }
    function Sign(){
        var modal = document.getElementById("myModal");

        // Get the button that opens the modal
        var btn = document.getElementById("myBtn");
        
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        
        // When the user clicks the button, open the modal 
        btn.onclick = function() {
          modal.style.display = "block";
        }
        
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
          modal.style.display = "none";
        }
        
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        }
    }
    
    return(
        <div>
            <button id = "myBtn" onclick={Sign}> Sign Up </button>
            <div class = "modal" id="myModal">
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
            </div>
        </div>
    );
}