const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req,res){
	res.render("search");
});

app.get("/results", function(req,res){
	var query = req.query.search;
	var url ="http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";
	request(url, function(error,response,body){
		if(!error && response.statusCode == 200){
			var data = JSON.parse(body);
			res.render("results",{data: data});	
		}
	});
});

app.post("/results/movie",function(req,res){
	var imdbID = req.body.imdbID;
	var url = "http://www.omdbapi.com/?i=" + imdbID + "&apikey=thewdb";
	request(url, function(error,response,body){
		if(!error && response.statusCode == 200){
			var data = JSON.parse(body);
			res.render("movie",{data: data});	
		}
	});
});

app.listen(PORT,()=>{
	console.log("server started")
});
