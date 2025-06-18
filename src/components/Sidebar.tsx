"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaaseApp"; // Ajuste o caminho conforme necessário
import Image from "next/image";
import Logo2 from "../assets/Logo2.png";
import VectorText from "../assets/VectorText.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MapIcon from "@mui/icons-material/Map";
import VideocamIcon from "@mui/icons-material/Videocam";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";

interface SidebarProps {
  activeItem?: string;
}

interface UserData {
  name?: string;
  photoURL?: string;
  email?: string;
}

export const Sidebar = ({ activeItem = "Mapa" }: SidebarProps) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Busca dados adicionais do Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData);
        } else {
          // Se não tiver no Firestore, usa dados básicos do Auth
          setUserData({
            name: user.displayName || "Usuário",
            photoURL: user.photoURL || undefined,
            email: user.email || undefined
          });
        }
      } else {
        setUserData(null);
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      handleMenuClose();
      router.push("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const handleEditProfile = () => {
    handleMenuClose();
    router.push("/configuracoes");
  };

  const menuItems = [
    { text: "Mapa", icon: <MapIcon />, path: "/dashboard" },
    { text: "Câmara", icon: <VideocamIcon />, path: "/camara" },
    { text: "Relatórios", icon: <AssessmentIcon />, path: "/relatorios" },
    { text: "Configurações", icon: <SettingsIcon />, path: "/configuracoes" },
  ];

  // Extrai o primeiro nome
  const firstName = userData?.name?.split(" ")[0] || "Usuário";

  return (
    <Paper
      elevation={8}
      sx={{
        minWidth: 300,
        width: 350,
        height: "100%",
        bgcolor: "#edeced",
        borderRadius: 0,
        display: "flex",
        flexDirection: "column",
        zIndex: 10,
        flexShrink: 0,
      }}
    >
      {/* Red top bar */}
      <Box
        sx={{
          width: "100%",
          height: 26,
          background:
            "linear-gradient(90deg, rgba(119,6,6,1) 0%, rgba(165,21,21,1) 100%)",
        }}
      />

      {/* Logo e Texto VECTOR */}
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        mt: 4,
        mb: 4,
        position: 'relative',
        pl: 2
      }}>
        <Box sx={{
          position: 'absolute',
          width: 110,
          height: 100,
          background: "linear-gradient(180deg, rgba(119,6,6,1) 0%, rgba(165,21,21,1) 100%)",
          borderRadius: '0 70px 70px 0',
          left: 0,
          zIndex: 0,
        }} />
        <Box sx={{
          width: 120,
          height: 120,
          position: "relative",
          zIndex: 1,
          ml: -2
        }}>
          <Image
            src={Logo2}
            alt="Logo"
            fill
            style={{ objectFit: "contain" }}
          />
        </Box>
        <Box sx={{
          width: 200,
          height: 80,
          position: "relative",
          zIndex: 1,
          ml: 0,
          mr: 1.5
        }}>
          <Image
            src={VectorText}
            alt="VECTOR"
            layout="fill"
            objectFit="contain"
          />
        </Box>
      </Box>

      {/* Navigation */}
      <List sx={{ flex: 1 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => router.push(item.path)}
            selected={activeItem === item.text}
            sx={{
              height: 60,
              pl: 4,
              bgcolor: activeItem === item.text ? "rgba(165,21,21,0.2)" : "transparent",
              borderLeft: activeItem === item.text ? "4px solid #a51515" : "none",
              "&:hover": {
                bgcolor: "rgba(165,21,21,0.1)",
              },
              "&.Mui-selected": {
                bgcolor: "rgba(165,21,21,0.2)",
                "&:hover": {
                  bgcolor: "rgba(165,21,21,0.25)",
                },
              },
            }}
          >
            <ListItemIcon sx={{
              color: activeItem === item.text ? "#a51515" : "#7d0404",
              minWidth: 40
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                sx: {
                  fontFamily: "sans-serif",
                  fontWeight: activeItem === item.text ? 600 : 500,
                  fontSize: "1.25rem",
                  color: activeItem === item.text ? "#a51515" : "#7d0404",
                },
              }}
            />
          </ListItemButton>
        ))}
      </List>

      {/* User Profile com Menu - Área atualizada */}
      <Box sx={{ p: 3, display: "flex", alignItems: "center", position: "relative" }}>
        <Avatar
          src={userData?.photoURL || undefined}
          sx={{
            bgcolor: "rgba(119,6,6,0.4)",
            width: 50,
            height: 50,
            color: "#fff",
            fontSize: "1.2rem",
          }}
        >
          {!userData?.photoURL && firstName.charAt(0).toUpperCase()}
        </Avatar>
        <Typography
          sx={{
            ml: 2,
            fontFamily: "sans-serif",
            fontWeight: 500,
            fontSize: "1.1rem",
            color: "#7d0404",
            flexGrow: 1,
          }}
        >
          {firstName}
        </Typography>
        <IconButton
          sx={{ color: "#7d0404" }}
          onClick={handleMenuClick}
        >
          <ArrowDropDownIcon />
        </IconButton>

        {/* Menu Dropdown */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleEditProfile} sx={{ minWidth: 180 }}>
            <ListItemIcon sx={{ color: "#7d0404" }}>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Editar Perfil</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon sx={{ color: "#7d0404" }}>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Sair</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
    </Paper>
  );
};