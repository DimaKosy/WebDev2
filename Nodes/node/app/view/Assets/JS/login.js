function signOut(){
    $.post(`/logout`, function(status){
        console.log("LOGGING OUT");
    });

    //change page
    document.location.replace("/SignUp_Login.html")
}


function LoadUser(){
    $.get(`/profile`, function (data, status) {
        console.log(data[0] == null);

        if(data[0] == null){
            //change page
            document.location.replace("/SignUp_Login.html")
            return;
        }
        console.log(data)

        //setting of name on profile page
        document.getElementById('UsernameBox').innerText = ("Hello " + data[0]);
    });    
}