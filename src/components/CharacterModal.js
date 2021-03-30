import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Grid, Typography } from "@material-ui/core";

import useStyles from "../styles/CharacterModal.styles";

export default function CharacterModal({ open, handleClose, character, films }) {
    const classes = useStyles();
    const { name, gender, birth_year, height, hair_color, skin_color, eye_color, mass } = character;

    const getFilmTitles = (character, films) => {
        let titles = [];
        films.forEach((f) => {
            if (character.films.includes(f.url)) titles = [...titles, f.title];
        });

        return titles;
    };

    const getAge = (birth_year) => {
        if (birth_year !== "unknown" && birth_year !== "n/a") {
            const year = Number(birth_year.slice(0, -3));
            const epoch = birth_year.slice(-3);
            if (epoch === "BBY") return 35 + year;
            else return 34 - year;
        } else {
            return "unknown";
        }
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className={classes.paper}>
                    <Grid container style={{ width: "500px" }}>
                        <Grid items xs={7}>
                            <Typography style={{ fontSize: "25px" }}>{name}</Typography>
                            <Typography>Height: {height}</Typography>
                            <Typography>Mass: {mass}</Typography>
                            <Typography>Hair color: {hair_color}</Typography>
                            <Typography>Skin color: {skin_color}</Typography>
                            <Typography>Eye color: {eye_color}</Typography>
                            <Typography>Birth year: {birth_year}</Typography>
                            <Typography>Gender: {gender}</Typography>
                            <Typography>Age (relative to Episode IX): {getAge(birth_year)} </Typography>
                        </Grid>
                        <Grid items xs={5}>
                            <Typography style={{ marginTop: "12px" }}>Films:</Typography>
                            {getFilmTitles(character, films).map((t) => (
                                <Typography>{t}</Typography>
                            ))}
                        </Grid>
                    </Grid>
                </div>
            </Fade>
        </Modal>
    );
}
