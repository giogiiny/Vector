import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import BarChartIcon from "@mui/icons-material/BarChart";
import DownloadIcon from "@mui/icons-material/Download";
import MapIcon from "@mui/icons-material/Map";
import SettingsIcon from "@mui/icons-material/Settings";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import {
    Avatar,
    Box,
    Container,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import React from "react";
import { Sidebar } from "@/components/Sidebar";

const TelaRelatorio = () => {

    // Report data
    const reports = [
        { month: "Janeiro 2025", selected: false },
        { month: "Fevereiro 2025", selected: true },
        { month: "Março 2025", selected: false },
        { month: "Abril 2025", selected: false },
    ];

    return (
        <Box sx={{ display: "flex", bgcolor: "#edeced", minHeight: "100vh" }}>
            <Sidebar activeItem="Relatórios" />
            {/* Top red bar */}
            <Box
                sx={{
                    height: "26px",
                    width: "1440px",
                    position: "absolute",
                    overflow: "hidden",
                    top: 0,
                    left: 0,
                    background:
                        "linear-gradient(90deg, rgba(119,6,6,1) 0%, rgba(165,21,21,1) 100%)",
                }}
            />
            {/* Main content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    bgcolor: "#edeced",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Container maxWidth="lg">
                    <Paper
                        sx={{
                            mt: 5,
                            p: 3,
                            bgcolor: "#d9d9d9",
                            borderRadius: "10px",
                            width: "100%",
                            maxWidth: 995,
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                fontFamily: "Poppins-Regular, Helvetica",
                                color: "#b42a2a",
                                mb: 3,
                                ml: 2,
                            }}
                        >
                            Histórico de relatórios
                        </Typography>

                        <Stack spacing={2}>
                            {reports.map((report, index) => (
                                <Paper
                                    key={index}
                                    sx={{
                                        p: 2,
                                        bgcolor: "#f3f3f3",
                                        borderRadius: "10px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        border: report.selected ? "2px solid #a32525" : "none",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: "Poppins-Medium, Helvetica",
                                            fontWeight: "medium",
                                            fontSize: "1.5rem",
                                            color: "#b42a2a",
                                        }}
                                    >
                                        {report.month}
                                    </Typography>
                                    <IconButton>
                                        <DownloadIcon sx={{ color: "#b42a2a" }} />
                                    </IconButton>
                                </Paper>
                            ))}
                        </Stack>
                    </Paper>
                </Container>
            </Box>
        </Box>
    );
};

export default TelaRelatorio;
