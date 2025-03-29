import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import Header from '../MainUI/Header';
import { createAgentRun } from './toolhouse'; // <-- Import the API call
import axios from 'axios';
import { User } from '../../entities/User';

function AItinerary() {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [profile, setProfile] = useState("huh")
  const [loading, setLoading] = useState(true)

  async function testFunction() {
    const backendURL = process.env.REACT_APP_BACKEND_URL;

    try {
      const res = await axios.post(
        `${backendURL}/users/login`,
        { username: "yeelong", password: "password123" },
        { withCredentials: true }
      );
      setProfile(res.data.user);

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
      const activeuser = new User(profile)
      console.log(activeuser.printInfo())
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
        onClick={async () => await testFunction()}
        color="secondary"
        variant="outlined"
        style={{ margin: 20 }}
      >
        Test button
      </Button>
      <Button
        onClick={handleCreateAgentRun}
        color="secondary"
        variant="outlined"
        style={{ margin: 20 }}
      >
        Create AI Itinerary
      </Button>
    </Box>
  );
}

export default AItinerary;
