'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../../firebase/firebaaseApp';
import VectorLogo2 from "../../../assets/VectorLogo2.png";
import GoogleLogo from "../../../assets/Google.png";
import OutlookLogo from "../../../assets/Outlook.png";
import Image from 'next/image';
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        setError('Usuário não encontrado');
      } else if (err.code === 'auth/wrong-password') {
        setError('Senha incorreta');
      } else {
        setError('Erro ao fazer login. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Versão Desktop (mantida como está)
  if (!isMobile) {
    const SCALE_FACTOR = 0.8;
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          bgcolor: "#edeced",
          minHeight: "100vh",
          fontSize: `${SCALE_FACTOR * 16}px`,
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            width: `${1440 * SCALE_FACTOR}px`,
            height: `${1024 * SCALE_FACTOR}px`,
            left: 0,
            position: "relative",
            bgcolor: "#edeced",
            transform: `scale(${SCALE_FACTOR})`,
            transformOrigin: 'top center',
          }}
        >
          {/* Vector logo on the right */}
          <Box
            sx={{
              position: "absolute",
              width: `${554 * SCALE_FACTOR}px`,
              height: `${554 * SCALE_FACTOR}px`,
              top: `${202 * SCALE_FACTOR}px`,
              left: `${950 * SCALE_FACTOR}px`,
            }}
          >
            <Image
              src={VectorLogo2}
              alt="Vector Logo"
            />
          </Box>

          {/* Red circular background */}
          <Paper
            elevation={4}
            sx={{
              position: "absolute",
              width: `${1182 * SCALE_FACTOR}px`,
              height: `${1182 * SCALE_FACTOR}px`,
              top: `${-89 * SCALE_FACTOR}px`,
              left: `${-354 * SCALE_FACTOR}px`,
              borderRadius: `0 50% 50% 0`,
              bgcolor: "#b71c1c",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              paddingLeft: `${200 * SCALE_FACTOR}px`,
            }}
          >
            {/* Welcome message */}
            <Typography
              variant="h4"
              sx={{
                position: "absolute",
                top: `${320 * SCALE_FACTOR}px`,
                left: `${300 * SCALE_FACTOR}px`,
                fontFamily: "Inter, Helvetica",
                fontWeight: 800,
                color: "#fff3f3",
                fontSize: `${2.125 * SCALE_FACTOR}rem`,
              }}
            >
              Bem-vindo de volta!
            </Typography>

            {error && (
              <Typography
                color="error"
                sx={{
                  position: "absolute",
                  top: `${360 * SCALE_FACTOR}px`,
                  left: `${300 * SCALE_FACTOR}px`,
                  width: `${498 * SCALE_FACTOR}px`,
                  textAlign: 'center',
                  fontSize: `${1.2 * SCALE_FACTOR}rem`,
                }}
              >
                {error}
              </Typography>
            )}

            {/* Username/Email input */}
            <TextField
              variant="outlined"
              placeholder="Informe seu e-mail ou nome de usuário"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={{
                position: "absolute",
                top: `${398 * SCALE_FACTOR}px`,
                left: `${230 * SCALE_FACTOR}px`,
                width: `${498 * SCALE_FACTOR}px`,
                height: `${73 * SCALE_FACTOR}px`,
                "& .MuiOutlinedInput-root": {
                  borderRadius: `${36.5 * SCALE_FACTOR}px`,
                  bgcolor: "white",
                  fontSize: `${1.5 * SCALE_FACTOR}rem`,
                },
              }}
            />

            {/* Password input */}
            <TextField
              variant="outlined"
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{
                        marginRight: `${8 * SCALE_FACTOR}px`,
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                position: "absolute",
                top: `${508 * SCALE_FACTOR}px`,
                left: `${230 * SCALE_FACTOR}px`,
                width: `${498 * SCALE_FACTOR}px`,
                height: `${73 * SCALE_FACTOR}px`,
                "& .MuiOutlinedInput-root": {
                  borderRadius: `${36.5 * SCALE_FACTOR}px`,
                  bgcolor: "white",
                  fontSize: `${1.5 * SCALE_FACTOR}rem`,
                  paddingRight: `${8 * SCALE_FACTOR}px`,
                },
              }}
            />

            {/* Forgot password link */}
            <Link
              href="/redefinicao"
              underline="always"
              sx={{
                position: "absolute",
                width: `${471 * SCALE_FACTOR}px`,
                top: `${595 * SCALE_FACTOR}px`,
                left: `${234 * SCALE_FACTOR}px`,
                fontFamily: "Inter, Helvetica",
                fontWeight: 300,
                color: "#edeced",
                fontSize: `${1.5 * SCALE_FACTOR}rem`,
                textAlign: "center",
              }}
            >
              Esqueceu sua senha?
            </Link>

            {/* Next button */}
            <Button
              variant="contained"
              onClick={handleLogin}
              disabled={loading}
              sx={{
                position: "absolute",
                width: `${300 * SCALE_FACTOR}px`,
                top: `${672 * SCALE_FACTOR}px`,
                left: `${337 * SCALE_FACTOR}px`,
                height: `${73 * SCALE_FACTOR}px`,
                borderRadius: `${36.5 * SCALE_FACTOR}px`,
                bgcolor: "rgba(255, 255, 255, 0.3)",
                color: "#770606",
                fontWeight: "bold",
                textTransform: 'none',
                fontSize: `${1.5 * SCALE_FACTOR}rem`,
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.4)",
                },
                "&:disabled": {
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              {loading ? 'Carregando...' : 'Próximo'}
            </Button>

            {/* Registration text */}
            <Box
              sx={{
                position: "absolute",
                width: `${471 * SCALE_FACTOR}px`,
                top: `${779 * SCALE_FACTOR}px`,
                left: `${243 * SCALE_FACTOR}px`,
                textAlign: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Inter, Helvetica",
                  fontWeight: 300,
                  color: "#edeced",
                  fontSize: `${1.5 * SCALE_FACTOR}rem`,
                }}
              >
                Não é cadastrado?{" "}
                <Link
                  href="/cadastro"
                  underline="always"
                  sx={{
                    color: "white",
                  }}
                >
                  Clique aqui
                </Link>{" "}
                para criar uma conta. Ou acesse com:
              </Typography>
            </Box>

            {/* Social login icons */}
            <Box
              sx={{
                position: "absolute",
                top: `${870 * SCALE_FACTOR}px`,
                left: `${429 * SCALE_FACTOR}px`,
                display: "flex",
                gap: 2,
              }}
            >
              <IconButton onClick={handleGoogleLogin}>
                <Image
                  src={GoogleLogo}
                  alt="Google Logo"
                  width={40 * SCALE_FACTOR}
                  height={40 * SCALE_FACTOR}
                />
              </IconButton>

              <IconButton>
                <Image
                  src={OutlookLogo}
                  alt="Microsoft Outlook Logo"
                  width={40 * SCALE_FACTOR}
                  height={40 * SCALE_FACTOR}
                />
              </IconButton>
            </Box>
          </Paper>
        </Container>
      </Box>
    );
  }

  // Versão Mobile
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "#edeced",
        p: 3,
      }}
    >
      {/* Logo */}
      <Box sx={{ mb: 4, width: '150px', height: '150px', position: 'relative' }}>
        <Image
          src={VectorLogo2}
          alt="Vector Logo"
          layout="fill"
          objectFit="contain"
        />
      </Box>

      {/* Card de Login */}
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: '400px',
          bgcolor: '#b71c1c',
          p: 3,
          borderRadius: '16px',
          color: '#fff3f3',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontFamily: "Inter, Helvetica",
            fontWeight: 800,
            mb: 3,
            textAlign: 'center',
          }}
        >
          Bem-vindo de volta!
        </Typography>

        {error && (
          <Typography
            color="error"
            sx={{
              mb: 2,
              textAlign: 'center',
              color: '#fff3f3',
            }}
          >
            {error}
          </Typography>
        )}

        {/* Formulário */}
        <Box component="form" onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            placeholder="E-mail ou nome de usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: '36.5px',
                bgcolor: 'white',
              },
            }}
          />

          <TextField
            variant="outlined"
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: '36.5px',
                bgcolor: 'white',
              },
            }}
          />

          <Link
            href="/redefinicao"
            underline="always"
            sx={{
              display: 'block',
              mb: 3,
              fontFamily: "Inter, Helvetica",
              fontWeight: 300,
              color: '#edeced',
              textAlign: 'center',
              fontSize: '0.9rem',
            }}
          >
            Esqueceu sua senha?
          </Link>

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            fullWidth
            sx={{
              mb: 3,
              height: '50px',
              borderRadius: '36.5px',
              bgcolor: 'rgba(255, 255, 255, 0.3)',
              color: '#770606',
              fontWeight: 'bold',
              textTransform: 'none',
              "&:hover": {
                bgcolor: 'rgba(255, 255, 255, 0.4)',
              },
              "&:disabled": {
                bgcolor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            {loading ? 'Carregando...' : 'Entrar'}
          </Button>

          <Typography
            variant="body2"
            sx={{
              mb: 2,
              fontFamily: "Inter, Helvetica",
              fontWeight: 300,
              color: '#edeced',
              textAlign: 'center',
            }}
          >
            Não tem uma conta?{' '}
            <Link
              href="/cadastro"
              underline="always"
              sx={{
                color: 'white',
              }}
            >
              Cadastre-se
            </Link>
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mb: 2,
              fontFamily: "Inter, Helvetica",
              fontWeight: 300,
              color: '#edeced',
              textAlign: 'center',
            }}
          >
            Ou entre com:
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              mb: 2,
            }}
          >
            <IconButton 
              onClick={handleGoogleLogin}
              sx={{
                bgcolor: 'white',
                "&:hover": { bgcolor: '#f5f5f5' },
              }}
            >
              <Image
                src={GoogleLogo}
                alt="Google Login"
                width={24}
                height={24}
              />
            </IconButton>

            <IconButton
              sx={{
                bgcolor: 'white',
                "&:hover": { bgcolor: '#f5f5f5' },
              }}
            >
              <Image
                src={OutlookLogo}
                alt="Outlook Login"
                width={24}
                height={24}
              />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;