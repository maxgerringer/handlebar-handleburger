const connection = require("../config/connection.js");

function sqlQuestionMarks(num) {
   let arr = [];
   for (let i = 0; i < num; i++) {
      arr.push("?");
   };
   return arr.toString();
};

function objectToSql(ob) {
   let arr = [];
   for (let key in ob) {
      let value = ob[key];
      if (Object.hasOwnProperty.call(ob, key)) {
         if (typeof value === "string" && value.indexOf(" ") >= 0) {
            value = "'" + value + "'";
         };
         arr.push(key + "=" + value);
      };
   };
   return arr.toString();
};

const orm = {
   selectAll: function(table, cb) {
      let queryString = "SELECT * FROM " + table + ";";

      connection.query(queryString, function(err, result) {
         if (err) {
            throw err;
         };
         cb(result);
      });
   },
   insertOne: function(table, cols, vals, cb) {
      let queryString = "INSERT INTO " + table;
      queryString += " (";
      queryString += cols.toString();
      queryString += ") ";
      queryString += "VALUES (";
      queryString += sqlQuestionMarks(vals.length);
      queryString += ") ";

      console.log(queryString);

      connection.query(queryString, vals, function(err, result) {
         if (err) {
            throw err
         }
         cb(result);
      });
   },
   updateOne: function(table, objColVals, condition, cb) {
      let queryString = "UPDATE " + table;
      queryString += " SET ";
      queryString += objectToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;

      console.log(queryString);

      connection.query(queryString, function(err, result) {
         if (err) {
            throw err
         }
         cb(result);
      });
  },
  deleteOne: function(table, condition, cb) {
      var queryString = "DELETE FROM " + table;
      queryString += " WHERE ";
      queryString += condition;

      console.log(queryString);

      connection.query(queryString, function(err, result) {
         if (err) {
            throw err
         }
         cb(result);
      });
  }
};

module.exports = orm;