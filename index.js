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

const employeeSchema = new mongoose.Schema({
    emp_id:{
        type: String,
        required: true,
    },
    emp_name:{
        type: String,
        required: true,
    },
    emp_phone:{
        type: Number,
        required: true,
    },
    emp_email:{
        type: String,
        required: true,
    },
    emp_password:{
        type: String,
        required: true,
    },
    emp_gender:{
        type: String,
        required: true,
    },
    emp_salary:{
        type: String,
        required: true,
    },
    emp_designation:{
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
        type: String,
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

const getInTouchSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true,
    },
    contact_no:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true,
    }

});

const applicationSchema = new mongoose.Schema({
    CM_No:{
        type: String,
        required : true,
    },
    CM_Name:{
        type: String,
        required : true,
    },
    CM_Mobile:{
        type: String,
        required : true,
    },
    CM_email:{
        type: String,
        required : true,
    },
    Login_Date:{
        type: String,
        required : true,
    },
    Login_Month:{
        type: String,
        required : true,
    },
    Amount:{
        type: String,
        required : true,
    },
    Status:{
        type: String,
        required : true,
    },
    Disbursement_Date:{
        type: String,
        required : true,
    },
    Reference:{
        type: String,
        required : true,
    },
    Branch:{
        type: String,
        required : true,
    },
    Branch_Head:{
        type: String,
        required : true,
    }
    
});

const User = mongoose.model("User", userSchema);
const Visitor = mongoose.model("Visitor", visitorSchema);
const GetInTouchUser = mongoose.model("GetInTouchUSer", getInTouchSchema);
const Employee = mongoose.model("Employee", employeeSchema);
const Application = mongoose.model("Application", applicationSchema);

//to render index page
app.get("/", (req, res)=>{
    res.render("index.ejs");
})

//to render home page when user is log in
app.get("/home/:id", async(req, res)=>{
    let {id} = req.params;
    try {
        const user = await User.findOne({ _id: id }).exec();
        console.log(user);
        res.render("home.ejs", {user});
        
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
    console.log(id);
})


//to render emi calculator
app.get("/emiCalculator/:id", async(req, res)=>{
    let {id} = req.params;
    try {
        const user = await User.findOne({ _id: id }).exec();
        console.log(user);
        res.render("emiCalculator.ejs", {user});
        
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
    console.log(id);
});

app.get("/emiCalcWithoutLogin", (req, res)=>{
    res.render("emiCalcWithoutLogin.ejs");
})

//to render eligibility calculator
app.get("/eligibilitycalc/:id", async(req, res)=>{
    let {id} = req.params;
    try {
        const user = await User.findOne({ _id: id }).exec();
        console.log(user);
        res.render("eligibilityCalc.ejs", {user});
        
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
    console.log(id);
});

app.get("/eligibilityCalcWithoutLogin", (req, res)=>{
    res.render("eligibilityCalcWithoutLogin.ejs");
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
    res.render("home.ejs", {name: name});
});

//employee login
app.get("/employee-login", (req, res)=>{ 
    res.render("employee-login.ejs", {message:""});
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
            res.render("home.ejs", {user});
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


app.get("/bank-pages/:bank_name", async (req, res) => { 
    let { bank_name } = req.params;

    try {
        console.log(`Fetching data for bank: ${bank_name}`);

        // Access the 'banks' collection
        const collection = mongoose.connection.db.collection('banks');
        
        // Querying the collection based on bank_name
        const data = await collection.find({ bank_name: bank_name }).toArray();

        if (data.length === 0) {   
            console.log(`No data found for bank: ${bank_name}`);
            return res.status(404).send(`No data found for ${bank_name}`);
        }

        console.log(`Data found for ${bank_name}:`, data);
        
        // Render a view or send data back based on your requirements
        res.render("bank-pages.ejs", { bankData: data[0] });
    } catch (err) {
        console.error(`Error fetching data for ${bank_name}:`, err);
        res.status(500).send("Server error");
    }
});


//to render the interest rate pages

app.get("/interestRatesWithoutLogin", async (req, res) => { 
    try {
        console.log(`Fetching all bank data...`);

        // Access the 'banks' collection
        const collection = mongoose.connection.db.collection('banks');
        
        // Fetch all documents in the collection
        const data = await collection.find({}).toArray();

        if (data.length === 0) {   
            console.log(`No data found in the banks collection.`);
            return res.status(404).send("No data found.");
        }

        console.log(`Bank data found:`, data);
        
        // Render the EJS page with the array of bank data
        res.render("interestRatesWithoutLogin.ejs", { banksData: data });
    } catch (err) {
        console.error(`Error fetching bank data:`, err);
        res.status(500).send("Server error");
    }
});


//interest rates page after login
app.get("/interestRates/:id", async (req, res) => { 
    let {id} = req.params;
    try {
        const user = await User.findOne({ _id: id }).exec();
        console.log(user);
        try {
            console.log(`Fetching all bank data...`);
    
            // Access the 'banks' collection
            const collection = mongoose.connection.db.collection('banks');
            
            // Fetch all documents in the collection
            const data = await collection.find({}).toArray();
    
            if (data.length === 0) {   
                console.log(`No data found in the banks collection.`);
                return res.status(404).send("No data found.");
            }
    
            console.log(`Bank data found:`, data);
            
            // Render the EJS page with the array of bank data
            res.render("interestRates.ejs", { banksData: data, user: user});
        } catch (err) {
            console.error(`Error fetching bank data:`, err);
            res.status(500).send("Server error");
        }
        
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
    console.log(id);
    
});

//to render about us page
 
app.get("/aboutUsWithoutLogin", (req, res)=>{
    res.render("aboutusWithoutLogin.ejs");
});


// to render about us after log in
app.get("/aboutus/:id", async (req, res) => { 
    let {id} = req.params;
    try {
        const user = await User.findOne({ _id: id }).exec();
        console.log(user);
        res.render("aboutus.ejs", {user});
        
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
    console.log(id);
    
});


//to render get in touch form
app.get("/getInTouch", (req, res)=>{
    res.render("getInTouch.ejs");
});

app.get("/getInTouchAfterLogin/:id", async(req, res)=>{
    let {id} = req.params;
    try {
        const user = await User.findOne({ _id: id }).exec();
        console.log(user);
        res.render("getInTouchAfterLogin.ejs", {user});
        
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
    console.log(id);
});

//get in touch data to the database
app.post("/getInTouchData/:page", async(req, res)=>{
    const {page} = req.params;
    let{name, phone, email, message} = req.body;
    const user = new GetInTouchUser({name: name, contact_no: phone, email: email, message: message});
    user.save().then((res)=>{
        console.log(res);
    });
    if(page === "indexPage")
    res.redirect("/");
    else{
        try {
            const user = await User.findOne({ user_email: email }).exec();
            
            res.render("home.ejs", {user});
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    }
});


// ADMIN PAGE ---------------------------------------------------------------------------------------------
app.get("/admin", (req, res)=>{
    res.render("adminPage.ejs");
});

app.get("/disbursement", async(req, res)=>{
    try {
        console.log(`Fetching all disbursements...`);

        // Access the disbursement collection
        const collection = mongoose.connection.db.collection('applications');
        
        // Fetch all documents in the collection
        const data = await collection.find({}).toArray();

        if (data.length === 0) {   
            console.log(`No data found in the applications collection.`);
            return res.status(404).send("No data found.");
        }

        console.log(`disbursement data found:`, data);
        
        // Render the EJS page with the array of bank data
        res.render("disbursement.ejs", { data });
    } catch (err) {
        console.error(`Error fetching disbursement data:`, err);
        res.status(500).send("Server error");
    }
});

app.get("/user-data", async(req, res)=>{
    try {
        console.log(`Fetching all users...`);

        // Access the disbursement collection
        const collection = mongoose.connection.db.collection('users');
        
        // Fetch all documents in the collection
        const data = await collection.find({}).toArray();

        if (data.length === 0) {   
            console.log(`No data found in the users collection.`);
            return res.status(404).send("No data found.");
        }

        console.log(`users data found:`, data);
        
        // Render the EJS page with the array of bank data
        res.render("user-data.ejs", { data });
    } catch (err) {
        console.error(`Error fetching user data:`, err);
        res.status(500).send("Server error");
    }
});

app.get("/visitors", async(req, res)=>{
    try {
        console.log(`Fetching all visitors...`);

        // Access the disbursement collection
        const collection = mongoose.connection.db.collection('visitors');
        
        // Fetch all documents in the collection
        const data = await collection.find({}).toArray();

        if (data.length === 0) {   
            console.log(`No data found in the visitors collection.`);
            return res.status(404).send("No data found.");
        }

        console.log(`visitors data found:`, data);
        
        // Render the EJS page with the array of bank data
        res.render("visitor-data.ejs", { data });
    } catch (err) {
        console.error(`Error fetching visitors data:`, err);
        res.status(500).send("Server error");
    }
});

app.get("/get-in-touch-data", async(req, res)=>{
    try {
        console.log(`Fetching all get in touch users...`);

        // Access the disbursement collection
        const collection = mongoose.connection.db.collection('getintouchusers');
        
        // Fetch all documents in the collection
        const data = await collection.find({}).toArray();

        if (data.length === 0) {   
            console.log(`No data found in the get in touch users collection.`);
            return res.status(404).send("No data found.");
        }

        console.log(`get in touch users data found:`, data);
        
        // Render the EJS page with the array of bank data
        res.render("get-in-touch-data.ejs", { data });
    } catch (err) {
        console.error(`Error fetching get in touch users data:`, err);
        res.status(500).send("Server error");
    }
});

app.get("/total-employees", async(req, res)=>{
    try {
        console.log(`Fetching all employees...`);

        // Access the disbursement collection
        const collection = mongoose.connection.db.collection('employees');
        
        // Fetch all documents in the collection
        const data = await collection.find({}).toArray();

       

        console.log(`employees data found:`, data);
        
        // Render the EJS page with the array of bank data
        res.render("total-employees.ejs", { data });
    } catch (err) {
        console.error(`Error fetching employees data:`, err);
        res.status(500).send("Server error");
    }
});

app.get("/login-data", async(req, res)=>{
    try {
        console.log(`Fetching all logins...`);

        // Access the disbursement collection
        const collection = mongoose.connection.db.collection('applications');
        
        // Fetch all documents in the collection
        const data = await collection.find({Status: "Document received"}).toArray();

        if (data.length === 0) {   
            console.log(`No data found in the applications collection.`);
            return res.status(404).send("No data found.");
        }

        console.log(`login-data data found:`, data);
        
        // Render the EJS page with the array of bank data
        res.render("disbursement.ejs", { data });
    } catch (err) {
        console.error(`Error fetching disbursement data:`, err);
        res.status(500).send("Server error");
    }
});

app.post("/employee", async(req, res)=>{
    let {empid, pass} = req.body;
    console.log(empid);

    try {
        const employee = await Employee.findOne({ emp_name: empid }).exec();
        if (!employee) {
            // User not found
            return res.render("employee-login.ejs", { message: "Invalid email " });
        }

        // Compare passwords (consider using bcrypt in a real app)
        if (employee.emp_password === pass) {
            try {
                console.log(`Fetching all data...`);
        
                // Access the disbursement collection
                const collection = mongoose.connection.db.collection('applications');
                
                // Fetch all documents in the collection
                const data = await collection.find({Reference: empid}).toArray();
        
                if (data.length === 0) {   
                    console.log(`No data found in the applications collection.`);
                    return res.status(404).send("No data found.");
                }
        
                console.log(`disbursement data found:`, data);
                
                // Render the EJS page with the array of bank data
                res.render("employee.ejs", { data, empid });
            } catch (err) {
                console.error(`Error fetching disbursement data:`, err);
                res.status(500).send("Server error");
            }
        } else {
            // Incorrect password
            res.render("login-register.ejs", { message: "Invalid email or password" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }

});

//employee add by admin
app.post("/addEmployee", async(req, res)=>{
    let{empid, name, phone, email, salary, designation, password, gender} = req.body;
    try{
        const employee = await Employee.findOne({ emp_email: email }).exec();
        if(!employee){
            const newEmployee = new Employee({emp_id: empid, emp_name: name, emp_phone: phone, emp_email: email, emp_salary: salary, emp_designation: designation, emp_password: password, emp_gender: gender});
            newEmployee.save().then((res)=>{
                console.log(res);
            });
        }
        else{
            return res.redirect("/admin");
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Server error");
    }
    res.redirect("/admin");
});

app.get("/deleteEmployee/:emp_id", async(req, res)=>{
    let {emp_id} = req.params;
    try{
        const employee = await Employee.deleteOne({ emp_id: emp_id }).exec();
        if(!employee){
            res.send("Unable to fetch employee data");
        }
        else{
            res.redirect("/admin");
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Server error");
    }


});

app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`);
}); 



