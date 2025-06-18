"use client";
import dynamic from "next/dynamic";
import { LatLngExpression } from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SearchIcon from "@mui/icons-material/Search";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { Box, IconButton, Paper, Stack, styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Sidebar } from "../../../components/Sidebar";
import React, { useState, useEffect } from "react";

// Dynamically import Leaflet components
const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    { 
        ssr: false,
        loading: () => <p>Loading map...</p>
    }
);
const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    { ssr: false }
);
const Circle = dynamic(
    () => import("react-leaflet").then((mod) => mod.Circle),
    { ssr: false }
);
const Popup = dynamic(
    () => import("react-leaflet").then((mod) => mod.Popup),
    { ssr: false }
);

// Styled map wrapper with responsive adjustments
const MapWrapper = styled("div")(({ theme }) => ({
    width: "100%",
    height: "100%",
    position: "relative",
    "& .leaflet-container": {
        height: "100%",
        width: "100%",
    },
    [theme.breakpoints.down('sm')]: {
        height: "calc(100% - 56px)", // Account for mobile header
    },
}));

function UpdateMapZoom({ zoom }: { zoom: number }) {
    const map = useMap();
    React.useEffect(() => {
        map.setZoom(zoom);
    }, [zoom]);
    return null;
}

const MapPage = () => {
    const [zoomLevel, setZoomLevel] = useState(12);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

    const fixedLocations = [
        { position: [-3.1072, -60.0261] as LatLngExpression, name: "Centro" },
        { position: [-3.0731, -59.9857] as LatLngExpression, name: "Aleixo" },
        { position: [-3.1333, -59.9833] as LatLngExpression, name: "Distrito Industrial" },
        { position: [-3.1167, -60.0167] as LatLngExpression, name: "Adrianópolis" },
        { position: [-3.1000, -59.9667] as LatLngExpression, name: "Coroado" },
        { position: [-3.0833, -60.0167] as LatLngExpression, name: "Cidade Nova" },
        { position: [-3.1500, -59.9833] as LatLngExpression, name: "São Lázaro" },
        { position: [-3.0667, -60.0333] as LatLngExpression, name: "Novo Aleixo" },
        { position: [-3.1333, -60.0333] as LatLngExpression, name: "Raiz" },
        { position: [-3.0833, -59.9833] as LatLngExpression, name: "Flores" },
    ];

    const redColors = ['#ff0000', '#cc0000', '#ff3333', '#990000', '#ff6666'];

    const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 1, 18));
    const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 1, 1));

    // Toggle sidebar on mobile
    useEffect(() => {
        setSidebarOpen(!isMobile);
    }, [isMobile]);

    return (
        <Box sx={{
            display: "flex",
            flexDirection: isMobile ? 'column' : 'row',
            bgcolor: "#edeced",
            width: "100%",
            minHeight: "100vh",
            height: isMobile ? "auto" : "100vh",
            overflow: "hidden",
        }}>
            {sidebarOpen && (
                <Box sx={{
                    position: isMobile ? 'static' : 'relative',
                    width: isMobile ? '100%' : 'auto',
                    zIndex: 100
                }}>
                    <Sidebar activeItem="Mapa" onClose={() => isMobile && setSidebarOpen(false)} />
                </Box>
            )}

            <Box sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                position: "relative",
                height: isMobile ? "80vh" : "100%",
            }}>
                {isMobile && (
                    <Box sx={{
                        bgcolor: "#a41414",
                        color: "white",
                        p: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <IconButton onClick={() => setSidebarOpen(true)} sx={{ color: "white" }}>
                            <SearchIcon />
                        </IconButton>
                        <Typography variant="h6">Mapa</Typography>
                        <Box sx={{ width: 40 }} /> {/* Spacer for balance */}
                    </Box>
                )}

                <MapWrapper>
                    <MapContainer
                        center={[-3.1190, -60.0217] as LatLngExpression}
                        zoom={zoomLevel}
                        zoomControl={false}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />

                        {fixedLocations.map((location, index) => {
                            const lastUpdate = new Date(Date.now() - Math.random() * 86400000);
                            const epidemiologicalPercentage = (Math.random() * 100).toFixed(2);

                            return (
                                <Circle
                                    key={index}
                                    center={location.position}
                                    pathOptions={{
                                        color: 'transparent',
                                        fillColor: redColors[index % redColors.length],
                                        fillOpacity: 0.6,
                                        weight: 0
                                    }}
                                    radius={800 + Math.random() * 400}
                                >
                                    <Popup>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: isMobile ? '0.8rem' : '1rem' }}>
                                            Câmara {index + 1} - {location.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontSize: isMobile ? '0.7rem' : '0.875rem' }}>
                                            Última atualização: {lastUpdate.toLocaleDateString()} {lastUpdate.toLocaleTimeString()}
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontSize: isMobile ? '0.7rem' : '0.875rem' }}>
                                            Risco epidemiológico: {epidemiologicalPercentage}%
                                        </Typography>
                                    </Popup>
                                </Circle>
                            );
                        })}

                        <UpdateMapZoom zoom={zoomLevel} />
                    </MapContainer>

                    {/* Responsive Zoom Controls */}
                    <Paper
                        elevation={3}
                        sx={{
                            position: "absolute",
                            top: isMobile ? 10 : 38,
                            right: isMobile ? 10 : 20,
                            width: isMobile ? 40 : 50,
                            height: isMobile ? 90 : 122,
                            bgcolor: "#a41414",
                            borderRadius: "45px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 1000,
                        }}
                    >
                        <Stack spacing={isMobile ? 0.5 : 1} alignItems="center">
                            <IconButton 
                                sx={{ 
                                    color: "white",
                                    padding: isMobile ? '6px' : '8px'
                                }} 
                                onClick={handleZoomIn}
                            >
                                <SearchIcon fontSize={isMobile ? "medium" : "large"} />
                            </IconButton>
                            <Box sx={{ 
                                width: "60%", 
                                height: 1, 
                                bgcolor: "rgba(255,255,255,0.3)" 
                            }} />
                            <IconButton 
                                sx={{ 
                                    color: "white",
                                    padding: isMobile ? '6px' : '8px'
                                }} 
                                onClick={handleZoomOut}
                            >
                                <ZoomOutIcon fontSize={isMobile ? "medium" : "large"} />
                            </IconButton>
                        </Stack>                                                 
                    </Paper>                                          
                </MapWrapper>
            </Box>
        </Box>
    );
};

export default MapPage;