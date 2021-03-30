import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        backgroundColor: "transparent",
        height: "130px",
        marginLeft: "auto",
        marginRight: "auto",
        color: "white",
        textAlign: "left",
        borderWidth: "1px",
        borderColor: "white",
        marginBottom: "20px",
        font: "Roboto",
        "&:hover": {
            borderColor: "#F6D45E",
            cursor: "pointer",
        },
        "&:hover #more": {
            color: "#F6D45E",
        },
    },
    primaryText: {
        fontSize: "28px",
    },
    secondaryText: {
        fontSize: "16px",
    },
    more: {
        textAlign: "right",
        paddingTop: "70px",
    },
});

export default useStyles;
