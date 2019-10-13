const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = require("./user.model.js");
const bcrypt = require("bcrypt");



router.get("/api/users", (req, res) => {
	User.find({}, (err, docs) =>{
		if(err) return handleError(err, res);
		res.status(200).json(docs);
	});
});

router.post("/api/users/login", (req, res)=>{
	User.login(req.body)
	.then(user =>{
		res.json(user);
	})
	.catch(err => {
		handleError(err, res);
	});
});


router.post("/api/users/signup", (req, res) =>{
	User.signup(req.body)
		.then( user =>{
			res.status(200).json(user);
		})
		.catch(err => {
			return handleError(err, res);
		})
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
	res.status(500);
}

module.exports = router;