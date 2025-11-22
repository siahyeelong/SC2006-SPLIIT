import { Box, Typography, Grid2, Divider, Button, } from "@mui/material";
import {
    Payments,
    Calculate,
    People,
    CurrencyExchange,
    Dashboard,
} from "@mui/icons-material";
import home_logtransaction from "../../assets/home_logtransaction.png";
import home_transaction from "../../assets/home_transaction.png";
import home_dashboard from "../../assets/home_dashboard.png";
import home_simplifieddebt from "../../assets/home_simplifieddebt.png";
import home_tripselection from "../../assets/home_tripselection.png";

const AboutSection = () => {
    return (
        <Box
            sx={{
                padding: { xs: "80px 20px", md: "60px 40px" },
                textAlign: "center",
                backgroundColor: "#f9f9f9",
                position: "relative",
                border: "1px solid #e0e0e0",
            }}
        >
            <Box sx={{ maxWidth: 1200, margin: "0 auto" }}>
                <Typography
                    variant="h2"
                    sx={{
                        fontSize: { xs: "2rem", md: "2.5rem" },
                        fontWeight: "bold",
                        marginBottom: { xs: "20px", md: "40px" },
                        color: "black",
                    }}
                >
                    Track Group Expenses. Effortlessly.
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        fontSize: { xs: "1rem", md: "1.1rem" },
                        color: "#4a4a4a",
                        maxWidth: "800px",
                        margin: "0 auto",
                        marginBottom: { xs: "40px", md: "60px" },
                        fontWeight: 500,
                        lineHeight: 1.6,
                    }}
                >
                    SPLIIT helps you track, split, and settle group expenses
                    with ease. Whether it's a trip, event, or daily costs, enjoy
                    transparent and hassle-free cost-sharing among friends,
                    family, or teammates.
                </Typography>
            </Box>
            <Divider variant="middle" color="#343434ff" />
            <Grid2
                container
                spacing={2}
                alignItems={"center"}
                justifyContent={"center"}
                padding={5}
            >
                <Grid2 xs={12} md={6} order={{ xs: 2, md: 1 }}>
                    <Box
                        component="img"
                        src={home_logtransaction}
                        sx={{
                            width: "100%",
                            height: "auto",
                            maxWidth: "40vh",
                            objectFit: "contain",
                            borderRadius: 3,
                        }}
                    />
                </Grid2>
                <Grid2 xs={12} md={6} order={{ xs: 1, md: 2 }}>
                    <Box p={2} maxWidth={"30vh"} alignItems={"center"} justifyContent={"left"}>
                        <Box display="flex">
                            <Payments sx={{ fontSize: "2.5rem", color: "#3e3f4eff", marginRight: 2 }} />
                            <Typography variant="h2" color="#3e3f4eff" fontWeight={"bold"} align="left">Expense Logging</Typography>
                        </Box>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: "1rem", md: "1.1rem" },
                                marginBottom: { xs: "20px", md: "40px" },
                                marginTop: 2,
                                color: "#3b4571ff",
                            }}
                            align="left"
                        >
                            Log expenses with ease from a simple form layout. You may specify the currency, select the relevant recipients, and geolocation will be automatically logged!
                        </Typography>
                    </Box>
                </Grid2>
            </Grid2>
            <Divider variant="middle" color="#343434ff" />
            <Grid2
                container
                spacing={2}
                alignItems={"center"}
                justifyContent={"center"}
                p={5}
            >
                <Grid2 xs={12} md={6}>
                    <Box p={2} maxWidth={"30vh"} alignItems={"center"} justifyContent={"left"}>
                        <Box display="flex">
                            <Calculate sx={{ fontSize: "2.5rem", color: "#3e3f4eff", marginRight: 2 }} />
                            <Typography variant="h2" color="#3e3f4eff" fontWeight={"bold"} align="left">Transaction Summary</Typography>
                        </Box>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: "1rem", md: "1.1rem" },
                                marginBottom: { xs: "20px", md: "40px" },
                                marginTop: 2,
                                color: "#3b4571ff",
                            }}
                            align="left"
                        >
                            View all transactions in the Transactions page. Click on a line item to view its details. The map indicates where you made the expense, taking you back to the time you made that purchase!
                        </Typography>
                    </Box>
                </Grid2>
                <Grid2 xs={12} md={6}>
                    <Box
                        component="img"
                        src={home_transaction}
                        sx={{
                            width: "100%",
                            height: "auto",
                            maxWidth: "50vh",
                            objectFit: "contain",
                            borderRadius: 3,
                        }}
                    />
                </Grid2>
            </Grid2>
            <Divider variant="middle" color="#343434ff" />
            <Grid2
                container
                spacing={2}
                alignItems={"center"}
                justifyContent={"center"}
                p={5}
            >
                <Grid2 xs={12} md={6} order={{ xs: 2, md: 1 }}>
                    <Box
                        component="img"
                        src={home_dashboard}
                        sx={{
                            width: "100%",
                            height: "auto",
                            maxHeight: "40vh",
                            objectFit: "contain",
                            borderRadius: 3,
                        }}
                    />
                </Grid2>
                <Grid2 xs={12} md={6} order={{ xs: 1, md: 2 }}>
                    <Box p={2} maxWidth={"30vh"} alignItems={"center"} justifyContent={"left"}>
                        <Box display="flex">
                            <Dashboard sx={{ fontSize: "2.5rem", color: "#3e3f4eff", marginRight: 2 }} />
                            <Typography variant="h2" color="#3e3f4eff" fontWeight={"bold"} align="left">Insightful Dashboard</Typography>
                        </Box>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: "1rem", md: "1.1rem" },
                                marginBottom: { xs: "20px", md: "40px" },
                                marginTop: 2,
                                color: "#3b4571ff",
                            }}
                            align="left"
                        >
                            View insights into your group's expense habits in the Dashboard page. You may also check how much you owe one another, or click on the "Simplify debt" button to settle all debt in the group.
                        </Typography>
                    </Box>
                </Grid2>
            </Grid2>
            <Divider variant="middle" color="#343434ff" />
            <Grid2
                container
                spacing={2}
                alignItems={"center"}
                justifyContent={"center"}
                p={5}
            >
                <Grid2 xs={12} md={6}>
                    <Box p={2} maxWidth={"30vh"} alignItems={"center"} justifyContent={"left"}>
                        <Box display="flex">
                            <CurrencyExchange sx={{ fontSize: "2.5rem", color: "#3e3f4eff", marginRight: 2 }} />
                            <Typography variant="h2" color="#3e3f4eff" fontWeight={"bold"} align="left">Settling Debts</Typography>
                        </Box>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: "1rem", md: "1.1rem" },
                                marginBottom: { xs: "20px", md: "40px" },
                                marginTop: 2,
                                color: "#3b4571ff",
                            }}
                            align="left"
                        >
                            Upon clicking "Simplify debt", you will be recommended an optimal debt settlement strategy that allows all debt within the group to be settled with the least amount of transactions.
                        </Typography>
                        <Button
                            variant="contained"
                            color="success"
                            size="large"
                            href="https://github.com/siahyeelong/SC2006-SPLIIT"
                        >
                            Learn how it works</Button>
                    </Box>
                </Grid2>
                <Grid2 xs={12} md={6}>
                    <Box
                        component="img"
                        src={home_simplifieddebt}
                        sx={{
                            width: "100%",
                            height: "auto",
                            maxHeight: "40vh",
                            objectFit: "contain",
                            borderRadius: 3,
                        }}
                    />
                </Grid2>
            </Grid2>
            <Divider variant="middle" color="#343434ff" />
            <Grid2
                container
                spacing={2}
                alignItems={"center"}
                justifyContent={"center"}
                p={5}
            >
                <Grid2 xs={12} md={6} order={{ xs: 2, md: 1 }}>
                    <Box
                        component="img"
                        src={home_tripselection}
                        sx={{
                            width: "100%",
                            height: "auto",
                            maxWidth: "60vh",
                            objectFit: "contain",
                            borderRadius: 3,
                        }}
                    />
                </Grid2>
                <Grid2 xs={12} md={6} order={{ xs: 1, md: 2 }}>
                    <Box p={2} maxWidth={"30vh"} alignItems={"center"} justifyContent={"left"}>
                        <Box display="flex">
                            <People sx={{ fontSize: "2.5rem", color: "#3e3f4eff", marginRight: 2 }} />
                            <Typography variant="h2" color="#3e3f4eff" fontWeight={"bold"} align="left">Trip Management</Typography>
                        </Box>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: "1rem", md: "1.1rem" },
                                marginBottom: { xs: "20px", md: "40px" },
                                marginTop: 2,
                                color: "#3b4571ff",
                            }}
                            align="left"
                        >
                            Love using SPLIIT? Create a new trip and start SPLIIT-ing your expenses with your friends!
                        </Typography>
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default AboutSection;
