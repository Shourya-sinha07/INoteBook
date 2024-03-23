//Here we creating Model of Notes here we define that a notes contain which which field .Which means it contain a user field in which user id is written,title of a notes ,and description of a node ,tag ,and date is bydefault(which means user doesn't need to enter date atomatically date will save when user create a note )
const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,  //title must be string 
    required: true, //required : true this means user have to enter this field 
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("notes", NotesSchema);
