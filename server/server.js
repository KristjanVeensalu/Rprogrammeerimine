require("dotenv").config({path:"C:/Users/GurenZify/Rprogrammeerimine/.env" });
const express = require('express')
const app = express()
const path= require("path");
const PORT = process.env.PORT||5000;
const DB = require("./database.js");
const mongoose = require("mongoose");


console.log(process.env.DB_USERNAME);

var kittySchema = new mongoose.Schema({
	name:String
});
var Kitten = mongoose.model("Kitten", kittySchema);

const kitten1 = new Kitten({
	name: "Blue cat 3"
});

const DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@rprogrammeerimine-gdys3.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;




mongoose.connect(DB_URL)
	.then(() => {
		console.log("DB access success!")
		kitten1.save(err =>{
			if(err){
				console.log("Error");
			}
			else{
				console.log("Success! Saved");
			}
		});
	})
	.catch( err =>{
		console.error("error happened", err)
	});


/** Lisasime GET all items*/

app.get("/api/items", (req, res)=>{
	res.json(DB.getItems())
});


/**Lisasime GET item with ID*/
app.get("/api/items/:itemId", (req,res) => {
	res.send(DB.getItem(req.params.itemId));
});

app.post("/hello",(req, res)=>{
	res.send("post hello!");
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
})

app.get('/items/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
})

app.use(express.static('dist'));


app.listen(PORT, () => {
	console.log(`Example app listening on port ${process.env.PORT||PORT}!`);
	console.log(`http:localhost:${PORT}/index.html`);
});

