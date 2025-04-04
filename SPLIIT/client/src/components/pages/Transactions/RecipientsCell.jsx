import React from 'react';
import { Chip, Box } from '@mui/material';

export default function RecipientsCell({ recipients, people }) {
    if (!recipients.length) return <></>;

    const sortedRecipients = [...recipients].sort((a, b) => a.length - b.length);
    const displayedRecipients = sortedRecipients.slice(0, 3);
    const hiddenCount = recipients.length - displayedRecipients.length;

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
            {displayedRecipients.map((recipient) => (
                < Chip
                    key={people[recipient]?.username}
                    label={people[recipient]?.displayName}
                    sx={{
                        padding: '1px 1px',
                        borderRadius: '20px',
                        backgroundColor: people[recipient]?.favColour || '#CCCCCC',
                        color: '#000',
                        fontWeight: 'bold',
                    }}
                />
            ))}
            {hiddenCount > 0 && <Box sx={{ fontWeight: 'bold', color: '#888' }}>+ {hiddenCount} more</Box>}
        </Box>
    );
}
