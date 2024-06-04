import { useState, useEffect } from 'react';
import { Checkbox, Container, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios';

const groupIncomes = incomes => {
  const uniqueSources = [];
  const result = {};
  incomes.forEach(({ id, amount, date, incomeSource: { source } }) => {
    if (!uniqueSources.includes(source)) {
      uniqueSources.push(source);
      result[source] = [{ id, source: source, amount, date }];
    } else {
      result[source] = [...result[source], { id, source: source, amount, date }];
    }
  })
  return result;
}

const IncomePage = () => {
  const [groupBySource, setGroupBySource] = useState(false);
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    (async function () {
      const { data } = await axios.get('/api/income/getAll');
      setIncomes(data);
    })();
  }, [])

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
      <Typography variant="h2" gutterBottom component="div">
        Income History
      </Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={groupBySource}
            onChange={(event) => setGroupBySource(event.target.checked)}
            name="checkedB"
            color="primary"
          />
        }
        label="Group by source"
      />

      {!groupBySource ? (
        <TableContainer component={Paper} sx={{ maxWidth: '80%', width: '80%' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incomes.map(({ id, amount, date, incomeSource }) => (
                <TableRow key={id}>
                  <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                    {incomeSource.source}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: '18px' }}>${amount}</TableCell>
                  <TableCell align="right" sx={{ fontSize: '18px' }}>{date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        Object.entries(groupIncomes(incomes)).map(([key, incomeValues]) => {
          return <div key={key} sx={{ width: '80%', maxWidth: '80%' }}>
            <Typography variant="h5" gutterBottom component="div" sx={{ mt: 5 }}>
              {key}
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
                    <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                    <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {incomeValues.map(({ id, amount, date, source }) => (
                    <TableRow key={id}>
                      <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                        {source}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: '18px' }}>${amount}</TableCell>
                      <TableCell align="right" sx={{ fontSize: '18px' }}>{date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        })
      )}
    </Container>
  );
}

export default IncomePage;
