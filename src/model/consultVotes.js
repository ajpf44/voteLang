import dbClass from "../db/dbClass.js";

const consult = async () => {
    const dbC = new dbClass();
    const db = await dbC.connectDB();

    const resObj = await dbC.readTable(db);

    db.close((err) => {
        if (err) {
            console.error("Error closing database:", err.message);
        } else {
            console.log("Database connection closed.");
        }
    });
    
    return resObj;
};

export default consult;
