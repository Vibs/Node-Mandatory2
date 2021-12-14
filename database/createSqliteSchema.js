import { createConnection } from "./connectSqlite.js";

(async () => {
    const connection = await createConnection();

    await connection.exec("DROP TABLE IF EXISTS projects");

    const projectsTableSchema = `
        CREATE TABLE projecst (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            year TEXT,
            description TEXT,
            link TEXT,
        )
    `;

    await connection.exec(projectsTableSchema);
})() 