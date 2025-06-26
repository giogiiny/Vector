'use client';
import { Sidebar } from "@/components/Sidebar";
import Edit from "@mui/icons-material/Edit";
import {
    Avatar,
    Box,
    IconButton,
    Link,
    Paper,
    TextField,
    Typography,
    CircularProgress,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth, storage } from "@/firebase/firebaaseApp";
import { updateProfile, updateEmail } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const TelaConfiguracoes = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        photoURL: ""
    });
    const [loading, setLoading] = useState(true);
    const [editingField, setEditingField] = useState<"name" | "email" | null>(null);
    const [tempValue, setTempValue] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [photoLoading, setPhotoLoading] = useState(false);

    // Carrega os dados do usuário
    useEffect(() => {
        const fetchUserData = async () => {
            if (auth.currentUser) {
                const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
                if (userDoc.exists()) {
                    setUserData({
                        name: userDoc.data().name || auth.currentUser.displayName || "",
                        email: auth.currentUser.email || "",
                        photoURL: auth.currentUser.photoURL || userDoc.data().photoURL || ""
                    });
                }
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleEditClick = (field: "name" | "email") => {
        setEditingField(field);
        setTempValue(field === "name" ? userData.name : userData.email);
    };

    const handleSave = async () => {
        if (!auth.currentUser || !editingField) return;

        try {
            setLoading(true);
            
            // Atualiza no Auth
            if (editingField === "name") {
                await updateProfile(auth.currentUser, {
                    displayName: tempValue
                });
            } else if (editingField === "email") {
                await updateEmail(auth.currentUser, tempValue);
            }

            // Atualiza no Firestore
            await updateDoc(doc(db, "users", auth.currentUser.uid), {
                [editingField]: tempValue,
                ...(editingField === "name" && { name: tempValue }),
                ...(editingField === "email" && { email: tempValue })
            });

            setUserData(prev => ({
                ...prev,
                [editingField]: tempValue
            }));

            setEditingField(null);
        } catch (error) {
            console.error("Erro ao atualizar:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !auth.currentUser) return;

        const file = e.target.files[0];
        if (!file) return;

        try {
            setPhotoLoading(true);
            const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
            await uploadBytes(storageRef, file);
            const photoURL = await getDownloadURL(storageRef);

            // Atualiza no Auth
            await updateProfile(auth.currentUser, { photoURL });

            // Atualiza no Firestore
            await updateDoc(doc(db, "users", auth.currentUser.uid), {
                photoURL
            });

            setUserData(prev => ({ ...prev, photoURL }));
        } catch (error) {
            console.error("Erro ao atualizar foto:", error);
        } finally {
            setPhotoLoading(false);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ 
            display: "flex", 
            bgcolor: "#edeced",
            minHeight: "100vh",
            position: 'relative'
        }}>
           
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
                    <Sidebar activeItem="Configurações" />
                </Box>
            )}

            {/* Main content - com margem para sidebar */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: { xs: 2, sm: 3 },
                    bgcolor: "#edeced",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: '100vh',
                    ml: { sm: '70px', md: '350px' }, // Margem igual à largura da sidebar
                    pt: { xs: '60px', sm: '26px' } // Espaço para a barra vermelha/header mobile
                }}
            >
                {/* User configuration card */}
                <Paper
                    sx={{
                        width: "100%",
                        maxWidth: 995,
                        minHeight: 363,
                        bgcolor: "#d9d9d9",
                        borderRadius: "10px",
                        p: { xs: 2, md: 4 },
                        display: "flex",
                        flexDirection: { xs: 'column', md: 'row' }
                    }}
                >
                    <Box sx={{ flex: 1, mr: { md: 4 }, mb: { xs: 4, md: 0 } }}>
                        {/* Username field */}
                        <Box sx={{ mb: 4 }}>
                            <Typography
                                sx={{
                                    fontFamily: "Poppins-Regular, Helvetica",
                                    fontSize: { xs: '1rem', sm: '1.3rem', md: '1.5rem' },
                                    color: "#420000",
                                    mb: 1,
                                }}
                            >
                                Nome de usuário
                            </Typography>
                            <TextField
                                fullWidth
                                value={editingField === "name" ? tempValue : userData.name}
                                variant="outlined"
                                onChange={(e) => editingField === "name" && setTempValue(e.target.value)}
                                onBlur={editingField === "name" ? handleSave : undefined}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton 
                                            onClick={() => editingField === "name" ? handleSave() : handleEditClick("name")}
                                            disabled={loading}
                                            size={isMobile ? "small" : "medium"}
                                        >
                                            <Edit sx={{ color: "#420000" }} />
                                        </IconButton>
                                    ),
                                    sx: {
                                        bgcolor: "#f3f3f3",
                                        borderRadius: "10px",
                                        boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            border: "none",
                                        },
                                        fontSize: { xs: '1rem', md: '1.5rem' },
                                        color: "#420000",
                                        fontFamily: "Poppins-Regular, Helvetica",
                                    },
                                }}
                            />
                        </Box>

                        {/* Email field */}
                        <Box sx={{ mb: 4 }}>
                            <Typography
                                sx={{
                                    fontFamily: "Poppins-Regular, Helvetica",
                                    fontSize: { xs: '1rem', sm: '1.3rem', md: '1.5rem' },
                                    color: "#420000",
                                    mb: 1,
                                }}
                            >
                                E-mail
                            </Typography>
                            <TextField
                                fullWidth
                                value={editingField === "email" ? tempValue : userData.email}
                                variant="outlined"
                                onChange={(e) => editingField === "email" && setTempValue(e.target.value)}
                                onBlur={editingField === "email" ? handleSave : undefined}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton 
                                            onClick={() => editingField === "email" ? handleSave() : handleEditClick("email")}
                                            disabled={loading}
                                            size={isMobile ? "small" : "medium"}
                                        >
                                            <Edit sx={{ color: "#420000" }} />
                                        </IconButton>
                                    ),
                                    sx: {
                                        bgcolor: "#f3f3f3",
                                        borderRadius: "10px",
                                        boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            border: "none",
                                        },
                                        fontSize: { xs: '1rem', md: '1.5rem' },
                                        color: "#420000",
                                        fontFamily: "Poppins-Regular, Helvetica",
                                    },
                                }}
                            />
                        </Box>

                        {/* Change password link */}
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                            <Link
                                href="/alterar-senha"
                                underline="always"
                                sx={{
                                    fontFamily: "Inter-Medium, Helvetica",
                                    fontWeight: 500,
                                    color: "#770606",
                                    fontSize: { xs: '1rem', md: '1.5rem' },
                                    textAlign: "center",
                                }}
                            >
                                Alterar senha
                            </Link>
                        </Box>
                    </Box>

                    {/* Profile image */}
                    <Box
                        sx={{
                            width: { xs: '100%', md: 284 },
                            height: { xs: 200, md: 287 },
                            position: "relative",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                            mb: { xs: 2, md: 0 }
                        }}
                        onClick={triggerFileInput}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            style={{ display: "none" }}
                        />
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "50%",
                                bgcolor: "#f3f3f3",
                                opacity: 0.4,
                                position: "absolute",
                                maxWidth: { xs: 200, md: '100%' }
                            }}
                        />
                        {photoLoading ? (
                            <CircularProgress size={100} />
                        ) : (
                            <Avatar
                                src={userData.photoURL || "/default-avatar.png"}
                                sx={{
                                    width: { xs: 150, md: 200 },
                                    height: { xs: 150, md: 200 },
                                    position: "relative",
                                    zIndex: 1,
                                }}
                            />
                        )}
                        <Box
                            sx={{
                                position: "absolute",
                                width: { xs: 50, md: 72 },
                                height: { xs: 50, md: 72 },
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                zIndex: 2,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Edit sx={{ fontSize: { xs: 30, md: 40 }, color: "#420000" }} />
                        </Box>
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
                    <Typography variant="h6">Configurações</Typography>
                </Box>
            )}
        </Box>
    );
};

export default TelaConfiguracoes;