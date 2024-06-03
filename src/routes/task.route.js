const { createTask, getTasks } = require("../controller/task.controller");
const verifyJWT = require("../utils/verify-jwt");

const router = require("express").Router();

router.route("/tasks").post(verifyJWT, createTask).get(verifyJWT, getTasks);

module.exports = router;
