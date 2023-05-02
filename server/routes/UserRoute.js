const { Router } = require("express");
const {
  getUsers,
  saveUser,
  getPaginatedUsers,
} = require("../controllers/UserController");

const router = Router();

router.route("/").get(getUsers).post(saveUser);
router.route("/page/:pageNumber").get(getPaginatedUsers);

module.exports = router;
