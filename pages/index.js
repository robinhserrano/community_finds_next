import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NextLink from "next/link";
import Image from "next/image";
import announcement from "../public/images/register.png";
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
            <br /> A community-based online platform that aims to help in
            reporting both lost and found properties within Barangay Balibago,
            Angeles City.
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
            <b>Community Guidelines</b>
          </Typography>
          <br />
          <Typography variant="h5" style={{ textAlign: "justify" }}>
            When you use Community Finds, you join a community of people from
            Barangay Balibago who can post their lost or found properties within
            the area. Non-residents of the barangay who are certain to have lost
            their property within the area, may utilize the Community Finds by
            uploading the details of the lost property and other helpful
            information to help them find the lost item.
            <br /> <br />
            The online platform provides the residents and non-residents a
            better chance of finding their lost properties. Community Finds is
            also a place to provide inspiration and motivation for others to
            post their found property and to return it to the rightful owner.
            <br /> <br />
            The following guidelines will help in the upkeep of Community Finds
            in serving its purpose and ensure a safe environment for the members
            of the community.
          </Typography>
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Typography variant="h3">
            <b>Important Guidelines</b>
          </Typography>
          <br />
          <Typography variant="h5">
            <li>Treat others online as you would treat them in real life.</li>
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
              users.
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
            <li>
              Only those who register and verify their accounts will be given
              access of the website’s functionalities.
            </li>
            <li>
              Community Finds ensures collection and handling of user
              information are within the mandate of RA 10173 or Data Privacy Act
              of 2012.
            </li>
          </Typography>
        </Grid>
      </Grid>
    </Navbar>
  );
}
