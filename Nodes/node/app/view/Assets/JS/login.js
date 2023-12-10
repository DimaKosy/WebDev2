function GrabFormRegister(){
    username = document.getElementById('nameInput').value;
    email = document.getElementById('emailInput').value;
    pwd = document.getElementById('pwdInput').value;

    console.log("Email: " + email +"\nPwd: "+ pwd);

    $.post(`/register/${username}/${email}/${pwd}`, function(req, status){
    }).done(function() {
        $.get(`testredirect`, function(req, res) );
      });

    
}

function redirectProfile(){
    window.location.href("/profile.html")
}

function OnFailRegister(key){  
    switch(key){
        case -1:

        break;
    }
}