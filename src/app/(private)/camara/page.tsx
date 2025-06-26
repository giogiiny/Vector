'use client';
import {
  Box,
  Button,
  Link,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Divider,
  Snackbar
} from "@mui/material";
import { Sidebar } from "@/components/Sidebar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebaaseApp";
import { deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

interface Camera {
  id: string;
  apelido: string;
  endereco: string;
  teveChuva: boolean;
  criado: any;
  deviceId: string;
  ipAddress?: string;
}

const TelaCamara = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });
  const [counting, setCounting] = useState(false);

  const handleCadastrar = () => {
    router.push('/cadcamara');
  };

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          setError('Usuário não autenticado');
          setLoading(false);
          return;
        }

        const camerasRef = collection(db, "camaras");
        const q = query(camerasRef, where("userId", "==", user.uid));

        const querySnapshot = await getDocs(q);
        const camerasData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Camera[];

        setCameras(camerasData);
      } catch (err) {
        console.error("Erro ao buscar câmaras:", err);
        setError('Erro ao carregar câmaras');
      } finally {
        setLoading(false);
      }
    };

    fetchCameras();
  }, []);

  const handleStartCounting = async (cameraId: string, ipAddress?: string) => {
    if (!ipAddress) {
      setSnackbar({
        open: true,
        message: 'Endereço IP da câmara não configurado',
        severity: 'error'
      });
      return;
    }

    setCounting(true);
    try {
      const response = await fetch(`http://${ipAddress}:5000/iniciar-contagem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setSnackbar({
          open: true,
          message: `Contagem realizada: ${data.output}`,
          severity: 'success'
        });
        
        const updatedCameras = cameras.map(cam => 
          cam.id === cameraId ? { ...cam, teveChuva: true } : cam
        );
        setCameras(updatedCameras);
      } else {
        setSnackbar({
          open: true,
          message: `Erro: ${data.message}`,
          severity: 'error'
        });
      }
    } catch (error) {
      console.error("Erro ao iniciar contagem:", error);
      setSnackbar({
        open: true,
        message: 'Falha na comunicação com a Raspberry Pi',
        severity: 'error'
      });
    } finally {
      setCounting(false);
    }
  };

  const handleDeleteCamera = async (cameraId: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta câmara?')) {
      try {
        await deleteDoc(doc(db, "camaras", cameraId));
        setCameras(cameras.filter(camera => camera.id !== cameraId));
        setSnackbar({
          open: true,
          message: 'Câmara excluída com sucesso',
          severity: 'success'
        });
      } catch (error) {
        console.error("Erro ao excluir câmara:", error);
        setSnackbar({
          open: true,
          message: 'Erro ao excluir câmara',
          severity: 'error'
        });
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          bgcolor: "#edeced",
          minHeight: "100vh",
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          ml: { sm: '70px', md: '350px' }
        }}
      >
        <CircularProgress size={60} sx={{ color: '#7d0404' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          bgcolor: "#edeced",
          minHeight: "100vh",
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          ml: { sm: '70px', md: '350px' }
        }}
      >
        <Alert severity="error" sx={{ width: '80%', maxWidth: '500px' }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "#edeced",
        minHeight: "100vh",
        position: 'relative'
      }}
    >
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

      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          bgcolor: "#edeced",
          minHeight: '100vh',
          ml: { sm: '70px', md: '350px' },
          pt: { xs: '60px', sm: '26px' }
        }}
      >
        {cameras.length === 0 ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 'calc(100vh - 100px)' }}>
            <Paper
              elevation={10}
              sx={{
                width: "100%",
                maxWidth: "686px",
                minHeight: "359px",
                bgcolor: "#7f0e0e",
                borderRadius: "15px",
                p: { xs: 3, md: 5 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center"
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "Poppins-Bold, Helvetica",
                  fontWeight: 700,
                  color: "white",
                  mb: { xs: 1, md: 2 },
                  fontSize: { xs: '1.5rem', md: '2rem' }
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
                  mb: { xs: 3, md: 5 },
                  fontSize: { xs: '1.1rem', md: '1.5rem' }
                }}
              >
                Parece que você não tem nenhuma câmara cadastrada...
              </Typography>

              <Stack
                alignItems="center"
                spacing={2}
                sx={{ width: '100%', maxWidth: '400px' }}
              >
                <Button
                  variant="contained"
                  onClick={handleCadastrar}
                  fullWidth
                  sx={{
                    bgcolor: "#fff3f3",
                    color: "#7d0404",
                    borderRadius: "25px",
                    height: "47px",
                    textTransform: "none",
                    fontFamily: "Poppins-SemiBold, Helvetica",
                    fontWeight: 600,
                    fontSize: { xs: "16px", sm: "20px" },
                    boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
                    "&:hover": {
                      bgcolor: "#f8e0e0",
                    },
                  }}
                >
                  Cadastrar câmara
                </Button>

                <Link
                  href="/dashboard"
                  underline="always"
                  sx={{
                    fontFamily: "Poppins-SemiBold, Helvetica",
                    fontWeight: 600,
                    color: "white",
                    fontSize: { xs: "16px", sm: "20px" },
                    cursor: "pointer",
                  }}
                >
                  Voltar para o início
                </Link>
              </Stack>
            </Paper>
          </Box>
        ) : (
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Poppins-Bold, Helvetica",
                fontWeight: 700,
                color: "#7d0404",
                mb: 3,
                fontSize: { xs: '1.5rem', md: '2rem' }
              }}
            >
              Minhas Câmaras
            </Typography>

            <Stack spacing={3}>
              {cameras.map((camera) => (
                <Card key={camera.id} sx={{ borderRadius: '15px', mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {camera.apelido || 'Câmara sem nome'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {camera.endereco}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body2">
                      <strong>ID do dispositivo:</strong> {camera.deviceId}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Endereço IP:</strong> {camera.ipAddress || 'Não configurado'}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Registrada em:</strong> {new Date(camera.criado.seconds * 1000).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Chuva recente:</strong> {camera.teveChuva ? 'Sim' : 'Não'}
                    </Typography>

                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mt: 3,
                      gap: 2
                    }}>
                      <Button
                        variant="contained"
                        onClick={() => handleDeleteCamera(camera.id)}
                        sx={{
                          bgcolor: '#7d0404',
                          color: 'white',
                          borderRadius: '25px',
                          textTransform: 'none',
                          fontFamily: 'Poppins-SemiBold, Helvetica',
                          fontWeight: 600,
                          fontSize: '16px',
                          px: 3,
                          py: 1,
                          '&:hover': {
                            bgcolor: '#5d0303',
                          },
                        }}
                      >
                        Excluir Câmara
                      </Button>

                      <Button
                        variant="contained"
                        onClick={() => handleStartCounting(camera.id, camera.ipAddress)}
                        disabled={counting || !camera.ipAddress}
                        sx={{
                          bgcolor: '#7d0404',
                          color: 'white',
                          borderRadius: '25px',
                          textTransform: 'none',
                          fontFamily: 'Poppins-SemiBold, Helvetica',
                          fontWeight: 600,
                          fontSize: '16px',
                          px: 3,
                          py: 1,
                          '&:hover': {
                            bgcolor: '#5d0303',
                          },
                          '&:disabled': {
                            bgcolor: '#cccccc',
                            color: '#666666'
                          }
                        }}
                      >
                        {counting ? (
                          <>
                            <CircularProgress size={24} sx={{ color: 'white', mr: 1 }} />
                            Processando...
                          </>
                        ) : (
                          'Iniciar Contagem'
                        )}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        )}
      </Box>

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
          <Typography variant="h6">Câmara</Typography>
        </Box>
      )}

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

export default TelaCamara;