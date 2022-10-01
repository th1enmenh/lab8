const mongoose = require("mongoose")
var studentSchema = mongoose.Schema

var studentModel = mongoose.Model("student", studentSchema, "student")

module.exports = studentModel;