import React from "react";

import { AuthUserContext, withAuthentication } from "../components/Session";
import { withRouter } from "react-router-dom";
import gravatar from "gravatar-api";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import useStyles from "../config/theme.dashboard";
import Calendar from "../components/Calendar";
import Sidebar from "../components/Sidebar";

function Dashboard(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const getGrav = (authUser) => {
    let options = {
      email: authUser.email,
      parameters: { size: "50" },
    };
    return gravatar.imageUrl(options);
  };

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const signOut = () => {
    props.firebase.auth.signOut();
    props.history.push("/");
  };

  return (
    <AuthUserContext.Consumer>
      {(authUser) =>
        authUser ? (
          <div className={classes.root}>
            <CssBaseline />
            <AppBar
              position="absolute"
              className={clsx(classes.appBar, open && classes.appBarShift)}
            >
              <Toolbar className={classes.toolbar}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  className={clsx(
                    classes.menuButton,
                    open && classes.menuButtonHidden
                  )}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  className={classes.title}
                >
                  Dashboard
                </Typography>
                <IconButton color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <Typography component="p" style={{ paddingRight: "15px" }}>
                      <img src={getGrav(authUser)} alt="avatar" />
                    </Typography>
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Toolbar>
            </AppBar>

            <Sidebar
              signOut={signOut}
              open={open}
              handleDrawerClose={handleDrawerClose}
            />

            <main
              className={
                (classes.content,
                !open ? classes.contentClosed : classes.appBarShift)
              }
            >
              <div className={classes.appBarSpacer} />
              <Container maxWidth="xl" className={classes.container}>
                <Calendar firebase={props.firebase} authUser={authUser} />
              </Container>
            </main>
          </div>
        ) : (
          <p>Not authorized.</p>
        )
      }
    </AuthUserContext.Consumer>
  );
}

export default withRouter(withAuthentication(Dashboard));
