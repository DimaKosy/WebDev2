
function GrabFormRegister(){
    username = document.getElementById('nameInput').value;
    email = document.getElementById('emailInput').value;
    pwd = document.getElementById('pwdInput').value;

    console.log("Email: " + email +"\nPwd: "+ pwd);

    $.post(`/register/${username}/${email}/${pwd}`, function(req, status){
    });
}



function OnFailRegister(key){  
    switch(key){
        case -1:
            console.error("Registration failed: This email is already in use. Please use a different email.");
            // You can also update the UI to display the error message to the user.
            displayErrorMessage("This email is already in use. Please use a different email.");
            break;
            
        default:
            console.error("Registration failed: An unknown error occurred. Please try again.");
            displayErrorMessage("An unknown error occurred. Please try again.");
            break;
    }
}

function displayErrorMessage(message) {
    alert(message); // Example: Displaying the error message in an alert.
}
