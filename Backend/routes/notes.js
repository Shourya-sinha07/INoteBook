// this file handle all route on notes (create, update, read, delete)

const express = require("express");
const Router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1:-Get All the notes using :GET localhost:5000/api/notes/fetchallnotes || Login required

Router.get("/fetchallnotes", fetchuser, async (req, res) => {  //this async function execute when the fetchuser middleware run suuccefully and don't give error
  try {
    const notes = await Notes.find({ user: req.user.id });//this will find all notes belonging to the user whose id is passed as the parameter 

    res.json(notes);//sending notes as response

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//Route 2:-Get All the notes using :POST localhost:5000/api/notes/addnotes ||Login required
Router.post(
  "/addnotes",
  fetchuser,
  [ //here we make validation on notes  that title must be minimum of 3 character and description of 5 character
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body("description", "Description must be of 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body; //using destructuring we get the title ,desription and tag from req.body

      //If there is error then return the bad request and the error
      const errors = validationResult(req);//this wil; return an object in which if there is any error we get that error from this object
      
      if (!errors.isEmpty()) { //if credential is not filled properly then this if condition is generated
        return res.status(400).json({ errors: errors.array() });
      }

      //creating a note and assining the value of note object.Here the value is assigned by shorthand method because the varibales which store the value and name of object properties both are same so by this sorthand we assigned the value of object by this method
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveData = await note.save(); //save the object in database this is the async function which mean it might take some time to save so we use await keyword here

      res.json(saveData);//sending response from the server 
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Enternal Server Error");
    }
  }
);

//Route 3:-Update an existing Note using put :-localhost:5000/api/notes/updatenotes/:id  ||login required
Router.put(
  "/updatenotes/:id",  //sending note id in api to identify the notes which we want to change
  fetchuser,async (req, res) => {
    const {title,description,tag}=req.body;
try {
    //create new object
    const newNote ={};
      //Assinging the value of title,description and tag from req.body
    if(title){newNote.title =title};  
    if(description){newNote.description =description};
    if(tag){newNote.tag =tag};

    //Find the note to be updated and update it
    let note= await Notes.findById(req.params.id);   //finding the note which we want to update
    if(!note){return res.status(404).send("Not Found")} //if note is not found then give some error
    if(note.user.toString() !==req.user.id){   //here it checking the user who try to update the notes that user userid is match with the user id present on the note.[basically it help to secure the note when a user try to accesss and update  the note of anohter user ]  

      return res.status(401).send("Not Allowed") //if any error or issue then this code exute.[if user id not match the user id present in note database]
    }
    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true}) //if every thing is okay then this line will execute and this function find the note by its id and update it by the provided information   
    res.json({note})
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error");
}
  
  }
);
//Route 3:-Delete an existing Note using DELETE :-localhost:5000/api/notes/deletenotes/:id ||login required
Router.delete(
  "/deletenotes/:id",  //sending note id in api to identify the notes which we want to change
  fetchuser,async (req, res) => {
    const {title,description,tag}=req.body;

   try {
     //Find the note to be deleted and delete it
     let note= await Notes.findById(req.params.id);   //finding the note which we want to update
     if(!note){return res.status(404).send("Not Found")} //if note is not found then give some error
 
     //Allow deletion if user owns this note
     if(note.user.toString() !==req.user.id){   //here it checking the user who try to delete the notes that user userid is match with the user id present on the note.[basically it help to secure the note when a user try to accesss and delete  the note of another user ]  
 
       return res.status(401).send("Not Allowed") //if any error or issue then this code exute.[if user id not match the user id present in note database]
     }
     note=await Notes.findByIdAndDelete(req.params.id) //if every thing is okay then this line will execute and this function find the note by its id and update it by the provided information   
     res.json({"Success":"Note has been successfully deleted",note: note})
   } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
   }

   
  }
);
module.exports = Router;
