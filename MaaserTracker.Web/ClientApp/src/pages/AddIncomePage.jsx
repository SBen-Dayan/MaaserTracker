import { useState, useEffect } from 'react';
import { Container, TextField, Button, Autocomplete, Typography } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddIncomePage = () => {
    const navigate = useNavigate();
    const [selectedSource, setSelectedSource] = useState(null);
    const [sources, setSources] = useState([]);
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        (async function () {
            const { data } = await axios.get('/api/incomeSource/getAll');
            setSources(data);
        })();
    }, [])

    const onAddClick = async () => {
        await axios.post('/api/income/add', { amount, date, IncomeSourceId: +selectedSource.id });
        navigate('/income');
    }

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Income
            </Typography>
            <Autocomplete
                value={selectedSource}
                onChange={(_, source) => setSelectedSource(source)}
                options={sources}
                getOptionLabel={(option) => option.source}
                fullWidth
                margin="normal"
                renderInput={(params) => <TextField {...params} label="Source" variant="outlined" />}
            />
            <TextField
                label="Amount"
                variant="outlined"
                type="number"
                InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                fullWidth
                margin="normal"
                value={amount}
                onChange={e => setAmount(e.target.value)}
            />
            <TextField
                label="Date"
                type="date"
                value={dayjs(date).format('YYYY-MM-DD')}
                onChange={e => setDate(e.target.value)}
            // renderInput={(params) => <TextField {...params} fullWidth margin="normal" variant="outlined" />}
            />
            <Button variant="contained" color="primary" onClick={onAddClick}>Add Income</Button>
        </Container>
    );
}

export default AddIncomePage;
