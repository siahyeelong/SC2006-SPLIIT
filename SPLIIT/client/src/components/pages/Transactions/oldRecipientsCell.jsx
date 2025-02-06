/**
 * [Deprecated] This feature was used to display all recipients when clicked. Feature has been integrated with the PerTransactionDialog
 */

import React, { useState } from 'react';
import { Chip, Box, ButtonBase, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Person, People } from '../../settings/People';

const MoreRecipientDialog = ({ open, onClose, recipients }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Recipients</DialogTitle>
        <DialogContent>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {recipients.map((recipient) => (
                    <Chip
                        key={recipient}
                        label={Person.findDisplayName(recipient, People)}
                        sx={{
                            backgroundColor: Person.findFavColour(recipient, People) || '#CCCCCC',
                            color: '#000',
                            fontWeight: 'bold',
                        }}
                    />
                ))}
            </Box>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} variant='contained' color='secondary'>Close</Button>
        </DialogActions>
    </Dialog>
);

export default function RecipientsCell({ recipients }) {
    const [dialogOpen, setDialogOpen] = useState(false);

    if (!recipients.length) return <></>;

    const sortedRecipients = [...recipients].sort((a, b) => a.length - b.length);
    const displayedRecipients = sortedRecipients.slice(0, 3);
    const hiddenCount = recipients.length - displayedRecipients.length;

    return (
        <>
            <ButtonBase onClick={() => setDialogOpen(true)} sx={{ width: '100%', textAlign: 'left', justifyContent: 'flex-start' }}>
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
            </ButtonBase>
            <MoreRecipientDialog open={dialogOpen} onClose={() => setDialogOpen(false)} recipients={sortedRecipients} />
        </>
    );
}
