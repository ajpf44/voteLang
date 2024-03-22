import myDB from "./db/db.js";

const resetTable = async () =>{
    const mDB = new myDB();
    const db =  await mDB.connectDB();
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
    
    supportedLanguages.forEach(async (lang) => {
        db.run(`DELETE FROM topLangs`);
        const query = `INSERT INTO topLangs (lang, votes) VALUES (?, ?)`;
        db.run(query, [lang.toLowerCase(), 0], (err) => {
            if (err) {
                console.log("Error 3: " + err);
                res = false;
            } else {
                console.log("registered votes: ");
            }
        });
    });
    
    db.close();
}

register();