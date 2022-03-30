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
          personally or on behalf of an entity and Community Finds, concerning
          your access to and use of the Website. You agree that by accessing the
          Website, you have read, understood, and agreed to be bound by all of
          these Terms of Use. Please click on the checkbox upon registering to
          the Website if you accept these terms and conditions. Please
          understand that if you refuse to accept these terms and conditions,
          you will not be able to use our Website Services.
        </Typography>
        <br /> <br />
        <Typography variant="h4">Collecting Personal Information</Typography>
        <br /> <br />
        <Typography style={{ textAlign: "justify" }} variant="h5">
          &emsp; You can access our Website without providing us with any
          confidential personal information. However, we may collect other
          personal information in various locations on our Website as more
          particularly described below. Our primary goal in collecting these
          information is to provide you, the user, with a customized experience
          on our Website and to deliver better service, and more relevant
          content to other users.
        </Typography>
        <br /> <br />
        <Typography variant="h4">Personal Data We Collect</Typography>
        <br /> <br />
        <Typography style={{ textAlign: "justify" }} variant="h5">
          &emsp; Personal information may be collected from you during (a) the
          registration process, (b) submitting found item(s), (c) and submitting
          lost item(s). This information may include your name, phone number,
          e-mail address, and passwords. We ask that you provide only your own
          personal information, not personal information concerning anyone else.
        </Typography>
        <br /> <br />
        <Typography variant="h4">How We Use Information</Typography>
        <br /> <br />
        <Typography style={{ textAlign: "justify" }} variant="h5">
          &emsp; Unless otherwise described elsewhere in this Statement, we will
          not disclose any personal information collected from users.We use the
          information you provide specifically for many purposes, including:
          <br />
          1. to allow you to register to use our services;
          <br />
          2. to ensure the continued smooth operation of our service;
          <br />
          3. to provide other users a means to reach/contact you with regards to
          your lost or found property;
          <br />
          4. to prevent or investigate actual or suspected fraud, hacking,
          infringement, or other misconduct involving our services, or this
          Website;
        </Typography>
        <br /> <br />
        <Typography variant="h4">Description of Service</Typography>
        <br /> <br />
        <Typography style={{ textAlign: "justify" }} variant="h5">
          &emsp; The Services are operated through our Website Community Finds
          which provide users with a unique online resource for the purpose of
          reuniting lost properties with their respective owners. Using a manual
          matching system to connect those who lost a property to those who have
          found a similar property, Community Finds provides a unique approach
          in which individuals can search or input lost or found properties to
          facilitate contact with other individuals in possession or with
          information regarding a lost or found property.
        </Typography>
        <br /> <br />
        <Typography variant="h4">Requirements</Typography>
        <br /> <br />
        <Typography style={{ textAlign: "justify" }} variant="h5">
          &emsp; By using this Website, you represent, acknowledge and agree
          that you are at least 18 years of age and above. If you are a parent
          or legal guardian of a Minor, you hereby agree to bind the Minor to
          these Terms. The users are responsible for acquiring access to the
          Service, which may necessitate the payment of third-party fees (such
          as Internet Service Provider).
        </Typography>
        <br /> <br />
        <Typography variant="h4">
          Storage of Personal Information and Security
        </Typography>
        <br /> <br />
        <Typography style={{ textAlign: "justify" }} variant="h5">
          &emsp;We take reasonable precautions to protect the personal
          information we collect from users. When users submit personal
          information via the Website, the information is housed in a secure
          firebase database. While we strive to protect your personal
          information, you should know that information sent over the Internet,
          whether by e-mail or by using one of our online forms, is not
          necessarily secure against interception. Therefore, we cannot be
          responsible for such interception and cannot guarantee the security of
          such information.
        </Typography>
        <br /> <br />
        <Typography variant="h4">Modification of the Service</Typography>
        <br /> <br />
        <Typography style={{ textAlign: "justify" }} variant="h5">
          We reserve the right to modify the contents of this Website at any
          time, but we have no obligation to update any information on our
          Website. You agree that it is your responsibility to monitor changes
          to our Website.
          <br /> <br />
          We reserve the right at any time to modify or discontinue the Service
          (or any part or content thereof) without notice at any time.
          <br /> <br />
          We will not be liable to you or to any third-party for any
          modification, change, suspension or discontinuance of the Service.
        </Typography>
        <br /> <br />
        <Typography variant="h4">Prohibited Activities</Typography>
        <br /> <br />
        <Typography style={{ textAlign: "justify" }} variant="h5">
          &emsp;You may not access or use the Site for any purpose other than
          that for which we make the Site available. The Site may not be used in
          connection with any commercial endeavors except those that are
          specifically endorsed or approved by us.
          <br /> <br />
          &emsp;As a condition of use, you promise not to use the Services for
          any purpose that is unlawful or prohibited by these Terms, or any
          other purpose not reasonably intended by. As a user of the Site, you
          agree not to:
          <br /> <br />
          1. Use any information obtained from the Site in order to harass,
          abuse, or harm another person.
          <br />
          2. Make improper use of our support services or submit false reports
          of abuse or misconduct.
          <br />
          3. Upload of images that contain adult content. This includes nudity,
          depictions of people in explicit or suggestive positions, or
          activities that are overly suggestive or sexually provocative.
          <br />
          4. Upload of content that is inappropriate, illegal and unsafe.
          <br />
          5. Promoting the sale or use of illicit or recreational drugs, or
          other unsafe substances, products or supplements.
          <br />
          6. Attempt to impersonate another user or person or use the username
          of another user.
          <br /> <br /> <br /> <br />
        </Typography>
      </div>
    </Navbar>
  );
}
