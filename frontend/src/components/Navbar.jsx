// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../context/AuthContext';
import { Button, AppBar, Toolbar, Typography } from '@mui/material';

const Navbar = () => {
    const { token, logout } = useContext(AuthContext);

    let user = null;
    try {
        if (token) {
            user = jwtDecode(token); 
        }
    } catch (err) {
        console.error("Error decoding token:", err.message);
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Blood Bank App
                </Typography>
                {user ? (
                    <>
                        <Typography variant="body1" sx={{ mr: 2 }}>
                            Welcome, {user.name || user.email}
                        </Typography>
                        <Button color="inherit" onClick={logout}>Logout</Button>
                    </>
                ) : (
                    <Typography variant="body1">Not logged in</Typography>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
