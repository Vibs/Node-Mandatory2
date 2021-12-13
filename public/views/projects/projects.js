
// få fat i alt 

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

//! alternativt så man ikke behøver sige .projects: - via destructuring
//! desctructuring: at finde en værdi til en key for et objekt 
//! desctructuring == at man bryder objektet op og man vælger en af værdierne ud fra key'en
const paraquet = { featherColours: ["red", "green", "yellow"]};

function desctructureParaquet( {featherColours} ) {
    console.log(featherColours);
}

/* kan descrtuctore 2 steder:
    - som param
    - som assignemnt
*/

const noget = { niceThing };

console.log(noget);

console.log({ niceThing });


//! descruture assignment
const { niceThing2 } = { niceThing2: true };

function andersCreateProject(project, doc) {
    const projectDiv = document.createElement('div');
    projectDiv.innerHTML = `
    <h2>${escapeHTML(project.name)}</h2>
    <p>Category: ${escapeHTML(project.category)}</p>
    <p>Technologies: ${escapeHTML(project.technologies.join(", "))}</p>`;

    doc.appendChild(projectDiv);
}

function createProject(project, doc) {
    const divWrapper = document.createElement('div');

    const name = document.createElement('h2');
    name.innerText = project.name;
 
    const category = document.createElement('p');
    category.innerText = 'Category: ' + project.category;

    const technologies = document.createElement('p');
    technologies.innerText = 'Technologies: ' + project.technologies;

    divWrapper.appendChild(name);
    divWrapper.appendChild(category);
    divWrapper.appendChild(technologies);

    doc.appendChild(divWrapper);

}
/*
fetch("/api/projects")
.then(response => response.json())
.then(({ result }) => {

    result.projects.forEach(createProject);

});
/*


*/ 


/*
innerText vs innerHTML
    - innerText
        - fortolker den som text
    - innerHTML
        - fortolker den som html
        - derfor skal man IKKE bruge innerHTML, fordi så kan folk indsætte deres egen kode
            - fx kan man indsætte et scripttag og så hente data og sende til sig selv
        - men det er mest farligt, når man henter data et sted fra
        - man kan escape for krokodilletegn fx som jo bruges til at lave tags


*/







