const express = require("express");
const {
  addStock,
  getStocks,
  updateStock,
  deleteStock,
} = require("../controllers/stockController");

const router = express.Router();

router.post("/", addStock); // Add Stock
router.get("/", getStocks); // Get All Stocks
router.put("/:id", updateStock); // Update Stock
router.delete("/:id", deleteStock); // Delete Stock

module.exports = router;
