import React from "react";
import Navbar from "../components/Navbar";
import { Typography } from "@mui/material";

//

export default function AboutUs() {
  return (
    <Navbar>
      <div style={{ marginTop: "2%" }} />
      <Typography variant="h3">
        <strong>ABOUT US</strong>
      </Typography>
      <br /> <br />
      <Typography variant="h4">
        <b>About Community Finds</b>
      </Typography>
      <br />
      <Typography variant="h5" style={{ textAlign: "justify" }}>
        We provide a positive community environment for residents, barangay
        officers, staff, and visitors of Barangay Balibago, Angeles City,
        Pampanga, by responding to risks and emerging issues related to lost and
        found items.
      </Typography>
      <br />
      <Typography variant="h4">
        <b>Community Finds Story</b>
      </Typography>
      <br />
      <Typography variant="h5" style={{ textAlign: "justify" }}>
        Like all great ideas, Community Finds was born from a problem that we
        knew we could help. It is the output of a Capstone Project developed and
        brainstormed by our team composed of four, young aspiring Web
        Developers. The idea of Community Finds emerged when we are thinking of
        a project that could help a locality solve one of its emerging issues.
        Now we’re focusing on helping the community of Barangay Balibago in
        Angeles City, Pampanga, Central Luzon.
      </Typography>
      <br />
      <Typography variant="h5" style={{ textAlign: "justify" }}>
        Barangay Balibago has been described as "the entertainment district of
        Angeles City, Pampanga”. It offers a thriving nightlife with a variety
        of great restaurants, retail centers, bars, clubs, and casinos. Also,
        with a population of over 45,798 people, it has the largest population
        in Angeles City. An estimate of 13% of the total population of the
        Barangay report lost items yearly. Out of these reports, roughly 50% are
        only being solved and returned to the owner.
      </Typography>
      <br />
      <Typography variant="h5" style={{ textAlign: "justify" }}>
        With this, Community Finds is developed to help the community of
        Barangay Balibago regarding this issue through an online platform that
        stores and manages information for lost and found items. Enabling them
        to report such items and reach other users of the community.
      </Typography>
      <br />
      <Typography variant="h4">
        <b>Community Finds Foundations</b>
      </Typography>
      <br />
      <Typography variant="h5">
        Community Finds' mission is to build and provide software to a community
        that helps.
      </Typography>
      <br />
      <Typography variant="h5">
        We want to help you spread out word to the community about your lost or
        found items through our website.
      </Typography>
      <br />
      <Typography variant="h5">
        Community Finds Foundations are the backbone of our culture and guide on
        how we could enhance the software for you and the whole community.
      </Typography>
    </Navbar>
  );
}
