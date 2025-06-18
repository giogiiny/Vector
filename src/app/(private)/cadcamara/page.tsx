'use client';
import { Sidebar } from "@/components/Sidebar";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const TelaCmara = () => {
  return (
    <Box
      sx={{
        bgcolor: "#edeced",
        width: "100%",
        minHeight: "100vh",
        height: "100vh",
        display: "flex",
      }}
    >
      <Sidebar activeItem="Câmara" />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
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

        {/* Main form card */}
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            maxWidth: 686,
            borderRadius: "15px",
            p: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Title */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "#7d0404",
              fontFamily: "'Poppins-ExtraBold', Helvetica",
              mb: 2,
              fontSize: { xs: '1.8rem', sm: '2rem' }
            }}
          >
            Cadastre sua câmara
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="body1"
            sx={{
              fontWeight: 300,
              color: "#7d0404",
              fontFamily: "'Poppins-Light', Helvetica",
              fontSize: { xs: '1rem', sm: '1.25rem' },
              mb: 4,
            }}
          >
            Faça a identificação da sua câmara para ter acesso aos seus dados
          </Typography>

          {/* Form fields */}
          <Stack
            spacing={3}
            sx={{ width: "100%", alignItems: "center", mb: 4 }}
          >
            <TextField
              fullWidth
              placeholder="ID da câmara*"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "36.5px",
                  height: { xs: 56, sm: 73 },
                },
              }}
            />

            <TextField
              fullWidth
              placeholder="Nome da câmara (opcional)"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "36.5px",
                  height: { xs: 56, sm: 73 },
                },
              }}
            />
          </Stack>

          {/* Button */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              sx={{
                width: { xs: '100%', sm: 283 },
                height: { xs: 56, sm: 73 },
                borderRadius: "36.5px",
                backgroundColor: "#f8d7d7",
                color: "#7d0404",
                fontSize: { xs: '1rem', sm: '1.25rem' },
                textTransform: "none",
                mb: 2,
                "&:hover": {
                  backgroundColor: "#f0c5c5",
                },
              }}
            >
              Cadastrar
            </Button>

            {/* Cancel link */}
            <Typography
              variant="body1"
              sx={{
                color: "#770606",
                fontSize: { xs: '1rem', sm: '1.5rem' },
                fontWeight: 500,
                textDecoration: "underline",
                cursor: "pointer",
                fontFamily: "'Inter-Medium', Helvetica",
              }}
            >
              Cancelar
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default TelaCmara;