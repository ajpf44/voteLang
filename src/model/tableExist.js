const tableExist = (db, tableName)=>{
    db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`, [tableName], (err, row) => {
        if (err) {
            console.log(err);
            return err;
        } else {
            return row != null;
        }
    });
}

export default tableExist