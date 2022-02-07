import React from "react";
import Head from "next/head";
import { AppBar, Link, Toolbar, Typography } from "@mui/material";
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
    </div>
  );
}
