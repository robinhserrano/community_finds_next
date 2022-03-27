import { CardContent, Typography, Card, Grid } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { firestore, postToJSON } from "../lib/firebase";
//
export async function getServerSideProps() {
  const postsQuery = firestore.collectionGroup("missingItems");
  const postsQuery2 = firestore.collectionGroup("foundItems");
  // .where("status", "==", "missing");
  // .orderBy('createdAt', 'desc')
  // .limit(LIMIT);
  const posts = (await postsQuery.get()).docs.map(postToJSON);
  const posts2 = (await postsQuery2.get()).docs.map(postToJSON);
  // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  // console.log(posts);
  // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

  return {
    props: { posts, posts2 },
  };
}

export default function ClaimedItems(props) {
  const [posts, setPosts] = useState(props.posts);
  const [posts2, setPosts2] = useState(props.posts2);

  const missingItems = posts.filter((itemLost) => {
    return itemLost.status.toLowerCase().includes("claimed");
  });
  const missingItems2 = posts2.filter((itemLost) => {
    return itemLost.status.toLowerCase().includes("claimed");
  });
  return (
    <Navbar>
      <div style={{ marginTop: "4%" }}></div>
      <Typography style={{ textAlign: "center" }} variant="h4">
        Thank you for helping our community grow! Your actions made our goal
        clear, to reunite missing properties back to their rightful owner.
      </Typography>
      <div style={{ marginTop: "3%" }}></div>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {missingItems.map((info) => (
          <Grid item xs={2} sm={2} md={3}>
            <Card style={{ width: 330 }}>
              <CardContent>
                <img
                  src={info.claim_image}
                  alt={info.lostPropertyName}
                  height={300}
                  width={300}
                />
              </CardContent>
              <CardContent>
                <Typography style={{ textAlign: "center" }}>
                  Properties Returned: {info.lostPropertyName}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {missingItems2.map((info) => (
          <Grid item xs={2} sm={2} md={3}>
            <Card style={{ width: 330 }}>
              <CardContent>
                <img
                  src={info.claim_image}
                  alt={info.foundPropertyName}
                  height={300}
                  width={300}
                />
              </CardContent>
              <CardContent>
                <Typography style={{ textAlign: "center" }}>
                  Properties Claimed: {info.foundPropertyName}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Navbar>
  );
}
