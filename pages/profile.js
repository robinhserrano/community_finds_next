import {
  CardActionArea,
  Grid,
  Card,
  Typography,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { useEffect, useContext, useState } from "react";
import Navbar from "../components/Navbar";
import NextLink from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import useStyles from "../utils/styles";
import { UserContext } from "../lib/context";
import { auth, postToJSON, firestore } from "../lib/firebase";

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

export default function Profile(props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const [posts] = useState(props.posts);

  //NEW CODE
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      return router.push("/");
    }
    const profileName = posts.filter((doc) => {
      return doc.id.includes(loggedInUser);
    });
    setValue("firstname", profileName[0].firstname);
    setValue("lastname", profileName[0].lastname);
    setValue("suffix", profileName[0].suffix);
    setValue("email", profileName[0].email);
    setValue("phone", profileName[0].phone);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //NEW CODE

  const submitHandler = async ({
    firstname,
    lastname,
    suffix,
    email,
    password,
    confirmPassword,
  }) => {};
  return (
    <Navbar title={"Profile"}>
      <div style={{ marginTop: "5%" }}></div>
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card className={classes.section}>
            <List>
              <NextLink href="/profile" passHref>
                <ListItem selected button component="a">
                  <ListItemText primary="User Profile" />
                </ListItem>
              </NextLink>
              <NextLink href="/user-view-post" passHref>
                <ListItem button component="a">
                  <ListItemText primary="View Post" />
                </ListItem>
              </NextLink>
              <NextLink href="/user-finder-post" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Finder" />
                </ListItem>
              </NextLink>
              <NextLink href="/user-claim-post" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Claimer" />
                </ListItem>
              </NextLink>
            </List>
          </Card>
        </Grid>
        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography variant="h3">Profile</Typography>
              </ListItem>
              <ListItem>
                <form
                  onSubmit={handleSubmit(submitHandler)}
                  className={classes.form}
                >
                  <List>
                    <ListItem>
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
                            style={{ width: "250px", marginRight: "8px" }}
                            variant="outlined"
                            fullWidth
                            disabled={true}
                            id="firstname"
                            label="First Name"
                            inputProps={{ type: "firstname" }}
                            error={Boolean(errors.firstname)}
                            helperText={
                              errors.firstname
                                ? errors.firstname.type === "minLength"
                                  ? "First Name length is more than 1"
                                  : "First Name is required"
                                : ""
                            }
                            {...field}
                          />
                        )}
                      />
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
                            style={{ width: "250px", marginRight: "8px" }}
                            variant="outlined"
                            fullWidth
                            disabled={true}
                            id="lastname"
                            label="Last Name"
                            inputProps={{ type: "firstname" }}
                            error={Boolean(errors.firstname)}
                            helperText={
                              errors.firstname
                                ? errors.firstname.type === "minLength"
                                  ? "First Name length is more than 1"
                                  : "First Name is required"
                                : ""
                            }
                            {...field}
                          />
                        )}
                      />
                      <Controller
                        name="suffix"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: false,
                          minLength: 1,
                        }}
                        render={({ field }) => (
                          <TextField
                            style={{ width: "250px" }}
                            variant="outlined"
                            fullWidth
                            disabled={true}
                            id="suffix"
                            label="Suffix"
                            inputProps={{ type: "suffix" }}
                            error={Boolean(errors.suffix)}
                            helperText={
                              errors.suffix
                                ? errors.suffix.type === "minLength"
                                  ? "suffix length is more than 1"
                                  : "suffix is required"
                                : ""
                            }
                            {...field}
                          />
                        )}
                      />
                    </ListItem>

                    <ListItem>
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
                            disabled={true}
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
                    </ListItem>
                    <ListItem>
                      <Controller
                        name="phone"
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
                            disabled={true}
                            id="phone"
                            label="Mobile Number"
                            inputProps={{ type: "tel" }}
                            error={Boolean(errors.phone)}
                            helperText={
                              errors.phone
                                ? errors.phone.type === "minLength"
                                  ? "Phone number length should be 11 digits"
                                  : "Phone number is required"
                                : ""
                            }
                            {...field}
                          />
                        )}
                      />
                    </ListItem>
                  </List>
                </form>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Navbar>
  );
}
