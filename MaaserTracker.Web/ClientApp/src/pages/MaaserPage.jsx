import { useState, useEffect } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios';

const MaaserPage = () => {
  const [maaserPayments, setMaasers] = useState([]);

  useEffect(() => {
    (async function () {
      const { data } = await axios.get('/api/maaser/getAll');
      setMaasers(data);
    })();
  }, [])

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
      <Typography variant="h2" gutterBottom component="div">
        Maaser Payments History
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: '80%', width: '80%' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '18px' }}>Recipient</TableCell>
              <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
              <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {maaserPayments.map(({ id, recipient, amount, date }) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                  {recipient}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>${amount}</TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>{date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default MaaserPage;
