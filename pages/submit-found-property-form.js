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
import React, { useContext, useEffect, useState } from "react";
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
import { useRouter } from "next/router";
import Map, { Marker } from "react-map-gl";
import Geocode from "react-geocode";
import { UserContext } from "../lib/context";
import Cookies from "js-cookie";

//
export async function getServerSideProps() {
  const postsQuery = firestore.collectionGroup("users");

  // .where('published', '==', true)
  // .orderBy('createdAt', 'desc')
  // .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  // console.log(posts);
  // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

  return {
    props: { posts }, // will be passed to the page component as props
  };
}
//
export default function FoundItem(props) {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [posts] = useState(props.posts);

  const [category, setCategory] = React.useState("");
  const [typelocation, setTypeLocation] = React.useState("");
  const [propertycategory, setPropertCcategory] = React.useState("");
  //
  //NEWCODE
  const [currentUser, setUser] = useState();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(loggedInUser);
      const profileName = posts.filter((doc) => {
        return doc.id.includes(loggedInUser);
      });
      setValue("firstname", profileName[0].firstname);
      setValue("lastname", profileName[0].lastname);
      setValue("suffix", profileName[0].suffix);
      setValue("email", profileName[0].email);
      setValue("phone", profileName[0].phone);
    } else {
      router.push("/login?redirect=/submit-found-property-form");
    }
  }, []);
  //NEWCODE

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleChanges = (event) => {
    setTypeLocation(event.target.value);
  };

  const propertyChange = (event) => {
    setPropertCcategory(event.target.value);
  };

  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = React.useState("");

  const classes = useStyles();
  const {
    handleSubmit,
    control,
    setValue,
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
    nameLocation,
    information,
    firstname,
    lastname,
    suffix,
    phone,
    email,
  }) => {
    var lostItemId = v4();
    try {
      firebase
        .firestore()
        .collection("foundItems")
        .doc(lostItemId)
        .set({
          id: lostItemId,
          user_id: auth.currentUser.uid,
          foundPropertyName: itemLost,
          propertycategory: "Found Property",
          category: category,
          brand: brand,
          primaryColor: primaryColor,
          secondaryColor: secondaryColor,
          image: itemimageValue,
          zipcode: "2009",
          location: address,
          information: information,
          locationtype: typelocation,
          timeLost: lostTime,
          firstname: firstname,
          lastname: lastname,
          suffix: suffix,
          phone: phone,
          email: email,
          status: "missing",
        })
        .then(() =>
          alert("Found Property has been Submitted to Cloud Firestore")
        );
      router.push("/found-property");
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
  const document = "Document";
  const plaze = "Plaza";
  const ccourt = "Covered Court";
  const jeep = "Jeep";
  const taxi = "Taxi";
  const autoparts = "Autoparts";

  //Mapbox code
  Geocode.setApiKey("AIzaSyD2h6U3EeCYqNLwsrwCxOS8MB8EsLwPsJE");
  Geocode.setLocationType("ROOFTOP");
  const [latVal, setlatVal] = React.useState(0);
  const [longVal, setlongVal] = React.useState(0);
  const [address, setAddress] = React.useState("");
  console.log(address);

  return (
    <Navbar>
      <div>
        <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item sm={6}>
            <Typography variant="h3">Submit Found Properties</Typography>
            <br /> <br />
            <Typography variant="h5">
              ✔ Verified users are able to view submitted Found Properties.
            </Typography>
            <br /> <br />
            <Typography variant="h5">
              ✔ The location is only limited to Balibago, Angeles City,
              Pampanga.
            </Typography>
            <br /> <br />
            <Typography variant="h7">
              <b style={{ color: "red" }}>* </b>
              Please be descriptive when submitting your found property report,
              the more information you give us the better chance of returning
              the property to the rightful owner
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <Image src={sideImage} alt="logo" width={550} height={500} />
          </Grid>
        </Grid>
      </div>
      {/* pasok sa grid para mahati screeen sosa */}
      <form onSubmit={handleSubmit(submitHandler)}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {/* <Grid item sm={6}>
            <List className={classes.inputField}>
              <Typography>Property Category *</Typography>
              <span>(Found Property)</span>
              <div style={{ marginBottom: 10 }}></div>
              <FormControl fullWidth>
                <InputLabel htmlFor="grouped-select">
                  Select Property Category
                </InputLabel>
                <Select
                  defaultValue=""
                  id="grouped-select"
                  required={true}
                  value={propertycategory}
                  label="Select Property Category"
                  onChange={propertyChange}
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
                    Choose Property Type
                  </ListSubheader>
                  <MenuItem value={"Found Property"}>Found Property</MenuItem>
                </Select>
              </FormControl>
            </List>
          </Grid> */}

          <Grid item sm={6}>
            {/* item Property */}
            <List className={classes.inputField}>
              <Typography> Property Found Name *</Typography>
              <span>
                Dog, Jacket, Smartphone, Wallet, etc. This field may
                auto-populate.
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
                    label="Property Found Name"
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
          <Grid item sm={6}>
            {/* Date and Time Lost */}
            <Typography>Date Found and Time Found *</Typography>
            <span>
              Please add the approximate date of when the item was found.
              <br />
              Please add the approximate time of day the item was found.
            </span>
            <div style={{ marginBottom: 10 }}></div>
            <Datetime
              required={true}
              selected={startTime}
              onChange={(time) => setStartTime(time)}
            />
          </Grid>
          <Grid item sm={6}>
            {/* category */}
            <List className={classes.inputField}>
              <Typography>Category *</Typography>
              <span>Animals/Pets, Clothing, Electronics, Documents etc.</span>
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
                  <MenuItem value={document}>Document</MenuItem>
                  <MenuItem value={electronics}>Electronics</MenuItem>
                  <MenuItem value={keys}>Keys</MenuItem>
                  <MenuItem value={wallet}>Wallet</MenuItem>
                </Select>
              </FormControl>
            </List>
          </Grid>
          <Grid item sm={6}>
            {/* <br /> */}
            {/* Additional Information */}
            <List className={classes.inputField}>
              <Typography>Additional Information *</Typography>
              <span>
                Please provide any additional details/description of your found
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
          <Grid item sm={6}>
            {/* brand */}
            <List className={classes.inputField}>
              <Typography>Type *</Typography>
              <span>Ralph Lauren, Samsung, KitchenAid, etc.</span>
              <br />
              <span>For animals please indicate the breed</span>
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
                    label="Type"
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
          <Grid item sm={6}>
            {/* Primary Color */}
            <List className={classes.inputField}>
              <Typography>Primary Color *</Typography>
              <span>
                Please add the color that best represents the found property
                Black, Red, Blue, etc.
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
          <Grid item sm={6}>
            {/* Secondary Item Color */}
            <br />
            <List className={classes.inputField}>
              <Typography>Secondary Item Color </Typography>
              <span>
                Please add a color that acts as a less dominant. Leave blank if
                not applicable.
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
          <Grid item sm={6}>
            {/* Upload Image */}
            <Typography>Upload Image</Typography>
            <span>
              This image will display on the Website. Do not enter high
              resolution images such as 4k resolution.
            </span>
            <div style={{ marginBottom: 10 }}></div>
            <div className="App">
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  style={{ display: "none" }}
                  value={imageInput}
                  onChange={(e) => {
                    try {
                      if (e.target.files[0].size < 900000) {
                        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
                        console.log(e.target.files[0].size);
                        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
                        setImage(e.target.files[0]);
                        uploader(e);
                        setImageInput(event.target.value);
                      } else {
                        alert("Image size is too large");
                      }
                    } catch (err) {
                      alert(err);
                    }
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
          <Grid item sm={6}>
            <Typography variant="h3">Location Information</Typography>
            <br /> <br /> <br />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item sm={6}>
            {/* Where did you Lost It? */}
            <List className={classes.inputField}>
              <Typography>Where did you Found It *</Typography>
              <span>
                Please provide an approximate location of the found property
                Bar, Restaurant, Park, etc.
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
                    Private and Public Places
                  </ListSubheader>
                  <MenuItem value={"Government Offices"}>
                    Government Offices
                  </MenuItem>
                  <MenuItem value={"Religous Institutions"}>
                    Religous Institutions
                  </MenuItem>
                  <MenuItem value={"Malls and Commercial Centers"}>
                    Malls and Commercial Centers
                  </MenuItem>
                  <MenuItem value={"School or Colleges"}>
                    School or Colleges
                  </MenuItem>
                  <MenuItem value={"Junk Shop"}>Junk Shop</MenuItem>
                  <MenuItem value={"Sari-Sari Store"}>Sari-Sari Store</MenuItem>

                  <MenuItem value={"Convenience Store"}>
                    Convenience Store
                  </MenuItem>
                  <MenuItem value={"Hospitals"}>Hospital</MenuItem>
                  <MenuItem value={"Cemetery"}>Cemetery</MenuItem>

                  <MenuItem value={"Park"}>Park</MenuItem>
                  <MenuItem value={"Bars"}>Bars</MenuItem>
                  <MenuItem value={"Private Offices"}>Private Office</MenuItem>
                  <MenuItem value={"Clinics"}>Clinic</MenuItem>
                  <MenuItem value={"Hotels"}>Hotel</MenuItem>
                  <MenuItem value={"Motels"}>Motel</MenuItem>
                  <MenuItem value={"Gym"}>Gym</MenuItem>
                  <ListSubheader
                    style={{
                      background: "lightgray",
                      fontSize: "30px",
                    }}
                  >
                    PUROK
                  </ListSubheader>
                  <MenuItem value={"Purok 1"}>Purok 1</MenuItem>
                  <MenuItem value={"Purok 2"}>Purok 2</MenuItem>
                  <MenuItem value={"Purok 3"}>Purok 3</MenuItem>
                  <MenuItem value={"Purok 4"}>Purok 4</MenuItem>
                  <MenuItem value={"Purok 5"}>Purok 5</MenuItem>
                  <MenuItem value={"Purok 6"}>Purok 6</MenuItem>
                  <MenuItem value={"Purok 7"}>Purok 7</MenuItem>
                  <MenuItem value={"Purok 8"}>Purok 8</MenuItem>
                  <MenuItem value={"Purok 9"}>Purok 9</MenuItem>
                  <MenuItem value={"Purok 10"}>Purok 10</MenuItem>
                  <MenuItem value={"Purok 11"}>Purok 11</MenuItem>
                  <MenuItem value={"Purok 12"}>Purok 12</MenuItem>
                  <MenuItem value={"Purok 13"}>Purok 13</MenuItem>
                  <MenuItem value={"Purok 14"}>Purok 14</MenuItem>
                  <MenuItem value={"Purok 15"}>Purok 15</MenuItem>
                </Select>
              </FormControl>
            </List>
          </Grid>
          <Grid item sm={6}>
            {/* Zip Code */}
            <br />
            <List className={classes.inputField}>
              <Typography>Zip Code *</Typography>
              <span>
                Please provide your zip code 2009. This field may auto-populate.
              </span>
              <div style={{ marginBottom: 10 }}></div>
              <Controller
                name="zipCode"
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
                    id="zipCode"
                    disabled
                    label="2009"
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
          <Grid item sm={6}>
            {/* Name/Location */}
            <List className={classes.inputField}>
              <Typography>Place/Location *</Typography>
              <span>
                Please Specify the Area from where you have found the property
              </span>
              <div style={{ marginBottom: 10 }}></div>
              <Controller
                name="nameLocation"
                control={control}
                defaultValue=""
                rules={{
                  required: false,
                  minLength: 2,
                }}
                render={({ field }) => (
                  <TextField
                    sx={{ width: "60ch" }}
                    variant="outlined"
                    fullWidth
                    required={false}
                    id="nameLocation"
                    disabled
                    label={address}
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
          <Grid item sm={12}>
            <Typography
              style={{ color: "red", fontSize: "20px", fontWeight: "bold" }}
            >
              Please Click anywhere from the Map to get an address.
            </Typography>
            <Map
              initialViewState={{
                longitude: 120.5978,
                latitude: 15.1685,
                zoom: 12,
              }}
              style={{ width: "80vw", height: 600 }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              mapboxAccessToken="pk.eyJ1IjoiY29tbXVuaXR5ZmluZHMiLCJhIjoiY2t6ajlsc3U1MXNtOTJ2bzB0ZXBxd21ncSJ9.2YEDuBOv1PAkUl8VsR9mag"
              maxBounds={[
                [120.5778, 15.1485],
                [120.6078, 15.1785],
              ]}
              onClick={(e) =>
                Geocode.fromLatLng(e.lngLat.lat, e.lngLat.lng).then(
                  (response) => {
                    const address = response.results[0].formatted_address;
                    // setlongVal(e.lngLat.lng);
                    // setlatVal(e.lngLat.lat);
                    setAddress(address);
                  },
                  (error) => {
                    console.error(error);
                  }
                )
              }
            ></Map>
          </Grid>
        </Grid>
        <br /> <br /> <br /> <br /> <br /> <br />
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Typography variant="h3">Contact Information</Typography>
            <br /> <br /> <br />
          </Grid>
          <Grid item sm={6}></Grid>
          <Grid item sm={4}>
            {/* First Name */}
            <List className={classes.nameField}>
              <Typography>Full Name*</Typography>
              <span>
                Please enter your full name. This will appear on your
                submission.
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
                    id="name"
                    disabled
                    label="First Name"
                    error={Boolean(errors.firstname)}
                    helperText={
                      errors.firstname
                        ? errors.firstname.type === "minLength"
                          ? "Name Code length should be more than 1"
                          : "Name is required"
                        : ""
                    }
                    {...field}
                  />
                )}
              />
            </List>
          </Grid>
          <Grid item sm={4}>
            <List className={classes.nameField}>
              <Typography>Last Name *</Typography>
              <span>
                Please enter your last name. This will appear on your submission
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
                    disabled
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
          <Grid item sm={4}>
            <List className={classes.nameField}>
              <Typography>Suffix *</Typography>
              <span>
                Please enter your suffix. This will appear on your submission
              </span>
              <div style={{ marginBottom: 10 }}></div>
              <Controller
                name="suffix"
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
                    disabled
                    id="suffix"
                    label="Suffix"
                    error={Boolean(errors.lastname)}
                    helperText={
                      errors.lastname
                        ? errors.lastname.type === "minLength"
                          ? "Suffix Code length should be more than 1"
                          : "Suffix Code color is required"
                        : ""
                    }
                    {...field}
                  />
                )}
              />
            </List>
          </Grid>
          <Grid item sm={6}>
            {/* Phone Number */}
            <br />
            <Typography>Phone Number *</Typography>
            <span>
              Please enter the phone number to display on your submission.
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
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    disabled
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
          <Grid item sm={6}>
            <br />
            {/* Email */}
            <Typography>Email *</Typography>
            <span>
              Please enter your email. This will appear on your submission.
            </span>
            <List className={classes.inputField}>
              <div style={{ marginBottom: 10 }}></div>
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
                    disabled
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
          <Grid item sm={6}></Grid>
          <Grid item sm={4}>
            <br /> <br /> <br />
            <ListItem>
              <Checkbox required={true} />
              <Typography>
                I agree that my data will be collected and shared in the
                website.
              </Typography>
            </ListItem>
          </Grid>

          <Grid item sm={2}>
            <br /> <br />
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
