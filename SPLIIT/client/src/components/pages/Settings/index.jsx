import React from 'react'
import { Box } from '@mui/material';
import Header from '../../Header';

function Settings() {
    return (
        <Box m='20px'>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Header title={'Settings'} subtitle={'Configure app settings'} />
            </Box>
            <div>(work in progress)</div>
        </Box>
    )
}

export default Settings