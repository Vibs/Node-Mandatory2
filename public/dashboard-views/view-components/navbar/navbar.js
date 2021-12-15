const logOutLink = document.getElementById("login-logout");

logOutLink.addEventListener("click", logOut)


function logOut(){

    localStorage.removeItem('vibe');

    fetch("http://localhost:3000/logout", {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        if(response.status === 200) {
            //Ja, I know den er grim puhaaa
            alert("Du blev logget ind");

            // og så redirect til anden side
            window.location.replace("/dashboard");
            
        } else {
            console.log("Error loggin in", response.status);
            alert("Der skete en fejl");
        }
    });

}