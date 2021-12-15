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

    console.log("Hej fra api/projects");
    const projectToCreate = req.body;

    connection.run(
        "INSERT INTO projects ('title', 'year', 'description', 'link') VALUES (?, ?, ?, ?)", 
        [projectToCreate.title, projectToCreate.year, projectToCreate.description, projectToCreate.link])
    
    res.send(projectToCreate);
});

//GET én fra id
router.get("/api/projects/:id", async (req, res) => {
    console.log("HEEEEEEEJ fra router");
    // henter op fra db ud fra id
    const foundProject = await connection.all("SELECT * from projects WHERE id = ?", [req.params.id]);
    
    // hvis fundet, send tilbage, ellers 404
    foundProject ? res.send(foundProject) : res.sendStatus(404);
});

//------------------

// UPDATE
router.put("/api/projects/:id",  (req, res) => {

    const projectToUpdate = req.body.projectFromForm;

    console.log("projectToUpdate", projectToUpdate);

    connection.run("UPDATE projects SET title = ?, year = ?, description = ?, link = ? WHERE id = ?", 
    [projectToUpdate.title, projectToUpdate.year, projectToUpdate.description,projectToUpdate.link, req.params.id]);

    res.send(projectToUpdate);
});

// DELETE
router.delete("/api/projects/:id", async (req, res) => {

    await connection.run("DELETE FROM projects WHERE id = ?", [req.params.id], function(err) {
        if (err) {
          res.sendStatus(500);
        }
      });
    res.sendStatus(200);
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
