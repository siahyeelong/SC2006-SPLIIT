/**
 * Service for interacting with the Toolhouse AI API
 */

// Base URL for all Toolhouse API requests
const API_BASE_URL = 'https://api.toolhouse.ai/v1';

/**
 * Create a new agent run
 * @param {string} apiKey - Your Toolhouse API key
 * @param {string} chatId - The chat ID to use
 * @param {Object} vars - Variables to pass to the agent
 * @returns {Promise<Object>} - Data from the created agent run
 */
export async function createAgentRun(apiKey, chatId, vars = {}) {

  const url = `${API_BASE_URL}/agent-runs`;
  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  const body = JSON.stringify({
    chat_id: chatId,
    vars: vars,
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create agent run: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const responseData = await response.json();
    console.log('Agent run created:', responseData);

    // Extract the run ID from the nested data structure
    const runId = responseData.data?.id;

    if (!runId) {
      throw new Error('No run ID found in the response');
    }

    // Return both the full response and the extracted ID
    return {
      ...responseData,
      id: runId // Add the ID at the top level for convenience
    };
  } catch (error) {
    console.error('Exception in createAgentRun:', error);
    throw error;
  }
}

/**
 * Get details about an agent run
 * @param {string} apiKey - Your Toolhouse API key
 * @param {string} runId - The agent run ID
 * @returns {Promise<Object>} - Full run data
 */
export async function getAgentRun(apiKey, runId) {
  console.log('Getting details for run:', runId);

  const url = `${API_BASE_URL}/agent-runs/${runId}`;
  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to get run details: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const responseData = await response.json();

    // Log detailed results for debugging
    if (responseData.data) {
      console.log('Run status:', responseData.data.status);
      if (responseData.data.results && responseData.data.results.length > 0) {
        console.log('Run has results:', responseData.data.results.length);

        // Log all results for debugging
        responseData.data.results.forEach((result, index) => {
          console.log(`Result ${index}:`, result);

          // If the content is not a string, log its type for debugging
          if (result.content && typeof result.content !== 'string') {
            console.log(`Result ${index} content type:`, typeof result.content);
            if (Array.isArray(result.content)) {
              console.log(`Result ${index} content is array of length:`, result.content.length);
              result.content.forEach((item, i) => {
                console.log(`Result ${index} content[${i}]:`, item);
              });
            }
          }
        });

        // Find assistant responses
        const assistantResponses = responseData.data.results.filter(
          result => result.role === 'assistant'
        );

        if (assistantResponses.length > 0) {
          console.log('Found assistant responses:', assistantResponses.length);
          assistantResponses.forEach((resp, i) => {
            console.log(`Assistant response ${i}:`, resp);
          });
        } else {
          console.log('No assistant responses found in results');
        }
      } else {
        console.log('No results yet');
      }
    }

    return responseData;
  } catch (error) {
    console.error('Exception in getAgentRun:', error);
    throw error;
  }
}


/**
 * Get messages from an agent run
 * @param {string} apiKey - Your Toolhouse API key
 * @param {string} runId - The agent run ID
 * @returns {Promise<Array>} - Array of messages
 */
export async function getAgentMessages(apiKey, runId) {
  console.log('Getting messages for run:', runId);

  try {
    // First get the run details
    const runData = await getAgentRun(apiKey, runId);

    // Look for messages or results in the response
    let messages = [];

    // Check if there's a messages array
    if (runData.data?.messages && Array.isArray(runData.data.messages)) {
      messages = runData.data.messages.map(msg => ({
        ...msg,
        content: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)
      }));
    }
    // If there are no messages, but there are results, create messages from those
    else if (runData.data?.results && Array.isArray(runData.data.results)) {
      // If we have an initialMessage in vars, use it as the user message
      if (runData.data.vars && runData.data.vars.initialMessage) {
        messages.push({
          role: 'user',
          content: runData.data.vars.initialMessage
        });
      }

      // Add results as assistant messages
      for (const result of runData.data.results) {
        if (result.content) {
          messages.push({
            role: 'assistant',
            content: typeof result.content === 'string' ? result.content : JSON.stringify(result.content)
          });
        }
      }
    }

    console.log('Extracted messages:', messages);
    return messages;
  } catch (error) {
    console.error('Exception in getAgentMessages:', error);
    throw error;
  }
}

/**
 * Send a message to an agent run
 * @param {string} apiKey - Your Toolhouse API key
 * @param {string} runId - The agent run ID
 * @param {string} content - The message content
 * @returns {Promise<Object>} - Response data
 */
export async function sendMessageToAgent(apiKey, runId, content) {
  console.log('Sending message to run:', { runId, content });

  const url = `${API_BASE_URL}/agent-runs/${runId}`;
  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  const body = JSON.stringify({
    message: content
  });

  try {
    const response = await fetch(url, {
      method: 'PUT',  // Using PUT method as shown in the example
      headers,
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to send message: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const responseData = await response.json();
    console.log('Message sent successfully:', responseData);
    return responseData;
  } catch (error) {
    console.error('Exception in sendMessageToAgent:', error);
    throw error;
  }
}

/**
 * Get status of an agent run
 * @param {string} apiKey - Your Toolhouse API key
 * @param {string} runId - The agent run ID
 * @returns {Promise<Object>} - Status information
 */
export async function getAgentRunStatus(apiKey, runId) {
  try {
    const runData = await getAgentRun(apiKey, runId);
    return {
      status: runData.data?.status || 'unknown',
      fullResponse: runData
    };
  } catch (error) {
    console.error('Exception in getAgentRunStatus:', error);
    throw error;
  }
}