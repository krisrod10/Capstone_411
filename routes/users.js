const express = require('express');
const router = express.Router();

const controller = require("../controllers/users");
const middleware = require("../middleware/auth");

router.get('/users', middleware.checkJWT, controller.getUsers);

router.get('/users/:id', middleware.checkJWT, controller.getUserById);

router.post('/users', controller.createUser);

router.put('/users/:id', middleware.checkJWT, controller.createUser);

router.delete('/users/:id', middleware.checkJWT, controller.deleteUser);

module.exports = router;