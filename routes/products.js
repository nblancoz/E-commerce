const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const { authentication, isAdmin } = require("../middleware/authentication");

router.post("/create", authentication, isAdmin, ProductController.create);

module.exports = router;