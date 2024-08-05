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


let Thebankey = mongoose.connection;


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

const visitorSchema = new mongoose.Schema({
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
    user_profession:{
        type: String,
        required: true,
    }

});

const User = mongoose.model("User", userSchema);
const Visitor = mongoose.model("Visitor", visitorSchema)

//to render index page
app.get("/", (req, res)=>{
    res.render("index.ejs");
})



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
    res.render("user-login.ejs", {message: ""});
});

app.get("/user-register", (req, res)=>{
    res.render("user-register.ejs");
});


//register user
app.post("/user", (req, res)=>{
    let{name, phone, email, pass, gender} = req.body;
    const user = new User({user_name: name, user_phone: phone, user_email: email, user_password: pass, user_gender: gender});
    user.save().then((res)=>{
        console.log(res);
    });
    res.redirect("/home");
});



//login verification
app.post("/login", async (req, res) => {
    let { email, pass } = req.body;

    try {
        const user = await User.findOne({ user_email: email }).exec();
        if (!user) {
            // User not found
            return res.render("user-login.ejs", { message: "Invalid email or password" });
        }

        // Compare passwords (consider using bcrypt in a real app)
        if (user.user_password === pass) {
            res.render("home.ejs", {name: user.user_name});
        } else {
            // Incorrect password
            res.render("user-login.ejs", { message: "Invalid email or password" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});


// storing the user data without login
app.post('/store-data', async (req, res) => {
    console.log(req.body); // Output the form data to the console
    let {name, email, phone, profession} = req.body;
    try{
        const user = await Visitor.findOne({ user_email: email }).exec();
        if(!user){
            const newUser = new Visitor({user_name: name, user_phone: phone, user_email: email, user_profession: profession});
            newUser.save().then((res)=>{
                console.log(res);
            });
        }
        else{
            return res.redirect("/");
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Server error");
    }
    res.redirect("/");
});


app.get("/bank-pages/:bank_name", (req, res) => { 
    let { bank_name } = req.params;
    
    Thebankey.once('open', () => {
        const collection = Thebankey.collection('banks');
        collection.find({}).toArray((err, documents) => {
            if (err) {
                res.status(500).send('Error fetching data');
            }
            console.log(documents); // Optional: You can log the documents for debugging
            res.render("bank-pages.ejs", { bank_name });
        });
    });
});


app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`);
}); 