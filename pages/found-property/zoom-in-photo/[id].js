import React, { useState, useContext, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import { firestore, postToJSON } from "../../../lib/firebase";
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
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <br /> <br />
          <NextLink href={`../../found-property/${profile.id}`}>
            <Button
              style={{ height: "50px", width: "200px" }}
              variant="outlined"
            >
              Return to property
            </Button>
          </NextLink>
          <br /> <br />
          <Card>
            <CardContent
              style={{
                alignItems: "center",
                borderStyle: "ridge",
              }}
            >
              <img
                src={profile.image}
                alt={profile.foundPropertyName}
                height={768}
                width={1110}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Navbar>
  );
}
