import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  appbar: {
    backgroundColor: "#3a7196",
    height: 40,
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
    flexGrow: 0.885,
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
  form: {
    width: "100%",
    maxWidth: 800,
    margin: "0 auto",
  },
  main: {
    minHeight: "80vh",
    minWidth: "80vw",
  },
  footer: {
    marginTop: "10px",
    textAlign: "center",
  },
  inputField: {
    width: 550,
  },
  searchContainer: {
    position: "center",
    textAlign: "center",
    marginTop: "20px",
    borderRadius: 50,
  },
  search: {
    padding: "10px",
    width: "40vw",
    fontSize: "20px",
  },
});

export default useStyles;
