import Database from "../model/db.js";

const supportedLanguages = [
    "PHP",
    "JavaScript",
    "C++",
    "C",
    "Java",
    "Dart",
    "Python",
    "Ruby",
    "TypeScript",
];

const lowerCaseSL = supportedLanguages.map((lang) => lang.toLowerCase());
async function registerVote(lang, votes) {
    let res = null;
    const myDB = new Database();
    const db = await myDB.createDB();
    await myDB.createTable(db);

    try {
        if (!lowerCaseSL.includes(lang)) return false;
        //else
        const query = `INSERT INTO topLangs (lang, votes) VALUES (?, ?)`;
        db.run(query, [lang, votes], (err) => {
            if (err) {
                console.log("Error 3: " + err);
                res = false;
            } else {
                console.log("registered votes: ");
            }
        });

        res = true;
    } catch (error) {
        console.log("Error 4: " + error);
        res = false;
    }

    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('Database connection closed.');
        }
    });

    return await res;

    
}

export default registerVote;
