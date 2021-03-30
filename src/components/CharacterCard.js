import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import { useState } from "react";

import CharacterModal from "./CharacterModal";
import useStyles from "../styles/CharacterCard.styles";

const CharacterCard = ({ character, films }) => {
    const classes = useStyles();
    const { name, gender, birth_year } = character;

    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    return (
        <>
            <Card variant="outlined" className={classes.root} fullWidth={true} onClick={handleModalOpen}>
                <CardContent>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography className={classes.primaryText}>{name}</Typography>
                            <Typography className={classes.secondaryText}>Gender: {gender}</Typography>
                            <Typography className={classes.secondaryText}>Birth year: {birth_year}</Typography>
                        </Grid>
                        <Grid id="more" item xs={6} className={classes.more}>
                            <Typography className={classes.moreText}>Click to find out more...</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <CharacterModal open={modalOpen} character={character} films={films} handleClose={handleModalClose} />
        </>
    );
};

export default CharacterCard;
