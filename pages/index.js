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
            They can report both lost and found propterties in this website.
            Once the propterty were reported in our system it will go through
            our matching system, with that it can help the citizen to easily
            find their lost propterties.
          </Typography>
          <div style={{ marginBottom: "30px" }}></div>
          <NextLink href="/submit-lost-item-form" passHref>
            <Button
              variant="outlined"
              style={{ width: 250, height: 60, marginRight: 30 }}
            >
              Submit Lost Property
            </Button>
          </NextLink>
          <NextLink href={"/found-item"}>
            <Button variant="contained" style={{ width: 250, height: 60 }}>
              Claim Property
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
            their lost propterties. Community Finds is also a place to provide
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
              Community Finds recommend you to go to barangay hall or police
              station to do the claiming or handing propterties for security
              purposes.
            </li>
          </Typography>
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={5}>
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
            <li> Do not spam any contact information given by other users.</li>
            <li>
              Do not trick other members of the community, who are simply
              seeking for their lost propterties.
            </li>
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography variant="h4">
            <b>Security and Safety:</b>
          </Typography>
          <br />
          <Typography variant="h6">
            <li>
              Community Finds will provide an email verification, to ensure the
              email address is existent, active and valid.
            </li>
            <li>
              Community Finds will provide an email authentication, to prove
              that the email is not forged and it belongs to a user who claims
              to be from.
            </li>
            <li>
              Community Finds make sure the collection of information that you
              will provide are secured following the data Privacy law.
            </li>
          </Typography>
        </Grid>
        <Grid item xs={4} style={{ marginTop: "60px" }}>
          <center>
            <Image src={ease} height={200} width={300} />
          </center>

          <Typography style={{ textAlign: "center" }}>Ease of Use</Typography>
          <Typography style={{ fontSize: "13px", textAlign: "center" }}>
            Submitting lost or found propterties is simple and hassle free.
            Input the required information and let our system go to work.
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
            Users can easily see property posted here so that they might find
            the person possibly holding their lost property.
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
