const asyncHandler = require("express-async-handler");
const todoTask = require("../models/todoTaskModel");

//@description Get all tasks
//@routes "/api/todoTask"
//@access private
const getAllTasks = asyncHandler(async (req, resp) => {
  const allTasks = await todoTask.find({ user_id: req.user.id });
  resp.status(200).json(allTasks);
});

//@description post a task
//routes "/api/todoTask"
//@access private
const postTask = asyncHandler(
  async (req, resp) => {
    const { title, task } = req.body;
    if (!title || !task) {
      resp.status(400);
      throw new Error("All fields are mandatory");
    }
    const createTask = await todoTask.create({ title, task ,user_id: req.user.id,});
    resp.status(201).json({ status: 200, createTask });
  },
  (error, req, resp, next) => {
    resp.status(500).json({ error: error.message });
  }
);

const getTaskbyid = asyncHandler(async (req, resp) => {

  const taskbyid = await todoTask.findById(req.params.id);
  if(!taskbyid){
    resp.status(400);
    throw new Error("task not found");
  }
  // console.log("taskbyid.user_id",taskbyid.user_id.toString());
  // console.log("req.user.id",req.user.id);

  
  if(taskbyid.user_id.toString()!==req.user.id){
    resp.status(403).json({message:"not Authorised"});
    throw new Error("User don't have permission to view other user task");
  }
  resp.status(200).json(taskbyid);
});

const updateTask = asyncHandler(async (req, resp) => {
  // const taskupdateId=await todoTask.findById(req.params.id)
  const taskbyid = await todoTask.findById(req.params.id);
  if(!taskbyid){
    resp.status(400);
    throw new Error("task not found");
  }  
  if(taskbyid.user_id.toString()!==req.user.id){
    resp.status(403).json({message:"not Authorised"});
    throw new Error("User don't have permission to update other user task");
  }

  const taskupdate = await todoTask.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  resp.status(200).json(taskupdate);
});

const deleteTask=asyncHandler(async(req,resp)=>{
  const taskbyid = await todoTask.findById(req.params.id);
  if(!taskbyid){
    resp.status(400);
    throw new Error("task not found");
  }  
  if(taskbyid.user_id.toString()!==req.user.id){
    resp.status(403).json({message:"not Authorised"});
    throw new Error("User don't have permission to delete other user task");
  }
  const delTask=await todoTask.deleteOne({_id:req.params.id})
  resp.status(200).json(delTask);
})


const deleteAllTasks = asyncHandler(async (req, resp) => {
  const delAllTasks = await todoTask.deleteMany({user_id:req.user.id});
  resp.status(200).json(delAllTasks);
});

module.exports = {
  getAllTasks,
  postTask,
  getTaskbyid,
  updateTask,
  deleteTask,
  deleteAllTasks
};
