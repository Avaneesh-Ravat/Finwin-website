let port = 8080;
//npm install express
const express = require("express");
const app = express();
const path  = require("path");
const methodOverride = require("method-override"); //npm i method-override

//npm i ejs
app.set("view engine", "ejs");
app.use(methodOverride("_method")); 
app.set("views", path.join(__dirname, "views")); // to access from outside of folder by path
app.use(express.static(path.join(__dirname, "public"))); // to use html, css, js file togrther
app.use(express.urlencoded({extended: true})); // parse post request data
app.use(express.json()); // to handle json data

//to render index page
app.get("/", (req, res)=>{
    res.render("index.ejs");
})



//to render home page

app.get("/home", (req, res)=>{
    res.render("home.ejs");
});


//to render emi calculator
app.get("/emiCalculator", (req, res)=>{
    res.render("emiCalculator.ejs");
});

//to render eligibility calculator
app.get("/eligibilityCalc", (req, res)=>{
    res.render("eligibilityCalc.ejs");
});

app.get("/login-register", (req, res)=>{
    res.render("login-register.ejs");
});

app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`);
});