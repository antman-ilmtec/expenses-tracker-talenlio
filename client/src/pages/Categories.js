import React, { useState, useEffect } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';
import { Container, Typography, Box, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Chip, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({ name: '', budget: '' });
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const { data } = await API.get('/categories');
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories', error);
        }
    };

    const handleOpen = (category = null) => {
        if (category) {
            setCurrentCategory(category);
            setIsEdit(true);
        } else {
            setCurrentCategory({ name: '', budget: '' });
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
                await API.put(`/categories/${currentCategory._id}`, currentCategory);
            } else {
                await API.post('/categories', currentCategory);
            }
            fetchCategories();
            handleClose();
        } catch (error) {
            console.error('Error saving category', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this category?')) {
            try {
                await API.delete(`/categories/${id}`);
                fetchCategories();
            } catch (error) {
                console.error('Error deleting category', error);
            }
        }
    };

    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Navbar />
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Paper sx={{ p: 4, mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                            Manage Categories
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => handleOpen()}
                            sx={{ borderRadius: '20px' }}
                        >
                            Add New
                        </Button>
                    </Box>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                        Click on a chip to edit. Click 'x' to delete.
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                        {categories.map((cat) => (
                            <Chip
                                key={cat._id}
                                label={`${cat.name} ($${cat.budget})`}
                                onDelete={() => handleDelete(cat._id)}
                                onClick={() => handleOpen(cat)}
                                icon={<AttachMoneyIcon />}
                                sx={{
                                    height: 'auto',
                                    py: 1,
                                    px: 0.5,
                                    fontSize: '0.95rem',
                                    borderRadius: '16px',
                                    background: 'rgba(255, 255, 255, 0.5)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.4)',
                                    '&:hover': {
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                    }
                                }}
                            />
                        ))}
                        {categories.length === 0 && (
                            <Typography color="textSecondary">No categories found. Add one to get started!</Typography>
                        )}
                    </Box>
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
                    <DialogTitle>{isEdit ? 'Edit Category' : 'New Category'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Category Name"
                            fullWidth
                            value={currentCategory.name}
                            onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
                            variant="outlined"
                        />
                        <TextField
                            margin="dense"
                            label="Monthly Budget ($)"
                            type="number"
                            fullWidth
                            value={currentCategory.budget}
                            onChange={(e) => setCurrentCategory({ ...currentCategory, budget: e.target.value })}
                            variant="outlined"
                        />
                    </DialogContent>
                    <DialogActions sx={{ p: 3 }}>
                        <Button onClick={handleClose} sx={{ color: 'text.secondary' }}>Cancel</Button>
                        <Button onClick={handleSubmit} variant="contained" disableElevation>
                            {isEdit ? 'Save Changes' : 'Create Category'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
};

export default Categories;
