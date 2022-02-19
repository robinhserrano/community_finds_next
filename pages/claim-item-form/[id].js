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
import React, { useState, useContext } from "react";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import found from "../../public/images/found.png";
import foundme from "../../public/images/foundme.png";
import { firestore, postToJSON } from "../../lib/firebase";
import { useRouter } from "next/router";

import useStyles from "../../utils/styles";
import { Controller, useForm } from "react-hook-form";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useSelector, useDispatch } from "react-redux";
import { ITEM_OWNER_INFORMATION } from "../../redux/actionTypes";

//

export async function getServerSideProps() {
  const postsQuery = firestore.collectionGroup("missingItems");
  // .where('published', '==', true)
  // .orderBy('createdAt', 'desc')
  // .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);
  // console.log(posts);
  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default function ClaimLostItemForm(props) {
  const classes = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
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
    return <div>The item here was already claimed</div>;
  }
  return (
    <Navbar>
      <div>
        <br /> <br />
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Typography variant="h3">Claim Lost Item</Typography>
            <br />
            <Typography variant="h5" style={{ backgroundColor: "lightgray" }}>
              <b>Item ID: </b>
              {profile.id}
            </Typography>
            <br />
            <Typography variant="h6">
              <b style={{ color: "red" }}>* </b>
              Please provide us the most accurate information about the item so
              that we could determine that you are the real owner of this item.
            </Typography>
            <Typography variant="h6">
              <b style={{ color: "red" }}>* </b>
              For safety purposes please provide image of the item.
            </Typography>
            <Typography variant="h6">
              <b style={{ color: "red" }}>* </b>
              Please indicate the date of the item when you lost it.
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
                  <b>Item Lost: </b>
                  {profile.name}
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
                  <b>Brand: </b>
                  {profile.brand}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography style={{ fontSize: "28px", marginLeft: "30px" }}>
                  <b>Date and Time Lost: </b>
                  {profile.date}
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
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Typography variant="h3">Personal Information</Typography>
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
          <br /> <br /> <br />
          <Grid item xs={6}>
            <Typography variant="h3">Item Description</Typography>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            {/* Item Description */}
            <List className={classes.inputField}>
              <Typography> Item Description *</Typography>
              <span>
                Please provide details/description of your the property that you
                found.
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
            {/* Where did you Found It? */}
            <List className={classes.inputField}>
              <Typography>Where did you Found It *</Typography>
              <span>
                (Please provide an approximate location of the Found property
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
                </Select>
              </FormControl>
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
                height={250}
                alt=""
              />
            )}
          </Grid>
          <Grid item xs={6}>
            {/* Date and Time Found */}
            <Typography>Date Found and Time Found *</Typography>
            <span>
              (Please add the approximate date of when the item was found.)
              <br />
              (Please add the approximate time of day the item was found.)
            </span>
            <div style={{ marginBottom: 10 }}></div>
            <Datetime
              selected={startTime}
              onChange={(time) => setStartTime(time)}
            />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
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
      </div>
    </Navbar>
  );
}
