import express from "express";

const router = express.Router();

//------- CREATE PAGE ELEMENTS TO BE SERVED
import { createDashboardPage} from "../render.js";

// til dashboard-sider bruger jeg createDashboardPage-func i stedet for createPage, 
// fordi den tager en anden nav-bar og ingen footer
const dashboardPage = createDashboardPage("frontpage/frontpage.html", { 
    title: "Dashboard", 
    activeNavLink: "/dashboard",
    script: "dashboard-views/frontpage/frontpage.js"
});

const createProjectPage = createDashboardPage("create-project/createProject.html", { 
    title: "Opret projekt", 
    activeNavLink: "/dashboard/createProject", 
    script: "dashboard-views/create-project/createProject.js"
});

//--------SERVE PAGES
router.get("/dashboard", (req, res) => {
    res.send(dashboardPage)
})
router.get("/dashboard/createProject", (req, res) => {
    res.send(createProjectPage)
})



router.get("/dashboard/editProject/:id", (req, res) => {
    res.send(editProjectsPage)
})






export default {
    router
};