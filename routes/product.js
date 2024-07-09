const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const { authenticateAdminToken } = require("../middleware/auth");

// Create a product (admin only)
router.post("/", authenticateAdminToken, productController.createProduct);

// Get all products
router.get("/", productController.listProducts);

// Get a product by ID
router.get("/:id", productController.getProduct);

// Update a product by ID (admin only)
router.put("/:id", authenticateAdminToken, productController.updateProduct);

// Delete a product by ID (admin only)
router.delete("/:id", authenticateAdminToken, productController.deleteProduct);

module.exports = router;
