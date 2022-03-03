import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import Navbar from "../components/Navbar";
import NextLink from "next/link";
import Image from "next/image";
import announcement from "../public/images/announcement.jpg";
import ease from "../public/images/ease-of-use.png";
import match from "../public/images/match.png";
import online from "../public/images/online.png";
//

export default function Home() {
  return (
    <Navbar>
      <div style={{ marginTop: "30px" }}></div>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Typography variant="h4">
            <b>Welcome to Community Finds</b>
          </Typography>
          <div style={{ marginBottom: "30px" }}></div>
          <Typography variant="h5" style={{ textAlign: "justify" }}>
            Community finds is a community base online platform which aims to
            help and it is generalize for the citizen of Baligo Angeles City.
            They can report both lost and found items in this website. Once the
            items were reported in our system it will go through our matching
            system, with that it can help the citizen to easily find their lost
            items.
          </Typography>
          <div style={{ marginBottom: "30px" }}></div>
          <NextLink href="/submit-lost-item-form" passHref>
            <Button
              variant="outlined"
              style={{ width: 200, height: 60, marginRight: 30 }}
            >
              Submit Lost Item
            </Button>
          </NextLink>
          <NextLink href={"/found-item"}>
            <Button variant="contained" style={{ width: 200, height: 60 }}>
              Claim Item
            </Button>
          </NextLink>
        </Grid>
        <Grid item xs={6}>
          <Image src={announcement} />
        </Grid>

        <Grid item xs={4} style={{ marginTop: "60px" }}>
          <center>
            <Image src={ease} height={200} width={300} />
          </center>

          <Typography style={{ textAlign: "center" }}>Ease of Use</Typography>
          <Typography style={{ fontSize: "13px", textAlign: "center" }}>
            Submitting lost or found items is simple and hassle free. Input the
            required information and let our system go to work.
          </Typography>
        </Grid>

        <Grid item xs={4} style={{ marginTop: "60px" }}>
          <center>
            <Image src={match} height={200} width={300} />
          </center>

          <Typography style={{ textAlign: "center" }}>
            Easy Match Making
          </Typography>
          <Typography style={{ fontSize: "13px", textAlign: "center" }}>
            Users can easily see item posted here so that they might find the
            person possibly holding their lost item.
          </Typography>
        </Grid>
        <Grid item xs={4} style={{ marginTop: "60px" }}>
          <center>
            <Image src={online} height={200} width={300} />
          </center>

          <Typography style={{ textAlign: "center" }}>Online</Typography>
          <Typography style={{ fontSize: "13px", textAlign: "center" }}>
            Community Finds is an online platform that is available to anyone.
          </Typography>
        </Grid>
      </Grid>
    </Navbar>
  );
}
