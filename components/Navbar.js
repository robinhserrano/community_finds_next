import React from "react";
import Head from "next/head";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Navbar({ title, children }) {
  return (
    <div>
      <Head>
        <title>
          {title ? `${title} - Community Finds` : "Community Finds"}
        </title>
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography>Community Finds</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
