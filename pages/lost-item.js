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
import sideImage from "../public/images/search.png";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import { app, db } from "../lib/firebase";
import { addDoc, collection } from "@firebase/firestore";
import { v4 as uuidv4, v4 } from "uuid";

//

export default function LostItem() {
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

  const options = top100Films.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  const lostdDate = startDate.toString();

  const submitHandler = () => {
    var lostItemId = v4();
    try {
      app
        .firestore(collection(db, "missingItems"), {
          //item lost
          id: lostItemId,
          name: itemLost,
          category: category,
          brand: brand,
          primaryColor: primaryColor,
          secondaryColor: secondaryColor,
          image: result,
          zipcode: zipCode,
          location: nameLocation,
          information: information,
          date: lostdDate,
          // timeLost:
          //contact
          fName: firstname,
          lName: lastname,
          mobile: tel,
          email: email,
        })
        .then(() => alert("Missing File Submitted to Cloud Firestore"));
    } catch (err) {
      alert(err);
    }
  };
  return (
    <Navbar>
      <div>
        <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Typography variant="h3">Submit Lost Items</Typography>
            <br /> <br />
            <Typography variant="h5">✔ </Typography>
            <br /> <br />
            <Typography variant="h5">
              ✔ Users are able to view lost items.{" "}
            </Typography>
            <br /> <br />
            <Typography variant="h5">
              ✔ The Location Is Only Limited to Sto. Domingo Angeles City.
            </Typography>
            <br /> <br />
            <Typography variant="h7">
              <b style={{ color: "red" }}>* </b>
              Please be descriptive when submitting your lost property report,
              the more information you give us the better chance you have of
              retrieving your items.
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Image src={sideImage} alt="logo" width={500} height={500} />
          </Grid>
        </Grid>
      </div>
      {/* pasok sa grid para mahati screeen sosa */}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          {/* item Lost */}
          <List className={classes.inputField}>
            <Typography>Item Lost *</Typography>
            <span>
              (Dog, Jacket, Smartphone, Wallet, etc.) This field may
              auto-populate
            </span>
            <div style={{ marginBottom: 10 }}></div>
            <Controller
              name="itemLost"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="itemLost"
                  label="Item Lost"
                  error={Boolean(errors.itemLost)}
                  helperText={
                    errors.itemLost
                      ? errors.itemLost.type === "minLength"
                        ? "Lost item length should be than 1"
                        : "Lost item is required"
                      : ""
                  }
                  {...field}
                />
              )}
            />
          </List>
        </Grid>
        <Grid item xs={6}>
          {/* Date Lost */}
          <Typography>Date Lost *</Typography>
          <span>
            (Please add the approximate date of when the item was lost.)
          </span>
          <div style={{ marginBottom: 10 }}></div>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </Grid>
        <Grid item xs={6}>
          {/* category */}
          <List className={classes.inputField}>
            <Typography>Category *</Typography>
            <span>
              (Animals/Pets, Clothing, Electronics, Personal Accessories etc.)
              This field is required.
            </span>

            <div style={{ marginBottom: 10 }}></div>
            <Controller
              name="category"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="category"
                  label="Category"
                  error={Boolean(errors.category)}
                  helperText={
                    errors.category
                      ? errors.category.type === "minLength"
                        ? "Category length should be more than 1"
                        : "Categoryis required"
                      : ""
                  }
                  {...field}
                />
              )}
            />
          </List>
        </Grid>
        <Grid item xs={6}>
          {/* Time Lost */}
          <Typography>Time Lost *</Typography>
          <span>
            (Please add the approximate time of day the item was lost.)
          </span>
          <div style={{ marginBottom: 10 }}></div>
          <div>
            <Datetime dateFormat={false} style={{ width: "100%" }} />
          </div>
        </Grid>
        <Grid item xs={6}>
          {/* brand */}
          <List className={classes.inputField}>
            <Typography>Brand *</Typography>
            <span>(Ralph Lauren, Samsung, KitchenAid, etc.)</span>
            <div style={{ marginBottom: 10 }}></div>
            <Controller
              name="brand"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="brand"
                  label="Brand"
                  error={Boolean(errors.brand)}
                  helperText={
                    errors.brand
                      ? errors.brand.type === "minLength"
                        ? "Brand length should be more than 1"
                        : "Brand is required"
                      : ""
                  }
                  {...field}
                />
              )}
            />
          </List>
        </Grid>
        <Grid item xs={6}>
          {/* Additional Information */}
          <List className={classes.inputField}>
            <Typography>Additional Information *</Typography>
            <span>
              Please provide any additional details/description of your lost
              property.
            </span>
            <div style={{ marginBottom: 10 }}></div>
            <Controller
              name="information"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 10,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="information"
                  label="Information"
                  error={Boolean(errors.information)}
                  helperText={
                    errors.information
                      ? errors.information.type === "minLength"
                        ? "Information length should be more than 10"
                        : "Information is required"
                      : ""
                  }
                  {...field}
                />
              )}
            />
          </List>
        </Grid>
        <Grid item xs={6}>
          {/* Primary Color */}
          <List className={classes.inputField}>
            <Typography>Primary Color *</Typography>
            <span>
              Please add the color that best represents the lost property
              (Black, Red, Blue, etc.)
            </span>
            <div style={{ marginBottom: 10 }}></div>
            <Controller
              name="primaryColor"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="primaryColor"
                  label="Primary Color"
                  error={Boolean(errors.primaryColor)}
                  helperText={
                    errors.primaryColor
                      ? errors.primaryColor.type === "minLength"
                        ? "Primary Color length should be more than 1"
                        : "Primary Color is optional"
                      : ""
                  }
                  {...field}
                />
              )}
            />
          </List>
          {/* Secondary Item Color */}
          <List className={classes.inputField}>
            <Typography>Secondary Item Color *</Typography>
            <span>
              Please add a color that acts as a less dominant (Leave blank if
              not applicable.)
            </span>
            <div style={{ marginBottom: 10 }}></div>
            <Controller
              name="secondaryColor"
              control={control}
              defaultValue=""
              rules={{
                required: false,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="secondaryColor"
                  label="Secondary Color"
                  error={Boolean(errors.category)}
                  helperText={
                    errors.category
                      ? errors.category.type === "minLength"
                        ? "Secondary length should be more than 1"
                        : "Secondary color is required"
                      : ""
                  }
                  {...field}
                />
              )}
            />
          </List>
        </Grid>
        <Grid item xs={6}>
          {/* Upload Image */}
          <Typography>Upload Image *</Typography>
          <span>(This image will display on the Website.)</span>
          <div style={{ marginBottom: 10 }}></div>
          <div className="App">
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              value={imageInput}
              onChange={(e) => {
                setImage(e.target.files[0]);
                uploader(e);
                setImageInput(event.target.value);
              }}
            />
          </div>
          {result && (
            <Image
              ref={imageRef}
              src={result}
              width={200}
              height={250}
              alt=""
            />
          )}
        </Grid>
      </Grid>
      <br /> <br /> <br /> <br /> <br /> <br />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Typography variant="h3">Location Information</Typography>
          <br /> <br /> <br />
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          {/* Where did you Lost It? */}
          <List className={classes.inputField}>
            <Typography>Where did you Lost It *</Typography>
            <span>
              (Please provide an approximate location of the lost property (Bar,
              Restaurant, Park, etc.))
            </span>
            <div style={{ marginBottom: 10 }}></div>
            <Autocomplete
              id="grouped-demo"
              options={options.sort(
                (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
              )}
              groupBy={(option) => option.firstLetter}
              getOptionLabel={(option) => option.title}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Select Type" />
              )}
            />
          </List>
        </Grid>
        <Grid item xs={6}>
          {/* Zip Code */}
          <List className={classes.inputField}>
            <Typography>Zip Code *</Typography>
            <span>
              (Please provide your zip code(10004, 10028, 10002, etc.) This
              field may auto-populate.)
            </span>
            <div style={{ marginBottom: 10 }}></div>
            <Controller
              name="zipCode"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="zipCode"
                  label="Zip Code"
                  error={Boolean(errors.zipcode)}
                  helperText={
                    errors.zipcode
                      ? errors.zipcode.type === "minLength"
                        ? "Zip Code length should be more than 1"
                        : "Zip Code color is required"
                      : ""
                  }
                  {...field}
                />
              )}
            />
          </List>
        </Grid>
        <Grid item xs={6}>
          {/* Name/Location */}
          <List className={classes.inputField}>
            <Typography>Name/Location *</Typography>

            <div style={{ marginBottom: 10 }}></div>
            <Controller
              name="nameLocation"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="nameLocation"
                  label="Name/Location"
                  error={Boolean(errors.namelocation)}
                  helperText={
                    errors.nameLocation
                      ? errors.nameLocation.type === "minLength"
                        ? "NameLocation Code length should be more than 1"
                        : "NameLocation Code color is required"
                      : ""
                  }
                  {...field}
                />
              )}
            />
          </List>
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
      <br /> <br /> <br /> <br /> <br /> <br />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Typography variant="h3">Contact Information</Typography>
          <br /> <br /> <br />
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          {/* First Name */}
          <List className={classes.inputField}>
            <Typography>First Name *</Typography>
            <span>
              (Please enter your first name(This will appear on your
              submission))
            </span>
            <div style={{ marginBottom: 10 }}></div>
            <Controller
              name="firstname"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="firstname"
                  label="First Name"
                  error={Boolean(errors.firstname)}
                  helperText={
                    errors.firstname
                      ? errors.firstname.type === "minLength"
                        ? "First Name Code length should be more than 1"
                        : "First Name Code color is required"
                      : ""
                  }
                  {...field}
                />
              )}
            />
          </List>
        </Grid>
        <Grid item xs={6}>
          {/* Last Name */}
          <List className={classes.inputField}>
            <Typography>Last Name *</Typography>
            <span>
              (Please enter your last name(This will appear on your submission)
              )
            </span>
            <div style={{ marginBottom: 10 }}></div>
            <Controller
              name="lastname"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  error={Boolean(errors.lastname)}
                  helperText={
                    errors.lastname
                      ? errors.lastname.type === "minLength"
                        ? "Last Name Code length should be more than 1"
                        : "Last Name Code color is required"
                      : ""
                  }
                  {...field}
                />
              )}
            />
          </List>
        </Grid>
        <Grid item xs={6}>
          {/* Phone Number */}
          <Typography>Phone Number *</Typography>
          <span>
            (Please enter the phone number to display on your submission )
          </span>
          <List className={classes.inputField}>
            <div style={{ marginBottom: 10 }}></div>
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 11,
                maxLength: 11,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="tel"
                  label="Mobile Number"
                  error={Boolean(errors.phone)}
                  helperText={
                    errors.phone
                      ? errors.phone.type === "minLength"
                        ? "Phone number length should 11 Digits"
                        : "Phone number is required"
                      : ""
                  }
                  {...field}
                />
              )}
            />
          </List>
        </Grid>
        <Grid item xs={6}>
          {/* Email */}
          <Typography>Email *</Typography>
          <span>
            Please enter your email(This will appear on your submission)
          </span>
          <List className={classes.inputField}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  inputProps={{ type: "email" }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === "pattern"
                        ? "Email is not valid"
                        : "Email is required"
                      : ""
                  }
                  {...field}
                />
              )}
            />
          </List>
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}></Grid>
          <Grid item xs={2.9}></Grid>

          <Grid item xs={3}>
            <List>
              <ListItem>
                <Button
                  style={{
                    background: "#366e97",
                    color: "white",
                    width: "150px",
                    height: "70px",
                  }}
                  onClick={handleSubmit(submitHandler)}
                >
                  Submit
                </Button>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Navbar>
  );
}

const top100Films = [
  { title: "Cafe" },
  { title: "Restaurant" },
  { title: "Church" },
  { title: "Hotel" },
  { title: "House" },
  { title: "Motel" },
  { title: "Bar" },
  { title: "Barangay Hall" },
  { title: "Plaza" },
  { title: "Covered Court" },
  { title: "Jeep" },
  { title: "Taxi" },
  { title: "Autoparts" },
];
