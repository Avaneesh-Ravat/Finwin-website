let port = 8080;
//npm install express
const express = require("express");
const app = express();
const path  = require("path");
const methodOverride = require("method-override"); //npm i method-override
 

//connecting mongo db
const mongoose = require("mongoose");
const { type } = require("os");

main()
.then(()=>{
    console.log("Connection Successful"); 
})
.catch(err => console.log(err));
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/Thebankey');
}

//npm i ejs
app.set("view engine", "ejs");
app.use(methodOverride("_method")); 
app.set("views", path.join(__dirname, "views")); // to access from outside of folder by path
app.use(express.static(path.join(__dirname, "public"))); // to use html, css, js file togrther
app.use(express.urlencoded({extended: true})); // parse post request data
app.use(express.json()); // to handle json data



//Schema for registration
const userSchema = new mongoose.Schema({
    user_name:{
        type: String,
        required: true,
    },
    user_phone:{
        type: Number,
        required: true,
    },
    user_email:{
        type: String,
        required: true,
    },
    user_password:{
        type: String,
        required: true,
    },
    user_gender:{
        type: String,
        required: true,
    }

});

const User = mongoose.model("User", userSchema);


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

app.get("/user-login", (req, res)=>{
    res.render("user-login.ejs");
});

app.get("/user-register", (req, res)=>{
    res.render("user-register.ejs");
});

app.post("/user", (req, res)=>{
    let{name, phone, email, pass, gender} = req.body;
    const user = new User({user_name: name, user_phone: phone, user_email: email, user_password: pass, user_gender: gender});
    user.save().then((res)=>{
        console.log(res);
    });
    res.redirect("/home");
});

app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`);
}); 