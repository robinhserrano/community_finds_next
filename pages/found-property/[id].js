import React, { useState, useContext, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { firestore, postToJSON } from "../../lib/firebase";
import { useRouter } from "next/router";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "next-share";
import { GImageMagnifier } from "@gmana/image-magnifier";

//
export async function getServerSideProps() {
  const postsQuery = firestore.collectionGroup("foundItems");
  // .where('published', '==', true)
  // .orderBy('createdAt', 'desc')
  // .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);
  // console.log(posts);
  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default function ItemDetails(props) {
  const [posts, setPosts] = useState(props.posts);
  const router = useRouter();
  const { id } = router.query;
  //NEWCODE
  const [currentUser, setUser] = useState();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(loggedInUser);
      const profileName = posts.filter((doc) => {
        return doc.id.includes(loggedInUser);
      });
    } else {
      router.push("/login");
    }
  }, []);
  //NEWCODE

  const slugClient = posts.filter((items) => {
    return items.id.toLowerCase().includes(id);
  });

  const profile = slugClient.find((items) => items.id === id);

  if (!profile) {
    return <div>Property is no longer here please return to home page</div>;
  }

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
        {profile.propertycategory}: {profile.foundPropertyName}
      </Typography>
      {/* <Typography style={{ fontSize: "25px", fontWeight: 200 }}>
        <i> Property ID: {profile.id}</i>
      </Typography> */}
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
                <b>{profile.propertycategory}:</b> {profile.foundPropertyName}
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
                <b> Type: </b> {profile.brand}
              </Typography>
            </CardContent>
            {/* <CardContent
              style={{
                borderStyle: "groove",
              }}
            >
              <Typography style={{ fontSize: "35px", marginLeft: "30px" }}>
                <b> Primary Color: </b> {profile.primaryColor}
              </Typography>
            </CardContent> */}
            {/* <CardContent
              style={{
                borderStyle: "groove",
              }}
            >
              <Typography style={{ fontSize: "35px", marginLeft: "30px" }}>
                <b> Secondary Color: </b> {profile.secondaryColor}
              </Typography>
            </CardContent> */}
          </Card>
        </Grid>
        {/* <Grid item xs={6}>
          <Card>
            <CardContent style={{ backgroundColor: "#346e98" }}></CardContent>
            <CardContent
              style={{
                borderStyle: "groove",
              }}
            >
              <Typography style={{ fontSize: "35px", marginLeft: "30px" }}>
                <b> Date and Time Found: </b> {profile.timeLost}
              </Typography>
            </CardContent>

            <CardContent
              style={{
                borderStyle: "groove",
              }}
            >
              <Typography style={{ fontSize: "35px", marginLeft: "30px" }}>
                <b> Location Found: </b> {profile.location}
              </Typography>
            </CardContent>
            <CardContent style={{ height: 185, borderStyle: "groove" }}>
              <Typography style={{ fontSize: "35px", marginLeft: "30px" }}>
                <b> Additional Information: </b> {profile.information}
              </Typography>
            </CardContent>
          </Card>
        </Grid> */}
        <Grid item xs={6}>
          <Card>
            <CardContent style={{ backgroundColor: "#346e98" }}></CardContent>
            <CardContent
              style={{
                borderStyle: "groove",
              }}
            >
              <Typography style={{ fontSize: "30px", marginLeft: "30px" }}>
                <b>Contact Details</b>
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
        <Grid item xs={6}>
          <Card>
            <CardContent
              style={{
                alignItems: "center",
                borderStyle: "ridge",
              }}
            >
              <GImageMagnifier src={profile.image} height={600} width={520} />
              {/* <img
                src={profile.image}
                alt={profile.foundPropertyName}
                height={600}
                width={520}
              /> */}

              <NextLink href={`./zoom-in-photo/${profile.id}`}>
                <Button style={{ marginTop: "10px" }}>View Image</Button>
              </NextLink>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={7}>
          <NextLink href={"/found-property"}>
            <Button
              variant="outlined"
              style={{
                width: "200px",
                height: "70px",
              }}
            >
              <Typography variant="h6"> GO BACK TO LIST </Typography>
            </Button>
          </NextLink>
        </Grid>
        {/* <Grid item xs={1}>
          <Typography>Share on </Typography>
        </Grid> */}
        <Grid item xs={3}>
          {/* need manipulation of data into variable para maging dynamic */}
          <FacebookShareButton
            url={`https://community-finds-next.vercel.app/found-property/${profile.id}`}
            quote={
              "next-share is a social share buttons for your next React apps."
            }
            hashtag={"#missing"}
            style={{ marginRight: "20px" }}
          >
            <FacebookIcon size={70} round />
          </FacebookShareButton>

          <TwitterShareButton
            url={`https://community-finds-next.vercel.app/found-property/${profile.id}`}
            quote={
              "next-share is a social share buttons for your next React apps."
            }
            hashtag={"#missing"}
          >
            <TwitterIcon size={70} round />
          </TwitterShareButton>
        </Grid>
        <Grid item xs={2}>
          <NextLink href={`/claim-property-form/${profile.id}`}>
            <Button
              style={{
                background: "#366e97",
                color: "white",
                width: "250px",
                height: "70px",
              }}
            >
              <Typography variant="h6">Claim It</Typography>
            </Button>
          </NextLink>
        </Grid>
      </Grid>
    </Navbar>
  );
}
