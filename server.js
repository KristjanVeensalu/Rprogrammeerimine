const express = require('express')
const app = express()
const path= require("path");
const PORT = process.env.PORT||5000;

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
})

app.use(express.static('dist'));


app.listen(PORT, () => {
	console.log(`Example app listening on port ${process.env.PORT||PORT}!`);
	console.log(`http:localhost:${PORT}/index.html`);
});

