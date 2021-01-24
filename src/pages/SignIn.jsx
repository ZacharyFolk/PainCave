import React, { useState } from "react";
import { withFirebase } from "../components/Firebase";
import { Link, withRouter } from "react-router-dom";
import { Button,
CssBaseline } from "@material-ui/core/";

import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import useStyles from "../config/theme.signinup";
import Copyright from "../components/Copyright";

import PasswordForget from "../components/PasswordForget";

function SignIn(props) {
  const classes = useStyles();

  const initialUser = {
    id: null,
    email: "",
    password: "",
    error: null,
    auth: null,
  };

  const [user, setUser] = useState(initialUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = () => {
    props.firebase
      .doSignInWithEmailAndPassword(user.email, user.password)
      .then((authUser) => {
        setUser({ initialUser });
        props.history.push("/dashboard");
      })
      .catch((error) => {
        setUser({ ...user, error: error.message });
      });
  };

  const isValid = user.email === "" || user.password === "";

  return (
    <Grid container component="main" className={classes.root} justify="center">
      <CssBaseline />
      <Grid item xs={12} md={10}>
        <div className={classes.paper}>
          <Grid container className="title-box">
            <Grid container justify="center">
              <h1 className="hana super-big">The Pain Cave</h1>
            </Grid>
            <Grid container justify="center" alignItems="center" xs={12}>
              <Grid
                item
                justify="center"
                alignItems="center"
                direction="column"
                xs={10}
                md={6}
              >
                <form
                  className={classes.form}
                  noValidate
                  onSubmit={(e) => e.preventDefault()}
                >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={handleChange}
                  />
                  <br />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                  />

                  <Typography className={classes.error}>
                    {user.error ? user.error : ""}
                  </Typography>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
                    disabled={isValid}
                  >
                    Sign In
                  </Button>
                  <Grid container direction="row" className="sign-in-meta">
                    <Grid item xs={12} md={6}>
                      <Link to="/sign-up">Don't have an account? Sign Up!</Link>
                    </Grid>
                    <Grid item xs={12} md={6} alignItems="flex-end">
                      <PasswordForget />
                    </Grid>
                  </Grid>
                  <Box mt={5}>
                    <Copyright />
                  </Box>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}

export default withRouter(withFirebase(SignIn));
