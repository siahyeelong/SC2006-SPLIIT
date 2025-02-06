import { Box, Button, Dialog, DialogActions, DialogContent } from '@mui/material'
import React from 'react'
import { MyResponsivePie } from './MyResponsivePie'

function AnalyticsDialog({ showDialog, onClose, data }) {
    return (
        <Dialog open={showDialog} onClose={onClose} fullWidth closeAfterTransition={false}>
            <DialogContent>
                {/* Display donut chart */}
                <Box height={'100'} width={'100'} display={'flex'} justifyContent={'center'}>
                    <MyResponsivePie data={data} />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='secondary' onClick={onClose}>
                    CLOSE
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AnalyticsDialog