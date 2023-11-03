const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");
const { authentication, isAdmin } = require("../middleware/authentication");

router.post("/create", authentication, isAdmin, CategoryController.create);
router.get("/getAll", CategoryController.getAll)
router.put("/updateById/:id", authentication, isAdmin, CategoryController.update)
router.delete("/deleteById/:id", authentication, isAdmin, CategoryController.delete)
router.get("/getById/:id", CategoryController.getOneById)
router.get("/getByName/:name", CategoryController.getByName)

module.exports = router;