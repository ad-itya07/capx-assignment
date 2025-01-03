// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Box, Typography, useTheme } from "@mui/material";
import Dashboard from "./components/Dashboard";
import StockForm from "./components/StockForm";
import StockList from "./components/StockList";
import BackgroundWave from "./components/BackgroundWave";

const App = () => {
  const theme = useTheme();
  const [stocks, setStocks] = useState([]);
  const [metrics, setMetrics] = useState({ totalValue: 0, topStock: "" });
  const [selectedStock, setSelectedStock] = useState(null);

  const fetchStocks = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}`);
    setStocks(response.data);

    const totalValue = response.data.reduce(
      (acc, stock) => acc + (stock.latestPrice || 0) * stock.quantity,
      0
    );

    const topStock = response.data
      .filter((stock) => stock.latestPrice !== null)
      .sort((a, b) => b.latestPrice - a.latestPrice)[0]?.name;

    setMetrics({ totalValue, topStock });
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        paddingTop: 3,
        paddingBottom: 3,
        position: "relative",
        "&::before": {
          content: '""',
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: 'url("https://i.ibb.co/vBDC8cZ/stock-market.jpg")', // This is a placeholder image
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.9,
          zIndex: -1,
        },
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h1"
          sx={{
            marginBottom: 4,
            fontWeight: "bold",
            color: "#FFFFFF", // Bright white for the best contrast
            fontFamily: '"Roboto", "Arial", sans-serif', // Modern, clean font
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Optional: adds a subtle shadow for more emphasis
            textAlign: "center",
          }}
        >
          Portfolio Tracker
        </Typography>

        <Dashboard metrics={metrics} />
        <StockForm
          selectedStock={selectedStock}
          refreshStocks={fetchStocks}
          clearSelection={() => setSelectedStock(null)}
        />
        <StockList
          stocks={stocks}
          refreshStocks={fetchStocks}
          selectStock={(stock) => setSelectedStock(stock)}
        />
      </Container>
    </Box>
  );
};

export default App;
