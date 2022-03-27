import {
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
  Container,
  FormControl,
  Box,
  FilledInput,
  InputAdornment,
  DateRange,
  Autocomplete,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import useStyles from "../utils/styles";
import Image from "next/image";
import sideImage from "../public/images/serach.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import allIcon from "../public/images/all.png";
import animalIcon from "../public/images/animal.png";
import bagIcon from "../public/images/bag.png";
import cashIcon from "../public/images/cash.png";
import clothingIcon from "../public/images/clothing.png";
import electronicsIcon from "../public/images/electronics.png";
import keysIcon from "../public/images/keys.png";
import walletIcon from "../public/images/wallet.png";
import documentIcon from "../public/images/documentIcon.png";
import { firestore, postToJSON } from "../lib/firebase";
import NextLink from "next/link";
import { useRouter } from "next/router";

//
export async function getServerSideProps() {
  const postsQuery = firestore.collectionGroup("foundItems");

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  // console.log(posts);
  // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

  return {
    props: { posts },
  };
}

export default function FoundWallets(props) {
  const router = useRouter();
  const [posts, setPosts] = useState(props.posts);

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
      router.push("/login?redirect=/found-property");
    }
  }, []);
  //NEWCODE
  const missingItems = posts.filter((itemLost) => {
    return (
      itemLost.category.toLowerCase().includes("wallet") &&
      itemLost.status.toLowerCase().includes("missing") &&
      itemLost.propertycategory.toLowerCase().includes("found property")
    );
  });

  const classes = useStyles();

  const [filteredPosts] = useState(props.posts);

  const missingItemSearchHandler = (e) => {
    if (e.target.value.length >= 0 && e.target.value === "") {
      setPosts(filteredPosts);
    } else {
      const filter = missingItems.filter((missing) => {
        return (
          missing.foundPropertyName
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          missing.location
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          missing.brand.toLowerCase().includes(e.target.value.toLowerCase())
        );
      });
      setPosts(filter);
    }
  };

  return (
    <Navbar>
      <div>
        <br /> <br /> <br /> <br /> <br />
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={3}>
            <Card style={{ width: 250 }}>
              <CardContent align="center" style={{ borderStyle: "solid" }}>
                <Typography variant="h4">Categories</Typography>
              </CardContent>
              <NextLink href={"/found-property"} passHref>
                <CardActionArea
                  style={{ display: "flex" }}
                  className={classes.parentFlexRight}
                >
                  <div style={{ marginTop: 50, marginBottom: 20 }} />
                  <Image src={allIcon} height={30} width={30} alt="all-icon" />
                  <Typography variant="h5" className={classes.categoriesGrow}>
                    All
                  </Typography>
                </CardActionArea>
              </NextLink>
              <NextLink href={"/found-animals"} passHref>
                <CardActionArea
                  style={{ display: "flex" }}
                  className={classes.parentFlexRight}
                >
                  <div style={{ marginTop: 30, marginBottom: 30 }} />
                  <Image
                    src={animalIcon}
                    height={30}
                    width={30}
                    alt="animal-icon"
                  />
                  <Typography variant="h5" className={classes.categoriesGrow}>
                    Animals
                  </Typography>
                </CardActionArea>
              </NextLink>
              <NextLink href={"/found-bags"} passHref>
                <CardActionArea
                  style={{ display: "flex" }}
                  className={classes.parentFlexRight}
                >
                  <div style={{ marginTop: 30, marginBottom: 30 }} />
                  <Image src={bagIcon} height={30} width={30} alt="bag-icon" />
                  <Typography variant="h5" className={classes.categoriesGrow}>
                    Bags
                  </Typography>
                </CardActionArea>
              </NextLink>
              <NextLink href={"/found-cash"} passHref>
                <CardActionArea
                  style={{ display: "flex" }}
                  className={classes.parentFlexRight}
                >
                  <div style={{ marginTop: 30, marginBottom: 30 }} />
                  <Image
                    src={cashIcon}
                    height={30}
                    width={30}
                    alt="cash-icon"
                  />
                  <Typography variant="h5" className={classes.categoriesGrow}>
                    Cash
                  </Typography>
                </CardActionArea>
              </NextLink>
              <NextLink href={"/found-clothing"} passHref>
                <CardActionArea
                  style={{ display: "flex" }}
                  className={classes.parentFlexRight}
                >
                  <div style={{ marginTop: 30, marginBottom: 30 }} />
                  <Image
                    src={clothingIcon}
                    height={30}
                    width={30}
                    alt="clothing-icon"
                  />
                  <Typography variant="h5" className={classes.categoriesGrow}>
                    Clothing
                  </Typography>
                </CardActionArea>
              </NextLink>
              <NextLink href={"/found-document"} passHref>
                <CardActionArea
                  style={{ display: "flex" }}
                  className={classes.parentFlexRight}
                >
                  <div style={{ marginTop: 30, marginBottom: 30 }} />
                  <Image
                    src={documentIcon}
                    height={30}
                    width={30}
                    alt="document-icon"
                  />
                  <Typography variant="h5" className={classes.categoriesGrow}>
                    Documents
                  </Typography>
                </CardActionArea>
              </NextLink>
              <NextLink href={"/found-electronics"} passHref>
                <CardActionArea
                  style={{ display: "flex" }}
                  className={classes.parentFlexRight}
                >
                  <div style={{ marginTop: 30, marginBottom: 30 }} />
                  <Image
                    src={electronicsIcon}
                    height={30}
                    width={30}
                    alt="electronics-icon"
                  />
                  <Typography variant="h5" className={classes.categoriesGrow}>
                    Electronics
                  </Typography>
                </CardActionArea>
              </NextLink>
              <NextLink href={"/found-keys"} passHref>
                <CardActionArea
                  style={{ display: "flex" }}
                  className={classes.parentFlexRight}
                >
                  <div style={{ marginTop: 30, marginBottom: 30 }} />
                  <Image src={keysIcon} height={30} width={30} alt="key-icon" />
                  <Typography variant="h5" className={classes.categoriesGrow}>
                    Keys
                  </Typography>
                </CardActionArea>
              </NextLink>
              <NextLink href={"/found-wallets"} passHref>
                <CardActionArea
                  style={{ display: "flex" }}
                  className={classes.parentFlexRight}
                >
                  <div style={{ marginTop: 30, marginBottom: 30 }} />
                  <Image
                    src={walletIcon}
                    height={30}
                    width={30}
                    alt="wallet-icon"
                  />
                  <Typography variant="h5" className={classes.categoriesGrow}>
                    Wallet
                  </Typography>
                </CardActionArea>
              </NextLink>
            </Card>
          </Grid>
          <Grid item xs={9}>
            <div
              className={classes.searchContainer}
              style={{ marginBottom: "20px" }}
            >
              <input
                type="search"
                className={classes.search}
                placeholder="Search"
                value={missingItems.name}
                onChange={missingItemSearchHandler}
              />
            </div>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {missingItems.map((info) => (
                <Grid item xs={2} sm={4} md={4} key={info.id}>
                  <Card
                    style={{
                      marginBottom: "20px",
                      marginTop: "30px",
                      marginRight: "20px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      title={info.category}
                      image={info.image}
                      height={300}
                      width={150}
                      alt={"no image"}
                      style={{ borderStyle: "solid", borderColor: "#3a7196" }}
                    />
                    <CardContent>
                      <Typography>
                        <b> {info.propertycategory}: </b>
                        {info.foundPropertyName}
                      </Typography>
                    </CardContent>
                    <CardContent>
                      <b>Type:</b> {info.brand}
                    </CardContent>
                    <CardContent>
                      <Typography>
                        <b> Location: </b>
                        {info.location} - {info.locationtype}
                      </Typography>
                    </CardContent>
                    <CardContent>
                      <NextLink href={`./found-property/${info.id}`}>
                        <Button
                          variant="outlined"
                          fullWidth
                          style={{ marginBottom: "20px" }}
                        >
                          <Typography>View Property</Typography>
                        </Button>
                      </NextLink>
                      <NextLink
                        href={`/claim-property-form/${info.id}`}
                        passHref
                      >
                        <Button variant="contained" fullWidth>
                          <Typography>Claim Property</Typography>
                        </Button>
                      </NextLink>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Grid item xs={4}></Grid>
          </Grid>
        </Grid>
      </div>
    </Navbar>
  );
}
