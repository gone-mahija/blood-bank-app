import React, { useState } from 'react';
import {
    Box, TextField, Button, Typography, MenuItem
} from '@mui/material';
import axios from 'axios';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const AddRequest = () => {
    const [formData, setFormData] = useState({
        patientName: '',
        bloodGroup: '',
        units: '',
        hospital: '',
        reason: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/requests', formData);
            alert('Request submitted!');
            setFormData({
                patientName: '',
                bloodGroup: '',
                units: '',
                hospital: '',
                reason: ''
            });
        } catch (err) {
            console.error('Request error:', err);
        }
    };

    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
            <Typography variant="h5" gutterBottom>Blood Request Form</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth label="Patient Name" name="patientName"
                    value={formData.patientName} onChange={handleChange}
                    margin="normal" required
                />
                <TextField
                    select fullWidth label="Blood Group" name="bloodGroup"
                    value={formData.bloodGroup} onChange={handleChange}
                    margin="normal" required
                >
                    {bloodGroups.map((group) => (
                        <MenuItem key={group} value={group}>{group}</MenuItem>
                    ))}
                </TextField>
                <TextField
                    fullWidth label="Units Required" name="units"
                    type="number" value={formData.units} onChange={handleChange}
                    margin="normal" required
                />
                <TextField
                    fullWidth label="Hospital" name="hospital"
                    value={formData.hospital} onChange={handleChange}
                    margin="normal" required
                />
                <TextField
                    fullWidth label="Reason" name="reason"
                    value={formData.reason} onChange={handleChange}
                    margin="normal" multiline rows={3}
                />
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                    Submit Request
                </Button>
            </form>
        </Box>
    );
};

export default AddRequest;
