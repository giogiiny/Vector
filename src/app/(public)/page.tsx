"use client";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import InsightsIcon from "@mui/icons-material/Insights";
import SearchIcon from "@mui/icons-material/Search";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
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
} from "@mui/material";
import React from "react";

const Home = () => {
  const router = useRouter(); // Mudança aqui
  const menuItems = [
    { label: "HOME", href: "#" },
    { label: "SERVIÇOS", href: "#" },
    { label: "SOBRE", href: "#" },
    { label: "CONTATO", href: "mailto:vectorprojeto@gmail.com" },
  ];

  // Constante de escala para ajustar proporcionalmente
  const SCALE_FACTOR = 0.8;

  return (
    <Box sx={{
      background: "linear-gradient(180deg, #EDECED 50%, #E8BEBE 50%)",
      minHeight: "100vh",
      width: "100%",
      position: "relative",
      fontSize: `${SCALE_FACTOR * 16}px`,
      overflow: "hidden",
    }}>
      {/* SVG Background */}
      <svg
        width="100%"
        height={`${567 * SCALE_FACTOR}px`}
        viewBox="0 0 1440 553"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          top: "23%",
          left: 0,
          zIndex: 0,
          transform: "translateY(-50%)",
        }}
      >
        <path
          d="M1440 56C1440 56 1103.53 278.096 939.665 338.363C775.799 398.63 483.567 255.78 333.114 287.816C170.668 322.407 0 577 0 577H1440V56Z"
          fill="url(#paint0_linear)"
          stroke="url(#paint1_linear)"
          strokeWidth={`${60 * SCALE_FACTOR}`}
        />
        <defs>
          <linearGradient id="paint0_linear" x1="720" y1="56" x2="720" y2="577" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6D1616" />
            <stop offset="1" stopColor="#A51515" />
          </linearGradient>
          <linearGradient id="paint1_linear" x1="720" y1="56" x2="720" y2="577" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6D1616" />
            <stop offset="1" stopColor="#A51515" />
          </linearGradient>
        </defs>
      </svg>

      {/* Segundo SVG Background */}
      <svg
        width="100%"
        height={`${567 * SCALE_FACTOR}px`}
        viewBox="0 0 1440 697"
        preserveAspectRatio="xMidYMin meet"
        style={{
          position: "absolute",
          top: "83.7%",
          height: "100%",
          left: 0,
          zIndex: 0,
          transform: "translateY(-50%)",
        }}
      >
        <g filter="url(#filter0_d_17_18)">
          <path d="M-204 660V0H1452.87V619.56C1435.97 476.926 1229.02 436.698 830.611 584.885C288.288 786.598 7.63797 366.292 -204 660Z" fill="url(#paint0_linear_17_18)" />
        </g>
        <defs>
          <filter id="filter0_d_17_18" x="-224" y="-23" width="1716.87" height="720" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dx="10" dy="7" />
            <feGaussianBlur stdDeviation="15" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_17_18" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_17_18" result="shape" />
          </filter>
          <linearGradient id="paint0_linear_17_18" x1="625" y1="0" x2="625" y2="660" gradientUnits="userSpaceOnUse">
            <stop stopColor="#A51515" />
            <stop offset="1" stopColor="#6D1616" />
          </linearGradient>
        </defs>
      </svg>

      <Container maxWidth="lg" sx={{
        position: "relative",
        minHeight: "100vh",
        zIndex: 1,
        transform: `scale(${SCALE_FACTOR})`,
        transformOrigin: 'top center',
        width: `${100 / SCALE_FACTOR}%`,

      }}>
        {/* Navigation Bar */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            background: "linear-gradient(90deg, rgba(125, 5, 5, 1) 0%, rgba(180, 42, 42, 1) 100%)",
            boxShadow: "black",
            borderRadius: "0 0 30px 30px",
            padding: "0 20px"
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
              spacing={6 * SCALE_FACTOR} // Aumentado de 3 para 6
              sx={{
                flexGrow: 1, // Ocupa espaço disponível
                justifyContent: "center",
                mx: 4 * SCALE_FACTOR // Margem horizontal
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
                    px: 2 * SCALE_FACTOR, // Padding horizontal em cada item
                    py: 1 * SCALE_FACTOR, // Padding vertical
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
                  px: 4 * SCALE_FACTOR, // Aumentado de 3 para 4
                  py: 1.5 * SCALE_FACTOR, // Aumentado de 1 para 1.5
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
                onClick={() => router.push('/cadastro')} // Mudança aqui
                sx={{
                  fontFamily: "sans-serif",
                  fontWeight: 700,
                  color: "#f3f3f3",
                  textDecoration: "none",
                  cursor: "pointer",
                  fontSize: `${1.5 * SCALE_FACTOR}rem`,
                  px: 2 * SCALE_FACTOR, // Adicionado padding horizontal
                }}
              >
                CADASTRE-SE
              </Typography>
            </Stack>
          </Toolbar>
        </AppBar>

        {/* Main Heading */}
        <Box sx={{ mt: 10 * SCALE_FACTOR, textAlign: "center" }}>
          <Typography
            variant="h1"
            sx={{
              fontFamily: "sans-serif",
              fontWeight: 700,
              color: "#700000",
              fontSize: { xs: `${7 * SCALE_FACTOR}rem`, md: `${8 * SCALE_FACTOR}rem` },
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
            textAlign: "left", // Alinha o conteúdo à esquerda
            mt: 15 * SCALE_FACTOR, // Aumenta o margin-top (move para baixo)
            ml: 15 * SCALE_FACTOR, // Adiciona margin-left (move para esquerda)
            width: "fit-content" // Faz o container ter apenas o tamanho do botão
          }}>
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon sx={{ fontSize: `${2 * SCALE_FACTOR}rem` }} />}
              onClick={() => router.push('/login')} // Mudança aqui
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
          top: "85%", // Mesma posição vertical do SVG
          right: 9 * SCALE_FACTOR,
          zIndex: 2,
          transform: "translateY(50%)", // Ajuste de posicionamento
        }}>
          <Stack
            direction="row"
            spacing={1 * SCALE_FACTOR}
            alignItems="center"
            justifyContent="flex-end"
            sx={{ mb: 3 * SCALE_FACTOR }} // Espaço entre os contatos
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
              width: "402px",
              bgcolor: "#fff3f3",
              p: 4 * SCALE_FACTOR,
              borderRadius: "30px",
              boxShadow: "0px 6px 15px rgba(125, 4, 4, 0.15)",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <InsightsIcon sx={{
              fontSize: 60 * SCALE_FACTOR,
              color: "#7d0404",
              mb: 3 * SCALE_FACTOR
            }} />
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "sans-serif",
                  fontWeight: 700,
                  minWidth: "200px",
                  color: "#7d0404",
                  mb: 2 * SCALE_FACTOR,
                  fontSize: "2 rem",
                  textAlign: "center"
                }}
              >
                Fique por dentro
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Poppins-Regular, Helvetica",
                  color: "#7d0404",
                  maxWidth: "300px",
                  fontSize: "1.1rem",
                  textAlign: "center",
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
              width: "402px",
              bgcolor: "#fff3f3",
              p: 4 * SCALE_FACTOR,
              borderRadius: "30px",
              boxShadow: "0px 6px 15px rgba(125, 4, 4, 0.15)",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <SearchIcon sx={{
              fontSize: 60 * SCALE_FACTOR,
              color: "#7d0404",
              mb: 3 * SCALE_FACTOR
            }} />
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "sans-serif",
                  fontWeight: 700,
                  minWidth: "200px",
                  color: "#7d0404",
                  mb: 2 * SCALE_FACTOR,
                  fontSize: "2 rem",
                  textAlign: "center"
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
                  textAlign: "center",
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
            width: "402px",
            bgcolor: "#fff3f3",
            p: 4 * SCALE_FACTOR,
            borderRadius: "30px",
            boxShadow: "0px 6px 15px rgba(125, 4, 4, 0.15)",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TipsAndUpdatesIcon sx={{
            fontSize: 60 * SCALE_FACTOR,
            color: "#7d0404",
            mb: 3 * SCALE_FACTOR
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
                textAlign: "center"
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
                textAlign: "center",
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
            width: "400px",
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
            height: "500px",
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
                position: "absolute",
                width: "336px",
                height: "430px",
                top: "47px",
                left: 0,
                bgcolor: "#fffbfb",
                borderRadius: "45px",
                zIndex: 1, // Adicionado
              }}
            >
              {/* Gradient bar */}
              <Box
                sx={{
                  position: "absolute",
                  width: "166px", // Reduzido
                  height: "18px", // Reduzido
                  top: "37px", // Ajustado
                  left: "112px", // Ajustado
                  borderRadius: "30px",
                  background: "linear-gradient(90deg, rgba(165,21,21,1) 0%, rgba(109,22,22,1) 100%)",
                }}
              />

              {/* Red accent bar */}
              <Box
                sx={{
                  position: "absolute",
                  width: "103px", // Reduzido
                  height: "18px", // Reduzido
                  top: "50px", // Ajustado
                  left: "176px", // Ajustado
                  bgcolor: "#a41414",
                  borderRadius: "30px",
                }}
              />

              {/* Left panel text */}
              <Typography
                sx={{
                  position: "absolute",
                  width: "262px", // Reduzido
                  top: "109px", // Ajustado
                  left: "17px", // Ajustado
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  color: "#700000",
                  fontSize: "24px", // Reduzido de 32px
                  textAlign: "right",
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
                position: "absolute",
                width: "400px",
                height: "500px",
                top: 0,
                left: "300px",
                borderRadius: "45px",
                background: "linear-gradient(180deg, rgba(109,22,22,1) 0%, rgba(165,21,21,1) 100%)",
                zIndex: 3,
              }}
            >
              {/* Logo circle */}
              <Box
                sx={{
                  position: "absolute",
                  width: "220px",
                  height: "220px",
                  top: "49px",
                  left: "95px",
                  bgcolor: "white",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden", // Adicionado para garantir que a imagem não ultrapasse os limites do círculo
                }}
              >
                <Image
                  src={VectorLogo2}
                  alt="Vector Logo"
                  width={180} // Ajuste este valor conforme necessário
                  height={180} // Ajuste este valor conforme necessário
                    />
              </Box>

              {/* Center panel text */}
              <Typography
                sx={{
                  position: "absolute",
                  width: "328px",
                  top: "294px",
                  left: "38px",
                  fontFamily: "sans-serif",
                  fontWeight: 500,
                  color: "white",
                  fontSize: "18px",
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
                position: "absolute",
                width: "336px",
                height: "430px",
                top: "47px",
                left: "664px",
                bgcolor: "#fffbfb",
                borderRadius: "45px",
                zIndex: 2, // Adicionado
              }}
            >
              {/* Gradient bar - Ajustado */}
              <Box
                sx={{
                  position: "absolute",
                  width: "166px", // Reduzido
                  height: "18px", // Reduzido
                  top: "350px", // Ajustado
                  left: "57px", // Ajustado
                  borderRadius: "30px",
                  background: "linear-gradient(90deg, rgba(109,22,22,1) 7%, rgba(165,21,21,1) 98%)",
                }}
              />

              {/* Red accent bar - Ajustado */}
              <Box
                sx={{
                  position: "absolute",
                  width: "103px", // Reduzido
                  height: "18px", // Reduzido
                  top: "360px", // Ajustado
                  left: "57px", // Ajustado
                  bgcolor: "#b42a2a",
                  borderRadius: "30px",
                }}
              />

              {/* Right panel text - Ajustado */}
              <Typography
                sx={{
                  position: "absolute",
                  width: "252px", // Reduzido
                  top: "55px", // Ajustado
                  left: "57px", // Ajustado
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  color: "#700000",
                  fontSize: "22px", // Reduzido de 30px
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
            mt: 4, // Espaço acima do footer
            mb: 3, // Espaço abaixo do footer
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