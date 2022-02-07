import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  appbar: {
    backgroundColor: "#3a7196",
    height: 50,
    "& a": {
      color: "#ffffff",
    },
  },
  secondAppbar: {
    backgroundColor: "#ffffff",
    height: 90,
    borderBottomStyle: "ridge",
    "& a": {
      color: "#000000",
    },
  },
  grow: {
    flexGrow: 0.85,
  },
  logoGrow: {
    flexGrow: 0.15,
  },
  toolbarGrow: {
    flexGrow: 0.66,
  },

  textStyle: {
    font: "SansSerif",
    fontSize: "18px",
    letterSpacing: "1px",
    marginRight: "30px",
  },
  main: {
    minHeight: "80vh",
    minWidth: "80vw",
  },
});

export default useStyles;
