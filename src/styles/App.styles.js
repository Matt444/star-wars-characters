import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    searchSection: {
        marginBottom: 40,
        position: "relative",
        "& input": {
            paddingLeft: "40px",
            borderColor: "red",
        },
        "& svg": {
            // search icon
            position: "absolute",
            top: "18px",
            left: "15px",
            color: "white",
        },
    },
    heroSection: {
        position: "absolute",
        top: "0px",
        width: "100%",
        zIndex: "-1",
    },
    backgroundImg: {
        width: "100%",
    },
    heroText: {
        position: "absolute",
        top: "7vw",
        left: "50%",
        fontSize: "5vw",
        lineHeight: "6vw",
        letterSpacing: "0.155em",
        transform: "translateX(-50%)",
        marginLeft: "auto",
        marginRight: "auto",
        color: "#F6D45E",
    },
    content: {
        marginTop: "34vw",
        maxWidth: "900px",
        minHeight: "60vw",
    },
});

export default useStyles;
