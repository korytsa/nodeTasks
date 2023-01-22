
const Router = require("express");
const router = new Router();
const userExsists = require('../modules/userExsists')
const getAllPosts = require('../modules/getAllPosts')

const usersController = require('../controllers/users.controller')

router.post("/users", usersController.createUsers);
router.get("/users", [getAllPosts], usersController.findAllUsers);
router.post("/", [userExsists], usersController.createPost);
router.get("/", [getAllPosts], usersController.findAllPosts);
router.put("/", [userExsists, getAllPosts], usersController.updatePosts);
router.delete("/", [userExsists], usersController.deleteAllPosts);

module.exports = router