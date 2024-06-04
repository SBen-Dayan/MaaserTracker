import { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import axios from 'axios';

const OverviewPage = () => {
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    (async function () {
      const { data } = await axios.get('/api/overview/get');
      setOverview(data);
    })();
  }, [])

  return overview &&
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        textAlign: 'center',
        marginTop: 15
      }}
    >
      <Paper elevation={3} sx={{ padding: '120px', borderRadius: '15px' }}>
        <Typography variant="h2" gutterBottom>
          Overview
        </Typography>
        <Box sx={{ marginBottom: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Total Income: ${overview.totalIncome.toFixed(2)}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Total Maaser: ${overview.totalMaaser.toFixed(2)}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" gutterBottom>
            Maaser Obligated: ${overview.maaserObligated.toFixed(2)}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Remaining Maaser obligation: ${overview.remainingObligation > 0 ? overview.remainingObligation.toFixed(2) : 0}
          </Typography>
        </Box>
      </Paper>
    </Container>
}

export default OverviewPage;
