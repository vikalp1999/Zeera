const express= require("express");
const { AddTaskLead, DelTask, updateTask } = require("../controller/task.controller");

let Router= express.Router()
Router.route("/addtask").post(AddTaskLead);
Router.route("/deletetask").post(DelTask)
Router.route('/updatestatus/:id').post(updateTask)

module.exports= Router;