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


//------------------login
import bcrypt from "bcryptjs";
/*
import bcrypt from "bcryptjs";
import { createConnection } from "./database/connectSqlite.js";

(async () => {
    const connection = await createConnection();

    const user = await connection.all("SELECT * FROM admins WHERE username = ?", process.env.ADMIN_USERNAME);

    console.log("user", user);
    // hvis der ikke allerede findes en bruger i db med brugernavet
    if(user[0] == null){
        try{
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);
    
            console.log(await bcrypt.compare(process.env.ADMIN_PASSWORD, hashedPassword));
    
            connection.run(
                "INSERT INTO admins ('username', 'password') VALUES (?, ?)", 
                [process.env.ADMIN_USERNAME, hashedPassword]); // bcrypt saves the salt inside the password
        } catch {
            console.log("ERROR in creating admin");
        }
    }
})()
*/


import jwt from "jsonwebtoken";

import { connection } from "./database/connectSqlite.js";

app.post("/login", async (req, res) => {
    // authenticate user
    //https://www.youtube.com/watch?v=Ud5xKCYQTjM

    // så jwt
    //https://www.youtube.com/watch?v=mbsmsi7l3r4
    const user = req.body;
  
    const adminFromDb = await connection.all("SELECT * FROM admins WHERE username=?", user.username);
    
    console.log(adminFromDb);
    console.log(adminFromDb[0].password);


    if(!adminFromDb){
        res.status(400).send('Cannot find user');
    }
    try{
        if(await bcrypt.compare(user.password, adminFromDb[0].password)){
            res.sendStatus(200);
        }
        res.sendStatus(403);// forbidden
    } catch{
        res.sendStatus(500);
    }


});


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
    res.send(dashBoardFrontpage)
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