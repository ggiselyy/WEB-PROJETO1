const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//definindo o model
const Users = new Schema({
  nome: {
    type: String,
    unique: true,
    require: true
  },

  email: {
    type: String,
    unique: true,
    require: true
  },

  senha: {
    type: String,
    require: true
  }
});

mongoose.model("Users", Users);