import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  appbar: {
    backgroundColor: "#3a7196",
    height: 40,
    "& a": {
      color: "#ffffff",
    },
  },
  grow: {
    flexGrow: 0.75,
  },
});

export default useStyles;
