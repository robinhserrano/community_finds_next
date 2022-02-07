import React from "react";
import Head from "next/head";
import { AppBar, Container, Link, Toolbar, Typography } from "@mui/material";
import useStyles from "../utils/styles";
import NextLink from "next/link";
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
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <div className={classes.grow}></div>
          <NextLink href="/login" passHref>
            <Link>
              <Typography
                style={{
                  marginBottom: "24px",
                  font: "SansSerif",
                  fontSize: "12px",
                  letterSpacing: "1px",
                }}
              >
                CUSTOMER LOGIN
              </Typography>
            </Link>
          </NextLink>
        </Toolbar>
      </AppBar>
      <Toolbar className={classes.secondAppbar}>
        <Typography style={{ marginLeft: "200px" }}>COMMUNITY FINDS</Typography>
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
      <Container className={classes.main}>{children}</Container>
    </div>
  );
}
