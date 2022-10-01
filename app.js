// module import
const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const path = require("path")

// database connect +access
const mongoose = require("mongoose")
const studentModel = require("./models/StudentSchema")
const url = "mongodb://localhost:27017/greenwich"
mongoose.connect(url, {useNewUrlParser: true}, (err)=> {
    if(err) {
        console.log(err)
    }else {
        console.log("connect to db success !")
    }
})
// body-parser: get input form FORM
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: false}))

app.get("/login", (req,res)=>{
    res.render("login")
})
app.post("/login",(req,res)=>{
    var username = req.body.username
    var password = req.body.password
    var check = "login failed!";
    if(username == "admin" && password == "123456") {
        check = "login succed!"
    }
    res.render("check", {result: check})
})
app.get("/add", (req,res) =>{
    res.render("add")
})
app.post("/add", (req,res)=>{
    //res.render("output", {student: req.body})
    
// luu object student chua du lieu nhap tu form
    var student = new studentModel({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        image: req.body.image,
    })
    student.save((err) => {
        if(err) {
            console.error(err)
        }else {
            res.redirect("/student")
        }
    })
})


app.set("views", path.join(__dirname, "views"))
app.set("view engine", "hbs")

app.get("/", (req,res) => {
    res.render("index")
})

app.get("/about", (req,res) => {
    res.render("about")
})

app.get("/student", (req,res) => {
    studentModel.find((err, data) => {
        if (err){
            console.log(err)
        } else {
            res.render("student", {students: data})
        }
    })
})

app.listen(port)
