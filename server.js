const mongoose = require("mongoose");

const app = require("./app");

// const DB_HOST =
//   "mongodb+srv://Vitalik:XjoD3rvTrnfibDr0@cluster0.34j6rru.mongodb.net/db-contacts?retryWrites=true&w=majority";

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
// XjoD3rvTrnfibDr0;
// mongodb+srv://Vitalik:XjoD3rvTrnfibDr0@cluster0.34j6rru.mongodb.net/
