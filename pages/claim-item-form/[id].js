import { CardMedia, Grid, Typography, Card, CardContent } from "@mui/material";
import React, { useState, useContext } from "react";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import found from "../../public/images/found.png";
import foundme from "../../public/images/foundme.png";
import { firestore, postToJSON } from "../../lib/firebase";
import { useRouter } from "next/router";

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

export default function ClaimLostItemForm(props) {
  const [posts, setPosts] = useState(props.posts);
  const router = useRouter();
  const { id } = router.query;

  const slugClient = posts.filter((items) => {
    return items.id.toLowerCase().includes(id);
  });

  const profile = slugClient.find((items) => items.id === id);

  if (!profile) {
    return <div>The item here was already claimed</div>;
  }
  return (
    <Navbar>
      <div>
        <br /> <br />
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Typography variant="h3">Claim Lost Item</Typography>
            <br />
            <Typography variant="h5" style={{ backgroundColor: "lightgray" }}>
              <b>Item ID: </b>
              {profile.id}
            </Typography>
            <br />
            <Typography variant="h6">
              <b style={{ color: "red" }}>* </b>
              Please provide us the most accurate information about the item so
              that we could determine that you are the real owner of this item.
            </Typography>
            <Typography variant="h6">
              <b style={{ color: "red" }}>* </b>
              For safety purposes please provide image of the item.
            </Typography>
            <Typography variant="h6">
              <b style={{ color: "red" }}>* </b>
              Please indicate the date of the item when you lost it.
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Image src={foundme} height={300} width={300} />
          </Grid>
          <Grid item xs={3}>
            <Image src={found} height={300} width={300} />
          </Grid>

          <Grid item xs={6}>
            <Card>
              <CardContent style={{ backgroundColor: "#346e98" }}></CardContent>
              <CardContent>
                <CardMedia
                  component="img"
                  src={profile.image}
                  height={600}
                  width={300}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent style={{ backgroundColor: "#346e98" }}></CardContent>
              <CardContent>
                <Typography>
                  <b>Item Lost: </b>
                  {profile.name}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography>
                  <b>Category: </b>
                  {profile.category}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography>
                  <b>Brand: </b>
                  {profile.brand}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography>
                  <b>Date and Time Lost: </b>
                  {profile.date}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography>
                  <b>Location Lost: </b>
                  {profile.location} - {profile.locationtype}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}></Grid>
        </Grid>
      </div>
    </Navbar>
  );
}
