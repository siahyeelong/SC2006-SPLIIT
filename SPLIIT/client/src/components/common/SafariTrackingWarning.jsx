import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from "@mui/material";

const isSafari = () => {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};

const testCookieSupport = () => {
    try {
        document.cookie = "cookieTest=1; SameSite=None; Secure";
        return document.cookie.indexOf("cookieTest=") !== -1;
    } catch (e) {
        return false;
    }
};

const SafariTrackingWarning = () => {
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        const safari = isSafari();
        const cookiesSupported = testCookieSupport();

        if (safari && !cookiesSupported) {
            setShowWarning(true);
        }
    }, []);

    return (
        <Dialog open={showWarning} onClose={() => setShowWarning(false)}>
            <DialogTitle>Safari Settings Required</DialogTitle>
            <DialogContent>
                <Typography variant="body1" gutterBottom>
                    To use this site fully on Safari, please:
                </Typography>
                <ol>
                    <li>Go to <strong>Settings</strong></li>
                    <li>Tap <strong>Safari</strong></li>
                    <li>Scroll down and turn off <strong>"Prevent Cross-Site Tracking"</strong></li>
                </ol>
                <Typography variant="body2" color="textSecondary">
                    This is required so we can securely store login sessions and access tokens.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setShowWarning(false)}>Got it</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SafariTrackingWarning;