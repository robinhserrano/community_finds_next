import {
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

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default function ProductCard(props) {
  const [posts, setPosts] = useState(props.posts);

  const missingProduct = posts.filter((missingItems) => {
    return missingProduct;
  });

  return (
    <div>
      {missingProduct.map((card) => (
        <Card>
          <CardMedia>
            component="img" title={card.itemLost}
            image={card.itemLost}
            height={150}
            width={150}
            alt={"no image"}
          </CardMedia>
          <CardActionArea>
            <Typography>Item Lost: {card.itemLost}</Typography>
          </CardActionArea>
          <CardActionArea>
            <Typography>Location: {card.location}</Typography>
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
      ))}
    </div>
  );
}
