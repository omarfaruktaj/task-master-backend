const {
  createUser,
  updateUser,
  getUser,
} = require("../controller/user.controller");

const router = require("express").Router();

router.route("/users/:email").get(getUser).patch(updateUser);
router.route("/users").post(createUser);

module.exports = router;
