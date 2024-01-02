var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database:"konjugo"
});

con.connect((err)=>{
  if(!err) console.log("connected");
});

module.exports = {
    async get(query, payload) {
        let promise = await new Promise((resolve, reject) => {
            con.query(query,payload,(err,results)=>{
                resolve(results);
            });
        })
        .catch(err => {throw err});
    
        return promise
    }
};