import React, { useState, useContext } from "react";
import Navbar from "../../components/Navbar";
import { firestore, postToJSON } from "../../lib/firebase";
import { useRouter } from "next/router";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import Image from "next/image";
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
      <Typography>Lost Item Details</Typography>

      <Typography>Lost Item: {profile.name}</Typography>
      <Typography>Item ID: {profile.id}</Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography>Item Lost</Typography>
              <span>{profile.name}</span>
            </CardContent>
            <CardContent>
              <Typography>Category</Typography>
              <span>{profile.category}</span>
            </CardContent>
            <CardContent>
              <Typography>Brand</Typography>
              <span>{profile.brand}</span>
            </CardContent>
            <CardContent>
              <Typography>Primary Color</Typography>
              <span>{profile.primaryColor}</span>
            </CardContent>
            <CardContent>
              <Typography>Secondary Item Color</Typography>
              <span>{profile.secondaryColor}</span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography>Date Lost</Typography>
              <span>{profile.date}</span>
            </CardContent>
            <CardContent>
              <Typography>Time Lost</Typography>
              {/* <span>{profile.date}</span> */}
            </CardContent>
            <CardContent>
              <Typography>Location Lost</Typography>
              <span>{profile.location}</span>
            </CardContent>
            <CardContent style={{ height: 185 }}>
              <Typography>Additional Information</Typography>
              <span>{profile.information}</span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent style={{ align: "center" }}>
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
            <CardContent>
              <Typography>
                Name: {profile.firstname} {profile.lastname}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography>Email: {profile.email}</Typography>
            </CardContent>
            <CardContent>
              <Typography>Phone: {profile.phone}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Navbar>
  );
}
