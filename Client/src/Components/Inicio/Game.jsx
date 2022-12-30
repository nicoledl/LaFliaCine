import styled from "@emotion/styled"
import { Grid, Typography } from "@mui/material"

const Container = styled.div`
width:100%
`
const actors = [
    {
        name: "Leonardo Dicaprio",
        imgURL: "https://wips.plug.it/cips/tecnologia/cms/2022/09/leonardo-dicaprio.jpg"
    }
]

const Game = () => {

    // function isCorrect() {
    //     if ()
    // }

    return (
        <Container>
            <div style={{ padding: "10%" }}>
                <Grid container spacing={1}>
                    <Grid item sm={6} md={6} lg={4}>
                        <div style={{ display: "table-cell", verticalAlign: "middle", width: "50vh", height: "50vh" }}>
                            <img alt={actors[0].name} src={actors[0].imgURL} style={{ width: "28vh", height: "28vh", borderRadius: "50%", objectFit: "cover", display: "block", marginLeft: "auto", marginRight: "auto", border: "30px solid", borderColor: "#AB3428" }} />
                        </div>
                    </Grid>
                    <Grid item sm={6} md={6} lg={8}>
                        <div style={{ display: "table-cell", verticalAlign: "middle", height: "50vh", borderSpacing: "30px" }}>
                            <Typography variant="h4" align="left" style={{ fontFamily: "Fjalla One" }}>
                                <label name="name" style={{ display: "block", color: "#fff" }}>Adivina el nombre del actor:</label>
                            </Typography>
                            <input type="text" id="name" name="name" maxLength={50} style={{ display: "block", width: "100%", border: "none", height: "45px", fontSize: "20px", paddingRight: "10px", paddingLefts: "10px" }}></input>
                            <input type="submit" value="ADIVINAR" style={{ display: "block" }} />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Container >
    )
}

export default Game;