const { createTask } = require("../controller/task.controller");
const verifyJWT = require("../utils/verify-jwt");

const router = require("express").Router();

router.route("/tasks").post(verifyJWT, createTask);

module.exports = router;
