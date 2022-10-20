var db = require("../model/app");
var {Sequelize, Op} = require('sequelize')
const users = db.users;
console.log("here we goo controller");

var getmethod = async function (req, res) {
  try {
    var sData = await users.findAll({
      limit: 5,
      
      order: [["id", "ASC"]],
    });
    //console.log("count tablke",count)
    res.render("view", { sData });
  } catch (err) {
    console.log("error", err);
  }
};

var addUser = async function (req, res) {
  try {
    var temp = false;
    console.log(req.body);

    var name = req.body.name;
    console.log("name", name);
    var number = req.body.number;
    console.log("number", number);

    if (name == "undefined" || number == "undefined") {
      console.log("Name and Number cannot be Undefined");
    } else if (name == "null" || number == "null") {
      console.log("Name and Number cannot be null");
    } else if (name == "" || number == "") {
      console.log("Data won't be created");
    } else if (name != "" || number != "") {
      var creat = await users.create({ Name: name, Number: number });

      var showData = await users.findAll({
        limit: 5,
        offset: 0,
        order: [["id", "ASC"]],
      }); // showData is a array of Objects

      var len = showData.length;
      var lenght = 1 + len;
      console.log("lenght is ", len);

      res.send({ err: temp, Name: name, Number: number, sno: len });
    }
  } catch (err) {
    var temp = true;
    console.log("error", err);
    res.send({ Err: "UnSuccessfully entry created", err: temp });
  }
};

var loadmore = async function (req, res) {
  try {
    console.log(req.body)
    var offse = req.body.offset;
    var searchMee = req.body.searchMe;
    console.log("searchMe",searchMee)
    console.log("offset search me",offse)


    var ssData = await users.findAndCountAll({
      where:{
        Name : {
          [Sequelize.Op.iLike]: "%" + searchMee + "%"
        }
      },offset: offse,
      limit: 5,
      order: [["id", "ASC"]],
    });
    //console.log("changed ssData ", ssData);

    res.send({ data: ssData });
  } catch (err) {
    console.log("error", err);
  }
};


var searchMe = async function (req, res) {
  try {
    var searchMee = req.body.searchM;
    console.log("searchMe",searchMee)
   // var offse = req.body.offset;
    //console.log("offset search me",offse) 
     
    var searchData = await users.findAll({
      where:{
        Name : {
          [Sequelize.Op.iLike]: "%" + searchMee + "%"
        }
      },//offset:offse,
      limit: 5,

      order: [["id", "ASC"]],
    });
    //console.log("changed searchData ", searchData);

    res.send({ data: searchData });
  } catch (err) {
    console.log("error", err);
  }
};

module.exports = { addUser, getmethod, loadmore, searchMe };
