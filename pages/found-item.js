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
import React, { useState } from "react";
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
import ProductCard from "../components/Product";
import { firestore, postToJSON } from "../lib/firebase";

//
export async function getServerSideProps() {
  const postsQuery = firestore.collectionGroup("missingItems");

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  console.log(posts);
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

  return {
    props: { posts },
  };
}

export default function FoundItem() {
  const [startDate, setStartDate] = useState(new Date());

  const classes = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [imageInput, setImageInput] = useState("");
  const [image, setImage] = React.useState("");
  const imageRef = React.useRef(null);
  function useDisplayImage() {
    const [result, setResult] = React.useState("");

    function uploader(e) {
      const imageFile = e.target.files[0];

      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        setResult(e.target.result);
      });

      reader.readAsDataURL(imageFile);
    }

    return { result, uploader };
  }

  const { result, uploader } = useDisplayImage();

  const submitHandler = () => {
    // insert firebase code here
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
              <CardActionArea
                style={{ display: "flex" }}
                className={classes.parentFlexRight}
              >
                <div style={{ marginTop: 30, marginBottom: 30 }} />
                <Image src={cashIcon} height={30} width={30} alt="cash-icon" />
                <Typography variant="h5" className={classes.categoriesGrow}>
                  Cash
                </Typography>
              </CardActionArea>
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
                placeholder="Search/Enter the Item your looking for here"
              />
            </div>
            <ProductCard />
          </Grid>
        </Grid>
      </div>
    </Navbar>
  );
}
