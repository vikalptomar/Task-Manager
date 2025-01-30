const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  postTask,
  getTaskbyid,
  updateTask,
  deleteTask,
  deleteAllTasks
} = require("../controllers/todotaskController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/").get(getAllTasks);
router.route("/").post(postTask);
router.route("/").delete(deleteAllTasks);
router.route("/:id").get(getTaskbyid);
router.route("/:id").put(updateTask);
router.route("/:id").delete(deleteTask);

module.exports = router;
