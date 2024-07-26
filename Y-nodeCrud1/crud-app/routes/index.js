var express = require('express');
var router = express.Router();
var connection = require('../config/db');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'node js express crud app' });
});

// /getUsersData
router.get('/getUsersData', function (req, res, next) {
  connection.query('SELECT * FROM tbl_node_crud ORDER BY user_id DESC', function (err, row) {
    if (err) {
      console.log('err loading data');
    } else {
      console.log('tabl laoding success');
      console.log(row);
      res.send(row);
    }
  });
});

///create user
router.post('/saveFomData', function (req, res) {
  const userData = {
    fullname: req.body.txt_full_name,
    email: req.body.txt_email,
    contact: req.body.txt_contact,
    description: req.body.txt_description,
    isactive: 1,
  };
  console.log(userData);
  connection.query("INSERT INTO tbl_node_crud SET?", userData, function (err, result) {
    if (err) {
      console.log(err, '{"message" : "internal error.!", "status" : 500}');
      res.end('{"message" : "internal error.!", "status" : 500}');
    } else {
      console.log('record successfully save');
      console.log(userData);
      res.end('{"message" : "Record created successfully...", "status" : 200}');
    }

  });

});

// get data in to form fields
router.post('/getUsers/:id', function (req, res) {
  var userID = req.body.id;
  connection.query("select * from tbl_node_crud where user_id = ?", userID, function (err, row) {
    if (err) {
      console.log(err, '{"message" : "data load faild.!", "status" : 500}');
      res.end('{"message" : "data load faild.!", "status" : 500}');
    } else {
      console.log("==================================");
      console.log("selected id is => " + userID);
      console.log("==================================");
      res.send(row);
      console.log('data load success');
      
    }
  });
});

// update request
router.post('/updateUser/:id', function (req, res) {
  var fullname = req.body.txt_full_name;
  var email = req.body.txt_email;
  var contact = req.body.txt_contact;
  var description = req.body.txt_description;
  var updateId = req.body.txt_order_id;
  connection.query("UPDATE tbl_node_crud SET fullname= ?,email= ?,contact= ?,description= ? WHERE user_id= ?", [fullname, email, contact, description, updateId], function (err, responce) {
    if(err){
      console.log(err, '{"message" : "internal error.! record cannot update", "status" : 500}');
      res.end('{"message" : "internal error.! record cannot update", "status" : 500}');
    }else{
      console.log('record successfully updated');
      console.log(updateId,fullname,email,description,contact);
      res.end('{"message" : "Record updated successfully...", "status" : 200}');
    }
  });

});

// delete request
router.post('/deleteData/:id', function (req, res) {
  var userID = req.body.id;
  connection.query("DELETE FROM tbl_node_crud WHERE user_id = ?", userID, function (err, results) {
    if (err) {
      console.log(userID);
      console.log(err, '{"message" : "internal error.! record cannot be delete", "status" : 500}');
      res.end('{"message" : "internal error.! record cannot be delete", "status" : 500}');
    } else {
      console.log("deleted id is " + userID);
      console.log('{"message" : "Record deleted successfully...", "status" : 200}');
      res.end('{"message" : "Record deleted successfully...", "status" : 200}');
    }
  });
});
module.exports = router;
