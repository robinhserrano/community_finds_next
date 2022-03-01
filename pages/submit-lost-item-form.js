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
  Input,
  InputLabel,
  MenuItem,
  Select,
  ListSubheader,
  Checkbox,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import useStyles from "../utils/styles";
import Image from "next/image";
import sideImage from "../public/images/search.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { v4 as uuidv4, v4 } from "uuid";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import { firestore, postToJSON, auth } from "../lib/firebase";

import { useSelector, useDispatch } from "react-redux";
import { ITEM_OWNER_INFORMATION } from "../redux/actionTypes";
//

export default function LostItem() {
  const [category, setCategory] = React.useState("");
  const [typelocation, setTypeLocation] = React.useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleChanges = (event) => {
    setTypeLocation(event.target.value);
  };

  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = React.useState("");

  const classes = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [imageInput, setImageInput] = useState("");

  const [image, setImage] = React.useState("");
  const imageRef = React.useRef(null);
  const dispatch = useDispatch();
  const { itemimageValue } = useSelector((state) => state.page);

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
  const lostTime = startTime.toString();

  const submitHandler = async ({
    itemLost,
    brand,
    primaryColor,
    secondaryColor,
    result,
    zipCode,
    nameLocation,
    information,
    firstname,
    lastname,
    phone,
    email,
  }) => {
    var lostItemId = v4();
    try {
      firebase
        .firestore()
        .collection("missingItems")
        .doc(lostItemId)
        .set({
          id: lostItemId,
          user_id: auth.currentUser.uid,
          name: itemLost,
          category: category,
          brand: brand,
          primaryColor: primaryColor,
          secondaryColor: secondaryColor,
          image: itemimageValue,
          zipcode: zipCode,
          location: nameLocation,
          information: information,
          // date: lostdDate,
          locationtype: typelocation,
          //mapbox:
          timeLost: lostTime,
          firstname: firstname,
          lastname: lastname,
          phone: phone,
          email: email,
          status: "missing",
        })
        .then(() => alert("Missing File Submitted to Cloud Firestore"));
    } catch (err) {
      alert(err);
    }
  };

  const animal = "Animals";
  const bags = "Bags";
  const cash = "Cash";
  const clothing = "Clothing";
  const electronics = "Electronics";
  const keys = "Keys";
  const wallet = "Wallet";
  const bhall = "Barangay Hall";
  const plaze = "Plaza";
  const ccourt = "Covered Court";
  const jeep = "Jeep";
  const taxi = "Taxi";
  const autoparts = "Autoparts";

  return (
    <Navbar>
      <div>
        <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Typography variant="h3">Submit Lost/Found Items</Typography>
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
      <form onSubmit={handleSubmit(submitHandler)}>
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
            {/* Date and Time Lost */}
            <Typography>Date Lost and Time Lost *</Typography>
            <span>
              (Please add the approximate date of when the item was lost.)
              <br />
              (Please add the approximate time of day the item was lost.)
            </span>
            <div style={{ marginBottom: 10 }}></div>
            <Datetime
              selected={startTime}
              onChange={(time) => setStartTime(time)}
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
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Categories
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  required={true}
                  label="Category"
                  onChange={handleChange}
                >
                  <MenuItem value={animal}>Animals</MenuItem>
                  <MenuItem value={bags}>Bags</MenuItem>
                  <MenuItem value={cash}>Cash</MenuItem>
                  <MenuItem value={clothing}>Clothing</MenuItem>
                  <MenuItem value={electronics}>Electronics</MenuItem>
                  <MenuItem value={keys}>Keys</MenuItem>
                  <MenuItem value={wallet}>Wallet</MenuItem>
                </Select>
              </FormControl>
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
          </Grid>
          <Grid item xs={6}>
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
            <span>
              (This image will display on the Website. Do not enter high
              resolution images such as 4k resolution.)
            </span>
            <div style={{ marginBottom: 10 }}></div>
            <div className="App">
              {/* <Input
             type="file"
             accept=".jpg, .jpeg, .png"
             value={imageInput}
             onChange={(e) => {
               setImage(e.target.files[0]);
               uploader(e);
               setImageInput(event.target.value);
             }}
           /> */}
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  style={{ display: "none" }}
                  value={imageInput}
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    uploader(e);
                    setImageInput(event.target.value);
                  }}
                />
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
            </div>
            {result && (
              <Image
                ref={imageRef}
                src={result}
                width={200}
                height={200}
                alt=""
              />
            )}
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}></Grid>
        </Grid>
        <br /> <br /> <br /> <br /> <br /> <br /> <br />
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
                (Please provide an approximate location of the lost property
                (Bar, Restaurant, Park, etc.))
              </span>
              <div style={{ marginBottom: 10 }}></div>
              <FormControl fullWidth>
                <InputLabel htmlFor="grouped-select">Select Type</InputLabel>
                <Select
                  defaultValue=""
                  id="grouped-select"
                  required={true}
                  value={typelocation}
                  label="Type Location"
                  onChange={handleChanges}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <ListSubheader
                    style={{
                      background: "lightgray",
                      fontSize: "30px",
                    }}
                  >
                    SUBDIVISION/VILLAGE
                  </ListSubheader>
                  <MenuItem value={"Leoncia Village"}>Leoncia Village</MenuItem>
                  <MenuItem value={"Mansfield Residences"}>
                    Mansfield Residences
                  </MenuItem>
                  <MenuItem value={"L&S Subdivision"}>L&S Subdivision</MenuItem>
                  <MenuItem value={"Villa Dolores Subdivision"}>
                    Villa Dolores Subdivision
                  </MenuItem>
                  <MenuItem value={"Villa Gloria Subdivision"}>
                    Villa Gloria Subdivision
                  </MenuItem>
                  <MenuItem value={"Palmera Homes"}>Palmera Homes</MenuItem>
                  <ListSubheader
                    style={{
                      background: "lightgray",
                      fontSize: "30px",
                    }}
                  >
                    LANDMARK
                  </ListSubheader>
                  <MenuItem value={"Sacred Heart Medical Center"}>
                    Sacred Heart Medical Center
                  </MenuItem>
                  <MenuItem value={"Carmelite Monastery"}>
                    Carmelite Monastery
                  </MenuItem>
                  <MenuItem value={"LTO Angeles"}>LTO Angeles</MenuItem>
                  <ListSubheader
                    style={{
                      background: "lightgray",
                      fontSize: "30px",
                    }}
                  >
                    SCHOOL
                  </ListSubheader>
                  <MenuItem value={"La Vertice School"}>
                    La Vertice School
                  </MenuItem>
                  <MenuItem
                    value={
                      "International School for Culinary Arts and Hotel Management Pampanga"
                    }
                  >
                    International School for Culinary Arts and Hotel Management
                    Pampanga
                  </MenuItem>
                  <ListSubheader
                    style={{
                      background: "lightgray",
                      fontSize: "30px",
                    }}
                  >
                    PUROK
                  </ListSubheader>
                  <MenuItem value={"Purok 1&2 - San angelo sibdivision"}>
                    Purok 1&2 - San angelo sibdivision
                  </MenuItem>
                  <MenuItem value={"Purok 3- Sto. Rosario street"}>
                    Purok 3- Sto. Rosario street
                  </MenuItem>
                  <MenuItem value={"Purok 4- Villa angela"}>
                    Purok 4- Villa angela
                  </MenuItem>
                  <MenuItem value={"Purok 5- L&S subdivision"}>
                    Purok 5- L&S subdivision
                  </MenuItem>
                  <MenuItem value={"Purok 6- Villa Leoncia"}>
                    Purok 6- Villa Leoncia
                  </MenuItem>
                  <MenuItem value={"Purok 7- Villa Dolores"}>
                    Purok 7- Villa Dolores
                  </MenuItem>
                  <MenuItem value={"Purok 8- Palmera Homes"}>
                    Purok 8- Palmera Homes
                  </MenuItem>
                  <MenuItem value={"Purok 9- Mansfield Residence"}>
                    Purok 9- Mansfield Residence
                  </MenuItem>
                </Select>
              </FormControl>
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
                    required={true}
                    id="nameLocation"
                    label="Location"
                    error={Boolean(errors.namelocation)}
                    helperText={
                      errors.nameLocation
                        ? errors.nameLocation.type === "minLength"
                          ? "Location Code length should be more than 1"
                          : "Location Code color is required"
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
                (Please enter your last name(This will appear on your
                submission) )
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
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}></Grid>
            <Grid item xs={2.9}>
              <ListItem>
                <Checkbox required={true} />
                <Typography>
                  I agree that my data will be collected and shared in the
                  website.
                </Typography>
              </ListItem>
            </Grid>

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
                    type="submit"
                    onClick={() =>
                      dispatch({
                        type: ITEM_OWNER_INFORMATION,
                        payload: { itemimageValue: result },
                      })
                    }
                  >
                    Submit
                  </Button>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Grid>
      </form>
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
const allCategories = [
  { title: "Animals" },
  { title: "Bags" },
  { title: "Cash" },
  { title: "Clothing" },
  { title: "Electronics" },
  { title: "Keys" },
  { title: "Wallet" },
];
