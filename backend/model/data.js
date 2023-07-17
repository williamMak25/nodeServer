const mongoose = require("mongoose");
const { schema } = require("./users");
const Schema = mongoose.Schema

const DataSchema = new Schema({
    name:String,
    age:String
})

const Data = mongoose.model("Data",DataSchema);

module.exports = Data