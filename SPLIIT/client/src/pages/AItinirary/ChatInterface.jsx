import React, { useState, useEffect, useRef, useContext } from "react";
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
import { AuthContext } from "../../contexts/AuthContext";

const ChatInterface = ({ chatId, subtitleColor }) => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";
    const { trip } = useContext(AuthContext);

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [runId, setRunId] = useState(null);
    const [error, setError] = useState(null);
    const [pollingInterval, setPollingInterval] = useState(null);
    const [runStatus, setRunStatus] = useState("");
    const [sentTripDetails, setSentTripDetails] = useState(false);

    const messagesEndRef = useRef(null);
    const initialCheckIntervalRef = useRef(null);
    const result1CountRef = useRef(0);
    const sendingTripDetailsRef = useRef(false);
    const hasInitializedRef = useRef(false);
    const isMountedRef = useRef(true);

    const apiKey = process.env.REACT_APP_AITINERARY_API_KEY;

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    // Auto-scroll to bottom when messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Cleanup all intervals on unmount
    useEffect(() => {
        return () => {
            if (pollingInterval) {
                clearInterval(pollingInterval);
            }
            if (initialCheckIntervalRef.current) {
                clearInterval(initialCheckIntervalRef.current);
                initialCheckIntervalRef.current = null;
            }
        };
    }, [pollingInterval]);

    useEffect(() => {
        if (!hasInitializedRef.current) {
            console.log("Initializing agent for the first time");
            hasInitializedRef.current = true;
            initializeAgent();
        }
    }, []);

    useEffect(() => {
        return () => {
            // Reset the sending flag when component unmounts
            sendingTripDetailsRef.current = false;
        };
    }, []);

    // Function to generate trip details message
    const generateTripDetailsMessage = () => {
        if (trip) {
            const tripName = trip.tripName
            const startDate = new Date(trip.startDate).toLocaleDateString();
            const endDate = new Date(trip.endDate).toLocaleDateString();
            const durationDays = Math.ceil(
                (new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24)
            ) + 1;
            const destinations = trip.cities;
            const budget = `${trip.budget} ${trip.localCurrency}`;
            const numPeople = trip.users.length;

            return `You are a travel planning assistant that helps create personalized, detailed itineraries.

TRIP DETAILS:
- Trip name: ${tripName}
- Destination: ${destinations}
- Travel dates: ${startDate} to ${endDate} (${durationDays} days)
- Budget per person: ${trip.localCurrency} ${budget}
- Number of travelers: ${numPeople}

IMMEDIATE ACTION REQUIRED:
Based only on the information above, generate a complete itinerary for the entire ${durationDays}-day trip. Don't ask for additional information before providing this full itinerary. Include specific attractions, restaurants, and accommodations with estimated costs and times for each day.

After providing the complete itinerary, you may then ask if the user would like to refine or adjust any aspects of the plan.

YOUR CAPABILITIES:
1. Recommend specific destinations based on user preferences and interests
2. Create realistic day-by-day itineraries with time-specific activities
3. Suggest accommodations, restaurants, and activities with price ranges
4. Provide budget estimates for all components of the trip
5. Include local transportation options and logistics between activities

IMPORTANT CONSIDERATIONS:
- TIMING: Consider realistic travel times, arrival times, and average visit durations
- GEOGRAPHY: Group activities by proximity - plan activities within the same region each day
- PACING: Include rest breaks and downtime; don't overpack each day
- LOGISTICS: Recommend transportation between locations (public transit, walking, rideshare)
- HOURS OF OPERATION: Only suggest attractions and restaurants when they're actually open
- DAILY END TIME: Unless the final item is a night event, ensure travelers return to accommodations before midnight
- LOCAL CONTEXT: Consider weather patterns, seasonal events, and potential crowds for the travel dates
- BUDGET MANAGEMENT: Distribute expenses evenly throughout the trip

FORMAT REQUIREMENTS:
- Use clear hierarchical headings (day numbers, morning/afternoon/evening)
- Create structured lists for activities with bullet points
- Include estimated times, durations, and costs where applicable
- Use emphasis (bold/italic) for important information and highlights
- Format using Markdown for readability and structure

Begin by acknowledging that you've received these trip details and are ready to help the traveler plan their perfect itinerary.`;
        } else {
            return "I need help planning a trip. Can you ask me for details about my destination, dates, and preferences?";
        }
    };

    // Function to send trip details automatically
    const sendTripDetails = async () => {
        // Add detailed logging to diagnose the issue
        console.log("sendTripDetails called with:", {
            sentTripDetails,
            runId: runId || "missing",
            isMounted: isMountedRef.current,
            tripAvailable: !!trip
        });

        if (sentTripDetails || !runId || !isMountedRef.current) {
            console.log("Skipping sendTripDetails due to:", {
                alreadySent: sentTripDetails,
                noRunId: !runId,
                notMounted: !isMountedRef.current
            });
            return;
        }

        console.log("Sending trip details automatically");
        const tripDetailsMessage = generateTripDetailsMessage();
        console.log("Generated trip details message of length:", tripDetailsMessage.length);

        try {
            // Add message to UI first
            setMessages(prev => [...prev, { role: "user", content: tripDetailsMessage }]);
            console.log("Added trip details to UI");

            // Send to API
            console.log(`Sending trip details to API for run: ${runId}`);
            await sendMessageToAgent(apiKey, runId, tripDetailsMessage);
            console.log("Trip details sent successfully to API");

            setSentTripDetails(true);

            // Add processing indicator
            setMessages(prev => [...prev, { role: "assistant", content: "Processing your trip details..." }]);
            console.log("Added processing indicator to UI");

            // Start polling for response
            console.log("Starting polling for trip details response");
            startPolling(false);
        } catch (err) {
            console.error("Failed to send trip details:", err);
            if (isMountedRef.current) {
                setError("Failed to send trip details. Please try again.");
                setLoading(false);
            }
        }
    };

    // Function to initialize the agent
    const initializeAgent = async () => {
        // First, cleanup any existing state
        if (pollingInterval) {
            clearInterval(pollingInterval);
            setPollingInterval(null);
        }

        if (initialCheckIntervalRef.current) {
            clearInterval(initialCheckIntervalRef.current);
            initialCheckIntervalRef.current = null;
        }

        if (!isMountedRef.current) return;

        setLoading(true);
        setError(null);
        setSentTripDetails(false);

        try {
            console.log("Creating new agent run");
            // Create a new agent run
            const data = await createAgentRun(apiKey, chatId, {});

            if (!isMountedRef.current) return;

            console.log(`Agent run created with ID: ${data.id}`);
            // Store the run ID
            setRunId(data.id);

            // Show initial loading message
            setMessages([
                {
                    role: "assistant",
                    content: "Initializing your AI travel planner..."
                }
            ]);

            // Wait for initial default response
            const checkInitialResponse = () => {
                // Clear any existing interval first
                if (initialCheckIntervalRef.current) {
                    clearInterval(initialCheckIntervalRef.current);
                }

                // Track this new interval
                initialCheckIntervalRef.current = setInterval(async () => {
                    if (!data.id || !isMountedRef.current) {
                        clearInterval(initialCheckIntervalRef.current);
                        initialCheckIntervalRef.current = null;
                        return;
                    }

                    try {
                        // Get run status and results
                        const runData = await getAgentRun(apiKey, data.id);
                        console.log("Checking for stable Result 1...");

                        // First check if both conditions are met: have 2+ results AND status is completed
                        if (runData.data?.results && runData.data.results.length >= 2 &&
                            runData.data?.status === "completed") {

                            // Then check if Result 1 is from the assistant
                            const result1 = runData.data.results[1];
                            if (result1.role === "assistant") {
                                // Increment our stability counter
                                result1CountRef.current += 1;
                                console.log(`Stable Result 1 seen ${result1CountRef.current} times`);

                                // If this is the first time, extract and show the message
                                if (result1CountRef.current === 1) {
                                    let assistantMessage = "";
                                    if (Array.isArray(result1.content) && result1.content.length > 0) {
                                        if (result1.content[0].text) {
                                            assistantMessage = result1.content[0].text;
                                        }
                                    } else if (typeof result1.content === "string") {
                                        assistantMessage = result1.content;
                                    }

                                    // Instead of setting the message UI, just log that we found it
                                    console.log("Found initial greeting (not displaying in UI)");
                                    // Don't set the message in UI here

                                    // // Update UI with the assistant's message
                                    // if (assistantMessage && isMountedRef.current) {
                                    //     setMessages([
                                    //         { role: "assistant", content: assistantMessage }
                                    //     ]);
                                    //     console.log("Set assistant message in UI");
                                    // }
                                }

                                // Only proceed after we've seen a stable Result 1 for 3 cycles
                                if (result1CountRef.current >= 3) {
                                    // Clear the interval - we're ready to send
                                    clearInterval(initialCheckIntervalRef.current);
                                    initialCheckIntervalRef.current = null;
                                    console.log("Result 1 stable for 3 cycles, now sending trip details");

                                    // Only send if we haven't already
                                    if (!sendingTripDetailsRef.current) {
                                        sendingTripDetailsRef.current = true;

                                        try {
                                            // Generate trip details
                                            const tripDetailsMessage = generateTripDetailsMessage();

                                            // // Add trip details to UI
                                            // setMessages(prev => [
                                            //     ...prev,
                                            //     { role: "user", content: tripDetailsMessage }
                                            // ]);

                                            // // Add processing indicator
                                            // setMessages(prev => [
                                            //     ...prev,
                                            //     { role: "assistant", content: "Processing your trip details..." }
                                            // ]);

                                            // Just show a loading indicator instead
                                            setMessages([
                                                { role: "assistant", content: "Creating your personalized travel itinerary..." }
                                            ]);

                                            // Send the message directly
                                            console.log(`Sending trip details to run ID: ${data.id}`);
                                            await sendMessageToAgent(apiKey, data.id, tripDetailsMessage);
                                            console.log("Trip details sent successfully");
                                            setSentTripDetails(true);

                                            // Start regular message polling
                                            const tripPollInterval = setInterval(async () => {
                                                if (!isMountedRef.current) {
                                                    clearInterval(tripPollInterval);
                                                    return;
                                                }

                                                try {
                                                    const pollData = await getAgentRun(apiKey, data.id);
                                                    console.log("Polling for trip details response...");

                                                    // If run completed, process results
                                                    if (pollData.data?.status === "completed") {
                                                        clearInterval(tripPollInterval);

                                                        // Check if we have a new response
                                                        if (pollData.data?.results && pollData.data.results.length > 2) {
                                                            const newResponses = pollData.data.results.slice(2);
                                                            const assistantResponses = newResponses.filter(r => r.role === "assistant");

                                                            if (assistantResponses.length > 0) {
                                                                // Get the latest response
                                                                const latestResponse = assistantResponses[assistantResponses.length - 1];
                                                                let responseContent = "";

                                                                // Extract text content
                                                                if (Array.isArray(latestResponse.content) && latestResponse.content.length > 0) {
                                                                    if (latestResponse.content[0].text) {
                                                                        responseContent = latestResponse.content[0].text;
                                                                    }
                                                                } else if (typeof latestResponse.content === "string") {
                                                                    responseContent = latestResponse.content;
                                                                }

                                                                // // Update UI - replace processing message with actual response
                                                                // if (responseContent && isMountedRef.current) {
                                                                //     setMessages(prev => {
                                                                //         return prev.map(msg => {
                                                                //             if (msg.role === "assistant" && 
                                                                //                 msg.content === "Processing your trip details...") {
                                                                //                 return { role: "assistant", content: responseContent };
                                                                //             }
                                                                //             return msg;
                                                                //         });
                                                                //     });
                                                                //     console.log("Updated UI with response to trip details");
                                                                //     setLoading(false);
                                                                // }
                                                                // Show ONLY this final response in the UI
                                                                if (responseContent && isMountedRef.current) {
                                                                    setMessages([
                                                                        { role: "assistant", content: responseContent }
                                                                    ]);
                                                                    console.log("Showing final itinerary in UI");
                                                                    setLoading(false);
                                                                }
                                                            }
                                                        }
                                                    }
                                                } catch (err) {
                                                    console.error("Error polling for trip details response:", err);
                                                }
                                            }, 3000);
                                        } catch (err) {
                                            console.error("Error sending trip details:", err);
                                            if (isMountedRef.current) {
                                                setError("Failed to send trip details. Please try again.");
                                                setLoading(false);
                                                sendingTripDetailsRef.current = false;
                                            }
                                        }
                                    }
                                }
                            } else {
                                // Reset counter if we don't see Result 1 from assistant
                                result1CountRef.current = 0;
                            }
                        } else {
                            // Reset counter if conditions not met
                            result1CountRef.current = 0;
                        }
                    } catch (err) {
                        console.error("Error checking initial response:", err);
                        // Keep the interval running unless component unmounted
                        if (!isMountedRef.current) {
                            clearInterval(initialCheckIntervalRef.current);
                            initialCheckIntervalRef.current = null;
                        }
                    }
                }, 2000); // Check every 2 seconds
            };
            // Start checking for initial response
            checkInitialResponse();
        } catch (err) {
            console.error("Failed to initialize agent:", err);

            if (!isMountedRef.current) return;

            setError("Failed to start the travel assistant. Please try again.");
            setLoading(false);
        }
    };

    // Start or restart polling for responses
    const startPolling = (isFirstMessage = true) => {
        console.log(`Starting polling (isFirstMessage: ${isFirstMessage})`);

        // Clear any existing interval
        if (pollingInterval) {
            clearInterval(pollingInterval);
        }

        // If this is a following message, add a processing indicator if not already present
        if (!isFirstMessage) {
            const hasProcessingMessage = messages.some(
                msg => msg.role === "assistant" &&
                    (msg.content === "Processing your message..." ||
                        msg.content === "Processing your trip details...")
            );

            if (!hasProcessingMessage && isMountedRef.current) {
                setMessages(prevMessages => [
                    ...prevMessages,
                    { role: "assistant", content: "Processing your message..." }
                ]);
            }
        }

        // Create a new polling interval
        const interval = setInterval(async () => {
            if (!runId || !isMountedRef.current) {
                clearInterval(interval);
                setPollingInterval(null);
                console.log("Stopping polling: runId missing or component unmounted");
                return;
            }

            try {
                // Get run status
                console.log(`Polling for run status: ${runId}`);
                const runData = await getAgentRun(apiKey, runId);
                const status = runData.data?.status || "unknown";

                if (!isMountedRef.current) {
                    clearInterval(interval);
                    console.log("Component unmounted during polling, clearing interval");
                    return;
                }

                setRunStatus(status);
                console.log("Current run status:", status);

                // If the run is completed, get the results
                if (status === "completed" || status === "failed") {
                    clearInterval(interval);
                    setPollingInterval(null);

                    // Check for results
                    const results = runData.data?.results || [];

                    if (results.length > 0) {
                        // Find the assistant's response
                        const assistantResponses = results.filter(
                            result => result.role === "assistant"
                        );

                        if (assistantResponses.length > 0) {
                            // Get the latest assistant response
                            const latestResponse = assistantResponses[assistantResponses.length - 1];

                            // Extract the content
                            let responseContent = "";

                            if (latestResponse.content) {
                                if (
                                    Array.isArray(latestResponse.content) &&
                                    latestResponse.content.length > 0
                                ) {
                                    // Content is an array - common in Toolhouse API
                                    const contentItem = latestResponse.content[0];

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
                                } else if (typeof latestResponse.content === "string") {
                                    // Content is already a string
                                    responseContent = latestResponse.content;
                                } else {
                                    // Content is some other structure, convert to string
                                    responseContent = JSON.stringify(latestResponse.content);
                                }
                            }

                            if (!isMountedRef.current) return;

                            // Update the messages array - replace processing message with actual response
                            setMessages(prevMessages => {
                                const newMessages = [...prevMessages];

                                // Find if we have a processing message to replace
                                const processingIndex = newMessages.findIndex(
                                    msg => msg.role === "assistant" &&
                                        (msg.content === "Processing your request..." ||
                                            msg.content === "Processing your message..." ||
                                            msg.content === "Processing your trip details...")
                                );

                                if (processingIndex !== -1) {
                                    // Replace the processing message
                                    newMessages[processingIndex] = {
                                        role: "assistant",
                                        content: responseContent
                                    };
                                } else {
                                    // No processing message found, just add the response
                                    newMessages.push({
                                        role: "assistant",
                                        content: responseContent
                                    });
                                }

                                return newMessages;
                            });
                        } else {
                            // No assistant response found
                            console.error("No assistant responses found in results");

                            if (!isMountedRef.current) return;

                            setError("No response found from the AI assistant. Please try again.");
                        }
                    } else {
                        // No results found
                        if (!isMountedRef.current) return;

                        setError("No response received from the AI assistant. Please try again.");
                    }

                    // Set loading to false after processing
                    if (isMountedRef.current) {
                        setLoading(false);
                    }
                }
            } catch (err) {
                console.error("Error polling data:", err);

                if (!isMountedRef.current) return;

                setError("Failed to update conversation. Please try again.");
                clearInterval(interval);
                setPollingInterval(null);
                setLoading(false);
            }
        }, 3000); // Poll every 3 seconds

        setPollingInterval(interval);
    };

    // Function to send a user message
    const sendMessage = async () => {
        if (!input.trim() || !runId) return;

        // Add user message to UI immediately
        setMessages(prevMessages => [
            ...prevMessages,
            { role: "user", content: input }
        ]);

        const currentMessage = input;
        setInput("");
        setLoading(true);
        setError(null);

        try {
            // Send message to agent
            await sendMessageToAgent(apiKey, runId, currentMessage);

            // Start polling for the response
            startPolling(false);
        } catch (err) {
            console.error("Failed to send message:", err);

            if (isMountedRef.current) {
                setError("Failed to send message. Please try again.");
                setLoading(false);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // The rest of your UI code remains the same
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
                    placeholder="Enter your travel plans or questions..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={loading}
                    variant="outlined"
                    sx={{
                        bgcolor: isDarkMode
                            ? "background.paper"
                            : "background.paper",
                    }}
                />

                <Button
                    variant="contained"
                    onClick={sendMessage}
                    disabled={!input.trim() || loading}
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
                                    ? "primary.dark"
                                    : "primary.dark",
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

export default ChatInterface;