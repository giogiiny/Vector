"use client";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import InsightsIcon from "@mui/icons-material/Insights";
import SearchIcon from "@mui/icons-material/Search";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Logo1 from "../../assets/Logo1.png";
import VectorLogo2 from "../../assets/VectorLogo2.png";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  AppBar,
  Box,
  Button,
  Paper,
  Container,
  Stack,
  Toolbar,
  Typography,
  Link,
  IconButton,
  ListItemButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Divider
} from "@mui/material";
import React, { useState } from "react";
import WaveBackground from "@/components/MapComponent";

const Home = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { label: "HOME", href: "#" },
    { label: "SERVIÇOS", href: "#" },
    { label: "SOBRE", href: "#" },
    { label: "CONTATO", href: "mailto:vectorprojeto@gmail.com" },
  ];

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  // Constante de escala para ajustar proporcionalmente
  const SCALE_FACTOR = isMobile ? 0.6 : 0.8;

  return (
    <Box sx={{
      background: "linear-gradient(180deg, #EDECED 50%, #E8BEBE 50%)",
      minHeight: "100vh",
      width: "100%",
      position: "relative",
      fontSize: `${SCALE_FACTOR * 16}px`,
      overflow: "hidden",
    }}>
      {/* Mobile Header */}
      <AppBar
        position="fixed"
        sx={{
          display: { xs: 'flex', md: 'none' },
          bgcolor: "#7d0404",
          boxShadow: "0px 2px 4px rgba(0,0,0,0.1)"
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ 
            fontFamily: "sans-serif",
            fontWeight: 700,
            color: "white"
          }}>
            VECTOR
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 250,
            bgcolor: "#7d0404",
            color: "white"
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <IconButton onClick={toggleDrawer(false)} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
        <List>
          {menuItems.map((item) => (
            <ListItem 
              key={item.label} 
              component="a" 
              href={item.href}
              onClick={toggleDrawer(false)}
              sx={{
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              <ListItemText primary={item.label} sx={{ textAlign: 'center' }} />
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                router.push('/login');
                toggleDrawer(false);
              }}
              sx={{
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              <ListItemText primary="ENTRAR" sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                router.push('/cadastro');
                toggleDrawer(false);
              }}
              sx={{
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              <ListItemText primary="CADASTRE-SE" sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* SVG Background */}
      <WaveBackground/>

      <Container maxWidth="lg" sx={{
        position: "relative",
        minHeight: "100vh",
        zIndex: 1,
        transform: `scale(${SCALE_FACTOR})`,
        transformOrigin: 'top center',
        width: `${100 / SCALE_FACTOR}%`,
        pt: { xs: '60px', md: 0 } // Adiciona padding-top para mobile header
      }}>
        {/* Navigation Bar - Apenas desktop */}
        {!isMobile && (
          <AppBar
            position="static"
            elevation={0}
            sx={{
              background: "linear-gradient(90deg, rgba(125, 5, 5, 1) 0%, rgba(180, 42, 42, 1) 100%)",
              boxShadow: "black",
              borderRadius: "0 0 30px 30px",
              padding: "0 20px",
              display: { xs: 'none', md: 'block' }
            }}
          >
            <Toolbar sx={{
              justifyContent: "space-between", py: 0.7 * SCALE_FACTOR, minHeight: "80px !important"
            }}>
              {/* Logo - Adiciona margem à direita */}
              <Box sx={{ mr: 6 * SCALE_FACTOR }}>
                <Image
                  src={Logo1}
                  alt="Vector-Logo"
                  height={100 * SCALE_FACTOR}
                />
              </Box>

              {/* Menu Items - Aumenta o spacing */}
              <Stack
                direction="row"
                spacing={6 * SCALE_FACTOR}
                sx={{
                  flexGrow: 1,
                  justifyContent: "center",
                  mx: 4 * SCALE_FACTOR
                }}
              >
                {menuItems.map((item) => (
                  <Typography
                    key={item.label}
                    variant="h6"
                    component="a"
                    href={item.href}
                    sx={{
                      fontFamily: "sans-serif",
                      fontWeight: 700,
                      color: "white",
                      textDecoration: "none",
                      fontSize: `${1.5 * SCALE_FACTOR}rem`,
                      px: 2 * SCALE_FACTOR,
                      py: 1 * SCALE_FACTOR,
                      '&:hover': {
                        transform: 'scale(1.05)',
                        transition: 'transform 0.2s'
                      }
                    }}
                  >
                    {item.label}
                  </Typography>
                ))}
              </Stack>

              {/* Action Buttons - Aumenta o spacing */}
              <Stack
                direction="row"
                spacing={4 * SCALE_FACTOR}
                alignItems="center"
                sx={{ ml: 6 * SCALE_FACTOR }}
              >
                <Button
                  variant="contained"
                  onClick={() => router.push('/login')}
                  sx={{
                    bgcolor: "#edeced",
                    color: "#7d0404",
                    fontFamily: "sans-serif",
                    fontWeight: 700,
                    fontSize: `${1.25 * SCALE_FACTOR}rem`,
                    borderRadius: `${30 * SCALE_FACTOR}px`,
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    textTransform: "none",
                    px: 4 * SCALE_FACTOR,
                    py: 1.5 * SCALE_FACTOR,
                    "&:hover": {
                      bgcolor: "#dcdcdc",
                    },
                  }}
                >
                  ENTRAR
                </Button>
                <Typography
                  variant="h6"
                  component="a"
                  onClick={() => router.push('/cadastro')}
                  sx={{
                    fontFamily: "sans-serif",
                    fontWeight: 700,
                    color: "#f3f3f3",
                    textDecoration: "none",
                    cursor: "pointer",
                    fontSize: `${1.5 * SCALE_FACTOR}rem`,
                    px: 2 * SCALE_FACTOR,
                  }}
                >
                  CADASTRE-SE
                </Typography>
              </Stack>
            </Toolbar>
          </AppBar>
        )}

        {/* Resto do conteúdo permanece o mesmo... */}
        {/* Main Heading */}
        <Box sx={{ mt: { xs: 8 * SCALE_FACTOR, md: 10 * SCALE_FACTOR }, textAlign: "center" }}>
          <Typography
            variant="h1"
            sx={{
              fontFamily: "sans-serif",
              fontWeight: 700,
              color: "#700000",
              fontSize: { xs: `${4 * SCALE_FACTOR}rem`, sm: `${6 * SCALE_FACTOR}rem`, md: `${8 * SCALE_FACTOR}rem` },
              maxWidth: `${2000 * SCALE_FACTOR}px`,
              mx: "auto",
              mb: 5 * SCALE_FACTOR,
              textAlign: "center"
            }}
          >
            O VECTOR está aqui para ajudar
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontFamily: "sans-serif",
              fontWeight: 300,
              color: "#7d0404",
              fontSize: `${1.8 * SCALE_FACTOR}rem`,
              maxWidth: `${630 * SCALE_FACTOR}px`,
              mx: "auto",
              mb: 10 * SCALE_FACTOR,
              textAlign: "center"
            }}
          >
            Cadastre e monitore os dados analisados da sua câmara, ou acesse o
            mapa para verificar os possíveis focos de epidemias na sua região
          </Typography>

          {/* Container do Botão - Modificado */}
          <Box sx={{
            textAlign: "left",
            mt: 15 * SCALE_FACTOR,
            ml: { xs: 0, md: 15 * SCALE_FACTOR },
            width: "fit-content",
            mx: { xs: 'auto', md: 'initial' }
          }}>
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon sx={{ fontSize: `${2 * SCALE_FACTOR}rem` }} />}
              onClick={() => router.push('/login')}
              sx={{
                bgcolor: "#edeced",
                color: "#7d0404",
                fontFamily: "sans-serif",
                fontWeight: 700,
                fontSize: `${1.25 * SCALE_FACTOR}rem`,
                borderRadius: `${45 * SCALE_FACTOR}px`,
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                px: 4 * SCALE_FACTOR,
                py: 1.5 * SCALE_FACTOR,
                "&:hover": {
                  bgcolor: "#dcdcdc",
                },
              }}
            >
              ENTRAR
            </Button>
          </Box>
        </Box>

        {/* Contatos */}
        <Box sx={{
          position: "absolute",
          top: "85%",
          right: 9 * SCALE_FACTOR,
          zIndex: 2,
          transform: "translateY(50%)",
        }}>
          <Stack
            direction="row"
            spacing={1 * SCALE_FACTOR}
            alignItems="center"
            justifyContent="flex-end"
            sx={{ mb: 3 * SCALE_FACTOR }}
          >
            <Link href="https://www.instagram.com/projeto_vector/" target="_blank" rel="noopener noreferrer" underline="none">
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Poppins-Regular, Helvetica",
                  color: "white",
                  cursor: "pointer",
                  fontSize: `${1.125 * SCALE_FACTOR}rem`,
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
              >
                @projeto_vector
              </Typography>
            </Link>
            <InstagramIcon sx={{ color: "white", fontSize: `${2 * SCALE_FACTOR}rem` }} />
          </Stack>

          <Stack
            direction="row"
            spacing={1 * SCALE_FACTOR}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Link
              href="mailto:vectorprojeto@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
            >
              <Typography variant="body1" 
              sx={{ fontFamily: "Poppins-Regular, Helvetica",
               color: "white",
                fontSize: `${1.125 * SCALE_FACTOR}rem`,
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
              >
              vectorprojeto@gmail.com
            </Typography>
            </Link>
            
            <EmailIcon sx={{ color: "white", fontSize: `${2 * SCALE_FACTOR}rem` }} />
          </Stack>
        </Box>
      </Container>

      {/* Section: Cards + Botão Começar */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 25 * SCALE_FACTOR,
          gap: 6 * SCALE_FACTOR,
          position: "relative",
          transform: "translateY(0%)",
          zIndex: 1,
          pb: 10
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={6 * SCALE_FACTOR}
          justifyContent="center"
          alignItems="flex-start"
        >
          {/* Card 1 */}
          <Box
            sx={{
              width: { xs: '90%', md: "402px" },
              maxWidth: "402px",
              bgcolor: "#fff3f3",
              p: 4 * SCALE_FACTOR,
              borderRadius: "30px",
              boxShadow: "0px 6px 15px rgba(125, 4, 4, 0.15)",
              display: "flex",
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: "center",
              mx: 'auto'
            }}
          >
            <InsightsIcon sx={{
              fontSize: 60 * SCALE_FACTOR,
              color: "#7d0404",
              mb: { xs: 2, sm: 0 },
              mr: { sm: 2 }
            }} />
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "sans-serif",
                  fontWeight: 700,
                  color: "#7d0404",
                  mb: 2 * SCALE_FACTOR,
                  fontSize: "2rem",
                  textAlign: { xs: 'center', sm: 'left' }
                }}
              >
                Fique por dentro
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Poppins-Regular, Helvetica",
                  color: "#7d0404",
                  fontSize: "1.1rem",
                  textAlign: { xs: 'center', sm: 'left' },
                  lineHeight: 1.6
                }}
              >
                Com o VECTOR, você pode monitorar as chances de epidemias na sua região
              </Typography>
            </Box>
          </Box>

          {/* Card 2 */}
          <Box
            sx={{
              width: { xs: '90%', md: "402px" },
              maxWidth: "402px",
              bgcolor: "#fff3f3",
              p: 4 * SCALE_FACTOR,
              borderRadius: "30px",
              boxShadow: "0px 6px 15px rgba(125, 4, 4, 0.15)",
              display: "flex",
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: "center",
              mx: 'auto'
            }}
          >
            <SearchIcon sx={{
              fontSize: 60 * SCALE_FACTOR,
              color: "#7d0404",
              mb: { xs: 2, sm: 0 },
              mr: { sm: 2 }
            }} />
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "sans-serif",
                  fontWeight: 700,
                  color: "#7d0404",
                  mb: 2 * SCALE_FACTOR,
                  fontSize: "2rem",
                  textAlign: { xs: 'center', sm: 'left' }
                }}
              >
                Análise
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Poppins-Regular, Helvetica",
                  color: "#7d0404",
                  fontSize: "1.1rem",
                  textAlign: { xs: 'center', sm: 'left' },
                  lineHeight: 1.6
                }}
              >
                Se você tiver uma câmara cadastrada, poderá ter acesso aos dados contidos nela
              </Typography>
            </Box>
          </Box>
        </Stack>

        {/* Card 3 Centralizado */}
        <Box
          sx={{
            width: { xs: '90%', md: "402px" },
            maxWidth: "402px",
            bgcolor: "#fff3f3",
            p: 4 * SCALE_FACTOR,
            borderRadius: "30px",
            boxShadow: "0px 6px 15px rgba(125, 4, 4, 0.15)",
            display: "flex",
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: "center",
            mx: 'auto'
          }}
        >
          <TipsAndUpdatesIcon sx={{
            fontSize: 60 * SCALE_FACTOR,
            color: "#7d0404",
            mb: { xs: 2, sm: 0 },
            mr: { sm: 2 }
          }} />
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "sans-serif",
                fontWeight: 700,
                color: "#7d0404",
                mb: 2 * SCALE_FACTOR,
                fontSize: "1.5rem",
                textAlign: { xs: 'center', sm: 'left' }
              }}
            >
              Recomendação
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Poppins-Regular, Helvetica",
                color: "#7d0404",
                fontSize: "1.1rem",
                textAlign: { xs: 'center', sm: 'left' },
                lineHeight: 1.6
              }}
            >
              Se você tiver uma câmara cadastrada, poderá ter acesso aos dados contidos nela
            </Typography>
          </Box>
        </Box>

        {/* Botão Começar */}
        <Button
          variant="contained"
          onClick={() => router.push('/cadastro')}
          sx={{
            bgcolor: "#edeced",
            color: "#7d0404",
            fontFamily: "sans-serif",
            fontWeight: 700,
            fontSize: `${1.25 * SCALE_FACTOR}rem`,
            borderRadius: `${45 * SCALE_FACTOR}px`,
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            px: 4 * SCALE_FACTOR,
            py: 1.5 * SCALE_FACTOR,
            width: { xs: '90%', sm: "400px" },
            maxWidth: "400px",
            mx: 'auto',
            "&:hover": {
              bgcolor: "#dcdcdc",
            },
          }}
        >
          Começar
        </Button>
        
        {/* paineis */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "1000px",
            height: { xs: 'auto', md: "500px" },
            position: "relative",
            margin: "0 auto",
            mb: 10,
            transform: "translateY(15%)",
          }}
        >
          <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
            {/* Left panel - z-index mais baixo */}
            <Paper
              elevation={4}
              sx={{
                position: { xs: 'static', md: "absolute" },
                width: { xs: '90%', md: "336px" },
                height: { xs: 'auto', md: "430px" },
                top: { md: "47px" },
                left: { md: 0 },
                bgcolor: "#fffbfb",
                borderRadius: "45px",
                zIndex: 1,
                p: 3,
                mb: { xs: 2, md: 0 },
                mx: { xs: 'auto', md: 'initial' }
              }}
            >
              {/* Gradient bar */}
              <Box
                sx={{
                  width: "166px",
                  height: "18px",
                  borderRadius: "30px",
                  background: "linear-gradient(90deg, rgba(165,21,21,1) 0%, rgba(109,22,22,1) 100%)",
                  mb: 2,
                  mx: 'auto'
                }}
              />

              {/* Red accent bar */}
              <Box
                sx={{
                  width: "103px",
                  height: "18px",
                  bgcolor: "#a41414",
                  borderRadius: "30px",
                  mb: 3,
                  mx: 'auto'
                }}
              />

              {/* Left panel text */}
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  color: "#700000",
                  fontSize: { xs: "1.2rem", md: "1.5rem" },
                  textAlign: "center",
                }}
              >
                A parte inteligente, responsável pelo mapeamento e análise dos dados
                das amostras coletadas
              </Typography>
            </Paper>

            {/* Center panel */}
            <Paper
              elevation={4}
              sx={{
                position: { xs: 'static', md: "absolute" },
                width: { xs: '90%', md: "400px" },
                height: { xs: 'auto', md: "500px" },
                top: { md: 0 },
                left: { md: "300px" },
                borderRadius: "45px",
                background: "linear-gradient(180deg, rgba(109,22,22,1) 0%, rgba(165,21,21,1) 100%)",
                zIndex: 3,
                p: 3,
                mb: { xs: 2, md: 0 },
                mx: { xs: 'auto', md: 'initial' }
              }}
            >
              {/* Logo circle */}
              <Box
                sx={{
                  width: { xs: '150px', md: "220px" },
                  height: { xs: '150px', md: "220px" },
                  bgcolor: "white",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                  mx: 'auto',
                  mb: 3
                }}
              >
                <Image
                  src={VectorLogo2}
                  alt="Vector Logo"
                  width={120}
                  height={120}
                />
              </Box>

              {/* Center panel text */}
              <Typography
                sx={{
                  fontFamily: "sans-serif",
                  fontWeight: 500,
                  color: "white",
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  textAlign: "center",
                }}
              >
                O VECTOR é um sistema de mapeamento probabilístico espacial de risco
                de epidemias por doenças transmitidas pelo Aedes aegypti, composto
                por duas partes
              </Typography>
            </Paper>

            {/* Right panel - Reduzido proporcionalmente */}
            <Paper
              elevation={4}
              sx={{
                position: { xs: 'static', md: "absolute" },
                width: { xs: '90%', md: "336px" },
                height: { xs: 'auto', md: "430px" },
                top: { md: "47px" },
                left: { md: "664px" },
                bgcolor: "#fffbfb",
                borderRadius: "45px",
                zIndex: 2,
                p: 3,
                mx: { xs: 'auto', md: 'initial' }
              }}
            >
              {/* Gradient bar - Ajustado */}
              <Box
                sx={{
                  width: "166px",
                  height: "18px",
                  borderRadius: "30px",
                  background: "linear-gradient(90deg, rgba(109,22,22,1) 7%, rgba(165,21,21,1) 98%)",
                  mb: 2,
                  mx: 'auto'
                }}
              />

              {/* Red accent bar - Ajustado */}
              <Box
                sx={{
                  width: "103px",
                  height: "18px",
                  bgcolor: "#b42a2a",
                  borderRadius: "30px",
                  mb: 3,
                  mx: 'auto'
                }}
              />

              {/* Right panel text - Ajustado */}
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  color: "#700000",
                  fontSize: { xs: "1.2rem", md: "1.375rem" },
                  textAlign: "center"
                }}
              >
                E a parte física, que captura imagens de lâminas com amostras para
                contar e identificar potenciais focos do vetor
              </Typography>
            </Paper>
          </Box>
        </Box>
        
        {/* Footer adicionado abaixo dos painéis */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "1000px",
            margin: "0 auto",
            textAlign: "center",
            mt: 4,
            mb: 3,
            color: "#700000",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "1rem",
            fontWeight: 400,
          }}
        >
          <Typography variant="body1">
            Fundação Matias Machline | Projeto VECTOR
            <br />
            2024/2025
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;