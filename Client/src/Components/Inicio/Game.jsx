import { Button, CircularProgress, Grid, Typography } from "@mui/material"
import { useEffect } from "react"
import { useState } from "react"
//import axios from "axios"
import party from "party-js"
import Fade from '@mui/material/Fade';
import { Container } from "@mui/system"
import actorsDB from "../../data/actors.json"

const styleInput = { width: "100%", border: "none", height: "30px", fontSize: "20px", padding: 5, marginTop: 10, display: "block" }
const styleImg = { width: "28vh", height: "28vh", borderRadius: "50%", objectFit: "cover", display: "block", marginLeft: "auto", marginRight: "auto", border: "30px solid", borderColor: "#AB3428" }
const styleCorrectText = { color: "#fff", display: "grid", textAlign: "center", fontFamily: "Fjalla One", fontSize: "clamp(1.5rem, 8vw - 2rem, 3rem)", margin: 0, padding: 0, textShadow: " 0px 0px 5px #FFF77C, 0px 0px 8px #FFF327, 0px 0px 17px #FFEAD2, 0px 0px 17px #FFEAD2" }
const styleIncorrectText = { color: "#fff", display: "grid", textAlign: "center", fontFamily: "Fjalla One", fontSize: "clamp(1.5rem, 8vw - 2rem, 3rem)", margin: 0, padding: 0, textShadow: "0px 0px 6px #FFDF00, 0px 0px 8px #FF8B01, 0px 0px 10px #FF0000, 0px 0px 10px #FF0000" }
const syleButton = { border: "solid", borderColor: "#fff", backgroundColor:"#AB3428", borderRadius: "18px", margin: 8, color: "#fff", marginTop: "20px", fontFamily: "Fjalla One" }

const Game = () => {
    //onst [actors, setActors] = useState(actorsDB.actors)
    const [value, setValue] = useState("")
    const [random, setRandom] = useState(0)
    const [correct, setCorrect] = useState(false)
    const [incorrect, setIncorrect] = useState(false)

    // useEffect(() => {
    //     axios.get("http://localhost:3001/actors")
    //         .then(res => {
    //             setActors(res.data)
    //             setRandom(Math.floor(Math.random() * res.data.length))
    //         })
    // }, [])

    useEffect(()=>{
        setRandom(Math.floor(Math.random() * actorsDB.actors.length))
    },[])

    const getRandom = () => {
        setRandom(Math.floor(Math.random() * actorsDB.actors.length))
    }

    const handleChange = (event) => { setValue(event.target.value) }

    const actionClick = () => {
        if ((actorsDB.actors[random].name).toUpperCase() === value.toUpperCase()) {
            party.sparkles(document.getElementById("img"), {
                count: party.variation.range(10, 60),
                speed: party.variation.range(50, 300),
            });

            setTimeout(() => { setCorrect(false) }, 3000);
            setValue("")
            getRandom()
            return setCorrect(true)
        }
        setTimeout(() => { setIncorrect(false) }, 3000);
        setValue("")

        return setIncorrect(true)
    }
    return (
        <Container style={{ marginTop: "10%", marginBottom: "10%" }}>
            <div style={{ marginTop: "5%", marginBottom: "5%", height: "50px" }}>
                {
                    correct === true ? <Fade in={correct}><p style={styleCorrectText}>CORRECTO</p></Fade> : null
                }
                {
                    incorrect === true ? <Fade in={incorrect}><p style={styleIncorrectText}>INCORRECTO</p></Fade> : null

                }
            </div>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6} style={{ display: "table-cell", verticalAlign: "middle", textAlign: "centers" }}>
                    {
                        actorsDB.actors.length <= 0 ? <CircularProgress color="warning" /> : <img id="img" alt={random} src={actorsDB.actors[random].img} style={styleImg} />
                    }
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} style={{ display: "table-cell", verticalAlign: "middle", padding: 5 }}>
                    <Typography variant="h4" align="left" style={{ fontFamily: "Fjalla One" }}>
                        <label name="name" style={{ color: "#fff", margin: 10 }}>Adivina el nombre del actor:</label>
                    </Typography>
                    <input type="text" onChange={handleChange} value={value} name="name" maxLength={50} style={styleInput} />
                    <Button type="submit" size="large" onClick={actionClick} variant="outlined" style={syleButton}>ADIVINAR</Button>
                    <Button size="large" onClick={() => getRandom()} variant="outlined" style={syleButton}>PASAR</Button>
                </Grid>
            </Grid>
        </Container >
    )
}

export default Game;