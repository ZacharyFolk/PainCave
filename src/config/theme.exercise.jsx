import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    height: "100vh",
  },

  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  image: {
    backgroundImage: "url(https://loremflickr.com/320/240/caves)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(8, 0),
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logo: {
    display: "flex",
    alignItems: "center",
    marginBottom: "2em",
  },
  logoText: {
    fontWeight: "bold",
  },
  error: {
    color: "red",
  },
}));

export default useStyles;
