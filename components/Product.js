import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Link,
  Typography,
  CardContent,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { firestore, postToJSON } from "../lib/firebase";
import "firebase/compat/firestore";
import NextLink from "next/link";
import data from "../utils/data";

//

export async function getServerSideProps() {
  const postsQuery = firestore.collectionGroup("users");

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  console.log(posts);
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

  return {
    props: { posts },
  };
}

export default function ProductCard() {
  // const [posts, setPosts] = useState(props.posts);

  // const missingProduct = posts.filter((missingItems) => {
  //   return missingProduct;
  // });

  return (
    <div>
      <Grid container spacing={3}>
        {data.products.map((products) => (
          <Grid item md={4} key={products.brand}>
            <Card
              style={{
                marginBottom: "20px",
                marginTop: "30px",
                marginRight: "20px",
              }}
            >
              <CardMedia
                component="img"
                title={products.category}
                image={products.image}
                height={300}
                width={150}
                alt={"no image"}
                style={{ borderStyle: "solid", borderColor: "#3a7196" }}
              />
              <CardContent>
                <Typography>
                  <b> Item Lost: </b> {products.itemLost}
                </Typography>
              </CardContent>
              {/* <CardContent>
                <Typography>Email: {products.email}</Typography>
              </CardContent> */}
              <CardContent>
                <Typography>
                  <b> Location: </b>
                  {products.placeLocation} - {products.mapLocation}
                </Typography>
              </CardContent>
              <CardContent>
                <NextLink href={"/"} passHref>
                  <Button variant="outlined" style={{ marginRight: "70px" }}>
                    <Typography>View Item</Typography>
                  </Button>
                </NextLink>
                <NextLink href={"/"} passHref>
                  <Button variant="contained">
                    <Typography>Found It?</Typography>
                  </Button>
                </NextLink>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
