import React, { useEffect, useState } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';
import { Container, Grid, Paper, Typography, Box, CircularProgress, Card, CardContent } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const { data } = await API.get('/reports/summary');
                setSummary(data);
            } catch (error) {
                console.error('Error fetching summary', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, []);

    if (loading) {
        return (
            <Box sx={{ minHeight: '100vh' }}>
                <Navbar />
                <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Container>
            </Box>
        );
    }

    const pieData = {
        labels: summary?.categoryBreakdown.map(item => item.category.name) || [],
        datasets: [
            {
                data: summary?.categoryBreakdown.map(item => item.total) || [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Navbar />
            <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
                <Typography variant="h4" sx={{ mb: 4, color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    Dashboard Overview
                </Typography>
                <Grid container spacing={4}>
                    {/* Total Expenses Card */}
                    <Grid item xs={12} md={4}>
                        <Paper
                            sx={{
                                p: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 260,
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <Box sx={{
                                position: 'absolute',
                                top: -20,
                                right: -20,
                                width: 100,
                                height: 100,
                                borderRadius: '50%',
                                background: 'linear-gradient(45deg, #007AFF 0%, #5856D6 100%)',
                                opacity: 0.1
                            }} />
                            <AccountBalanceWalletIcon sx={{ fontSize: 48, color: '#007AFF', mb: 2 }} />
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                Total Expenses (Month)
                            </Typography>
                            <Typography component="p" variant="h3" sx={{ fontWeight: 'bold' }}>
                                ${summary?.totalExpenses || 0}
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Visual Chart Card */}
                    <Grid item xs={12} md={8}>
                        <Paper
                            sx={{
                                p: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 400,
                                alignItems: 'center'
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 2 }}>
                                <TrendingUpIcon sx={{ mr: 1, color: '#5856D6' }} />
                                <Typography variant="h6" color="textPrimary">
                                    Spending Breakdown
                                </Typography>
                            </Box>
                            <Box sx={{ height: 300, width: '100%', display: 'flex', justifyContent: 'center' }}>
                                {summary?.categoryBreakdown?.length > 0 ? (
                                    <Pie data={pieData} options={{
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: 'right',
                                                labels: {
                                                    font: {
                                                        family: '-apple-system'
                                                    }
                                                }
                                            }
                                        }
                                    }} />
                                ) : (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                        <Typography color="textSecondary">No data available for this month.</Typography>
                                    </Box>
                                )}
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Dashboard;
