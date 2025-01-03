import React from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Typography,
  Box
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold'
  }
}));

const StockList = ({ stocks, refreshStocks, selectStock }) => {
  const handleDelete = async (id) => {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/${id}`);
    refreshStocks();
  };

  const calculateChange = (buyPrice, latestPrice) => {
    if (!latestPrice) return null;
    return ((latestPrice - buyPrice) / buyPrice) * 100;
  };

  return (
    <Paper elevation={3}>
      <Box p={3}>
        <Typography variant="h5" gutterBottom>Stock Holdings</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Ticker</StyledTableCell>
                <StyledTableCell>Buy Price</StyledTableCell>
                <StyledTableCell>Latest Price</StyledTableCell>
                <StyledTableCell>Change</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stocks.map((stock) => {
                const change = calculateChange(stock.buyPrice, stock.latestPrice);
                return (
                  <TableRow 
                    key={stock._id}
                    sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
                  >
                    <TableCell>{stock.name}</TableCell>
                    <TableCell>
                      <Typography variant="body2" color="primary" fontWeight="bold">
                        {stock.ticker}
                      </Typography>
                    </TableCell>
                    <TableCell>${stock.buyPrice}</TableCell>
                    <TableCell>${stock.latestPrice || "N/A"}</TableCell>
                    <TableCell>
                      {change !== null && (
                        <Typography
                          color={change >= 0 ? "success.main" : "error.main"}
                          fontWeight="bold"
                        >
                          {change >= 0 ? "+" : ""}{change.toFixed(2)}%
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => selectStock(stock)}
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(stock._id)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  );
};

export default StockList;