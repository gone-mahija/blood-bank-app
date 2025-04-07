import React, { useState } from "react";
import {
    TextField,
    Button,
    Container,
    Typography,
    MenuItem,
    Box,
    Paper,
} from "@mui/material";
import Layout from "../components/Layout";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const AddDonor = () => {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        bloodType: "",
        contact: "",
        address: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const res = await fetch("http://localhost:5000/api/donors", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // ✅ Auth header
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Donor added successfully!");
                setFormData({ name: "", age: "", bloodGroup: "", contact: "", address: "" });
            } else {
                alert(data.message || "Failed to add donor.");
            }
        } catch (error) {
            console.error("Error adding donor:", error);
            alert("Something went wrong!");
        }
    };


    return (
        <Layout>
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Add New Donor
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />

                        <TextField
                            fullWidth
                            label="Age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            margin="normal"
                            type="number"
                            required
                        />

                        <TextField
                            fullWidth
                            select
                            label="Blood Group"
                            name="bloodType"
                            value={formData.bloodType}
                            onChange={handleChange}
                            margin="normal"
                            required
                        >
                            {bloodGroups.map((group) => (
                                <MenuItem key={group} value={group}>
                                    {group}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            fullWidth
                            label="Contact Number"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />

                        <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            margin="normal"
                            multiline
                            rows={3}
                            required
                        />

                        <Box mt={2}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Add Donor
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Container>
        </Layout>
    );
};

export default AddDonor;
