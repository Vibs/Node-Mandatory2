import express from "express";

const router = express.Router();

//------- CREATE PAGE ELEMENTS TO BE SERVED
import { createDashboardPage} from "../render.js";

// til dashboard-sider bruger jeg createDashboardPage-func i stedet for createPage, 
// fordi den tager en anden nav-bar og ingen footer
const frontpage = createDashboardPage("frontpage/frontpage.html", { 
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
router.get("/dashboard", (req, res) => {
    res.send(frontpage)
})
router.get("/dashboard/createProject", (req, res) => {
    res.send(createProjectPage)
})

import fetch from "node-fetch";
import projectsRouter from "./projects.js";
router.use(projectsRouter.router);

router.get("/dashboard/editProject/:id", (req, res) => {

    // få fat i alt 
    fetch(`/api/projects/${req.params.id}`)
    .then(response => response.json())
    .then(project => { 
        res.render(editProjectsPage, { project: project });
    })
    .catch(error => {
        console.log("Error getting project from id:", error);
    });

    //res.send(editProjectsPage)
})






export default {
    router
};