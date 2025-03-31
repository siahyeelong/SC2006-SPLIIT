import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Typography, Avatar } from '@mui/material';
import { Person as PersonIcon, Assistant as AssistantIcon } from '@mui/icons-material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Message = ({ message }) => {
  const isUser = message.role === 'user';
  
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
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          <AssistantIcon />
        </Avatar>
      )}
      
      <Box
        sx={{
          maxWidth: '70%',
          p: 2,
          backgroundColor: isUser ? 'primary.light' : 'background.paper',
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        {isUser ? (
          <Typography>{message.content}</Typography>
        ) : (
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              p: ({ children }) => <Typography paragraph>{children}</Typography>,
              h1: ({ children }) => <Typography variant="h4" gutterBottom>{children}</Typography>,
              h2: ({ children }) => <Typography variant="h5" gutterBottom>{children}</Typography>,
              h3: ({ children }) => <Typography variant="h6" gutterBottom>{children}</Typography>,
              ul: ({ children }) => <Box component="ul" sx={{ pl: 2 }}>{children}</Box>,
              ol: ({ children }) => <Box component="ol" sx={{ pl: 2 }}>{children}</Box>,
              li: ({ children }) => <Typography component="li" sx={{ mb: 0.5 }}>{children}</Typography>,
            }}
          >
            {message.content}
          </ReactMarkdown>
        )}
      </Box>
      
      {isUser && (
        <Avatar sx={{ bgcolor: 'secondary.main' }}>
          <PersonIcon />
        </Avatar>
      )}
    </Box>
  );
};

export default Message;