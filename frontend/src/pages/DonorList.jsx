import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, IconButton, Typography, Box, TextField, InputAdornment,
    MenuItem, FormControl, InputLabel, Select
} from '@mui/material';
import { Delete, Edit, Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DonorList = () => {
    const [donors, setDonors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');

    const fetchDonors = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/donors');
            setDonors(res.data);
        } catch (error) {
            console.error('Error fetching donors:', error);
        }
    };

    const deleteDonor = async (id) => {
        if (window.confirm('Are you sure you want to delete this donor?')) {
            try {
                await axios.delete(`http://localhost:5000/api/donors/${id}`);
                fetchDonors();
            } catch (error) {
                console.error('Error deleting donor:', error);
            }
        }
    };

    const filteredDonors = donors.filter((donor) =>
        (donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            donor.bloodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
            donor.contact.includes(searchQuery)) &&
        (bloodGroup ? donor.bloodType === bloodGroup : true)
    );

    useEffect(() => {
        fetchDonors();
    }, []);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                All Donors
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        )
                    }}
                    fullWidth
                />
                <FormControl sx={{ minWidth: 160 }}>
                    <InputLabel>Blood Group</InputLabel>
                    <Select
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                        label="Blood Group"
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="A+">A+</MenuItem>
                        <MenuItem value="A-">A-</MenuItem>
                        <MenuItem value="B+">B+</MenuItem>
                        <MenuItem value="B-">B-</MenuItem>
                        <MenuItem value="O+">O+</MenuItem>
                        <MenuItem value="O-">O-</MenuItem>
                        <MenuItem value="AB+">AB+</MenuItem>
                        <MenuItem value="AB-">AB-</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Age</strong></TableCell>
                            <TableCell><strong>Blood Group</strong></TableCell>
                            <TableCell><strong>Contact</strong></TableCell>
                            <TableCell><strong>Address</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredDonors.map((donor) => (
                            <TableRow key={donor._id}>
                                <TableCell>{donor.name}</TableCell>
                                <TableCell>{donor.age}</TableCell>
                                <TableCell>{donor.bloodType}</TableCell>
                                <TableCell>{donor.contact}</TableCell>
                                <TableCell>{donor.address}</TableCell>
                                <TableCell>
                                    <IconButton
                                        component={Link}
                                        to={`/donors/edit/${donor._id}`}
                                        color="primary"
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => deleteDonor(donor._id)}
                                        color="error"
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filteredDonors.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    No donors found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default DonorList;
