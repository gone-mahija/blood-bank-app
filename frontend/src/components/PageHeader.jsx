import React from 'react';
import { Typography, Box } from '@mui/material';

const PageHeader = ({ title }) => {
    return (
        <Box sx={{ mb: 2, borderBottom: '1px solid #ddd', pb: 1 }}>
            <Typography variant="h4" fontWeight="bold">{title}</Typography>
        </Box>
    );
};

export default PageHeader;
