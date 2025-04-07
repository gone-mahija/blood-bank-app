// src/components/Layout.jsx
import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Box,
    Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Layout = ({ children }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <Box sx={{ display: "flex" }}>
            {/* Sidebar */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
            >
                <Toolbar />
                <List>
                    <ListItem button onClick={() => navigate("/dashboard")}>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button onClick={() => navigate("/add-donor")}>
                        <ListItemText primary="Add Donor" />
                    </ListItem>
                    <ListItem button onClick={() => navigate("/donors")}>
                        <ListItemText primary="View Donors" />
                    </ListItem>
                </List>
            </Drawer>

            {/* Main content area */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: "background.default",
                    p: 3,
                    ml: `${drawerWidth}px`, // pushes content right of drawer
                }}
            >
                {/* Topbar */}
                <AppBar
                    position="fixed"
                    sx={{
                        width: `calc(100% - ${drawerWidth}px)`,
                        ml: `${drawerWidth}px`,
                    }}
                >
                    <Toolbar sx={{ justifyContent: "space-between" }}>
                        <Typography variant="h6" noWrap>
                            Blood Bank Management
                        </Typography>
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>

                {/* Space below AppBar */}
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
