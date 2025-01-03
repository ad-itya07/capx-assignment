const Stock = require("../models/Stock");
const axios = require("axios");

// Add Stock

const addStock = async (req, res) => {
  try {
    const { ticker } = req.body;

    // Validate ticker using Yahoo Finance
    try {
      await yahooFinance.quote(ticker);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Invalid or incorrect stock ticker." });
    }

    // If ticker is valid, proceed to add it
    const stock = await Stock.create(req.body);
    res.status(201).json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch All Stocks and Calculate Portfolio Value
const yahooFinance = require("yahoo-finance2").default;

// Fetch All Stocks and Calculate Portfolio Value
const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    const portfolio = await Promise.all(
      stocks.map(async (stock) => {
        try {
          // Fetch stock data from Yahoo Finance
          const quote = await yahooFinance.quote(stock.ticker);
          const latestPrice = quote.regularMarketPrice || null;

          return { ...stock._doc, latestPrice };
        } catch (error) {
          console.warn(`Failed to fetch price for ${stock.ticker}`);
          return { ...stock._doc, latestPrice: "N/A" };
        }
      })
    );
    res.json(portfolio);
  } catch (error) {
    console.error("Error in getStocks:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Update Stock
const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStock = await Stock.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Stock
const deleteStock = async (req, res) => {
  try {
    const { id } = req.params;
    await Stock.findByIdAndDelete(id);
    res.status(200).json({ message: "Stock deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addStock, getStocks, updateStock, deleteStock };
