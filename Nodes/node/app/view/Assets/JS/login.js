function GrabFormRegister(){
    username = document.getElementById('nameInput').value;
    email = document.getElementById('emailInput').value;
    pwd = document.getElementById('pwdInput').value;

    console.log("Email: " + email +"\nPwd: "+ pwd);

    $.get(`/register/${username}/${email}/${pwd}`, function(req, status){
    });
}

function OnFailRegLog(key){  
    switch(key){
        case -1:

        break;
    }
}