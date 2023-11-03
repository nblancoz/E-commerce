const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const { authentication, isAdmin } = require("../middleware/authentication");

router.post("/create", authentication, isAdmin, ProductController.create);
router.put("/updateById/:id", authentication, isAdmin, ProductController.update)
router.delete("/deleteById/:id", authentication, isAdmin, ProductController.delete)
router.get("/getAll", ProductController.getAll)
router.get("/getById/:id", ProductController.getOneById)
router.get("/getByName/:name", ProductController.getOneByName)
router.get("/getByPrice/:price", ProductController.getByPrice)
// router.get("/sortByPrice", ProductController.sortByPrice) error

module.exports = router;