import React from 'react'
import { Box } from '@mui/material';
import Header from '../MainUI/Header';

function Profile() {
    return (
        <Box m='20px'>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Header title={'Profile'} subtitle={'work in progress'} />
            </Box>
            <div>(work in progress)</div>
        </Box>
    )
}

export default Profile