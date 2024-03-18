import sqlite3 from "sqlite3";
import tableExist from "./tableExist.js";

class Database {
    dbName = "voteLangDb";
    tableName = "topLangs";
    createDB = async function () {
        const db = new sqlite3.Database(this.dbName + ".db", (err) => {
            if (err) {
                console.log("Error 1: " + err);
                return;
            } else {
                console.log("connected with the database");
            }
        });
        return db;
    };

    createTable = async function (db) {
        try {
            // Create table if it doesn't exist
            await db.run(`CREATE TABLE IF NOT EXISTS topLangs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                lang TEXT,
                votes INTEGER
            )`);
            console.log("Table created");
        } catch (error) {
            // Check if the error is due to the table already existing
            if (error.message.includes("table topLangs already exists")) {
                console.log("Table already exists");
            } else {
                console.log("Error: " + error);
            }
        }
    };
}

export default Database;
