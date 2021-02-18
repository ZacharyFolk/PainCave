import React, { useState } from "react";
import { withFirebase } from "../components/Firebase";
import { Link, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function SignUp(props) {
  const initialUser = {
    id: null,
    name: "",
    email: "",
    password: "",
    error: null,
    auth: null,
  };

  const [user, setUser] = useState(initialUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    props.firebase.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((authUser) => {
        // Create a user in the Firebase realtime database
        return props.firebase.user(authUser.user.uid).set({
          username: user.name,
          email: user.email,
          activities: "not set",
        });
      })
      .then((authUser) => {
        setUser(initialUser);
        props.history.push("/dashboard");
      })
      .catch((error) => {
        setUser({ ...user, error: error.message });
      });
  };

  const isValid = user.name === "" || user.email === "" || user.password === "";

  return (
    <Grid container component="main">
      <Grid item xs={12} sm={8} md={5} elevation={6} square>
        <div>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form noValidate onSubmit={(e) => e.preventDefault()}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
              value={user.name}
              onChange={handleChange}
            />
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
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <Typography>{user.error ? user.error : ""}</Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={isValid}
            >
              Sign up
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/">{"Already have an account? Sign In"}</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default withRouter(withFirebase(SignUp));
