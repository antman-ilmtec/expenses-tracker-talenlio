import React, { useState, useEffect } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';
import { Container, Typography, Box, Button, TextField, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select, InputLabel, FormControl, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentExpense, setCurrentExpense] = useState({ amount: '', date: '', description: '', categoryId: '' });
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        fetchExpenses();
        fetchCategories();
    }, []);

    const fetchExpenses = async () => {
        try {
            const { data } = await API.get('/expenses');
            setExpenses(data);
        } catch (error) {
            console.error('Error fetching expenses', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const { data } = await API.get('/categories');
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories', error);
        }
    };

    const handleOpen = (expense = null) => {
        if (expense) {
            setCurrentExpense({
                ...expense,
                date: new Date(expense.date).toISOString().split('T')[0],
                categoryId: expense.categoryId?._id || expense.categoryId
            });
            setIsEdit(true);
        } else {
            setCurrentExpense({ amount: '', date: new Date().toISOString().split('T')[0], description: '', categoryId: '' });
            setIsEdit(false);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        try {
            if (isEdit) {
                await API.put(`/expenses/${currentExpense._id}`, currentExpense);
            } else {
                await API.post('/expenses', currentExpense);
            }
            fetchExpenses();
            handleClose();
        } catch (error) {
            console.error('Error saving expense', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await API.delete(`/expenses/${id}`);
                fetchExpenses();
            } catch (error) {
                console.error('Error deleting expense', error);
            }
        }
    };

    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Navbar />
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
                    <Typography variant="h4" sx={{ color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        Expenses
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => handleOpen()}
                        sx={{ background: '#fff', color: '#007AFF', '&:hover': { background: '#f5f5f7' } }}
                    >
                        Add Expense
                    </Button>
                </Box>
                <Paper sx={{ overflow: 'hidden' }}>
                    <Table>
                        <TableHead sx={{ background: 'rgba(0,0,0,0.02)' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {expenses.map((expense) => (
                                <TableRow key={expense._id} hover>
                                    <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                                    <TableCell>{expense.description}</TableCell>
                                    <TableCell>
                                        <Box sx={{
                                            display: 'inline-block',
                                            px: 1.5, py: 0.5,
                                            borderRadius: '8px',
                                            background: 'rgba(0,122,255,0.1)',
                                            color: '#007AFF',
                                            fontSize: '0.85rem',
                                            fontWeight: 500
                                        }}>
                                            {expense.categoryId?.name || 'Uncategorized'}
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>${expense.amount}</TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" onClick={() => handleOpen(expense)} sx={{ mr: 1 }}>
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" color="error" onClick={() => handleDelete(expense._id)}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {expenses.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                                        No expenses recorded yet.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Paper>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        sx: {
                            borderRadius: '20px',
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(20px)'
                        }
                    }}
                >
                    <DialogTitle>{isEdit ? 'Edit Expense' : 'New Expense'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            label="Date"
                            type="date"
                            fullWidth
                            value={currentExpense.date}
                            onChange={(e) => setCurrentExpense({ ...currentExpense, date: e.target.value })}
                            InputLabelProps={{ shrink: true }}
                            variant="outlined"
                        />
                        <TextField
                            margin="dense"
                            label="Description"
                            fullWidth
                            value={currentExpense.description}
                            onChange={(e) => setCurrentExpense({ ...currentExpense, description: e.target.value })}
                            variant="outlined"
                        />
                        <TextField
                            margin="dense"
                            label="Amount"
                            type="number"
                            fullWidth
                            value={currentExpense.amount}
                            onChange={(e) => setCurrentExpense({ ...currentExpense, amount: e.target.value })}
                            variant="outlined"
                        />
                        <FormControl fullWidth margin="dense" variant="outlined">
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={currentExpense.categoryId}
                                label="Category"
                                onChange={(e) => setCurrentExpense({ ...currentExpense, categoryId: e.target.value })}
                            >
                                {categories.map((cat) => (
                                    <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions sx={{ p: 3 }}>
                        <Button onClick={handleClose} sx={{ color: 'text.secondary' }}>Cancel</Button>
                        <Button onClick={handleSubmit} variant="contained" disableElevation>{isEdit ? 'Update' : 'Add'}</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
};

export default Expenses;
