const dotenv = require('dotenv');
dotenv.config();

const express = require("express");
const app = express();

// defines that express finds static files in the public-folder

app.use(express.static(__dirname + '/public'));
//app.use(express.static("public"));

// makes express interpret incoming data as json
app.use(express.json());
// supports data from forms - needed to parse form-data
app.use(express.urlencoded({extended: true})); 


//------- ROUTES

const contactRouter = require("./routers/contact.js");
app.use(contactRouter.router);


//------- Create page-elements to send
const { createPage } = require("./render.js");

const frontpagePage = createPage("frontpage/frontpage.html", { 
    title: "Nodefolio | Welcome"
});

const CVPage = createPage("CV/CV.html", { 
    title: "CV"
});
const projectsPage = createPage("projects/projects.html", { 
    title: "Projekter"
});
const contactPage = createPage("contact/contact.html", { 
    title: "Kontakt"
});




//------ Serve pages

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




const PORT = 8080;
app.listen(PORT, (error) => {
    error ? console.log("Error starting server:", error) : console.log("Starting server on port", PORT);
});