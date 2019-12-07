//const result = require("dotenv").config();
const express = require('express');
const app = express();
const path= require("path");
const PORT = process.env.PORT||3000;
const DB = require("./database.js");
const mongoose = require("mongoose");
const apiRouter = require("./apiRouter.js");

const Item = require("./item.model.js");
const bodyParser = require("body-parser");
/** Development environment. In Heroku we don't use .env file */
let result = 0
if(process.env.NODE_ENV !== "production"){
 result = require('dotenv').config();

}

console.log(result);

const DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@rprogrammeerimine-gdys3.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(bodyParser.json());

app.use(apiRouter);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
})

app.get('/items/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
})

app.use(express.static('dist'));

function listen(){
	app.listen(PORT, () => {
		console.log(`Example app listening on port ${process.env.PORT||PORT}!`);
		console.log(`http:localhost:${PORT}/index.html`);
	});
};

mongoose.connect(DB_URL)
	.then(() => {
		console.log("DB access success!")
		migrate();
		//deleteAllItems();
		listen();
		})
	.catch( err =>{
		console.error("error happened", err)
});





//Ei tea millal k6ik on salvestatud.
 function migrate(){
 	Item.count({}, (err, countNr) =>{
 		if(err) throw err;
 		if(countNr > 0) {
 			console.log("Aleady had items, wont save.");
 			return;
 		}
 		saveAllItems();
 	});
}

function deleteAllItems(){
	Item.deleteMany({}, (err, doc) =>{
		console.log("err", err, "doc", doc);
	});
};


function saveAllItems(){
	console.log("Migrate started...");
 	const items = DB.getItems();
 	items.forEach(item =>{
 		const documentS = new Item(item);
 		documentS.save((err) =>{
 			if(err){
 				console.log(err);
 				throw new Error("Something happened during save");
 			}
 			console.log("save Success!!!");
 		})
 	});
 	console.log("items", items);
}