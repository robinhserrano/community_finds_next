import React from "react";
import Head from "next/head";
import { AppBar, Container, Link, Toolbar, Typography } from "@mui/material";
import useStyles from "../utils/styles";
import NextLink from "next/link";
import Image from "next/image";
import logo from "../public/images/logo.png";
//

export default function Navbar({ title, children }) {
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>
          {title ? `${title} - Community Finds` : "Community Finds"}
        </title>
      </Head>
      <Toolbar className={classes.appbar}>
        <div className={classes.grow}></div>
        <NextLink href="/login" passHref>
          <Link>
            <Typography
              style={{
                font: "SansSerif",
                fontSize: "15px",
                letterSpacing: "1px",
              }}
            >
              ADMIN LOGIN
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
        <NextLink href="/login" passHref>
          <Link>
            <Typography
              style={{
                font: "SansSerif",
                fontSize: "15px",
                letterSpacing: "1px",
              }}
            >
              CUSTOMER LOGIN
            </Typography>
          </Link>
        </NextLink>
      </Toolbar>

      <AppBar position="sticky">
        <Toolbar position="absolute" className={classes.secondAppbar}>
          <div className={classes.logoGrow}></div>
          <Image
            className={classes.logoGrow}
            src={logo}
            alt="logo"
            width={350}
            height={250}
          />
          <div className={classes.toolbarGrow}></div>
          <NextLink href="/lostitem" passHref>
            <Link color="inherit" underline="hover">
              <Typography className={classes.textStyle}>
                SUBMIT LOST ITEM
              </Typography>
            </Link>
          </NextLink>
          <NextLink href="/lostitem" passHref>
            <Link color="inherit" underline="hover">
              <Typography className={classes.textStyle}>
                VIEW RECENT POST
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
