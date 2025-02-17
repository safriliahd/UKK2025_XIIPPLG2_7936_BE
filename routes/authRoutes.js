const express = require("express");
const {register, login, logout, getUserById} = require("../controllers/authController");

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/user/:id', getUserById);

module.exports = router;