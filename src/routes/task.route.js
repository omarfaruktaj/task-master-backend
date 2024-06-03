const {
  createTask,
  getTasks,
  updateTask,
  updateTaskStatus,
} = require("../controller/task.controller");
const verifyJWT = require("../utils/verify-jwt");

const router = require("express").Router();

router.route("/tasks").post(verifyJWT, createTask).get(verifyJWT, getTasks);
router.route("/tasks/status/:id").patch(verifyJWT, updateTaskStatus);
router.route("/tasks/:id").patch(verifyJWT, updateTask);

module.exports = router;
