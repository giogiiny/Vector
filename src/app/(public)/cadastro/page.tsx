'use client';
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase/firebaaseApp'; // Importe também o db
import { useRouter } from 'next/navigation';
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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Cadastro = () => {
  const SCALE_FACTOR = 0.8;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações básicas
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      // 1. Cria o usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // 2. Atualiza o nome do usuário no perfil de autenticação
      await updateProfile(userCredential.user, {
        displayName: name
      });

      // 3. Cria o documento do usuário no Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        name: name,
        email: email,
        createdAt: new Date(),
        lastLogin: new Date(),
        // Adicione outros campos conforme necessário
      });

      // Redireciona após o cadastro
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Erro no cadastro:', error);

      // Tratamento de erros comuns
      if (error.code === 'auth/email-already-in-use') {
        setError('Este e-mail já está em uso');
      } else if (error.code === 'auth/invalid-email') {
        setError('E-mail inválido');
      } else if (error.code === 'auth/weak-password') {
        setError('Senha muito fraca');
      } else {
        setError('Ocorreu um erro durante o cadastro. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Verifica se é um novo usuário
      if (result.user.metadata.creationTime === result.user.metadata.lastSignInTime) {
        // Cria o documento no Firestore para novos usuários
        await setDoc(doc(db, "users", result.user.uid), {
          uid: result.user.uid,
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          createdAt: new Date(),
          lastLogin: new Date(),
          provider: 'google'
        });
      }

      router.push('/dashboard');
    } catch (error: any) {
      console.error('Erro no login com Google:', error);
      setError('Falha ao cadastrar com Google');
    }
  };

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
              top: `${250 * SCALE_FACTOR}px`,
              left: '40%',
              transform: 'translateX(-50%)',
              fontFamily: "Inter, Helvetica",
              fontWeight: 800,
              color: "#fff3f3",
              fontSize: `${2.125 * SCALE_FACTOR}rem`,
              width: '100%',
              textAlign: 'center',
            }}
          >
            Cadastre-se
          </Typography>

          {/* Error message */}
          {error && (
            <Typography
              color="error"
              sx={{
                position: "absolute",
                top: `${290 * SCALE_FACTOR}px`,
                left: `${230 * SCALE_FACTOR}px`,
                width: `${498 * SCALE_FACTOR}px`,
                textAlign: 'center',
                fontSize: `${1.2 * SCALE_FACTOR}rem`,
                color: '#fff',
                backgroundColor: 'rgba(255, 0, 0, 0.3)',
                borderRadius: '20px',
                padding: '5px'
              }}
            >
              {error}
            </Typography>
          )}

          {/* Name input */}
          <TextField
            variant="outlined"
            placeholder="Informe seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            sx={{
              position: "absolute",
              top: `${320 * SCALE_FACTOR}px`,
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

          {/* Email input */}
          <TextField
            variant="outlined"
            placeholder="Informe seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            sx={{
              position: "absolute",
              top: `${414 * SCALE_FACTOR}px`,
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
            placeholder="Crie uma senha"
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

          {/* Confirm Password input */}
          <TextField
            variant="outlined"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                    sx={{
                      marginRight: `${8 * SCALE_FACTOR}px`,
                    }}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              position: "absolute",
              top: `${602 * SCALE_FACTOR}px`,
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

          {/* Register button */}
          <Button
            variant="contained"
            onClick={handleSignUp}
            disabled={loading}
            sx={{
              position: "absolute",
              width: `${300 * SCALE_FACTOR}px`,
              top: `${696 * SCALE_FACTOR}px`,
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
            {loading ? 'Cadastrando...' : 'Próximo'}
          </Button>

          {/* Login text */}
          <Box
            sx={{
              position: "absolute",
              width: `${471 * SCALE_FACTOR}px`,
              top: `${803 * SCALE_FACTOR}px`,
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
              Já tem um cadastro?{" "}
              <Link
                href="/login"
                underline="always"
                sx={{
                  color: "white",
                }}
              >
                Clique aqui
              </Link>{" "}
              para acessar sua conta. Ou cadastre-se com:
            </Typography>
          </Box>

          {/* Social login icons */}
          <Box
            sx={{
              position: "absolute",
              top: `${894 * SCALE_FACTOR}px`,
              left: `${429 * SCALE_FACTOR}px`,
              display: "flex",
              gap: 2,
            }}
          >
            <IconButton onClick={handleGoogleSignUp}>
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

export default Cadastro;