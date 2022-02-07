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
    height: 70,
    borderBottomStyle: "ridge",
  },
  grow: {
    flexGrow: 0.75,
  },
  toolbarGrow: {
    flexGrow: 0.66,
  },
  textStyle: {
    font: "SansSerif",
    fontSize: "12px",
    letterSpacing: "1px",
    marginRight: "20px",
  },
  main: {
    minHeight: "80vh",
    minWidth: "80vw",
  },
});

export default useStyles;
