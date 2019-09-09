const express = require('express')
const app = express()
const path= require("path");
const PORT = 5000

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "epood", "index.html"));
})

app.use(express.static('epood'));

app.listen(process.env.PORT||PORT, () => console.log(`Server started on:  ${process.env.PORT||PORT}!`))