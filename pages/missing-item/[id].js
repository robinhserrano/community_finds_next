import React, { useState, useContext } from "react";
import Navbar from "../../components/Navbar";
import { firestore, postToJSON } from "../../lib/firebase";
import { useRouter } from "next/router";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
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

export default function ItemDetails(props) {
  const [posts, setPosts] = useState(props.posts);
  const router = useRouter();
  const { id } = router.query;

  const slugClient = posts.filter((items) => {
    return items.id.toLowerCase().includes(id);
  });

  const profile = slugClient.find((items) => items.id === id);

  if (!profile) {
    return <div>Item no longer here please return to home page</div>;
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
          Lost Item Details
        </div>
      </Typography>
      <br /> <br />
      <Typography style={{ fontSize: "50px" }}>
        Lost Item: {profile.name}
      </Typography>
      <Typography style={{ fontSize: "25px", fontWeight: 200 }}>
        <i> Item ID: {profile.id}</i>
      </Typography>
      <br /> <br /> <br /> <br />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Card>
            <CardContent style={{ backgroundColor: "#346e98" }}></CardContent>
            <CardContent
              style={{
                borderStyle: "outset",
              }}
            >
              <Typography style={{ fontSize: "35px", marginLeft: "30px" }}>
                Item Lost
              </Typography>
              <span style={{ fontSize: "30px", marginLeft: "30px" }}>
                {profile.name}
              </span>
            </CardContent>
            <CardContent
              style={{
                borderStyle: "outset",
              }}
            >
              <Typography style={{ fontSize: "35px", marginLeft: "30px" }}>
                Category
              </Typography>
              <span style={{ fontSize: "30px", marginLeft: "30px" }}>
                {profile.category}
              </span>
            </CardContent>
            <CardContent
              style={{
                borderStyle: "outset",
              }}
            >
              <Typography style={{ fontSize: "35px", marginLeft: "30px" }}>
                Brand
              </Typography>
              <span style={{ fontSize: "30px", marginLeft: "30px" }}>
                {profile.brand}
              </span>
            </CardContent>
            <CardContent
              style={{
                borderStyle: "outset",
              }}
            >
              <Typography style={{ fontSize: "35px", marginLeft: "30px" }}>
                Primary Color
              </Typography>
              <span style={{ fontSize: "30px", marginLeft: "30px" }}>
                {profile.primaryColor}
              </span>
            </CardContent>
            <CardContent
              style={{
                borderStyle: "outset",
              }}
            >
              <Typography style={{ fontSize: "35px", marginLeft: "30px" }}>
                Secondary Item Color
              </Typography>
              <span style={{ fontSize: "30px", marginLeft: "30px" }}>
                {profile.secondaryColor}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent style={{ backgroundColor: "#346e98" }}></CardContent>
            <CardContent
              style={{
                borderStyle: "outset",
              }}
            >
              <Typography style={{ fontSize: "35px", marginLeft: "30px" }}>
                Date and Time Lost
              </Typography>
              <span style={{ fontSize: "30px", marginLeft: "30px" }}>
                {profile.timeLost}
              </span>
            </CardContent>

            <CardContent
              style={{
                borderStyle: "outset",
              }}
            >
              <Typography style={{ fontSize: "35px", marginLeft: "30px" }}>
                Location Lost
              </Typography>
              <span style={{ fontSize: "30px", marginLeft: "30px" }}>
                {profile.location}
              </span>
            </CardContent>
            <CardContent style={{ height: 185, borderStyle: "outset" }}>
              <Typography style={{ fontSize: "35px", marginLeft: "30px" }}>
                Additional Information
              </Typography>
              <span style={{ fontSize: "30px", marginLeft: "30px" }}>
                {profile.information}
              </span>
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
              <Image
                src={profile.image}
                alt={profile.name}
                height={600}
                width={700}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent style={{ backgroundColor: "#346e98" }}></CardContent>
            <CardContent
              style={{
                borderStyle: "outset",
              }}
            >
              <Typography style={{ fontSize: "35px", marginLeft: "30px" }}>
                Name: {profile.firstname} {profile.lastname}
                <br />
                Email: {profile.email}
                <br />
                Phone: {profile.phone}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          MAP HERE
        </Grid>
        <Grid item xs={10}>
          <NextLink href={"/found-item"}>
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
          <NextLink href={"/claim-lost-item-form"} passHref>
            <Button
              style={{
                background: "#366e97",
                color: "white",
                width: "150px",
                height: "70px",
              }}
            >
              <Typography variant="h6"> CLAIM ITEM </Typography>
            </Button>
          </NextLink>
        </Grid>
      </Grid>
    </Navbar>
  );
}
