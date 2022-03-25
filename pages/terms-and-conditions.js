import { Button, Typography } from "@mui/material";
import React from "react";
import Navbar from "../components/Navbar";
import NextLink from "next/link";

export default function TermsAndConditions() {
  return (
    <Navbar>
      <div style={{ marginTop: "5%" }}>
        <NextLink href={"/register"} passHref>
          <Button sx={{ fontSize: "20px" }} variant="outlined">
            Back to Register Page
          </Button>
        </NextLink>
        <Typography variant="h3" style={{ textAlign: "center" }}>
          User Agreement for Community Finds
        </Typography>
        <br /> <br />
        <Typography style={{ textAlign: "justify" }} variant="h5">
          &emsp; You must read, agree with and accept all of the terms and
          conditions contained in this User Agreement. These Terms of Use
          constitute a legally binding agreement made between you, whether
          personally or on behalf of an entity (“you”) and Community Finds
          (“Company”, “we”, “us”, or “our”), concerning your access to and use
          of the communityfinds.com website as well as any other media form,
          media channel, mobile website or mobile application related, linked,
          or otherwise connected thereto (collectively, the “Site”). We are
          registered in the Philippines and have our registered office at
          Balibago, Angeles City, and Pampanga 2009. You agree that by accessing
          the Site, you have read, understood, and agreed to be bound by all of
          these Terms of Use. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF
          USE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU
          MUST DISCONTINUE USE IMMEDIATELY.
        </Typography>
        <br /> <br />
        <Typography variant="h4">Description of Service</Typography>
        <br /> <br />
        <Typography style={{ textAlign: "justify" }} variant="h5">
          &emsp; Community Finds provides users with a unique online resource
          for the purpose of reuniting lost properties with their respective
          owners (the “Service”). Using algorithms to connect those who lost an
          property to those who have found a similar property, Community Finds
          provides a unique approach in which individuals can search or input
          lost or found properties to facilitate contact with other individuals
          in possession or with information regarding a lost or found
          properties.{" "}
        </Typography>
        <br /> <br />
        <Typography variant="h4">Requirements</Typography>
        <br /> <br />
        <Typography style={{ textAlign: "justify" }} variant="h5">
          &emsp; The users are responsible for acquiring access to the Service,
          which may necessitate the payment of third-party fees (such as
          Internet service provider). Minors and temporarily or indefinitely
          suspended Community Finds. users are not permitted to utilize our
          services. If you are a minor, you may only use this service with the
          permission of your parents or guardians. Please do not utilize our
          services if you do not qualify.
        </Typography>
        <br /> <br />
        <Typography variant="h4">Access to the Site</Typography>
        <br /> <br />
        <Typography style={{ textAlign: "justify" }} variant="h5">
          &emsp; Community Finds grants you a non-transferable, non-exclusive,
          revocable, limited license to access the Site solely for your own
          personal, non-commercial use. Community Finds grants you a
          non-transferable, non-exclusive, revocable, limited license to access
          the Site solely for your own personal, non-commercial use.
        </Typography>
      </div>
    </Navbar>
  );
}
