import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, CircularProgress } from '@mui/material';

const API_BASE_URL = 'https://api.toolhouse.ai/v1';

const ToolhouseDebug = ({ apiKey }) => {
  const [runId, setRunId] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const testEndpoint = async (endpoint, method = 'GET', body = null) => {
    setLoading(true);
    setError('');
    setResponse('');

    try {
      const url = `${API_BASE_URL}${endpoint}`;
      console.log(`Testing: ${method} ${url}`);

      const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      };

      const options = {
        method,
        headers,
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);
      const responseText = await response.text();

      try {
        const jsonResponse = JSON.parse(responseText);
        setResponse(JSON.stringify(jsonResponse, null, 2));
      } catch (e) {
        setResponse(responseText);
      }

      if (!response.ok) {
        setError(`Status: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testRunInfo = () => {
    if (!runId) return;
    testEndpoint(`/agent-runs/${runId}`);
  };

  const testSendMessageOptions = () => {
    if (!runId) return;

    // Test various message sending options
    const message = "This is a test message from the debugging tool";

    // Option 1
    testEndpoint(`/agent-runs/${runId}/input`, 'POST', { input: message });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Toolhouse API Debug</Typography>

      <Box sx={{ mb: 2 }}>
        <TextField
          label="Run ID"
          value={runId}
          onChange={(e) => setRunId(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            onClick={testRunInfo}
            disabled={!runId || loading}
          >
            Get Run Info
          </Button>

          <Button
            variant="outlined"
            onClick={testSendMessageOptions}
            disabled={!runId || loading}
            color="secondary"
          >
            Test Send Message
          </Button>
        </Box>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}

      {error && (
        <Paper sx={{ p: 2, mb: 2, bgcolor: 'error.light', color: 'error.dark' }}>
          <Typography variant="body2">{error}</Typography>
        </Paper>
      )}

      {response && (
        <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
          <Typography variant="subtitle2" gutterBottom>Response:</Typography>
          <pre style={{ whiteSpace: 'pre-wrap', overflowX: 'auto' }}>
            {response}
          </pre>
        </Paper>
      )}
    </Box>
  );
};

export default ToolhouseDebug;