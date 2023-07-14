const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    username:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    age:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    bio:{
        type:String
    }
},{timestamps:true})

const Profile = mongoose.model("Profile",ProfileSchema);

module.exports = Profile