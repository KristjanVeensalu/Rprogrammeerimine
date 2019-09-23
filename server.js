const express = require('express')
const app = express()
const path= require("path");
const PORT = process.env.PORT||5000;
const DB = require("./server/database.js");


/** Lisasime GET all items*/

app.get("/items", (req, res)=>{
	res.json(DB.getItems())
});


/**Lisasime GET item with ID*/
app.get("/items/:itemId", (req,res) => {
	res.send(DB.getItem(req.params.itemId));
});

app.post("/hello",(req, res)=>{
	res.send("post hello!");
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
})

app.use(express.static('dist'));


app.listen(PORT, () => {
	console.log(`Example app listening on port ${process.env.PORT||PORT}!`);
	console.log(`http:localhost:${PORT}/index.html`);
});

