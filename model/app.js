const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://postgres:athena@localhost:5432/newDb",{logging:false}
);

sequelize
  .authenticate()
  .then(() => {
    console.log("this is dababase authentication");
  })
  .catch((err) => {
    console.log("Error :", err);
  });

const db={};
db.Sequelize=Sequelize;
db.sequelize=sequelize;




db.sequelize.sync({ force:false, alter: true }).then(()=>{
    console.log("SYNCED")
}).catch((err)=>{
    console.log("Error-->",err)
}
);



db.users = require("./model")(sequelize, DataTypes);
module.exports=db;