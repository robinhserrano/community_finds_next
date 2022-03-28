import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import { firestore, postToJSON, auth } from "../lib/firebase";
import {
  Button,
  Card,
  CardContent,
  Table,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import NextLink from "next/link";

//

export async function getServerSideProps() {
  const postsQuery = firestore.collectionGroup("missingItems");
  const postsQuery2 = firestore.collectionGroup("foundItems");
  // .where("status", "==", "missing");
  // .orderBy('createdAt', 'desc')
  // .limit(LIMIT);
  const posts = (await postsQuery.get()).docs.map(postToJSON);
  const posts2 = (await postsQuery2.get()).docs.map(postToJSON);
  //   console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  //   console.log(posts);
  //   console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

  return {
    props: { posts, posts2 },
  };
}

//

export default function UserViewPost(props) {
  const [posts, setPosts] = useState(props.posts);
  const [posts2, setPosts2] = useState(props.posts2);
  //NEWCODE
  const [currentUser, setUser] = useState();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(loggedInUser);
    } else {
      router.push("/login?redirect=/user-view-post");
    }
  }, []);
  //NEWCODE

  const missingItems = posts.filter((itemLost) => {
    return itemLost.user_id.includes(currentUser);
  });
  const missingItems2 = posts2.filter((itemLost) => {
    return itemLost.user_id.includes(currentUser);
  });
  const router = useRouter();
  const removeMissingItemHandler = (e) => {
    try {
      firestore
        .collection("missingItems")
        .doc(e)
        .delete()
        .then(alert("This missing item is now deleted"));
      router.push("/user-view-post");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const removeFoundItemHandler = (e) => {
    try {
      firestore
        .collection("foundItems")
        .doc(e)
        .delete()
        .then(alert("This missing item is now deleted"));
      router.push("/user-view-post");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <Navbar>
      <div style={{ marginTop: "3%" }}></div>

      <Table>
        <TableRow>
          <TableCell>Property Picture</TableCell>
          <TableCell>Property Name</TableCell>
          <TableCell>Property Type</TableCell>
          <TableCell align="center">Property Location</TableCell>
          <TableCell>Property Location Type</TableCell>
          <TableCell>Property Status</TableCell>
          <TableCell align="center">Action</TableCell>
          <TableCell align="center">Action</TableCell>
        </TableRow>

        {missingItems.map((info) => (
          <TableRow>
            <TableCell>
              <img
                src={info.image}
                alt={info.lostPropertyName}
                height={100}
                width={100}
              />
            </TableCell>
            <TableCell>
              <Typography>{info.lostPropertyName}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{info.brand}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{info.location}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{info.locationtype}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{info.status}</Typography>
            </TableCell>
            <TableCell align="right">
              <NextLink href={`/user-edit-post/${info.id}`}>
                <Button variant="outlined">Edit Post</Button>
              </NextLink>
            </TableCell>
            <TableCell align="right">
              <Button
                variant="contained"
                color="error"
                onClick={() => removeMissingItemHandler(info.id)}
              >
                Delete Post
              </Button>
            </TableCell>
          </TableRow>
        ))}
        {missingItems2.map((info) => (
          <TableRow>
            <TableCell>
              <img
                src={info.image}
                alt={info.lostPropertyName}
                height={100}
                width={100}
              />
            </TableCell>
            <TableCell>
              <Typography>{info.foundPropertyName}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{info.brand}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{info.location}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{info.locationtype}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{info.status}</Typography>
            </TableCell>
            <TableCell align="right">
              <NextLink href={`/user-edit-post-found/${info.id}`}>
                <Button variant="outlined">Edit Post</Button>
              </NextLink>
            </TableCell>
            <TableCell align="right">
              <Button
                variant="contained"
                color="error"
                onClick={() => removeFoundItemHandler(info.id)}
              >
                Delete Post
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </Navbar>
  );
}
