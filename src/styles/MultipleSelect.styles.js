import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: "100%",
        maxWidth: "100%",
        marginTop: "0px",
    },
    chips: {
        display: "flex",
        flexWrap: "wrap",
    },
}));

export default useStyles;
