import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import PageHeader from '../components/PageHeader';

const Dashboard = () => {
    return (
        <Box sx={{ p: 3 }}>
            <PageHeader title="Dashboard" />

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>Total Donors</Typography>
                        <Typography variant="h4">100</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>Recent Donations</Typography>
                        <Typography variant="h4">25</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>Blood Requests</Typography>
                        <Typography variant="h4">8</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
