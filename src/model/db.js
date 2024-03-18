import sqlite3 from "sqlite3";
import tableExist from "./tableExist.js";

class Database {
    dbName = "voteLangDb";
    tableName = "topLangs";
    createDB = function () {
        const db = new sqlite3.Database(dbName + ".db", (err) => {
            if (err) {
                console.log("Error: " + err);
            } else {
                console.log("connected with the database");

                if (tableExist(db, tableName)) {
                    console.log("table already exist");
                } else {
                    db.run(`CREATE TABLE topLangs (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        lang TEXT,
                        votes INTEGER,
                    )`);
                    console.log("table created");
                }
            }
        });
    };
}

export default db;
