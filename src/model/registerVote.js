import dbClass from "../db/dbClass.js";

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
    const dbC = new dbC();
    const db = await dbC.connectDB();

    try {
        if (!lowerCaseSL.includes(lang)) return false;
        //else
        const query = `UPDATE topLangs SET votes = votes + 1 WHERE lang = ?`;
        db.run(query, [lang], (err) => {
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
            console.error("Error closing database:", err.message);
        } else {
            console.log("Database connection closed.");
        }
    });

    return res;
}

export default registerVote;
