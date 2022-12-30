import { Container } from "@mui/system"
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Box, Typography } from "@mui/material";
import "./profile.css";

const InfoProfile = () => {
    const [photoProfile, setPhotoProfile] = useState("https://d500.epimg.net/cincodias/imagenes/2016/03/16/lifestyle/1458143779_942162_1458143814_noticia_normal.jpg");
    

    function handleChangePhotoProfile(e) {
        setPhotoProfile(URL.createObjectURL(e.target.files[0]));
    }

    const styleContainer = {
        boxShadow: "0px 1px 13px 10px rgba(0,0,0,0.68) inset",
        bgcolor: "#131313",
        position: 'relative',
        width: "100%",
        height: "100vh",
        p: 4,
    };
    const styleContainerInfoProfile = {
        fontFamily: "'Cutive Mono', monospace",
        height: "50vh",
        p: 3
    };
    const styleContainerImg = {
        width: "20vh",
        height: "20vh",
        borderRadius: "50%",
        objectFit: "cover"
    }
    const styleCenter = {
        justifyContent: "center", alignItems: "center", display: "grid"
    }
    const styleText = {
        textAlign: "center", fontFamily: "'Cutive Mono', monospace", color: "#ddd"
    }

    function uploadButtons(e) {
        return (
            <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" onChange={e} />
                <PhotoCamera />
            </IconButton>
        );
    }

    return (
        <>
            <Container maxWidth="xl" sx={styleContainer}>
                <Grid container >
                    <Grid container sm={12} sx={styleContainerInfoProfile}>
                        <Grid item xs={12} sx={styleCenter}>
                            <Typography variant="h3" sx={styleText} className="name-profile">Title: Perfil</Typography>
                            <Box sx={styleCenter}>
                                <img src={photoProfile} alt="PorfilePhoto" style={styleContainerImg} />
                                <div style={styleCenter}>
                                    {uploadButtons(handleChangePhotoProfile)}
                                </div>
                            </Box>
                            <Typography variant="h4" sx={styleText}>Character: Nicole Losana</Typography>
                        </Grid>
                        <Grid container xs={12}>
                            <Grid item sm={12} style={{ marginTop: "40px" }}><Typography variant="h4" sx={styleText} >Character details</Typography></Grid>
                            <Grid item xs={12} sm={4}><Typography variant="h5" sx={styleText} >Generos Favoritos</Typography>
                                <div>
                                    <li><Typography variant="p" sx={styleText}>ROMANCE</Typography></li>
                                    <li><Typography variant="p" sx={styleText}>ROMANCE</Typography></li>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={4}></Grid>
                            <Grid item xs={12} sm={4}></Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default InfoProfile;