"use client";
import dynamic from "next/dynamic";
import { LatLngExpression } from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SearchIcon from "@mui/icons-material/Search";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import { Box, IconButton, Paper, Stack, styled, Typography } from "@mui/material";
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

export const MapComponent = () => {
    const [zoomLevel, setZoomLevel] = useState(12);

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
                    top: 38,
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
                <Stack spacing={1} alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
                    <IconButton
                        sx={{
                            color: "white",
                            padding: '8px',
                            '& svg': {
                                fontSize: '1.5rem' // Tamanho médio para os ícones
                            }
                        }}
                        onClick={handleZoomIn}
                    >
                        <SearchIcon />
                    </IconButton>

                    <Box sx={{
                        width: "60%",
                        height: 1,
                        bgcolor: "rgba(255,255,255,0.3)",
                         }} />

                    <IconButton
                        sx={{
                            color: "white",
                            padding: '8px',
                            '& svg': {
                                fontSize: '1.5rem' // Tamanho médio para os ícones
                            }
                        }}
                        onClick={handleZoomOut}
                    >
                        <ZoomOutIcon />
                    </IconButton>
                </Stack>
            </Paper>
        </MapWrapper>
    );
};