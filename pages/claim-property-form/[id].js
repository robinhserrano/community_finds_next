import {
  CardMedia,
  Grid,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  TextField,
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
} from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import found from "../../public/images/found.png";
import foundme from "../../public/images/foundme.png";
import { firestore, postToJSON, auth } from "../../lib/firebase";
import { useRouter } from "next/router";
import useStyles from "../../utils/styles";
import { Controller, useForm } from "react-hook-form";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useSelector, useDispatch } from "react-redux";
import { ITEM_OWNER_INFORMATION } from "../../redux/actionTypes";
import "firebase/compat/firestore";
import { UserContext } from "../../lib/context";
import firebase from "firebase/compat/app";
//

export async function getServerSideProps() {
  const postsQuery = firestore.collectionGroup("foundItems");
  const postsQuery2 = firestore.collectionGroup("users");
  // .where('published', '==', true)
  // .orderBy('createdAt', 'desc')
  // .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);
  const posts2 = (await postsQuery2.get()).docs.map(postToJSON);
  // console.log(posts);
  return {
    props: { posts, posts2 }, // will be passed to the page component as props
  };
}

export default function ClaimLostItemForm(props) {
  const classes = useStyles();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const [posts2] = useState(props.posts2);
  const { user } = useContext(UserContext);

  // //NEWCODE
  const [currentUser, setUser] = useState();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(loggedInUser);
      const profileName = posts2.filter((doc) => {
        return doc.id.includes(loggedInUser);
      });
      setValue("name", profileName[0].name);
      setValue("email", profileName[0].email);
      setValue("phone", profileName[0].phone);
    } else {
      router.push("/login");
    }
  }, []);
  //NEWCODE

  const [typelocation, setTypeLocation] = React.useState("");
  const handleChanges = (event) => {
    setTypeLocation(event.target.value);
  };
  const [startTime, setStartTime] = React.useState("");
  const lostTime = startTime.toString();
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

  const [posts, setPosts] = useState(props.posts);
  const router = useRouter();
  const { id } = router.query;

  const slugClient = posts.filter((items) => {
    return items.id.toLowerCase().includes(id);
  });

  const profile = slugClient.find((items) => items.id === id);

  if (!profile) {
    return <div>The property here was already found</div>;
  }

  const submitHandler = async ({
    brand,
    result,
    information,
    addInformation,
    name,
    phone,
    email,
    nameLocation,
  }) => {
    try {
      firebase
        .firestore()
        .collection("foundItems")
        .doc(profile.id)
        .update({
          claim_brand: brand,
          claim_image: itemimageValue,
          claim_location: nameLocation,
          claim_information: information,
          claim_additional: addInformation,
          claim_locationtype: typelocation,
          claim_timeLost: lostTime,
          claim_fullname: name,
          claim_phone: phone,
          claim_email: email,
          claim_user_id: auth.currentUser.uid,
          status: "processing",
        })
        .then(() =>
          alert(
            "Your claim property is now being process. Wait for the finder to contact you. "
          )
        );
      router.push("/");
    } catch (err) {
      alert(err);
    }
  };
  return (
    <Navbar>
      <div>
        <br /> <br />
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Typography variant="h3">
              Claim {profile.propertycategory} {profile.foundPropertyName}
            </Typography>
            <br />
            <Typography variant="h5" style={{ backgroundColor: "lightgray" }}>
              <b>Property ID: </b>
              {profile.id}
            </Typography>
            <br />
            <Typography variant="h6">
              <b style={{ color: "red" }}>* </b>
              Please provide us your credentials to prove your ownership of this
              property.
            </Typography>
            <Typography variant="h6">
              <b style={{ color: "red" }}>* </b>
              For safety purposes please provide image of the property.
            </Typography>
            <Typography variant="h6">
              <b style={{ color: "red" }}>* </b>
              Please indicate the date of the property when you lost it.
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Image src={foundme} height={300} width={300} />
          </Grid>
          <Grid item xs={3}>
            <Image src={found} height={300} width={300} />
          </Grid>

          <Grid item xs={6}>
            <Card>
              <CardContent style={{ backgroundColor: "#346e98" }}></CardContent>
              <CardContent>
                <CardMedia
                  component="img"
                  src={profile.image}
                  height={600}
                  width={300}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent style={{ backgroundColor: "#346e98" }}></CardContent>
              <CardContent>
                <Typography style={{ fontSize: "28px", marginLeft: "30px" }}>
                  <b>{profile.propertycategory}: </b>
                  {profile.foundPropertyName}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography style={{ fontSize: "28px", marginLeft: "30px" }}>
                  <b>Category: </b>
                  {profile.category}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography style={{ fontSize: "28px", marginLeft: "30px" }}>
                  <b>Type: </b>
                  {profile.brand}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography style={{ fontSize: "28px", marginLeft: "30px" }}>
                  <b>Date and Time Lost: </b>
                  {profile.timeLost}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography style={{ fontSize: "28px", marginLeft: "30px" }}>
                  <b>Location Lost: </b>
                  {profile.location} - {profile.locationtype}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <br /> <br /> <br />
        <form onSubmit={handleSubmit(submitHandler)}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <Typography variant="h3">Personal Information</Typography>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              {/* First Name */}
              <List className={classes.inputField}>
                <Typography>Full Name *</Typography>
                <span>
                  Please enter your full name. This will appear on your
                  submission
                </span>
                <div style={{ marginBottom: 10 }}></div>
                <Controller
                  name="name"
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
                      id="name"
                      label="Full Name"
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
            {/* <Grid item xs={6}>
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
            </Grid> */}
            <Grid item xs={6}>
              {/* Phone Number */}
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
                    maxLength: 11,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="tel"
                      disabled
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
                Please enter your email. This will appear on your submission.
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
                      disabled
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
            <Grid item sm={6}></Grid>
            <br /> <br /> <br />
            <Grid item xs={6}>
              <Typography variant="h3">Property Description</Typography>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              {/* Item Description */}
              <List className={classes.inputField}>
                <Typography> Property Description *</Typography>
                <span>
                  Please provide details/description of the property that you
                  lost.
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
              <List className={classes.inputField}>
                <Typography> Additional Information *</Typography>
                <span>
                  Please provide additional details/description of your lost
                  property.
                </span>
                <div style={{ marginBottom: 10 }}></div>
                <Controller
                  name="addInformation"
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
                      id="addInformation"
                      label="Additional Information"
                      error={Boolean(errors.addInformation)}
                      helperText={
                        errors.addInformation
                          ? errors.addInformation.type === "minLength"
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
                <Typography>Type *</Typography>
                <span>
                  Ralph Lauren, Samsung, KitchenAid, etc.
                  <br />
                  For animals please indicate the breed.
                </span>
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
            <Grid item xs={6}>
              {/* Where did you Found It? */}
              <List className={classes.inputField}>
                <Typography>Where did you Lost It *</Typography>
                <span>
                  Please provide an approximate location of the lost property
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
                      School or College
                    </MenuItem>
                    <MenuItem value={"Junk Shop"}>Junk Shop</MenuItem>
                    <MenuItem value={"Sari-Sari Store"}>
                      Sari-Sari Store
                    </MenuItem>

                    <MenuItem value={"Convinient Store"}>
                      Convinient Store
                    </MenuItem>
                    <MenuItem value={"Hospitals"}>Hospital</MenuItem>
                    <MenuItem value={"Cemetery"}>Cemetery</MenuItem>

                    <MenuItem value={"Park"}>Park</MenuItem>
                    <MenuItem value={"Bars"}>Bars</MenuItem>
                    <MenuItem value={"Private Offices"}>
                      Private Office
                    </MenuItem>
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
            <Grid item xs={6}>
              <br />
              <List className={classes.inputField}>
                <Typography>Place/Location *</Typography>
                <span>
                  Please Specify the Area from where you have lost the property
                </span>
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
            <Grid item xs={6}>
              {/* Date and Time Found */}
              <Typography>Date and Time Lost *</Typography>
              <span>
                Please add the approximate date of when the property was lost.
                <br />
                Please add the approximate time of day the property was lost.
              </span>
              <div style={{ marginBottom: 10 }}></div>
              <Datetime
                selected={startTime}
                onChange={(time) => setStartTime(time)}
              />
            </Grid>
            <Grid item xs={6}>
              {/* Upload Image */}
              <Typography>Upload Image </Typography>
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
                  height={250}
                  alt=""
                />
              )}
            </Grid>
            <Grid item xs={6}>
              {" "}
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}></Grid>

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
          </Grid>
        </form>
      </div>
    </Navbar>
  );
}
