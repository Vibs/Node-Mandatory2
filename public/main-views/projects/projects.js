
const projectsWrapper = document.getElementById("projects-wrapper");


// få fat i alt 
fetch("/api/projects")
.then(response => response.json())
.then(result => { result.forEach(createProject) });

/**
 Projekt-obj opbygning:

 project = {
    name: "Nodefolio",
    year: 2021,
    description: "Dette er en mandatory, hvor vi skal arbejde med express, nodemailer osv.",
    link: "https://github.com/Vibs/Node-Mandatory2"
 }
 */


function createProject(project) {
    const projectDiv = document.createElement('div');
    projectDiv.innerHTML = `
    <h2>${escapeHTML(project.title)}</h2>
    <p class="year"> ${escapeHTML(project.year)}</p>
    <p> ${escapeHTML(project.description)}</p>
    <p>Find projektet på: 
        <a src="${escapeHTML(project.link)}">${escapeHTML(project.link)}</a>
    <p><hr>`;

    projectsWrapper.appendChild(projectDiv);
}






