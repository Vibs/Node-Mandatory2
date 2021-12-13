const router = require("express").Router();

/**
 * app.get("/dankmemes/:id", (req, res) => {
    const foundMeme = dankMemes.find(dankMeme => dankMeme.id === Number(req.params.id));
    foundMeme ? res.send(foundMeme) : res.sendStatus(404);
});
 * 
 * 
 */

// CRUD = POST, GET, Update, Delete

//GET én fra id
router.get("/api/projects/:id", (req, res) => {

    // hent op fra db TODO

    
    // hvis fundet, send tilbage, ellers 404
    foundProject ? res.send(foundProject) : res.sendStatus(404);

    // midlertidig
    res.status().send({message: "OK"});
});

// POST
router.post("/api/projects", (req, res) => {

    
    console.log(req.body);

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


module.exports = {
    router
};