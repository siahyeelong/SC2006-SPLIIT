/**
 * Create an agent run with Toolhouse AI.
 * @param {string} toolhouseApiKey - Your Toolhouse API key.
 * @param {string} chatId - The chat ID for which to create the agent run.
 * @param {Object} vars - Variables to pass into the agent.
 * @returns {Promise<Object>} - The response data from the API.
 */
export async function createAgentRun(toolhouseApiKey, chatId, vars = { name: 'John Doe' }) {
    const url = 'https://api.toolhouse.ai/v1/agent-runs';
    const headers = {
      'Authorization': `Bearer ${toolhouseApiKey}`,
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
  
      return await response.json();
    } catch (error) {
      console.error('An error occurred while creating the agent run:', error);
      throw error;
    }
  }
  