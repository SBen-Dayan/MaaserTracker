import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageSourcesPage = () => {
  const [incomeSources, setIncomeSources] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);
  const [selectedSource, setSelectedSource] = useState('');
  const [editingSource, setEditingSource] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    refreshSources();
  }, [])

  const refreshSources = async () => {
    const { data } = await axios.get('/api/incomeSource/getAll');
    setIncomeSources(data);
  }

  const handleOpen = (incomeSource = null) => {
    setOpen(true);
    setSelectedSource(incomeSource ? incomeSource.source : '');
    setEditingSource(incomeSource ? incomeSource.id : null);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSource('');
    setEditingSource(null);
  };

  const handleAddEdit = async () => {
    if (editingSource) {
      await axios.post('/api/incomeSource/edit', { id: +editingSource, source: selectedSource });
      refreshSources();
    } else {
      await axios.post('/api/incomeSource/add', { source: selectedSource });
      refreshSources();
    }
    handleClose();
  };

  const handleDelete = id => {
    setSelectedDeleteId(id);
    setConfirmOpen(true);
  };

  const onDeleteClick = async () => {
    if (!selectedDeleteId) {
      return;
    }
    await axios.post('/api/incomeSource/delete', { id: selectedDeleteId });
    setIncomeSources(incomeSources.filter(i => i.id !== selectedDeleteId));
    setConfirmOpen(false);
  }

  const handleConfirmClose = () => {
    setSelectedDeleteId(null);
    setConfirmOpen(false);
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <Button onClick={() => handleOpen()} variant="contained" color="primary" sx={{ minWidth: '200px' }}>
          Add Source
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
              <TableCell align="right" sx={{ fontSize: '18px' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incomeSources.map(incomeSource => (
              <TableRow key={incomeSource.id}>
                <TableCell sx={{ fontSize: '18px' }}>{incomeSource.source}</TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>
                  <Button color="primary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => handleOpen(incomeSource)}>Edit</Button>
                  <Button color="secondary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => handleDelete(incomeSource.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{editingSource ? 'Edit Source' : 'Add Source'}</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Source" type="text" fullWidth value={selectedSource} onChange={(e) => setSelectedSource(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddEdit} color="primary">
            {editingSource ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmOpen} onClose={handleConfirmClose} fullWidth maxWidth="sm">
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          This source has some income associated with it, are you sure you want to delete it?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onDeleteClick} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ManageSourcesPage;