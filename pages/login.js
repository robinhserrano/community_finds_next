import React from "react";
import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Link,
  Grid,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";
import NextLink from "next/link";
import useStyles from "../utils/styles";
import { Controller, useForm } from "react-hook-form";
import { auth, googleAuthProvider, firestore } from "../lib/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";
import sideImage from "../public/images/login.jpg";

export default function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { redirect } = router.query; // login?redirect=/shipping
  const auth = getAuth();

  const classes = useStyles();
  const submitHandler = async ({ email, password }) => {
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then((authUser) => {
          alert("Successfully Signed In");
        })
        .catch((error) => {
          console.log(error.message);
        });
      router.push(redirect || "/");
    } catch (err) {
      alert("Invalid email or Password", {
        variant: "error",
      });
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={7}>
          <Image src={sideImage} alt="logo" width={"1200"} height={1040} />
        </Grid>
        <Grid item xs={5}>
          <Grid container spacing={3}>
            <Grid item xs={1}></Grid>
            <Grid item xs={6}>
              <div
                title="Login"
                style={{
                  marginTop: 150,
                  backgroundColor: "white",
                  width: 700,
                  height: 500,
                }}
              >
                <form
                  onSubmit={handleSubmit(submitHandler)}
                  className={classes.form}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10} textAlign="center">
                      <Typography component="h1" variant="h1">
                        Login
                      </Typography>
                    </Grid>
                    <Grid item xs={1}></Grid>
                  </Grid>

                  <List>
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
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                          minLength: 6,
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="password"
                            label="Password"
                            inputProps={{ type: "password" }}
                            error={Boolean(errors.password)}
                            helperText={
                              errors.password
                                ? errors.password.type === "minLength"
                                  ? "Password length is more than 5"
                                  : "Password is required"
                                : ""
                            }
                            {...field}
                          />
                        )}
                      />
                    </ListItem>
                    <ListItem>
                      <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        color="primary"
                      >
                        Login
                      </Button>
                    </ListItem>
                    <ListItem>
                      Don&apos;t have an account? &nbsp;
                      <NextLink
                        href={`/register?redirect=${redirect || "/lobby"}`}
                        passHref
                      >
                        <Link>Register</Link>
                      </NextLink>
                    </ListItem>
                  </List>
                </form>
              </div>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
