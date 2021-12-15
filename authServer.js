import express from "express";

import dotenv from "dotenv";
dotenv.config();

const app = express();

// jeg fik cors-problemer fordi jeg fetcher fra login.js
// derfor: npm i cors
import cors from "cors";
app.use(cors());

app.use(express.static("public"));
app.use(express.json()); // makes express interpret incoming data as json

// supports data from forms - needed to parse form-data
app.use(express.urlencoded({extended: true})); 

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


import { connection } from "./database/connectSqlite.js";

let refreshTokens = [];


app.post("/login", async (req, res) => {
    console.log("req");
    // authenticate user
    //https://www.youtube.com/watch?v=Ud5xKCYQTjM

    const userFromBody = req.body;
    console.log(userFromBody);
  
    const adminFromDb = await connection.all("SELECT * FROM admins WHERE username=?", userFromBody.username);
    console.log("adminFromDb", adminFromDb);

    if(!adminFromDb){
        res.status(400).send('Cannot find user');
    }
    try{
        // hvis password også matcher den fundne bruger
        if(await bcrypt.compare(userFromBody.password, adminFromDb[0].password)){
             // så jwt
            //https://www.youtube.com/watch?v=mbsmsi7l3r4
            // generer accessToken med brugerinformation

            const user = {name: userFromBody.username }
            const accessToken = generateAccessToken(user);
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
          
            await connection.run("INSERT INTO refresh_tokens ('token') VALUES (?)", 
            [refreshToken]);

            //res.json({accessToken: accessToken, refreshToken: refreshToken});
            res.send([{accessToken: accessToken, refreshToken: refreshToken}]);
        }
        else{
            res.sendStatus(403);// forbidden
        }
    } catch{
        res.sendStatus(500);
    }
});

//TODO ændr denne


app.post("/token", async (req, res) => {
    const refreshToken = req.body.token;
    
    if(refreshToken == null) {
        return res.sendStatus(401);
    }

    // leder efter refreshToken'en i db
    const refreshTokensFromDb = await connection.all(
        "SELECT * FROM refresh_tokens WHERE token = ?", 
        [refreshToken]);

    // hvis den IKKE er der
    if(!refreshTokensFromDb){
        // send fejl
        return res.sendStatus(403);
    }

    // hvis den blev fundet i db - bekræft at refreshTokenet er det rigtige
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
        if(error){
            return res.sendStatus(403);
        }

        // hvis det ER rigtigt - så dan et nyt accesstoken, som returneres
        // {name: user.name} og IKKE bare user, fordi user-obj indeholder noget additional info
        const accessToken = generateAccessToken({name: user.name});
        res.json({accessToken: accessToken})
    })
});

app.delete("/logout", (req, res) => {
    connection.delete("DELETE FROM refresh_tokens WHERE token = ?", [req.body.token]);
    res.status(204);
})


function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
}









const PORT = 3000;
app.listen(PORT, (error) => {
    error ? console.log("Error starting authServer:", error) : console.log("Starting authServer on port", PORT);
});