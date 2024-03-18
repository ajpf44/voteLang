import Database from "../model/db.js";

const db = new Database();
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

const lowerCaseSL = supportedLanguages.toLowerCase();
function registerVote(lang, votes) {
    try {
        if (lowerCaseSL.includes(lang)) {
            const query = `INSERT INTO ${db.tableName} (lang, votes) VALUES (?, ?)`;
            db.run(query, [lang, votes], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                }
            });
        } else return false;
    } catch (error) {}
}
