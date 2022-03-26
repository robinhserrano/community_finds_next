import React, { useEffect, useState } from "react";
import { firestore, postToJSON, auth } from "../lib/firebase";

var ls = require("local-storage");
export async function loadPosts() {
  const postsQuery = firestore.collectionGroup("missingItems");
  const postsQuery2 = firestore.collectionGroup("foundItems");
  const posts = (await postsQuery.get()).docs.map(postToJSON);
  const posts2 = (await postsQuery2.get()).docs.map(postToJSON);
  const currentUser = localStorage.getItem("user");
  const finderList = posts.filter((itemLost) => {
    return (
      itemLost.user_id.includes(currentUser) &&
      itemLost.status.toLowerCase().includes("processing")
    );
  });

  const claimList = posts2.filter((itemLost) => {
    return (
      itemLost.user_id.includes(currentUser) &&
      itemLost.status.toLowerCase().includes("processing")
    );
  });

  ls.set("finderList", finderList.length);
  ls.set("claimList", claimList.length);
  console.log("----------------------------------------------");
  console.log(ls.get("finderList"));
  console.log(ls.get("claimList"));
  console.log("----------------------------------------------");
}
