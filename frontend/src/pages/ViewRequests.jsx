import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from '@mui/material';
import axios from 'axios';

const ViewRequests = () => {
    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/requests');
            setRequests(res.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await axios.put(`http://localhost:5000/api/requests/${id}`, { status });
            fetchRequests(); // Refresh the list
        } catch (error) {
            console.error('Error updating request status:', error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Blood Requests
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                        <TableRow>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Blood Group</strong></TableCell>
                            <TableCell><strong>Reason</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requests.length > 0 ? (
                            requests.map((req) => (
                                <TableRow key={req._id}>
                                    <TableCell>{req.name}</TableCell>
                                    <TableCell>{req.bloodGroup}</TableCell>
                                    <TableCell>{req.reason}</TableCell>
                                    <TableCell>{req.status}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            size="small"
                                            sx={{ mr: 1 }}
                                            disabled={req.status === 'approved'}
                                            onClick={() => updateStatus(req._id, 'approved')}
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            disabled={req.status === 'rejected'}
                                            onClick={() => updateStatus(req._id, 'rejected')}
                                        >
                                            Reject
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    No blood requests found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ViewRequests;
