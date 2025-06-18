'use client';
import {
    Box,
    Button,
    Container,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";

const TelaSenha = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setConfirmPassword(event.target.value);
    };

    const handleReset = () => {
        // Password reset logic would go here
        console.log("Password reset requested");
    };

    const handleCancel = () => {
        // Cancel logic would go here
        console.log("Reset cancelled");
    };

    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                bgcolor: "#edeced",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <Container maxWidth="lg" sx={{ position: "relative", height: "100vh" }}>
                <Box
                    component="img"
                    src="/vectorbrc-1.png"
                    alt="Decorative element"
                    sx={{
                        position: "absolute",
                        width: "168px",
                        height: "168px",
                        top: "32px",
                        right: "20px",
                    }}
                />

                <Box
                    sx={{
                        position: "absolute",
                        left: 0,
                        bottom: 0,
                        width: "490px",
                        height: "350px",
                    }}
                >
                    <Box
                        component="img"
                        src="/vectormira-1.png"
                        alt="Decorative element"
                        sx={{
                            position: "absolute",
                            width: "403px",
                            height: "350px",
                            left: 0,
                            top: 0,
                            objectFit: "cover",
                        }}
                    />
                    <Box
                        component="img"
                        src="/vectormira-2.png"
                        alt="Decorative element"
                        sx={{
                            position: "absolute",
                            width: "490px",
                            height: "115px",
                            left: 0,
                            top: "235px",
                            objectFit: "cover",
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                    }}
                >
                    <Paper
                        elevation={4}
                        sx={{
                            width: "568px",
                            borderRadius: "45px",
                            p: 6,
                            bgcolor: "#fff",
                            position: "relative",
                            mt: 8,
                        }}
                    >
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                fontWeight: 800,
                                color: "#7d0404",
                                mb: 2,
                                fontFamily: "'Poppins', sans-serif",
                            }}
                        >
                            Redefina sua senha
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 300,
                                color: "#7d0404",
                                mb: 4,
                                fontSize: "1.25rem",
                                fontFamily: "'Poppins', sans-serif",
                            }}
                        >
                            Tudo certo! Agora você pode redefinir sua senha
                        </Typography>

                        <Stack spacing={3} sx={{ mb: 4 }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Informe sua nova senha"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "36.5px",
                                        height: "73px",
                                    },
                                }}
                            />

                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Confirme sua senha"
                                type="password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "36.5px",
                                        height: "73px",
                                    },
                                }}
                            />
                        </Stack>

                        <Stack spacing={2} alignItems="center">
                            <Button
                                variant="contained"
                                onClick={handleReset}
                                sx={{
                                    width: "283px",
                                    height: "73px",
                                    borderRadius: "45px",
                                    bgcolor: "#7d0404",
                                    color: "white",
                                    textTransform: "none",
                                    fontSize: "1.5rem",
                                    fontWeight: 800,
                                    "&:hover": {
                                        bgcolor: "#5d0303",
                                    },
                                }}
                            >
                                Redefinir
                            </Button>

                            <Button
                                variant="outlined"
                                onClick={handleCancel}
                                sx={{
                                    width: "283px",
                                    height: "73px",
                                    borderRadius: "45px",
                                    borderColor: "#770606",
                                    borderWidth: "4px",
                                    color: "#770606",
                                    textTransform: "none",
                                    fontSize: "1.5rem",
                                    fontWeight: 800,
                                    "&:hover": {
                                        borderColor: "#5d0303",
                                        borderWidth: "4px",
                                        bgcolor: "transparent",
                                    },
                                }}
                            >
                                Cancelar
                            </Button>
                        </Stack>
                    </Paper>
                </Box>
            </Container>
        </Box>
    );
};

export default TelaSenha;
