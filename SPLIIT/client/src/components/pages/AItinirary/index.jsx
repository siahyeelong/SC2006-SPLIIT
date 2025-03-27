import React from 'react';
import { Box, Button } from '@mui/material';
import Header from '../MainUI/Header';
import { useExchangeRates } from '../../classes/ExchangeRates';
import { createAgentRun } from '../../services/toolhouseApi'; // <-- Import the API call

function AItinerary() {
  const { exchangeRates } = useExchangeRates();

  // Handler to test exchange rates (existing functionality)
  const handleTestExchangeRates = async () => {
    console.log(typeof exchangeRates['USD']);
  };

  // New handler to create the agent run for AI Itinerary
  const handleCreateAgentRun = async () => {
    try {
      const data = await createAgentRun(
        'th-LXz8d2HGQURqMkmkpCwg5qtpep8eodCVrRtbU7gxtGk', // API key
        'd0633f7d-57e2-4124-87b6-44125023d797', // chat ID
        { name: 'Alice' } // Variables to pass (you can change this as needed)
      );
      console.log('Agent run created:', data);
      // Handle the response data (e.g., update state, navigate, etc.)
    } catch (error) {
      console.error('Error creating agent run:', error);
    }
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="AItinerary" subtitle="work in progress" />
      </Box>
      <div>(work in progress)</div>
      <Button
        onClick={handleTestExchangeRates}
        color="secondary"
        variant="outlined"
        style={{ margin: 20 }}
      >
        Test Exchange Rates button
      </Button>
      <Button
        onClick={handleCreateAgentRun}
        color="primary"
        variant="outlined"
        style={{ margin: 20 }}
      >
        Create AI Itinerary
      </Button>
    </Box>
  );
}

export default AItinerary;
