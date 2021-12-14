import express from "express";
const router = express.Router();

import { connection } from "../database/connectSqlite.js";

// GET all
router.get("/api/projects", async (req, res) => {
    const projects = await connection.all("SELECT * from projects");

    res.send(projects);
});


// POST
router.post("/api/projects", async (req, res) => {
    const projectToCreate = req.body;

    connection.run(
        "INSERT INTO projects ('title', 'year', 'description', 'link') VALUES (?, ?, ?, ?)", 
        [projectToCreate.title, projectToCreate.year, projectToCreate.description, projectToCreate.link])
    
    res.send(projectToCreate);
});

//GET én fra id
router.get("/api/projects/:id", async (req, res) => {
    // henter op fra db ud fra id
    const foundProject = await connection.all("SELECT * from projects where id = ?", [req.params.id]);
    
    // hvis fundet, send tilbage, ellers 404
    foundProject ? res.send(foundProject) : res.sendStatus(404);
});










// CRUD = POST, GET, Update, Delete





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
