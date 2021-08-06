import React from "react";
import { useApolloClient } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 20,
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
  title: {
    marginLeft: "60px",
    cursor: "pointer",
  },
}));

export default function NavBar({ user, refetch }) {
  const client = useApolloClient();
  const history = useHistory();

  const classes = useStyles();
  const handleClick = async (path) => {
    await refetch();
    history.push(path);
  };
  const handleSignout = () => {
    localStorage.removeItem("token");
    client.clearStore();
    window.location.href = "/";
  };
  const UnAuthNav = () => {
    return (
      <>
        <Typography
          variant="h6"
          className={classes.title}
          onClick={() => handleClick("/home")}
        >
          Home
        </Typography>

        <Typography
          variant="h6"
          className={classes.title}
          onClick={() => handleClick("/login")}
        >
          Login
        </Typography>
        <Typography
          variant="h6"
          className={classes.title}
          onClick={() => handleClick("/signup")}
        >
          Signup
        </Typography>
      </>
    );
  };
  const AuthNav = () => {
    return (
      <>
        <Typography
          variant="h6"
          className={classes.title}
          onClick={() => handleClick("/home")}
        >
          Home
        </Typography>

        <Typography
          variant="h6"
          className={classes.title}
          onClick={() => handleClick("/add-post")}
        >
          Add Post
        </Typography>
        <Typography
          variant="h6"
          className={classes.title}
          onClick={() => handleClick("/profile")}
        >
          Profile
        </Typography>
        <Typography
          variant="h6"
          className={classes.title}
          onClick={handleSignout}
        >
          Signout
        </Typography>
      </>
    );
  };
  return (
    <div className={classes.root}>
      {/* {console.log("user", user && user.getCurrentUser)} */}
      <AppBar position="static">
        <Toolbar
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "0.5rem 0px",
            width: "100%",
          }}
        >
          {user && user.getCurrentUser ? <AuthNav /> : <UnAuthNav />}
        </Toolbar>
      </AppBar>
    </div>
  );
}
