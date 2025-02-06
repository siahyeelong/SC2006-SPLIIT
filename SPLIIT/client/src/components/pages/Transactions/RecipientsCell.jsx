import React from 'react';
import { Chip, Box } from '@mui/material';
import { Person, People } from '../../settings/People';

export default function RecipientsCell({ recipients }) {
    if (!recipients.length) return <></>;

    const sortedRecipients = [...recipients].sort((a, b) => a.length - b.length);
    const displayedRecipients = sortedRecipients.slice(0, 3);
    const hiddenCount = recipients.length - displayedRecipients.length;

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
            {displayedRecipients.map((recipient) => (
                <Chip
                    key={recipient}
                    label={Person.findDisplayName(recipient, People)}
                    sx={{
                        padding: '1px 1px',
                        borderRadius: '20px',
                        backgroundColor: Person.findFavColour(recipient, People) || '#CCCCCC',
                        color: '#000',
                        fontWeight: 'bold',
                    }}
                >
                </Chip>
            ))}
            {hiddenCount > 0 && <Box sx={{ fontWeight: 'bold', color: '#888' }}>+ {hiddenCount} more</Box>}
        </Box>
    );
}
