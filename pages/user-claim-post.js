import React, { useState } from "react";
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
  // .where("status", "==", "missing");
  // .orderBy('createdAt', 'desc')
  // .limit(LIMIT);
  const posts = (await postsQuery.get()).docs.map(postToJSON);

  //   console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  //   console.log(posts);
  //   console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

  return {
    props: { posts },
  };
}

//

export default function UserClaimPost(props) {
  const [posts, setPosts] = useState(props.posts);

  const missingItems = posts.filter((itemLost) => {
    return (
      itemLost.user_id.includes(auth.currentUser.uid) &&
      itemLost.status.toLowerCase().includes("processing")
    );
  });
  const router = useRouter();
  const claimerSubmitHandler = (e) => {
    try {
      firestore
        .collection("missingItems")
        .doc(e)
        .update({
          status: "claimed",
        })
        .then(alert("The Item is now claimed. Thank you for helping."));
      router.push("/user-claim-post");
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
          <TableCell>Item Picture</TableCell>
          <TableCell>Item Name</TableCell>
          <TableCell>Item Brand</TableCell>
          <TableCell>Item Location</TableCell>
          <TableCell>Item Location Type</TableCell>
          <TableCell>Item Status</TableCell>
          <TableCell>Claimer name</TableCell>
          <TableCell>Claimer Mobile</TableCell>
          <TableCell align="center">Action</TableCell>
          <TableCell align="center">Action</TableCell>
        </TableRow>

        {missingItems.map((info) => (
          <TableRow>
            <TableCell>
              <Image
                src={info.image}
                alt={info.name}
                height={100}
                width={100}
              />
            </TableCell>
            <TableCell>
              <Typography>{info.name}</Typography>
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
            <TableCell>
              <Typography>
                {info.claim_firstname} {info.claim_lastname}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>{info.claim_phone}</Typography>
            </TableCell>
            <TableCell align="right">
              <NextLink href={`/user-claimer-information/${info.id}`}>
                <Button variant="outlined">view</Button>
              </NextLink>
            </TableCell>
            <TableCell align="right">
              <Button
                variant="contained"
                color="success"
                onClick={() => claimerSubmitHandler(info.id)}
              >
                Claimed
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </Navbar>
  );
}
