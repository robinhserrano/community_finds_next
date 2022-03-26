import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NextLink from "next/link";
import Image from "next/image";
import announcement from "../public/images/announcement.jpg";
import ease from "../public/images/ease-of-use.png";
import match from "../public/images/match.png";
import online from "../public/images/online.png";

//

export default function Home(props) {
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      console.log(loggedInUser);
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      //const foundUser = JSON.parse(loggedInUser);
      // setUser(foundUser);
    }
  }, []);

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
            Community finds is a community base online platform that aims to
            help and it is generalize for the citizen of Balibago Angeles City.
            They can report both lost and found properties in this website. Once
            the property were reported in our system, with that it can help the
            citizen to easily find their lost properties.
          </Typography>
          <div style={{ marginBottom: "30px" }}></div>
          <NextLink href="/submit-lost-property-form" passHref>
            <Button
              variant="outlined"
              style={{ width: 250, height: 60, marginRight: 30 }}
            >
              Submit Lost Property
            </Button>
          </NextLink>

          <NextLink href="/submit-found-property-form" passHref>
            <Button
              variant="contained"
              style={{ width: 250, height: 60, marginRight: 30 }}
            >
              Submit Found Property
            </Button>
          </NextLink>
        </Grid>
        <Grid item xs={6}>
          <Image src={announcement} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3">
            <b>Community Finds Guidelines</b>
          </Typography>
          <br />
          <Typography variant="h5" style={{ textAlign: "justify" }}>
            When you use Community Finds, you join a community of people from
            Barangay Balibago who can post their lost or found property within
            the area. Aside from that, persons who are not residents of the
            region but are certain to have lost their property inside the area
            may utilize the Community Finds by uploading the specifics of their
            lost property and other necessary information. This is to provide
            the residents and nonresidents a greater opportunity of finding
            their lost properties. Community Finds is also a place to provide
            inspiration and motivation to others to post their found property
            and to return it to the rightful owner. The guidelines below help
            keep the community to fully understand and make it possible to
            understand Community Finds.
          </Typography>
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Typography variant="h3">
            <b>Important Guidelines</b>
          </Typography>
          <br />
          <Typography variant="h5">
            <li> Treat others online as you would treat them in real life. </li>
            <li>
              Respect the personal information of other community members.
            </li>
            <li>
              Communicate with courtesy and respect through the contact
              information provided.
            </li>
            <li>Complete all the details needed in the lost and found form.</li>
            <li>
              Use proper judgment or discretion while interacting with other
              users;
            </li>
            <li>
              Community Finds recommends you to go to the barangay hall or the
              police station for claiming or handing properties for security
              purposes.
            </li>
          </Typography>
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Typography variant="h4">
            <b>Please do not:</b>
          </Typography>
          <br />
          <Typography variant="h6">
            <li>
              Do not post content that is not related to a lost or found
              property.
            </li>
            <li>
              Do not post content that is disrespectful, malicious or offensive.
            </li>
            <li>
              Do not spam other users through contact information provided.
            </li>
            <li>
              Do not trick other members of the community, who are simply
              seeking for their lost properties.
            </li>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">
            <b>Security and Safety:</b>
          </Typography>
          <br />
          <Typography variant="h6">
            <li>Only verified user can use this website.</li>
            <li>
              Community Finds makes sure the collection of information that you
              will provide are secured following the RA 10173 or Data Privacy
              Act of 2012.
            </li>
          </Typography>
        </Grid>
        <Grid item xs={6} style={{ marginTop: "60px", marginBottom: "30px" }}>
          <Typography variant="h5" style={{ textAlign: "center" }}>
            <b>Ease of Use</b>
          </Typography>
          <Typography style={{ fontSize: "18px", textAlign: "center" }}>
            Submitting lost or found properties is simple and hassle free. Input
            the required information and let our system go to work.
          </Typography>
        </Grid>

        <Grid item xs={6} style={{ marginTop: "60px", marginBottom: "30px" }}>
          <Typography variant="h5" style={{ textAlign: "center" }}>
            <b>Online</b>
          </Typography>
          <Typography style={{ fontSize: "18px", textAlign: "center" }}>
            Community Finds is an online platform that is available to anyone.
          </Typography>
        </Grid>
      </Grid>
    </Navbar>
  );
}
