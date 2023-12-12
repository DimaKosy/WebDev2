
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
        console.log(data[0] == null);

        if(data[0] == null){
            document.location.replace("/SignUp_Login.html")
            return;
        }

        document.getElementById('UsernameBox').innerText = ("Hello " + data);
    });    
}


function OnFailRegister(key){  
    switch(key){
        case -1:

        break;
    }
}