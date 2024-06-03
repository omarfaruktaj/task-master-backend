const {
  createUser,
  updateUser,
  getUser,
} = require("../controller/user.controller");
const verifyJWT = require("../utils/verify-jwt");

const router = require("express").Router();

router.route("/users/:email").get(getUser).patch(verifyJWT, updateUser);
router.route("/users").post(createUser);

module.exports = router;
