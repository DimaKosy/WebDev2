
// function GrabFormRegister(){
//     username = document.getElementById('nameInput').value;
//     email = document.getElementById('emailInput').value;
//     pwd = document.getElementById('pwdInput').value;

//     console.log("Email: " + email +"\nPwd: "+ pwd);

//     $.post(`/register/${username}/${email}/${pwd}`, function(req, status){
//     });
// }

function LoadUser(){
    $.get(`/profile`, function (data, status) {
        console.log(data);
    });
}



function OnFailRegister(key){  
    switch(key){
        case -1:

        break;
    }
}