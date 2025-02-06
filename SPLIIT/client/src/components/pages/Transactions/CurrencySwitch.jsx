import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import { useTheme, Typography, Stack, Switch } from '@mui/material/';
import { tokens } from '../../../theme';

function CurrencySwitch({ onToggle }) {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);

    const [checked, setChecked] = useState(false);

    const handleSwitch = (event) => {
        const isChecked = event.target.checked;
        setChecked(isChecked);
        if (onToggle) onToggle(isChecked);
    }

    const AntSwitch = styled(Switch)(({ theme }) => ({
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
        '&:active': {
            '& .MuiSwitch-thumb': {
                width: 15,
            },
            '& .MuiSwitch-switchBase.Mui-checked': {
                transform: 'translateX(9px)',
            },
        },
        '& .MuiSwitch-switchBase': {
            padding: 2,
            '&.Mui-checked': {
                transform: 'translateX(12px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: '#1890ff',
                    ...theme.applyStyles('dark', {
                        backgroundColor: '#177ddc',
                    }),
                },
            },
        },
        '& .MuiSwitch-thumb': {
            boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
            width: 12,
            height: 12,
            borderRadius: 6,
            transition: theme.transitions.create(['width'], {
                duration: 200,
            }),
        },
        '& .MuiSwitch-track': {
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor: 'rgba(0,0,0,.25)',
            boxSizing: 'border-box',
            ...theme.applyStyles('dark', {
                backgroundColor: 'rgba(255,255,255,.35)',
            }),
        },
    }));

    return (
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Typography fontSize={'medium'} fontWeight={'bold'} color={colours.orangeAccent[400]}>Original logged currency</Typography>
            <AntSwitch checked={checked} onChange={handleSwitch} />
            <Typography fontSize={'medium'} fontWeight={'bold'} color={colours.orangeAccent[400]}>All SGD</Typography>
        </Stack>
    )
}

export default CurrencySwitch