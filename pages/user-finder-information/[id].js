import React, { useState, useContext } from "react";
import Navbar from "../../components/Navbar";
import { firestore, postToJSON, auth } from "../../lib/firebase";
import { useRouter } from "next/router";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import NextLink from "next/link";
import { GImageMagnifier } from "@gmana/image-magnifier";
//
export async function getServerSideProps() {
  const postsQuery = firestore.collectionGroup("missingItems");
  // .where('published', '==', true)
  // .orderBy('createdAt', 'desc')
  // .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);
  // console.log(posts);
  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default function UserClaimerInformation(props) {
  const [posts, setPosts] = useState(props.posts);
  const router = useRouter();
  const { id } = router.query;

  const slugClient = posts.filter((items) => {
    return items.id.toLowerCase().includes(id);
  });

  const profile = slugClient.find((items) => items.id === id);

  if (!profile) {
    return <div>Property is no longer here please return to home page</div>;
  }

  const didNotMatch = (e) => {
    try {
      firestore
        .collection("missingItems")
        .doc(e)
        .update({
          status: "missing",
          claim_brand: "",
          claim_fullname: "",
          claim_information: "",
          claim_locationtype: "",
          claim_email: "",
          claim_phone: "",
          claim_image: "",
          claim_location: "",
          claim_additional: "",
        })
        .then(
          alert(
            "The credential of my property post did not match. The property will now be considered as missing again."
          )
        );
      router.push("/");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const claimerSubmitHandler = (e) => {
    try {
      firestore
        .collection("missingItems")
        .doc(e)
        .update({
          status: "claimed",
        })
        .then(alert("The property is now returned. Thank you for helping."));
      router.push("/");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <Navbar>
      <br /> <br /> <br /> <br /> <br />
      <Typography style={{ backgroundColor: "lightgray", padding: "1px" }}>
        <div
          style={{
            marginLeft: "15px",
            margin: "10px",
            fontSize: "20px",
            fontWeight: 200,
          }}
        >
          {profile.propertycategory} Details
        </div>
      </Typography>
      <br /> <br />
      <Typography variant="h3">
        {profile.propertycategory}: {profile.lostPropertyName}
      </Typography>
      <Typography style={{ fontSize: "25px", fontWeight: 200 }}>
        {/* <i> Property ID: {profile.id}</i> */}
      </Typography>
      <br /> <br /> <br /> <br />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Card>
            <CardContent style={{ backgroundColor: "#346e98" }}></CardContent>
            <CardContent
              style={{
                borderStyle: "groove",
              }}
            >
              <Typography style={{ fontSize: "35px", marginLeft: "30px" }}>
                <b> {profile.propertycategory}:</b> {profile.lostPropertyName}
              </Typography>
            </CardContent>
            <CardContent
              style={{
                borderStyle: "groove",
              }}
            >
              <Typography style={{ fontSize: "35px", marginLeft: "30px" }}>
                <b> Category:</b> {profile.category}
              </Typography>
            </CardContent>
            <CardContent
              style={{
                borderStyle: "groove",
              }}
            >
              <Typography style={{ fontSize: "35px", marginLeft: "30px" }}>
                <b> Brand: </b> {profile.brand}
              </Typography>
            </CardContent>
            <CardContent
              style={{
                borderStyle: "groove",
              }}
            >
              <Typography style={{ fontSize: "35px", marginLeft: "30px" }}>
                <b> Primary Color: </b> {profile.primaryColor}
              </Typography>
            </CardContent>
            <CardContent
              style={{
                borderStyle: "groove",
              }}
            >
              <Typography style={{ fontSize: "35px", marginLeft: "30px" }}>
                <b> Secondary Color: </b> {profile.secondaryColor}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent style={{ backgroundColor: "#346e98" }}></CardContent>
            <CardContent
              style={{
                borderStyle: "groove",
              }}
            >
              <Typography style={{ fontSize: "35px", marginLeft: "30px" }}>
                <b> Date and Time Lost: </b> {profile.timeLost}
              </Typography>
            </CardContent>

            <CardContent
              style={{
                borderStyle: "groove",
              }}
            >
              <Typography style={{ fontSize: "35px", marginLeft: "30px" }}>
                <b> Location Lost: </b> {profile.location}
              </Typography>
            </CardContent>
            <CardContent style={{ height: 185, borderStyle: "groove" }}>
              <Typography style={{ fontSize: "35px", marginLeft: "30px" }}>
                <b> Additional Information: </b> {profile.information}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent
              style={{
                align: "center",
                borderStyle: "ridge",
              }}
            >
              <GImageMagnifier src={profile.image} height={600} width={520} />
              {/* <img
                src={profile.image}
                alt={profile.lostPropertyName}
                height={600}
                width={530}
              /> */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent style={{ backgroundColor: "#346e98" }}></CardContent>
            <CardContent
              style={{
                borderStyle: "groove",
              }}
            >
              <Typography style={{ fontSize: "30px", marginLeft: "30px" }}>
                <b>Owner Details</b>
                <br />
                Name: {profile.firstname} {profile.lastname} {profile.suffix}
                <br />
                Email: {profile.email}
                <br />
                Phone: {profile.phone}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}></Grid>

        <Grid item xs={6}>
          <Typography variant="h4">Finder Information</Typography>
          <Card
            style={{
              borderStyle: "groove",
              borderRadius: "10px",
            }}
          >
            <CardContent style={{ backgroundColor: "#346e98" }}></CardContent>
            <CardContent>
              <Typography style={{ fontSize: "25px" }}>
                <b> Name: </b>
                {profile.claim_firstname} {profile.claim_lastname}{" "}
                {profile.claim_suffix}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography style={{ fontSize: "25px" }}>
                <b>Email: </b>
                {profile.claim_email}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography style={{ fontSize: "25px" }}>
                <b>Phone Number: </b>
                {profile.claim_phone}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography style={{ fontSize: "25px" }}>
                <b>Location: </b>
                {profile.claim_locationtype} {profile.claim_location}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography style={{ fontSize: "25px" }}>
                <b>Time Found: </b>
                {profile.claim_timeLost}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography style={{ fontSize: "25px" }}>
                <b>Item Description: </b>
                {profile.claim_information}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography style={{ fontSize: "25px" }}>
                <b>Additional Information: </b>
                {profile.claim_additional}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ marginTop: "3%" }}>
            <CardContent>
              <Typography variant="h5">
                <b>Note:</b>
              </Typography>
              <br />
              <Typography sx={{ color: "red" }} variant="h5">
                * Before making a decision please make sure to contact the
                finder to verify that the found property is yours.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <br /> <br />
          <Card>
            <CardContent
              style={{ backgroundColor: "#346e98", borderRadius: "10px" }}
            ></CardContent>
            <CardContent>
              <GImageMagnifier
                src={profile.claim_image}
                height={600}
                width={520}
              />
              {/* <img
                src={profile.claim_image}
                alt={profile.lostPropertyName}
                height={600}
                width={530}
              /> */}
            </CardContent>
          </Card>
        </Grid>
        <div style={{ marginTop: "3%" }}></div>
        <Grid item xs={7}>
          <NextLink href={"/user-finder-post"}>
            <Button
              style={{
                width: "200px",
                height: "70px",
              }}
            >
              <Typography variant="h6"> GO BACK TO LIST </Typography>
            </Button>
          </NextLink>
        </Grid>

        <Grid item xs={2}>
          <Button
            style={{
              background: "red",
              color: "white",
              width: "200px",
              height: "70px",
            }}
            onClick={() => didNotMatch(profile.id)}
          >
            <Typography variant="h6"> NOT MINE </Typography>
          </Button>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={2}>
          <Button
            style={{
              background: "green",
              color: "white",
              width: "200px",
              height: "70px",
            }}
            onClick={() => claimerSubmitHandler(profile.id)}
          >
            <Typography variant="h6"> PROPERTY MATCH </Typography>
          </Button>
        </Grid>
      </Grid>
    </Navbar>
  );
}
