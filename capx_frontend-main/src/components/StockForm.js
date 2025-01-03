import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Alert
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

const StockForm = ({ selectedStock, refreshStocks, clearSelection }) => {
  const [stock, setStock] = useState({ name: "", ticker: "", buyPrice: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedStock) {
      setStock(selectedStock);
    }
  }, [selectedStock]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      if (stock._id) {
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/${stock._id}`,
          stock
        );
      } else {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}`, stock);
      }
      refreshStocks();
      setStock({ name: "", ticker: "", buyPrice: 0 });
      clearSelection();
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message); // Set error message from backend
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <Card elevation={3} sx={{ marginBottom: 4, padding: 2 }}>
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ display: "flex", alignItems: "center" }}
        >
          {stock._id ? <EditIcon sx={{ mr: 1 }} /> : <AddIcon sx={{ mr: 1 }} />}
          {stock._id ? "Edit Stock" : "Add New Stock"}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Stock Name"
                value={stock.name}
                onChange={(e) => setStock({ ...stock, name: e.target.value })}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Ticker"
                value={stock.ticker}
                onChange={(e) => setStock({ ...stock, ticker: e.target.value })}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Buy Price"
                type="number"
                value={stock.buyPrice}
                onChange={(e) =>
                  setStock({ ...stock, buyPrice: e.target.value })
                }
                fullWidth
                required
                variant="outlined"
                InputProps={{
                  startAdornment: "$",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  startIcon={stock._id ? <EditIcon /> : <AddIcon />}
                  sx={{
                    flex: 1,
                    ":hover": { backgroundColor: "#0056b3" },
                  }}
                >
                  {stock._id ? "Update Stock" : "Add Stock"}
                </Button>
                {stock._id && (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      clearSelection();
                      setStock({ name: "", ticker: "", buyPrice: 0 });
                    }}
                    sx={{
                      ":hover": { backgroundColor: "#f8f9fa" },
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StockForm;
