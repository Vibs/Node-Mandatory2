const projectsWrapper = document.getElementById("projects-wrapper");


// få fat i alt 
fetch("/api/projects")
.then(response => response.json())
.then(result => { result.forEach(createEditForm) }); // i

function createEditForm(project){
    const projectDiv = document.createElement('div');
 
    projectDiv.innerHTML = `
    <div class="align-vert-hor">
        <a class="link-to-edit" href="dashboard/editProject/${project.id}">${escapeHTML(project.title)}</a>
    </div>
    <div id="form">
        <label for="title">Projekttitel: </label>
        <input id="title-${project.id}" type="text" value="${escapeHTML(project.title)}">

        <label for="year">År:</label>
        <input id="year-${project.id}" type="number" value="${escapeHTML(project.year)}">

        <label for="description">Beskrivelse: </label>
        <textarea id="description-${project.id}"
        rows="20"
        cols="40">${escapeHTML(project.description)}</textarea>

        <label for="link">Link til repo:</label>
        <input id="link-${project.id}" type="text" value="${escapeHTML(project.link)}">

        <br>
    </div>`;

    //<button id="submit-button" type="submit">Opdater</button>

    const submitButton = document.createElement('button');
    submitButton.id = `submit-button${project.id}`;
    submitButton.classList.add("submit-button");
    submitButton.type = "submit";
    submitButton.innerText = "Opdater";

    const deleteButton = document.createElement('button');
    deleteButton.id = `delete-button${project.id}`;
    deleteButton.classList.add("delete-button");
    deleteButton.innerText = "Slet projekt";
   
    projectDiv.appendChild(submitButton);
    projectDiv.appendChild(deleteButton);
    projectDiv.innerHTML = projectDiv.innerHTML + "<hr>";
    // tilføj til DOM
    projectsWrapper.appendChild(projectDiv);


    const addedSubmitButton = document.getElementById(`submit-button${project.id}`);
    addedSubmitButton.addEventListener("click", () => {
        console.log("Vi er i eventlistener");

        updateProject(project);
    });

    const addedDeleteButton = document.getElementById(`delete-button${project.id}`);
    addedDeleteButton.addEventListener("click", () => {
        console.log("Vi er i eventlistener");
        deleteProject(project);
    });


}


function updateProject(project){

    const projectFromForm = {
        title: document.getElementById(`title-${project.id}`).value,
        year: document.getElementById(`year-${project.id}`).value,
        description: document.getElementById(`description-${project.id}`).value,
        link: document.getElementById(`link-${project.id}`).value
    };

    console.log(projectFromForm);

    fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({projectFromForm})  
    }).then(response => {
        if (response.status === 200) {
            console.log("Everything went well");
            // redirect after showing a notification
            alert(`${project.title} blev opdateret`);
            window.location.replace("/dashboard/");
        } else {
            alert(`Der skete en fejl. ${project.title} blev IKKE opdateret`);
            console.log("Error updating the project", response.status);
        }
    });
}

function deleteProject(project){
    fetch(`/api/projects/${project.id}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" },
    }).then(response => {
        if (response.status === 200) {
            console.log("Everything went well");
            // redirect after showing a notification
            alert(`${project.title} blev slettet`);
            window.location.replace("/dashboard/");
        } else {
            alert(`Der skete en fejl. ${project.title} blev IKKE slettet`);
            console.log("Error updating the project", response.status);
        }
    });
}



/**
 Projekt-obj opbygning:

 project = {
    id: 1,
    name: "Nodefolio",
    year: 2021,
    description: "Dette er en mandatory, hvor vi skal arbejde med express, nodemailer osv.",
    link: "https://github.com/Vibs/Node-Mandatory2"
 }
 */



/*
function createProject(project) {
    const projectDiv = document.createElement('div');
 
    //  id="link${project.id}" 
 
    projectDiv.innerHTML = `
    <div class="align-vert-hor">
        <a class="link-to-edit" href="dashboard/editProject/${project.id}">${escapeHTML(project.title)}</a>
    </div>
 
    ${escapeHTML(project.year)
        ? `<p class="year"> ${escapeHTML(project.year)}</p>`
        : ""
    }
 
    ${ escapeHTML(project.description)
        ? `<p class="description"> ${escapeHTML(project.description)}</p>`
        : ""
    }
 
    ${escapeHTML(project.link) 
        ?  `<p> Find projektet på: 
                <a src="${escapeHTML(project.link)}">${escapeHTML(project.link)}</a>
            <p>`
        : ""}`;
 
     // tilføj til DOM
     projectsWrapper.appendChild(projectDiv);
 }
*/
 

