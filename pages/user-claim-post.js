import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import { firestore, postToJSON, auth } from "../lib/firebase";
import {
  Button,
  Card,
  CardContent,
  colors,
  Table,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { UserContext } from "../lib/context";
var ls = require("local-storage");
//

export async function getServerSideProps() {
  const postsQuery = firestore.collectionGroup("foundItems");
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
  const { user } = useContext(UserContext);
  const router = useRouter();

  //NEWCODE
  const [currentUser, setUser] = useState();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(loggedInUser);
    } else {
      router.push("/login?redirect=/user-claim-post");
    }
  }, []);
  //NEWCODE

  const missingItems = posts.filter((itemLost) => {
    return (
      itemLost.user_id.includes(currentUser) &&
      itemLost.status.toLowerCase().includes("processing")
    );
  });
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
          <TableCell>Property Picture</TableCell>
          <TableCell>Property Name</TableCell>
          <TableCell>Property Type</TableCell>
          <TableCell>Property Location</TableCell>
          <TableCell>Property Location Type</TableCell>
          <TableCell>Property Status</TableCell>
          <TableCell>Claimer name</TableCell>
          <TableCell>Claimer Mobile</TableCell>
          <TableCell align="center">Action</TableCell>
          {/* <TableCell align="center">Action</TableCell> */}
        </TableRow>

        {missingItems.map((info) => (
          <TableRow>
            <TableCell>
              <img
                src={info.image}
                alt={info.foundPropertyName}
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
            <TableCell>
              <Typography>
                {info.claim_firstname} {info.claim_lastname} {info.claim_suffix}
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
            {/* <TableCell align="right">
              <Button
                variant="contained"
                color="success"
                onClick={() => claimerSubmitHandler(info.id)}
              >
                Claimed
              </Button>
            </TableCell> */}
          </TableRow>
        ))}
      </Table>
    </Navbar>
  );
}
