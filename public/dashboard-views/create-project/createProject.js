const submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", createProject());

function createProject() {
    /*
    i stedet for at gemme felterne i varibaler udenfor functionen, så sætter jeg det indeni
    FORDI hvis det står udenfor, blvier initial load langsommere - det vil vi IKKE have
    desuden skal vi kun bruge felterne én gang
    */
    const title = document.getElementById('title').value;
    const year = document.getElementById('year').value;
    const description =  document.getElementById('description').value;
    const link = document.getElementById('link').value;

    if(title && year && description && link){
        const project = {
            title: title,
            email: email,
            tlf: tlf,
            message: message
        }

        fetch("api/projects", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json; charset=UTF-8' // denne linje siger at dataen som vi sender er en string 
            },
            body: JSON.stringify(project) // men siden vi sender JSON, så er vi er nødt til at lave det til en string via stringify
        })
        .then(response => {
            if(response.status === 200) {
                //Ja, I know den er grim puhaaa
                alert("Projektet blev oprettet");

                // og så redirect til anden side
                window.location.replace("/dashboard");
                
            } else {
                console.log("Error creatinh project:", response.status);
                alert("Der skete en fejl med at oprette projektet");
            }
        })
    } else {
        alert("Du skal udfylde alle felter (bortset fra link), før du kan oprette projektet");
    }

}
