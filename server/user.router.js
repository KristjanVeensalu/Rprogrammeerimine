const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = require("./user.model.js");



router.get("/api/users", (req, res) => {
	User.find({}, (err, docs) =>{
		if(err) return handleError(err, res);
		res.status(200).json(docs);
	});
});

router.post("/api/users/login", (req, res)=>{
	User.findOne({email: req.body.email},(err, doc) =>{
		if(err) return handleError(err, res);
		res.send(doc);
	});
});


router.post("/api/users/signup", (req, res) =>{
	console.log("body", req.body)
	const user = new User(req.body);
	user.save((err)=>{
		if(err) return handleError(err, res);
		console.log("Success save user");
		res.status(200).json(user);
	});
});

router.delete("/api/users", (req,res)=>{
	User.deleteMany({}, (err, docs)=>{
		if(err) return handleError(err, res);
		console.log(docs);
		console.log("success deleted many users");
		res.send(204);
	})
});

function handleError(err, res){
	console.log(err);
	res.send(500);
}

module.exports = router;