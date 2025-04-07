import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    MenuItem
} from '@mui/material';
import axios from 'axios';

const EditDonor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        bloodType: '',
        contact: '',
        address: ''
    });

    const fetchDonor = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/donors/${id}`);
            setFormData(res.data);
        } catch (error) {
            console.error('Error fetching donor:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/donors/${id}`, formData);
            alert('Donor updated successfully!');
            navigate('/donors');
        } catch (error) {
            console.error('Error updating donor:', error);
            alert('Update failed');
        }
    };

    useEffect(() => {
        fetchDonor();
    }, []);

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Edit Donor
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Age"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        select
                        label="Blood Group"
                        name="bloodType"
                        value={formData.bloodType}
                        onChange={handleChange}
                        required
                    >
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
                            <MenuItem key={group} value={group}>
                                {group}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                    <Box mt={2}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Update Donor
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default EditDonor;
