

document.getElementById("login").addEventListener("click", ()=>{
    let userName = document.getElementById("userName");
    let userPassword = document.getElementById("userPassword")
    
    let user = userName.value;
    let password = userPassword.value;

    if (user == 'admin' && password == 'admin123') {
        window.location.assign("./home.html")
    }else{
        alert("Invaild information")
    }
})








