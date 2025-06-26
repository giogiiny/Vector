"use client";
import dynamic from "next/dynamic";
import { LatLngExpression } from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SearchIcon from "@mui/icons-material/Search";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { Box, IconButton, Paper, Stack, styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Sidebar } from "../../../components/Sidebar";
import React, { useState } from "react";

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

// Styled map wrapper
const MapWrapper = styled("div")({
    width: "100%",
    height: "100%",
    position: "relative",
    "& .leaflet-container": {
        height: "100%",
        width: "100%",
    },
});

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
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

    return (
        <Box sx={{
            display: "flex",
            bgcolor: "#edeced",
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            position: 'relative',
        }}>
            {/* Sidebar - posicionada corretamente */}
            <Box sx={{
                position: isMobile ? 'fixed' : 'relative',
                zIndex: isMobile ? 1400 : 100, // Aumentado para 1400 no mobile
                height: isMobile ? 0 : '100vh',
            }}>
                <Sidebar activeItem="Mapa" />
            </Box>

            {/* Main content area */}
            <Box sx={{
                flexGrow: 1,
                position: 'relative',
                height: '100vh',
                width: '100%',
                overflow: 'hidden',
                pt: isMobile ? '60px' : 0, // Espaço para o header mobile
            }}>
                <MapWrapper sx={{
                    height: '100%',
                    zIndex: 100,
                }}>
                    <MapContainer
                        center={[-3.1190, -60.0217] as LatLngExpression}
                        zoom={zoomLevel}
                        zoomControl={false}
                        style={{
                            height: '100%',
                            width: '100%',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                        }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                            Câmara {index + 1} - {location.name}
                                        </Typography>
                                        <Typography variant="body2">
                                            Última atualização: {lastUpdate.toLocaleDateString()} {lastUpdate.toLocaleTimeString()}
                                        </Typography>
                                        <Typography variant="body2">
                                            Risco epidemiológico: {epidemiologicalPercentage}%
                                        </Typography>
                                    </Popup>
                                </Circle>
                            );
                        })}

                        <UpdateMapZoom zoom={zoomLevel} />
                    </MapContainer>

                    {/* Zoom Controls */}
                    <Paper
                        elevation={3}
                        sx={{
                            position: "absolute",
                            top: isMobile ? 98 : 38, // Ajuste para mobile
                            right: 20,
                            width: 50,
                            height: 122,
                            bgcolor: "#a41414",
                            borderRadius: "45px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 1000,
                        }}
                    >
                        <Stack spacing={1} alignItems="center">
                            <IconButton sx={{ color: "white" }} onClick={handleZoomIn}>
                                <SearchIcon fontSize="large" />
                            </IconButton>
                            <Box sx={{ width: "60%", height: 2, bgcolor: "rgba(255,255,255,0.3)" }} />
                            <IconButton sx={{ color: "white" }} onClick={handleZoomOut}>
                                <ZoomOutIcon fontSize="large" />
                            </IconButton>
                        </Stack>                                                 
                    </Paper>                                          
                </MapWrapper>
            </Box>
        </Box>
    );
};

export default MapPage;