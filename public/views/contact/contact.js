const submitButton = document.getElementsById('submit-button');




submitButton.addEventListener('click', sendContactMessage);



function sendContactMessage() {
    /*
    i stedet for at gemme felterne i varibaler udenfor functionen, så sætter jeg det indeni
    FORDI hvis det står her, blvier initial load langsommere - det vil vi IKKE have
    desuden skal vi kun bruge felterne én gang

    const nameInput = document.getElementsById('name');
    const emailInput = document.getElementsById('email');
    const messageInput = document.getElementsById('message');
    const tlfInput = document.getElementsById('tlf');
    */

    const messageDetails = {
        name: document.getElementsById('name').value,
        email: document.getElementsById('email').value,
        tlf: document.getElementsById('tlf').value,
        message: document.getElementsById('message').value
    }

    /*
    fetch er pr. 
    */

    fetch("/contact/sendMessage", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8' // denne linje siger at dataen som vi sender er en string 
        },
        body: JSON.stringify(messageDetails) // men siden vi sender JSON, så er vi er nødt til at lave det til en string via stringify
    })
    .then(response => {
        if(response.status === 200) {
            // TODO vis en 'det gik godt' til brugeren
            // lav en TimeOut
            // notifikationer

            console.log("Everything went well");

            // og så redirect til anden side

            
        } else {
            console.log("Error sending the contact message:", response.status);
        }
    })

}


/*
fetch("/api/projects")
.then(response => response.json())
.then(result => {
    //todo group the projects by category
    // fx metoden reduce()
    console.log(result);

    const doc = document.getElementById("projects-wrapper");

    // hvis hvert projekt kronologisk (efter index) på siden
    //! siger .projects fordi result = objektet med en key som hedder projects
    result.projects.forEach(createProject, doc);

});

*/
