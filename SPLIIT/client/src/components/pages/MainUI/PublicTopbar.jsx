import { Box, Button, Paper, Typography } from '@mui/material'
import React from 'react'

function PublicTopbar() {
    return (
        <Box display={'flex'} justifyContent={'center'} p={3}>
            <a href='/home'>
                <img src='SPLIIT_logo.jpg' height={50} />
            </a>
        </Box>
    )
}

export default PublicTopbar