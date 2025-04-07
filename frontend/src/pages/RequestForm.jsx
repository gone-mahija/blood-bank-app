// src/pages/RequestForm.jsx

import React, { useState } from 'react';
import {
    Box, Button, TextField, MenuItem, Typography, Paper
} from '@mui/material';
import axios from 'axios';

const RequestForm = () => {
    const [formData, setFormData] = useState({
        patientName: '',
        bloodGroup: '',
        reason: '',
        quantity: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/requests', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Request submitted successfully!");
            setFormData({ patientName: '', bloodGroup: '', reason: '', quantity: '' });
        } catch (err) {
            console.error(err);
            alert("Error submitting request");
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 5 }}>
            <Typography variant="h5" gutterBottom>Request Blood</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Patient Name"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    select
                    fullWidth
                    label="Blood Group"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    margin="normal"
                    required
                >
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                        <MenuItem key={bg} value={bg}>{bg}</MenuItem>
                    ))}
                </TextField>
                <TextField
                    fullWidth
                    label="Reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Quantity (units)"
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                    Submit Request
                </Button>
            </form>
        </Paper>
    );
};

export default RequestForm;
