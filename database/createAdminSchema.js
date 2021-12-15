import { createConnection } from "./connectSqlite.js";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

(async () => {
    const connection = await createConnection();

    await connection.exec("DROP TABLE IF EXISTS admins");

    const adminTableSchema = 
    `CREATE TABLE admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL)`;

    await connection.exec(adminTableSchema);

    try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);

        connection.run(
            "INSERT INTO admins ('username', 'password') VALUES (?, ?)", 
            [process.env.ADMIN_USERNAME, hashedPassword]); // bcrypt saves the salt inside the password
    } catch {
        console.log("ERROR creating admin");
    }
})()