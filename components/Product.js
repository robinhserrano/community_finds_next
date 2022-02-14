import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Link,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { postToJSON } from "../lib/firebase";
import "firebase/compat/firestore";
import NextLink from "next/link";
import data from "../utils/data";

//

export async function getServerSideProps() {
  const postsQuery = firestore.collectionGroup("missingItems");
  // .where('published', '==', true)
  // .orderBy('createdAt', 'desc')
  // .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  //   console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  //   console.log(post);
  //   console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

  // return {
  //   props: { posts }, // will be passed to the page component as props
  // };
}

export default function ProductCard(props) {
  // const [posts, setPosts] = useState(props.posts);

  // const missingProduct = posts.filter((missingItems) => {
  //   return missingProduct;
  // });

  return (
    <div>
      <Grid container spacing={3}>
        {data.products.map((products) => (
          <Grid item md={4} key={products.brand}>
            <Card>
              <CardMedia
                component="img"
                title={products.category}
                image={products.image}
                height={300}
                width={300}
                alt={"no image"}
              ></CardMedia>
              <CardActionArea>
                <Typography>Item Lost: {products.itemLost}</Typography>
              </CardActionArea>
              <CardActionArea>
                <Typography>Email: {products.email}</Typography>
              </CardActionArea>
              <CardActionArea>
                <Typography>
                  Location: {products.placeLocation} - {products.mapLocation}
                </Typography>
              </CardActionArea>
              <NextLink href={"/"} passHref>
                <CardActionArea>
                  <Link>View Lost Item</Link>
                </CardActionArea>
              </NextLink>
              <NextLink href={"/"} passHref>
                <CardActionArea>
                  <Link>Found It?</Link>
                </CardActionArea>
              </NextLink>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
