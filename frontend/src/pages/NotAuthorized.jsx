import React from 'react';
import { Box, Typography } from '@mui/material';

const NotAuthorized = () => (
    <Box sx={{ p: 5, textAlign: 'center' }}>
        <Typography variant="h4" color="error">Access Denied</Typography>
        <Typography>You are not authorized to view this page.</Typography>
    </Box>
);

export default NotAuthorized;
