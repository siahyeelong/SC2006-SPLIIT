import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    Typography,
} from "@mui/material";
import React from "react";
import { MyResponsivePie } from "./MyResponsivePie";

function AnalyticsDialog({ open, onClose, data }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
            closeAfterTransition={false}
            sx={{
                borderRadius: 2,
                height: { xs: "90vh", sm: "auto" },
            }}
        >
            <DialogContent
                sx={{
                    padding: { xs: 2, sm: 3 },
                    "&.MuiDialogContent-root": { overflowY: "visible" },
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        textAlign: "center",
                        mb: 2,
                    }}
                >
                    Spending Graph
                </Typography>
                <Divider sx={{ my: { xs: 1, md: 2 }, border: "0.5px solid" }} />
                {/* Display donut chart */}
                <Box
                    height={500}
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        position: "relative",
                        overflow: "visible",
                    }}
                >
                    <MyResponsivePie data={data} />
                </Box>
            </DialogContent>
            <DialogActions
                sx={{
                    justifyContent: "center",
                    paddingTop: 0,
                    paddingBottom: 3,
                }}
            >
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={onClose}
                    sx={{
                        width: { sm: "auto", xs: "100%" },
                        borderRadius: 2,
                        fontWeight: "bold",
                        px: 4,
                        py: 1,
                        boxShadow: 2,
                        transition: "all 0.3s ease",
                    }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AnalyticsDialog;
