const {
  createTask,
  getTasks,
  updateTask,
  updateTaskStatus,
  deleteTask,
} = require("../controller/task.controller");
const verifyJWT = require("../utils/verify-jwt");

const router = require("express").Router();

router.use(verifyJWT);

router.route("/tasks").post(createTask).get(getTasks);
router.route("/tasks/status/:id").patch(updateTaskStatus);
router.route("/tasks/:id").patch(updateTask).delete(deleteTask);

module.exports = router;
