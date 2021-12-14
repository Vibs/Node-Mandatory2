import express from "express";
const router = express.Router();

import { connection } from "../database/connectSqlite.js";


const hardProjects = [
    {
        id: "1",
        title: "Nodefolio",
        year: "2021",
        description: "Dette er en mandatory, hvor vi skal arbejde med express, nodemailer osv.",
        link: "https://github.com/Vibs/Node-Mandatory2"
    },
    {
        id: "1",
        title: "Noget andet",
        year: "2022",
        description: "Dette er en vildt godt beskrivelse.",
        link: "andetLink"
    }
];

// GET alle
router.get("/api/projects", async (req, res) => {
    console.log("Hej fra api/projects");

    // TODO hent fra db
    const projects = await connection.all("SELECT * from projects")

    // midlertidig
    res.send({projects: projects});
});


// POST
router.post("/api/projects", async (req, res) => {

    const projectToCreate = req.body;
    connection.run(
        "INSERT INTO projects ('title', 'year', 'description', 'link') VALUES (?, ?, ?, ?)", 
        projectToCreate.title, projectToCreate.year, projectToCreate.description, projectToCreate.link)

    // send den der er blevet sat ind tilbage
    res.send(projectToCreate);
});












// CRUD = POST, GET, Update, Delete

//GET én fra id
router.get("/api/projects/:id", (req, res) => {

    // hent op fra db TODO

    
    // hvis fundet, send tilbage, ellers 404
    foundProject ? res.send(foundProject) : res.sendStatus(404);

    // midlertidig
    res.status().send({message: "OK"});
});



// UPDATE TODO eller patch??
router.patch("/api/projects/:id", (req, res) => {

    /*
    let memeToUpdate;
    dankMemes = dankMemes.map(dankMeme => {
        if (dankMeme.id === Number(req.params.id)) {
            memeToUpdate = { ...dankMeme, ...req.body, id: dankMeme.id };
            return memeToUpdate;
        }
        return dankMeme;
    });
    memeToUpdate ? res.send(memeToUpdate): res.sendStatus(404);
    */
});

// DELETE
router.delete("api/projects/:id", (req, res) => {
    /*
    let foundMemeToDelete = false;
    dankMemes = dankMemes.filter(dankMeme => {
        const notToDelete = dankMeme.id !== Number(req.params.id);
        if (!notToDelete) foundMemeToDelete = true;
        return notToDelete;
    });
    foundMemeToDelete ? res.sendStatus(200) : res.sendStatus(404);
    */
});


export default {
    router
};



/**
 * app.get("/dankmemes/:id", (req, res) => {
    const foundMeme = dankMemes.find(dankMeme => dankMeme.id === Number(req.params.id));
    foundMeme ? res.send(foundMeme) : res.sendStatus(404);
});
 * 
 * 
 */


//GET alle
