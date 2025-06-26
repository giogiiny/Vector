'use client';
import { Sidebar } from "@/components/Sidebar";
import {
  Box,
  Button,
  Checkbox,
  Paper,
  Stack,
  TextField,
  Typography,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme
} from "@mui/material";
import React, { useState, ChangeEvent } from "react";
import { doc, collection, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaaseApp";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";

const TelaCmara = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [formData, setFormData] = useState({
    apelido: '',
    endereco: '',
    teveChuva: false,
    deviceId: '', // Novo campo para o ID da Raspberry
    ipAddress: '' // Novo campo para o endereço IP
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      // Validação dos campos obrigatórios
      if (!formData.deviceId || !formData.ipAddress) {
        throw new Error('ID da Raspberry e Endereço IP são obrigatórios');
      }

      const cameraRef = doc(collection(db, "camaras"));

      await setDoc(cameraRef, {
        deviceId: formData.deviceId,
        ipAddress: formData.ipAddress, // Salva o IP no Firestore
        apelido: formData.apelido,
        endereco: formData.endereco,
        teveChuva: formData.teveChuva,
        criado: new Date(),
        userId: user.uid
      });

      setSnackbar({
        open: true,
        message: 'Câmara registrada com sucesso!',
        severity: 'success'
      });

      setTimeout(() => {
        router.push("/camara");
      }, 1000);

    } catch (error: any) {
      console.error("Erro ao registrar câmara:", error);
      setSnackbar({
        open: true,
        message: error.message || 'Erro ao registrar câmara. Tente novamente.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box
      sx={{
        bgcolor: "#edeced",
        minHeight: "100vh",
        position: 'relative',
        display: 'flex'
      }}
    >


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
          <Sidebar activeItem="Câmara" />
        </Box>
      )}

      {/* Main content - com margem para sidebar */}
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: '100vh',
          ml: { sm: '70px', md: '350px' },
          pt: { xs: '60px', sm: '26px' }
        }}
      >
        {/* Main form card */}
        <Paper
          component="form"
          onSubmit={handleSubmit}
          elevation={4}
          sx={{
            width: "100%",
            maxWidth: 686,
            borderRadius: "15px",
            p: { xs: 3, md: 4 },
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
              fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            Registrar Nova Câmara
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="body1"
            sx={{
              fontWeight: 300,
              color: "#7d0404",
              fontFamily: "'Poppins-Light', Helvetica",
              fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.25rem' },
              mb: 4,
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            Informe os dados de instalação do dispositivo
          </Typography>

          {/* Form fields */}
          <Stack
            spacing={3}
            sx={{ width: "100%", mb: 4 }}
          >
            <TextField
              fullWidth
              name="deviceId"
              value={formData.deviceId}
              onChange={handleInputChange}
              placeholder="ID da Raspberry Pi*"
              variant="outlined"
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "36.5px",
                  height: { xs: 48, sm: 56, md: 73 },
                },
              }}
            />

            <TextField
              fullWidth
              name="ipAddress"
              value={formData.ipAddress}
              onChange={handleInputChange}
              placeholder="Endereço IP da Raspberry* (ex: 192.168.1.100)"
              variant="outlined"
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "36.5px",
                  height: { xs: 48, sm: 56, md: 73 },
                },
              }}
            />

            <TextField
              fullWidth
              name="apelido"
              value={formData.apelido}
              onChange={handleInputChange}
              placeholder="Apelido (opcional)"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "36.5px",
                  height: { xs: 48, sm: 56, md: 73 },
                },
              }}
            />

            <TextField
              fullWidth
              name="endereco"
              value={formData.endereco}
              onChange={handleInputChange}
              placeholder="Endereço físico*"
              variant="outlined"
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "36.5px",
                  height: { xs: 48, sm: 56, md: 73 },
                },
              }}
            />

            <Box sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              pl: { xs: 1, sm: 0 }
            }}>
              <Checkbox
                name="teveChuva"
                checked={formData.teveChuva}
                onChange={handleCheckboxChange}
                color="primary"
              />
              <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
                Houve chuva significativa ({">"}50mm) nesta localização?
              </Typography>
            </Box>
          </Stack>

          {/* Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                width: { xs: '100%', sm: 283 },
                height: { xs: 48, sm: 56, md: 73 },
                borderRadius: "36.5px",
                backgroundColor: "#f8d7d7",
                color: "#7d0404",
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' },
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#f0c5c5",
                },
                "&:disabled": {
                  backgroundColor: "#e0e0e0",
                }
              }}
            >
              {loading ? 'Registrando...' : 'Registrar Câmara'}
            </Button>
          </Box>
        </Paper>
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
          <Typography variant="h6">Cadastrar Câmara</Typography>
        </Box>
      )}

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TelaCmara;