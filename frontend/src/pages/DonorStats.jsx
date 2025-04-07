import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import {
    Box, Typography, Paper, Grid, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#FFBB28'];

const DonorStats = () => {
    const [donors, setDonors] = useState([]);
    const [filteredDonors, setFilteredDonors] = useState([]);
    const [selectedBloodGroup, setSelectedBloodGroup] = useState('');

    const fetchDonors = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/donors');
            setDonors(res.data);
            setFilteredDonors(res.data);
        } catch (error) {
            console.error('Error fetching donor stats:', error);
        }
    };

    useEffect(() => {
        fetchDonors();
    }, []);

    useEffect(() => {
        if (selectedBloodGroup === '') {
            setFilteredDonors(donors);
        } else {
            const filtered = donors.filter(donor => donor.bloodType === selectedBloodGroup);
            setFilteredDonors(filtered);
        }
    }, [selectedBloodGroup, donors]);

    const bloodGroupCounts = filteredDonors.reduce((acc, donor) => {
        acc[donor.bloodType] = (acc[donor.bloodType] || 0) + 1;
        return acc;
    }, {});

    const ageGroupCounts = {
        '18-25': 0,
        '26-35': 0,
        '36-45': 0,
        '46+': 0
    };

    filteredDonors.forEach(donor => {
        const age = donor.age;
        if (age <= 25) ageGroupCounts['18-25']++;
        else if (age <= 35) ageGroupCounts['26-35']++;
        else if (age <= 45) ageGroupCounts['36-45']++;
        else ageGroupCounts['46+']++;
    });

    const bloodGroupData = Object.entries(bloodGroupCounts).map(([group, count]) => ({
        name: group,
        value: count
    }));

    const ageGroupData = Object.entries(ageGroupCounts).map(([group, count]) => ({
        ageGroup: group,
        donors: count
    }));

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Donor Statistics
            </Typography>

            <FormControl fullWidth sx={{ maxWidth: 300, mb: 3 }}>
                <InputLabel>Filter by Blood Group</InputLabel>
                <Select
                    value={selectedBloodGroup}
                    label="Filter by Blood Group"
                    onChange={(e) => setSelectedBloodGroup(e.target.value)}
                >
                    <MenuItem value="">All</MenuItem>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
                        <MenuItem key={group} value={group}>{group}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, height: 400 }}>
                        <Typography variant="h6" align="center">Blood Group Distribution</Typography>
                        <ResponsiveContainer width="100%" height="90%">
                            <PieChart>
                                <Pie
                                    data={bloodGroupData}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    label
                                >
                                    {bloodGroupData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, height: 400 }}>
                        <Typography variant="h6" align="center">Donors by Age Group</Typography>
                        <ResponsiveContainer width="100%" height="90%">
                            <BarChart data={ageGroupData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="ageGroup" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="donors" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DonorStats;
