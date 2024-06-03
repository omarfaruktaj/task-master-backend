const { createUser, updateUser } = require("../controller/user.controller");

const router = require("express").Router();

router.patch("/users/:email", updateUser);
router.route("/users").post(createUser);

module.exports = router;
