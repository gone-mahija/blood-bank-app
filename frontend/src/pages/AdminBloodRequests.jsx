import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container, Typography, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, Button
} from '@mui/material';

const AdminBloodRequests = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await axios.get('/api/requests'); // Update URL as needed
                setRequests(res.data);
            } catch (err) {
                console.error('Error fetching requests:', err);
            }
        };
        fetchRequests();
    }, []);

    const handleAction = async (id, status) => {
        try {
            await axios.put(`/api/requests/${id}`, { status });
            setRequests(prev =>
                prev.map(req => (req._id === id ? { ...req, status } : req))
            );
        } catch (err) {
            console.error('Error updating request status:', err);
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Blood Requests Management
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Blood Group</TableCell>
                            <TableCell>Units</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requests.map((req) => (
                            <TableRow key={req._id}>
                                <TableCell>{req.name}</TableCell>
                                <TableCell>{req.bloodGroup}</TableCell>
                                <TableCell>{req.units}</TableCell>
                                <TableCell>{req.status}</TableCell>
                                <TableCell>
                                    {req.status === 'Pending' && (
                                        <>
                                            <Button color="success" onClick={() => handleAction(req._id, 'Approved')}>Approve</Button>
                                            <Button color="error" onClick={() => handleAction(req._id, 'Rejected')}>Reject</Button>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default AdminBloodRequests;
