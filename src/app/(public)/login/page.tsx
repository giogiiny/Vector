'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../../firebase/firebaaseApp'; // Você precisará configurar isso
import VectorLogo2 from "../../../assets/VectorLogo2.png";
import GoogleLogo from "../../../assets/Google.png"
import OutlookLogo from "../../../assets/Outlook.png"
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
} from "@mui/material";
import React from "react";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard'); // Redireciona após login bem-sucedido
    } catch (err: any) {
      setError(err.message);
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
};

export default Login;