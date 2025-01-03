import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const MetricCard = ({ title, value, icon }) => (
  <Card elevation={3} sx={{ height: '100%' }}>
    <CardContent>
      <Box display="flex" alignItems="center" marginBottom={2}>
        {icon}
        <Typography variant="h6" color="text.secondary" sx={{ ml: 1 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="div" fontWeight="bold">
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const Dashboard = ({ metrics }) => {
  return (
    <Grid container spacing={3} sx={{ marginBottom: 4 }}>
      <Grid item xs={12} md={6}>
        <MetricCard
          title="Total Portfolio Value"
          value={`$${metrics.totalValue.toLocaleString()}`}
          icon={<MonetizationOnIcon color="primary" sx={{ fontSize: 32 }} />}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <MetricCard
          title="Top Performing Stock"
          value={metrics.topStock || "N/A"}
          icon={<TrendingUpIcon color="success" sx={{ fontSize: 32 }} />}
        />
      </Grid>
    </Grid>
  );
};

export default Dashboard;