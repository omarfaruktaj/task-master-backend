const {
  createUser,
  updateUser,
  getUser,
  handleLogin,
  handleSocial,
} = require("../controller/user.controller");
const verifyJWT = require("../utils/verify-jwt");

const router = require("express").Router();

router.route("/users/:email").get(getUser).patch(verifyJWT, updateUser);
router.route("/users").post(createUser);
router.route("/users/login").post(handleLogin);
router.route("/users/social").post(handleSocial);

module.exports = router;
