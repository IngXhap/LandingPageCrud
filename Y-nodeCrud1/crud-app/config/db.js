var mysql = require('mysql')
var connection = ({
    host: 'escuela.cpc8ii0w6226.us-east-1.rds.amazonaws.com',
    user: 'roberto',
    password: 'roberto123456789',
    database: 'node_js_crud'

});
var db;
function connectDb(){
    if(!db){
        db = mysql.createConnection(connection);
        db.connect(function(err){
            if (!err) {
                console.log("database connected success!!");
                console.log(connection);
            }else{
                console.log("Error database conncet!!");
            }
        });
    }
    return db;
}

module.exports = connectDb();