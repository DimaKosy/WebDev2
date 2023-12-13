
// function GrabFormRegister(){
//     username = document.getElementById('nameInput').value;
//     email = document.getElementById('emailInput').value;
//     pwd = document.getElementById('pwdInput').value;

//     console.log("Email: " + email +"\nPwd: "+ pwd);

//     $.post(`/register/${username}/${email}/${pwd}`, function(req, status){
//     });
// }

function signOut(){
    $.post(`/logout`, function(status){
        console.log("LOGGING OUT");
    });

    document.location.href='SignUp_Login.html';
}


function LoadUser(){
    $.get(`/profile`, function (data, status) {
        console.log(data[0] == null);

        if(data[0] == null){
            document.location.replace("/SignUp_Login.html")
            return;
        }
        console.log(data)

        document.getElementById('UsernameBox').innerText = ("Hello " + data[0]);
    });    
}


function OnFailRegister(key){  
    switch(key){
        case -1:

        break;
    }
}