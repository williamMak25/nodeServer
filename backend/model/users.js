const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
},{timestamps:true})
const Users = mongoose.model("Users",UserSchema);

module.exports = Users