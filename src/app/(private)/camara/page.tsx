'use client';
import {
  Box,
  Button,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Sidebar } from "@/components/Sidebar";
import React from "react";
import { useRouter } from "next/navigation"; // Import correto para Next.js 13+

const TelaCamara = () => {
  const router = useRouter(); // Usando o hook useRouter

  const handleCadastrar = () => {
    router.push('/cadcamara'); // Navegação programática
  };

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "#edeced",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        minHeight: "100vh", // Alterado para minHeight
      }}
    >
      <Sidebar activeItem="Câmara" />
      <Box
        sx={{
          bgcolor: "#edeced",
          overflow: "hidden",
          width: "100%",
          maxWidth: "1440px", // Adicionado maxWidth
          height: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Top red bar */}
        <Box
          sx={{
            height: "26px",
            width: "100%",
            background:
              "linear-gradient(90deg, rgba(119,6,6,1) 0%, rgba(165,21,21,1) 100%)",
          }}
        />

        {/* Main content - Empty state message */}
        <Paper
          elevation={10}
          sx={{
            width: "100%",
            maxWidth: "686px",
            height: "359px",
            marginTop: "85px", // Ajuste de posicionamento
            bgcolor: "#7f0e0e",
            borderRadius: "15px",
            padding: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Poppins-Bold, Helvetica",
              fontWeight: 700,
              color: "white",
              mb: 1,
              fontSize: { xs: '1.5rem', md: '2rem' } // Responsividade
            }}
          >
            Opa!
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontFamily: "Poppins-Medium, Helvetica",
              fontWeight: 500,
              color: "white",
              width: "100%",
              mb: 5,
              fontSize: { xs: '1.1rem', md: '1.5rem' } // Responsividade
            }}
          >
            Parece que você não tem nenhuma câmara cadastrada...
          </Typography>

          <Stack alignItems="center" spacing={2}>
            <Button
              variant="contained"
              onClick={handleCadastrar} // Usando a função de navegação
              sx={{
                bgcolor: "#fff3f3",
                color: "#7d0404",
                borderRadius: "25px",
                width: { xs: "100%", sm: "264px" }, // Responsividade
                height: "47px",
                textTransform: "none",
                fontFamily: "Poppins-SemiBold, Helvetica",
                fontWeight: 600,
                fontSize: { xs: "16px", sm: "20px" }, // Responsividade
                boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
                "&:hover": {
                  bgcolor: "#f8e0e0",
                },
              }}
            >
              Cadastrar câmara
            </Button>

            <Link
              href="/dashboard" // Navegação via Link
              underline="always"
              sx={{
                fontFamily: "Poppins-SemiBold, Helvetica",
                fontWeight: 600,
                color: "white",
                fontSize: { xs: "16px", sm: "20px" }, // Responsividade
                cursor: "pointer",
              }}
            >
              Voltar para o início
            </Link>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default TelaCamara;