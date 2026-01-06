import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CategoryIcon from '@mui/icons-material/Category';

const Navbar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    const navButtonStyle = (path) => ({
        mx: 1,
        background: isActive(path) ? 'rgba(0, 122, 255, 0.1)' : 'transparent',
        color: isActive(path) ? '#007AFF' : 'inherit',
        '&:hover': {
            background: 'rgba(0, 122, 255, 0.2)',
        }
    });

    return (
        <AppBar position="static" color="transparent" elevation={0} sx={{
            borderBottom: '1px solid rgba(255,255,255,0.3)',
            mb: 3
        }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: '-0.5px' }}>
                    Expense Tracker
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        startIcon={<DashboardIcon />}
                        component={Link}
                        to="/dashboard"
                        sx={navButtonStyle('/dashboard')}
                    >
                        Dashboard
                    </Button>
                    <Button
                        startIcon={<ReceiptIcon />}
                        component={Link}
                        to="/expenses"
                        sx={navButtonStyle('/expenses')}
                    >
                        Expenses
                    </Button>
                    <Button
                        startIcon={<CategoryIcon />}
                        component={Link}
                        to="/categories"
                        sx={navButtonStyle('/categories')}
                    >
                        Categories
                    </Button>
                    <IconButton
                        color="error"
                        onClick={handleLogout}
                        sx={{ ml: 2, background: 'rgba(255, 59, 48, 0.1)', '&:hover': { background: 'rgba(255, 59, 48, 0.2)' } }}
                    >
                        <LogoutIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
