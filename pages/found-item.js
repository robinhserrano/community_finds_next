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

//

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
          <Grid item xs={3} style={{ borderStyle: "solid", fontSize: 30 }}>
            Categories
            <Grid item xs={6}>
              *Electronics
            </Grid>
            <Grid item xs={6}>
              *Bags
            </Grid>
            <Grid item xs={6}>
              *Animals
            </Grid>
            <Grid item xs={6}>
              *Keys
            </Grid>
            <Grid item xs={6}>
              *Wallet
            </Grid>
            <Grid item xs={6}>
              *Clothing
            </Grid>
            <Grid item xs={6}>
              *Cash
            </Grid>
            <Grid item xs={6}>
              *Dignity
            </Grid>
          </Grid>
          <Grid item xs={9}>
            <div className={classes.searchContainer}>
              <input
                type="search"
                className={classes.search}
                placeholder="Search/Enter the Item your looking for here"
              />
            </div>
            search at card
          </Grid>
        </Grid>
      </div>
    </Navbar>
  );
}
