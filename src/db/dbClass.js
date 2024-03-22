import sqlite3 from "sqlite3";


class Database {
    dbName = "voteLangDb";
    tableName = "topLangs";
    createDB = async () => {
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

    connectDB = async ()=> {
        return new sqlite3.Database(
            "voteLangDb.db",
            (err) => {
                if (err) {
                    console.error("Error opening database: ", err.message);
                } else {
                    console.log("Connected to the database.");
                }
            }
        );
    };

    createTable = async (db) => {
        try {
            // Create table if it doesn't exist
            await db.run(`CREATE TABLE IF NOT EXISTS topLangs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                lang TEXT,
                votes INTEGER NOT NULL DEFAULT 0
            )`);
            console.log("Table created");
        } catch (error) {
            console.log(error);
        }
    };

    readTable = function(db) {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM topLangs", (err, rows) => {
                if (err) {
                    console.log("Error: " + err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    };
}

export default Database;
