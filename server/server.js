const result = require("dotenv").config();
const express = require('express');
const app = express();
const path= require("path");
const PORT = process.env.PORT||5000;
const DB = require("./database.js");
const mongoose = require("mongoose");
const userRouter = require("./user.js");


console.log(result);

const DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@rprogrammeerimine-gdys3.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


app.use(userRouter);


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
		listen();
		})
	.catch( err =>{
		console.error("error happened", err)
});


/** Development environment. In Heroku we don't use .env file */
if(process.env.NODE_ENV !== "production"){
  require('dotenv').config();
}