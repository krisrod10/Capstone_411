const express = require("express");
const router = express.Router();

const controller = require("../controllers/contact");
const middleware = require("../middleware/auth");

router.get('/contacts', middleware.checkJWT, controller.getContacts);

router.get('/contacts/:id', middleware.checkJWT, controller.getContactById);

router.post("/contacts", middleware.checkJWT, controller.createContact);

router.put('/contacts/:id', middleware.checkJWT, controller.updateContact);

router.delete('/recipes/:id', middleware.checkJWT, controller.deleteContact);

module.exports = router;