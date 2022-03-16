import { CardContent, Typography, Card, Grid } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { firestore, postToJSON } from "../lib/firebase";
//
export async function getServerSideProps() {
  const postsQuery = firestore.collectionGroup("missingItems");
  // .where("status", "==", "missing");
  // .orderBy('createdAt', 'desc')
  // .limit(LIMIT);
  const posts = (await postsQuery.get()).docs.map(postToJSON);

  // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  // console.log(posts);
  // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

  return {
    props: { posts },
  };
}

export default function ClaimedItems(props) {
  const [posts, setPosts] = useState(props.posts);

  const missingItems = posts.filter((itemLost) => {
    return itemLost.status.toLowerCase().includes("claimed");
  });
  return (
    <Navbar>
      <div style={{ marginTop: "4%" }}></div>
      <Typography style={{ textAlign: "center" }} variant="h4">
        Thank you for helping our community grow! Your actions made our goal
        clear, to reunite missing items back to their rightful owner.
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
                  alt={info.name}
                  height={300}
                  width={300}
                />
              </CardContent>
              <CardContent>
                <Typography style={{ textAlign: "center" }}>
                  Item Returned: {info.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Navbar>
  );
}
