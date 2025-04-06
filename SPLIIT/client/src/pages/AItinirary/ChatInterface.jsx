import React, { useState, useEffect, useRef } from "react";
import {
    Box,
    TextField,
    Button,
    Paper,
    Typography,
    CircularProgress,
    useTheme,
} from "@mui/material";
import ChatMessage from "./ChatMessage";
import {
    createAgentRun,
    getAgentRun,
    sendMessageToAgent,
} from "../../services/toolhouseService";

<<<<<<< HEAD
<<<<<<< HEAD
const ChatInterface = ({ chatId, subtitleColor }) => {
=======
const ChatInterface = ({ apiKey, chatId, userId, subtitleColor }) => {
>>>>>>> 1227d8d (Restructure folders)
=======
const ChatInterface = ({ chatId, subtitleColor }) => {
>>>>>>> 0c27676 (fixed login incorrect password issue)
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [runId, setRunId] = useState(null);
    const [error, setError] = useState(null);
    const [pollingInterval, setPollingInterval] = useState(null);
    const [runStatus, setRunStatus] = useState("");
<<<<<<< HEAD
    const [isProcessing, setIsProcessing] = useState(false); // New state to track if a response is being processed
    const messagesEndRef = useRef(null);
    const apiKey = process.env.REACT_APP_AITINERARY_API_KEY;
<<<<<<< HEAD
=======
    const messagesEndRef = useRef(null);
>>>>>>> 1227d8d (Restructure folders)
=======
>>>>>>> 0c27676 (fixed login incorrect password issue)

    // Auto-scroll to bottom when messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Setup polling for messages when runId changes
    useEffect(() => {
        if (runId) {
            startPolling();
        }

        return () => {
            // Cleanup polling on unmount
            if (pollingInterval) {
                clearInterval(pollingInterval);
            }
        };
    }, [runId]);

    // Initialize the agent when component mounts
    useEffect(() => {
        // Initialize the agent immediately
        initializeAgent();
    }, []);

    // New function to initialize the agent without requiring user input
    const initializeAgent = async () => {
        setLoading(true);
        setError(null);

        try {
            // Create a new agent run with welcome message
            const data = await createAgentRun(apiKey, chatId, {
                initialMessage:
                    "Hello, I'd like help planning a travel itinerary",
            });

            // Store the run ID for future messages
            setRunId(data.id);

            // Add a welcome message to the UI
            setMessages([
                {
                    role: "assistant",
                    content:
                        "Welcome to AItinerary! I'm your AI travel planning assistant. How can I help you plan your trip today?",
                },
            ]);
        } catch (err) {
            console.error("Failed to initialize agent:", err);
            setError("Failed to start the travel assistant. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const startPolling = (isFirstMessage = true) => {
        // Clear any existing interval
        if (pollingInterval) {
            clearInterval(pollingInterval);
        }

<<<<<<< HEAD
        // Set processing state to true when polling starts
        setIsProcessing(true);

=======
>>>>>>> 1227d8d (Restructure folders)
        // If this is a new message, add a processing indicator
        if (!isFirstMessage) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { role: "assistant", content: "Processing your message..." },
            ]);
        }

        // Create a new polling interval
        const interval = setInterval(async () => {
            try {
                // Get run status
                const runData = await getAgentRun(apiKey, runId);
                const status = runData.data?.status || "unknown";
                setRunStatus(status);

                console.log("Current run status:", status);

                // If the run is completed or failed, get the results
                if (status === "completed" || status === "failed") {
                    clearInterval(interval);
                    setPollingInterval(null);
<<<<<<< HEAD
                    // Set processing state to false when done
                    setIsProcessing(false);
=======
>>>>>>> 1227d8d (Restructure folders)

                    // Check for results
                    const results = runData.data?.results || [];

                    if (results.length > 0) {
                        // Find the assistant's response (look for role === 'assistant')
                        const assistantResponses = results.filter(
                            (result) => result.role === "assistant"
                        );

                        if (assistantResponses.length > 0) {
                            // Get the latest assistant response
                            const latestResponse =
                                assistantResponses[
<<<<<<< HEAD
<<<<<<< HEAD
                                assistantResponses.length - 1
=======
                                    assistantResponses.length - 1
>>>>>>> 1227d8d (Restructure folders)
=======
                                assistantResponses.length - 1
>>>>>>> 0c27676 (fixed login incorrect password issue)
                                ];

                            // Extract the content - handle nested structure
                            let responseContent = "";

                            if (latestResponse.content) {
                                if (
                                    Array.isArray(latestResponse.content) &&
                                    latestResponse.content.length > 0
                                ) {
                                    // Content is an array - common in Toolhouse API
                                    const contentItem =
                                        latestResponse.content[0];

                                    if (contentItem.text) {
                                        // Structure is { content: [{ text: "...", type: "text" }] }
                                        responseContent = contentItem.text;
                                    } else {
                                        // Just use the first item if it's a string
                                        responseContent =
                                            typeof contentItem === "string"
                                                ? contentItem
                                                : JSON.stringify(contentItem);
                                    }
                                } else if (
                                    typeof latestResponse.content === "string"
                                ) {
                                    // Content is already a string
                                    responseContent = latestResponse.content;
                                } else {
                                    // Content is some other structure, convert to string
                                    responseContent = JSON.stringify(
                                        latestResponse.content
                                    );
                                }
                            }

                            // Update the messages array
                            setMessages((prevMessages) => {
                                // If this is a follow-up message, replace the "Processing..." message
                                if (!isFirstMessage) {
                                    return prevMessages.map((msg) => {
                                        if (
                                            msg.role === "assistant" &&
                                            (msg.content ===
                                                "Processing your request..." ||
                                                msg.content ===
<<<<<<< HEAD
<<<<<<< HEAD
                                                "Processing your message...")
=======
                                                    "Processing your message...")
>>>>>>> 1227d8d (Restructure folders)
=======
                                                "Processing your message...")
>>>>>>> 0c27676 (fixed login incorrect password issue)
                                        ) {
                                            return {
                                                role: "assistant",
                                                content: responseContent,
                                            };
                                        }
                                        return msg;
                                    });
                                } else {
                                    // For first message, just add the response
                                    return [
                                        ...prevMessages,
                                        {
                                            role: "assistant",
                                            content: responseContent,
                                        },
                                    ];
                                }
                            });
                        } else {
                            // No assistant response found, try other approaches
                            console.error(
                                "No assistant responses found in results"
                            );
                            setError(
                                "No response found from the AI assistant. Please try again."
                            );
                        }
                    } else {
                        // No results found
                        setError(
                            "No response received from the AI assistant. Please try again."
                        );
                    }
                } else if (status === "failed") {
                    clearInterval(interval);
                    setPollingInterval(null);
<<<<<<< HEAD
                    setIsProcessing(false); // Set processing state to false on failure
                    setError("The request failed. Please try again.");
                }
                // Keep polling if status is still "in_progress"
=======
                    setError("The request failed. Please try again.");
                }
>>>>>>> 1227d8d (Restructure folders)
            } catch (err) {
                console.error("Error polling data:", err);
                setError("Failed to update conversation. Please try again.");
                clearInterval(interval);
                setPollingInterval(null);
<<<<<<< HEAD
                setIsProcessing(false); // Set processing state to false on error
=======
>>>>>>> 1227d8d (Restructure folders)
            }
        }, 3000); // Poll every 3 seconds

        setPollingInterval(interval);
    };

    const sendMessage = async () => {
<<<<<<< HEAD
        if (!input.trim() || !runId || isProcessing) return;
=======
        if (!input.trim() || !runId) return;
>>>>>>> 1227d8d (Restructure folders)

        // Add user message to UI immediately
        setMessages((prevMessages) => [
            ...prevMessages,
            { role: "user", content: input },
        ]);
        const currentMessage = input;
        setInput("");
        setLoading(true);
        setError(null);

        try {
<<<<<<< HEAD
            // First check if the run is completed (we can only send messages to completed runs)
            const runData = await getAgentRun(apiKey, runId);
            const status = runData.data?.status || "unknown";
            
            if (status === "completed") {
                // If completed, send the message
                await sendMessageToAgent(apiKey, runId, currentMessage);
                
                // Restart polling to get the new response
                startPolling(false); // Pass false to indicate this is not the first message
            } else if (status === "in_progress") {
                // Cannot send message to in-progress run
                setError("Please wait for the AI to finish responding before sending another message.");
                
                // Remove the user message we just added
                setMessages(prevMessages => prevMessages.slice(0, -1));
                
                // Put the message back in the input field
                setInput(currentMessage);
            } else {
                // For other statuses, try creating a new run
                setError("Creating a new conversation since the previous one cannot be continued.");
                
                const data = await createAgentRun(apiKey, chatId, {
                    initialMessage: currentMessage,
                });
                
                setRunId(data.id);
                
                // Start polling for the new run
                startPolling(false);
            }
        } catch (err) {
            console.error("Failed to send message:", err);
            setError("Failed to send message. Please try again.");
            
            // Remove the user message we just added
            setMessages(prevMessages => prevMessages.slice(0, -1));
            
            // Put the message back in the input field
            setInput(currentMessage);
=======
            // Send message to agent
            await sendMessageToAgent(apiKey, runId, currentMessage);

            // Restart polling to get the new response
            startPolling(false); // Pass false to indicate this is not the first message
        } catch (err) {
            console.error("Failed to send message:", err);
            setError("Failed to send message. Please try again.");
>>>>>>> 1227d8d (Restructure folders)
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

<<<<<<< HEAD
    // Helper text for the input field
    const getInputHelperText = () => {
        if (isProcessing) {
            return "Waiting for AI to finish responding...";
        }
        return "";
    };

=======
>>>>>>> 1227d8d (Restructure folders)
    return (
        <Box sx={{ height: "70vh", display: "flex", flexDirection: "column" }}>
            {/* Chat messages area */}
            <Paper
                elevation={3}
                sx={{
                    flexGrow: 1,
                    p: 2,
                    mb: 2,
                    overflow: "auto",
                    bgcolor: isDarkMode ? "background.default" : "grey.50",
                    borderColor: isDarkMode ? "divider" : "grey.300",
                    borderWidth: 1,
                    borderStyle: "solid",
                }}
            >
                {messages.length === 0 ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                        }}
                    >
                        <CircularProgress size={24} />
                        <Typography color="text.secondary" sx={{ ml: 2 }}>
                            Initializing travel assistant...
                        </Typography>
                    </Box>
                ) : (
                    messages.map((msg, index) => (
                        <ChatMessage key={index} message={msg} />
                    ))
                )}

                {/* Error message if needed */}
                {error && (
                    <Box
                        sx={{
                            p: 2,
                            mb: 2,
                            bgcolor: isDarkMode ? "error.dark" : "error.light",
                            borderRadius: 1,
                            color: isDarkMode
                                ? "error.contrastText"
                                : "error.dark",
                        }}
                    >
                        <Typography>{error}</Typography>
                    </Box>
                )}

                <div ref={messagesEndRef} />
            </Paper>

            {/* Input area */}
            <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                    fullWidth
                    multiline
                    maxRows={4}
<<<<<<< HEAD
                    placeholder={isProcessing ? "Waiting for AI response..." : "Enter your travel plans or questions..."}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={loading || isProcessing} // Disable when processing
                    variant="outlined"
                    helperText={getInputHelperText()}
=======
                    placeholder="Enter your travel plans or questions..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={loading}
                    variant="outlined"
>>>>>>> 1227d8d (Restructure folders)
                    sx={{
                        bgcolor: isDarkMode
                            ? "background.paper"
                            : "background.paper",
                    }}
                />

                <Button
                    variant="contained"
                    onClick={sendMessage}
<<<<<<< HEAD
                    disabled={!input.trim() || loading || isProcessing} // Disable when processing
=======
                    disabled={!input.trim() || loading}
>>>>>>> 1227d8d (Restructure folders)
                    sx={{
                        bgcolor:
                            subtitleColor ||
                            (isDarkMode ? "primary.main" : "primary.main"),
                        "&:hover": {
                            bgcolor: subtitleColor
                                ? isDarkMode
                                    ? `${subtitleColor}CC`
                                    : `${subtitleColor}DD`
                                : isDarkMode
<<<<<<< HEAD
<<<<<<< HEAD
                                    ? "primary.dark"
                                    : "primary.dark",
=======
                                ? "primary.dark"
                                : "primary.dark",
>>>>>>> 1227d8d (Restructure folders)
=======
                                    ? "primary.dark"
                                    : "primary.dark",
>>>>>>> 0c27676 (fixed login incorrect password issue)
                        },
                    }}
                >
                    {loading ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        "Send"
                    )}
                </Button>
            </Box>
        </Box>
    );
};

<<<<<<< HEAD
export default ChatInterface;
=======
export default ChatInterface;
>>>>>>> 1227d8d (Restructure folders)
