const submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", checkLogin);

function checkLogin(){

    const username = document.getElementById("username").value;
    const pass = document.getElementById("pass").value;
    console.log(username);

    if(username && pass){

        const user =   {
            username: username,
            password: pass
        }

        fetch("http://localhost:3000/login", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            if(response.status === 200) {

                return response.json()
              

            } else {
                throw error;
            }})
        .then(data => linkToDashboard(data, username))
        .catch(error => {
            console.log("Error loggin in", error);

            alert("Der skete en fejl");
        });
        
    }


}


function linkToDashboard(data, username){

    localStorage.setItem(username, JSON.stringify(data[0].accessToken));

    console.log(JSON.parse(localStorage.getItem(username)));

    co
    alert("Du blev logget ind");

    //window.location.replace("/dashboard");

    fetch("http://localhost:8080/dashboard", {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': "Bearer " +  data[0].accessToken
            }
    })
        /*
        
        .then(response => {
            if(response.status === 200) {
                alert("Du blev logget ind");

                return response.json()
            } else {
                throw error;
            }})
        .then(data => linkToDashboard(data))
        .catch(error => {
            console.log("Error loggin in", response.status);
            console.log(error);

            alert("Der skete en fejl");
        });
        */

        
       


}


 /*
            if(response.status === 200) {
                alert("Du blev logget ind");

                // og så redirect til anden side
                window.location.replace("/dashboard");
                
            } else {
                console.log("Error loggin in", response.status);
                alert("Der skete en fejl");
            }
            */