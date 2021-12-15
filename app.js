/* TODO
- opdater .env_sample-filen så den indeholder alle de rigtige
- slet dashboard-menupunkt i alm. navbar

*/

import express from "express";
const app = express();

// defines that express finds static files in the public-folder

//app.use(express.static(__dirname + '/public'));
app.use(express.static("public"));

// makes express interpret incoming data as json
app.use(express.json());
// supports data from forms - needed to parse form-data
app.use(express.urlencoded({extended: true})); 


//------- ROUTES

import contactRouter from "./routers/contact.js";
app.use(contactRouter.router);

import projectsRouter from "./routers/projects.js";
app.use(projectsRouter.router);

/*
import dashboardRouter from "./routers/dashboard.js";
app.use(dashboardRouter.router);
*/


//------- CREATE PAGE ELEMENTS TO BE SERVED
import { createPage, createDashboardPage} from "./render.js";

const frontpagePage = createPage("frontpage/frontpage.html", { 
    title: "Nodefolio | Welcome",
});
const CVPage = createPage("CV/CV.html", { 
    title: "CV",
    activeNavLink: "/CV", 
});
const projectsPage = createPage("projects/projects.html", { 
    title: "Projekter",  
    activeNavLink: "/projects", 
    script: "main-views/projects/projects.js"
});
const contactPage = createPage("contact/contact.html", { 
    title: "Kontakt", 
    activeNavLink: "/contact", 
    script: "main-views/contact/contact.js"
});

//------ SERVE PAGES

app.get("/", (req, res) => {
    res.send(frontpagePage);
});
app.get("/cv", (req, res) => {
    res.send(CVPage);
});
app.get("/projects", (req, res) => {
    res.send(projectsPage);
});
app.get("/contact", (req, res) => {
    res.send(contactPage);
});

/*-------------------------------------------------------------------------------DASHBOARD*/ 


const dashBoardFrontpage = createDashboardPage("frontpage/frontpage.html", { 
    title: "Dashboard", 
    activeNavLink: "/dashboard",
    script: "/dashboard-views/frontpage/frontpage.js",
    css: "/dashboard-views/frontpage/frontpage.css"
});

const createProjectPage = createDashboardPage("create-project/createProject.html", { 
    title: "Opret projekt", 
    activeNavLink: "/dashboard/createProject", 
    script: "/dashboard-views/create-project/createProject.js"
});

const editProjectsPage = createDashboardPage("edit-project/editProject.html", { 
    title: "Rediger projekt", 
    activeNavLink: "/dashboard/createProject", 
    script: "/dashboard-views/edit-project/editProject.js"
});

//--------SERVE PAGES
app.get("/dashboard", (req, res) => {
    res.send(dashBoardFrontpage)
});
app.get("/dashboard/createProject", (req, res) => {
    res.send(createProjectPage)
});

import fetch from "node-fetch";

app.get("/dashboard/editProject/:id", (req, res) => {

    console.log(req.params.id);
    // få fat i alt 
    fetch(`http://localhost:8080/api/projects/${req.params.id}`)
    .then(response => response.json())
    .then(project => { 
        //TODO find en måde at returnere project til html/js
        //localStorage.setItem('currentProject', JSON.stringify(project));
        //editProjectsPage = editProjectsPage.replace("%%PROJECT%%", {"hej": project[0]});
        console.log(project[0]);
        //res.render(editProjectsPage, { project: project });
        res.send(editProjectsPage);
    
    })
    .catch(error => {
        console.log("Error getting project from id:", error);
    });

    //res.send(editProjectsPage)
});




/*---------------------------------------------------------------------------------------------------*/


const PORT = 8080;
app.listen(PORT, (error) => {
    error ? console.log("Error starting server:", error) : console.log("Starting server on port", PORT);
});