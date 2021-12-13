const projectsWrapper = document.getElementById("projects-wrapper");


// få fat i alt 
fetch("/api/projects")
.then(response => response.json())
.then(result => {
    console.log(result);

    //! siger .projects fordi result = objektet med en key som hedder projects
    result.projects.forEach(createProject);
});

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


function createProject(project) {
    const projectDiv = document.createElement('div');
    projectDiv.innerHTML = `
    <div>
        <h2>${escapeHTML(project.name)}</h2>
        <a class="edit-button" href="projects/${project.id}">Rediger</a>
    </div>
    <p class="year"> ${escapeHTML(project.year)}</p>
    <p> ${escapeHTML(project.description)}</p>
    <p>Find projektet på: 
        <a src="${escapeHTML(project.link)}">${escapeHTML(project.link)}</a>
    <p> <hr>`;

    projectsWrapper.appendChild(projectDiv);
}