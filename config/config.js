const mongoose = require('mongoose')
const connectDB = () => {
    mongoose
      .connect('mongodb+srv://kehinde:ayinke2013@insta.pynb3.mongodb.net/mern?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(() => console.log("mongoDB connected"))
      .catch((err) => {
        console.log(err.message);
        process.exit(1);
      });
  };
  module.exports = connectDB;