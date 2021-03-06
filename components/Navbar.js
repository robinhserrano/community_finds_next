import React, { useContext, useState } from "react";
import Head from "next/head";
import {
  AppBar,
  Container,
  Link,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Badge,
  Grid,
} from "@mui/material";
import useStyles from "../utils/styles";
import NextLink from "next/link";
import Image from "next/image";
import logo from "../public/images/logo.png";
import userIcon from "../public/images/userIcon.png";
import { getAuth, signOut } from "firebase/auth";
import { UserContext } from "../lib/context";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { firestore, postToJSON } from "../lib/firebase";
//
var ls = require("local-storage");

export default function Navbar({ title, children }) {
  const classes = useStyles();
  const router = useRouter();
  // for the user
  const { user } = useContext(UserContext);
  console.log(user);
  Cookies.set("user", user);

  // for the user

  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push("/");
    }
  };
  const auth = getAuth();
  const logoutClickHandler = () => {
    setAnchorEl(null);

    signOut(auth).then(() => {
      //Sign out
    });
    Cookies.remove(user);
    localStorage.clear();
    router.push("/");
  };

  return (
    <div>
      <Head>
        <title>
          {title ? `${title} - Community Finds` : "Community Finds"}
        </title>
      </Head>

      <Toolbar className={classes.appbar}>
        <div className={classes.grow}></div>
        <NextLink href="/contact-us" passHref>
          <Link>
            <Typography
              style={{
                font: "SansSerif",
                fontSize: "12px",
                letterSpacing: "1px",
              }}
            >
              CONTACT US
            </Typography>
          </Link>
        </NextLink>
        <Typography
          style={{
            fontSize: "25px",
            marginLeft: "20px",
            marginRight: "20px",
            color: "#ffffff",
          }}
        >
          |
        </Typography>
        <NextLink href="/about-us" passHref>
          <Link>
            <Typography
              style={{
                font: "SansSerif",
                fontSize: "12px",
                letterSpacing: "1px",
              }}
            >
              ABOUT US
            </Typography>
          </Link>
        </NextLink>
        <Typography
          style={{
            fontSize: "25px",
            marginLeft: "20px",
            marginRight: "20px",
            color: "#ffffff",
          }}
        >
          |
        </Typography>
        <div>
          {user != null ? (
            <>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={loginClickHandler}
                className={classes.navbarButton}
              >
                <Image src={userIcon} alt={user.name} width={30} height={30} />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={loginMenuCloseHandler}
              >
                <MenuItem>
                  <NextLink href={"/profile"} passHref>
                    Profile
                  </NextLink>
                </MenuItem>
                <MenuItem>
                  <NextLink href={"/user-view-post"} passHref>
                    View Post
                  </NextLink>
                </MenuItem>
                <MenuItem>
                  <NextLink href={"/user-finder-post"} passHref>
                    <Badge badgeContent={ls.get("finderList")} color="primary">
                      Finder
                    </Badge>
                  </NextLink>
                </MenuItem>
                <MenuItem>
                  <NextLink href={"/user-claim-post"} passHref>
                    <Badge badgeContent={ls.get("claimList")} color="primary">
                      Claimer
                    </Badge>
                  </NextLink>
                </MenuItem>
                <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <NextLink href="/login" passHref>
              <Link>
                <Typography
                  style={{
                    font: "SansSerif",
                    fontSize: "12px",
                    letterSpacing: "1px",
                  }}
                >
                  USER LOGIN
                </Typography>
              </Link>
            </NextLink>
          )}
        </div>
      </Toolbar>

      <AppBar position="sticky" style={{ width: "100%" }}>
        <Toolbar position="absolute" className={classes.secondAppbar}>
          <div className={classes.logoGrow}></div>
          <NextLink href={"/"} passHref>
            <Link>
              <Image
                className={classes.logoGrow}
                src={logo}
                alt="logo"
                width={400}
                height={90}
                padding={0}
              />
            </Link>
          </NextLink>
          <div className={classes.toolbarGrow}></div>
          <NextLink href="/submit-lost-property-form" passHref>
            <Link color="inherit" underline="hover">
              <Typography className={classes.textStyle}>
                SUBMIT LOST PROPERTY
              </Typography>
            </Link>
          </NextLink>
          <NextLink href="/submit-found-property-form" passHref>
            <Link color="inherit" underline="hover">
              <Typography className={classes.textStyle}>
                SUBMIT FOUND PROPERTY
              </Typography>
            </Link>
          </NextLink>
          <NextLink href="/lost-property" passHref>
            <Link color="inherit" underline="hover">
              <Typography className={classes.textStyle}>
                LOST PROPERTY
              </Typography>
            </Link>
          </NextLink>
          <NextLink href="/found-property" passHref>
            <Link color="inherit" underline="hover">
              <Typography className={classes.textStyle}>
                FOUND PROPERTY
              </Typography>
            </Link>
          </NextLink>
          <NextLink href="/claimed-items" passHref>
            <Link color="inherit" underline="hover">
              <Typography className={classes.textStyle}>
                VIEW RETURNED PROPERTIES
              </Typography>
            </Link>
          </NextLink>
        </Toolbar>
      </AppBar>

      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography>All rights reserved. Community Finds 2021-2022.</Typography>
      </footer>
    </div>
  );
}
