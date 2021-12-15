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

const loginPage = createPage("login/login.html", { 
    title: "Log ind", 
    activeNavLink: "/login", 
    script: "main-views/login/login.js"
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

app.get("/login", (req, res) => {
    res.send(loginPage);
});

/*-------------------------------------------------------------------------------DASHBOARD*/ 


//------------------login

import jwt from "jsonwebtoken";

/* HER
app.get("/posts", authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name));
});
*/


function authenticateToken(req, res, next){

    const authHeader = req.headers['authorization']; // headeren har formattet: Bearer TOKEN

    console.log(req.headers);
    const token = authHeader && authHeader.split(' ')[1]; // derfor splitter vi ved mellemrum

    if(token == null){
        // vi ved nu at de ikke har sendt en token - derfor ingen access
        return res.sendStatus(401);
    }

    // user == det objekt som vi i get(/login) seriliserede i jwt.sign()
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if(error){
            // der VAR en token, men den var ikke valid
            return res.sendStatus(403);
        }
        // sætter user på req
        req.user = user; // denne bruger vi så til at sortere hvilken data de får lov til at se i app.get("/posts", authenticateToken, (req, res) => {
        next(); // kalder den callback som bliver givet med når vi kalder authenticateToken()-func
    })
}


//------------------resten



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

//--------SERVE PAGES
app.get("/dashboard", (req, res) => {

    //const refresh_tokens = await connection.all("SELECT * FROM refresh_tokens")


    res.send(dashBoardFrontpage)
    
    
    //console.log(await connection.all("SELECT * FROM refresh_tokens"));
    //res.sendStatus(403)
});
app.get("/dashboard/createProject", (req, res) => {
    res.send(createProjectPage)
});

import fetch from "node-fetch";




/*---------------------------------------------------------------------------------------------------*/


const PORT = 8080;
app.listen(PORT, (error) => {
    error ? console.log("Error starting server:", error) : console.log("Starting server on port", PORT);
});