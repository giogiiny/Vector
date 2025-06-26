"use client";
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
    useMediaQuery,
    useTheme,
} from "@mui/material";
import React from "react";
import { Sidebar } from "@/components/Sidebar";
import { useRouter } from "next/navigation"; // Corrigido a importação

const TelaRelatorio = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const router = useRouter(); // Usando o hook useRouter corretamente

    // Função para lidar com o download do relatório único
    const handleDownload = async (e: React.MouseEvent) => {
        e.stopPropagation();
        window.open('/api/download', '_blank'); // Abre em nova aba ou força download
    };
    const handleReportClick = (month: string) => {
        router.push(`/relatorio/`);
    };

    // Report data (mantemos a lista para exibição)
    const reports = [
        { month: "Janeiro 2025" },
        { month: "Fevereiro 2025" },
        { month: "Março 2025" },
        { month: "Abril 2025" },
    ];

    return (
        <Box sx={{
            display: "flex",
            bgcolor: "#edeced",
            minHeight: "100vh",
            position: 'relative'
        }}>

            {/* Sidebar - fixa em desktop/tablet */}
            {!isMobile && (
                <Box sx={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    height: '100vh',
                    zIndex: 2,
                    width: isTablet ? 70 : 350
                }}>
                    <Sidebar activeItem="Relatórios" />
                </Box>
            )}

            {/* Main content - com margem para sidebar */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: { xs: 2, sm: 3 },
                    bgcolor: "#edeced",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: '100vh',
                    ml: { sm: '70px', md: '350px' }, // Margem igual à largura da sidebar
                    pt: { xs: '60px', sm: '26px' } // Espaço para a barra vermelha/header mobile
                }}
            >
                <Container
                    maxWidth="lg"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%'
                    }}
                >
                    <Paper
                        sx={{
                            p: { xs: 2, md: 3 },
                            bgcolor: "#d9d9d9",
                            borderRadius: "10px",
                            width: "100%",
                            maxWidth: 995,
                            my: 3 // Espaço vertical
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                fontFamily: "Poppins-Regular, Helvetica",
                                color: "#b42a2a",
                                mb: 3,
                                ml: { xs: 0, sm: 2 },
                                fontSize: { xs: '1.25rem', sm: '1.5rem' }
                            }}
                        >
                            Histórico de relatórios
                        </Typography>

                        <Stack spacing={2}>
                            {reports.map((report, index) => (
                                <Paper
                                    key={index}
                                    sx={{
                                        p: { xs: 1.5, sm: 2 },
                                        bgcolor: "#f3f3f3",
                                        borderRadius: "10px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        cursor: 'pointer', // Mostra que é clicável
                                        '&:hover': {
                                            bgcolor: '#e8e8e8' // Efeito hover
                                        }
                                    }}
                                    onClick={() => handleReportClick(report.month)}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: "Poppins-Medium, Helvetica",
                                            fontWeight: "medium",
                                            fontSize: { xs: '1rem', sm: '1.5rem' },
                                            color: "#b42a2a",
                                        }}
                                    >
                                        {report.month}
                                    </Typography>
                                    <IconButton
                                        onClick={(e) => handleDownload(e)}
                                        aria-label="download"
                                        size={isMobile ? "small" : "medium"}
                                    >
                                        <DownloadIcon sx={{ color: "#b42a2a" }} />
                                    </IconButton>
                                </Paper>
                            ))}
                        </Stack>
                    </Paper>
                </Container>
            </Box>

            {/* Mobile header */}
            {isMobile && (
                <Box sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    bgcolor: '#a41414',
                    color: 'white',
                    p: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 10
                }}>
                    <Typography variant="h6">Relatórios</Typography>
                </Box>
            )}
        </Box>
    );
};

export default TelaRelatorio;