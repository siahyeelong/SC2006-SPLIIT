// C:\Users\user\Documents\1. Programs\SC2006-SPLIIT\SPLIIT\client\src\components\pages\AItinirary\ChatMessage.jsx

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Typography, Avatar, useTheme } from '@mui/material';
import { Person, Assistant } from '@mui/icons-material';
import { tokens } from '../../../theme';

const ChatMessage = ({ message }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const colors = tokens(theme.palette.mode);
  const isUser = message.role === 'user';
  
  // Get the subtitle color which is used in the Header
  const subtitleColor = colors.greenAccent[400];
  
  // Ensure the content is a string
  const content = typeof message.content === 'string' 
    ? message.content 
    : JSON.stringify(message.content);
  
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 2,
        gap: 1,
      }}
    >
      {!isUser && (
        <Avatar 
          sx={{ 
            bgcolor: isDarkMode ? subtitleColor : subtitleColor,
            color: theme.palette.getContrastText(subtitleColor)
          }}
        >
          <Assistant />
        </Avatar>
      )}
      
      <Box
        sx={{
          maxWidth: '70%',
          p: 2,
          backgroundColor: isUser 
            ? (isDarkMode ? 'primary.dark' : subtitleColor)
            : (isDarkMode ? 'background.paper' : 'background.paper'),
          borderRadius: 2,
          boxShadow: 1,
          color: isUser 
            ? (isDarkMode ? 'primary.contrastText' : theme.palette.getContrastText(subtitleColor))
            : 'text.primary',
        }}
      >
        {isUser ? (
          <Typography color="inherit">{content}</Typography>
        ) : (
          <div>
            <ReactMarkdown>
              {content}
            </ReactMarkdown>
          </div>
        )}
      </Box>
      
      {isUser && (
        <Avatar sx={{ 
          bgcolor: isDarkMode ? 'secondary.main' : subtitleColor,
          color: theme.palette.getContrastText(subtitleColor)
        }}>
          <Person />
        </Avatar>
      )}
    </Box>
  );
};

export default ChatMessage;