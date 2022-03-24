import React, { useState } from "react";
import useStyles from "../utils/styles";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
  Grid,
  Checkbox,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../lib/firebase";
import firebase from "firebase/compat/app";
// import { collection, addDoc, doc } from "firebase/firestore";
import Image from "next/image";
import bgImage from "../public/images/register.jpg";
// import firebase from 'firebase/compat/app';

export default function Register() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const classes = useStyles();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const { redirect } = router.query;
  const submitHandler = async () => {
    //e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password don't match", { variant: "error" });
      return;
    } else {
      try {
        createUserWithEmailAndPassword(auth, email, password)
          .then((authUser) => {
            console.log(authUser.user.uid);
            console.log("Success. The user is created in firebase");
            

           
          
            firebase
              .firestore()
              .collection("users")
              .doc(authUser.user.uid)
              .set({
                id: authUser.user.uid,
                name: name,
                email: email,
                phone: phone,
                password: password,
                role: "user",
              })
            //  .then((e) => e.sent alert("The User  was now saved."));

              var user = firebase.auth().currentUser;
              user.sendEmailVerification();
          })
          .catch((error) => {
            console.log(error.message);
          });
        router.push("/login");
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <div>
      <div>
        <Image
          src={bgImage}
          alt="background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div
        title="Register"
        style={{
          marginLeft: "30%",
          marginTop: 150,
          backgroundColor: "white",
          width: 700,
          height: 750,
          position: "absolute",
        }}
      >
        <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
          <Grid container spacing={3}>
            <Grid item xs={1}></Grid>
            <Grid item xs={10} textAlign="center">
              <Typography component="h1" variant="h1">
                Register
              </Typography>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>

          <List>
            <ListItem>
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
                    id="name"
                    label="Name"
                    type={"name"}
                    value={name}
                    onInput={(e) => setName(e.target.value)}
                    inputProps={{ type: "name" }}
                    error={Boolean(errors.name)}
                    helperText={
                      errors.name
                        ? errors.name.type === "minLength"
                          ? "Name length is more than 1"
                          : "Name is required"
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
                    id="email"
                    label="Email"
                    type={"email"}
                    value={email}
                    onInput={(e) => setEmail(e.target.value)}
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
                  minLength: 11,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="tel"
                    label="Mobile Number"
                    value={phone}
                    onInput={(e) => setPhone(e.target.value)}
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
                    type={"password"}
                    value={password}
                    onInput={(e) => setPassword(e.target.value)}
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
              <Controller
                name="confirmPassword"
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
                    id="confirmPassword"
                    value={confirmPassword}
                    onInput={(e) => setConfirmPassword(e.target.value)}
                    label="confirm Password"
                    inputProps={{ type: "password" }}
                    error={Boolean(errors.confirmPassword)}
                    helperText={
                      errors.confirmPassword
                        ? errors.confirmPassword.type === "minLength"
                          ? "Confirm Password length is more than 5"
                          : "Confirm Password is required"
                        : ""
                    }
                    {...field}
                  />
                )}
              />
            </ListItem>
            <ListItem>
              <Checkbox required={true} />
              <Typography> I agree to the &nbsp;</Typography>
              <NextLink href={"/terms-and-conditions"} passHref>
                <Link>
                  <Typography>Terms and Conditions</Typography>
                </Link>
              </NextLink>
            </ListItem>

            <ListItem>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                color="primary"
              >
                Register
              </Button>
            </ListItem>

            <ListItem>
              Already have an Account? &nbsp;
              <NextLink href={`/login?redirect=${redirect || "/"}`} passHref>
                <Link> Login</Link>
              </NextLink>
            </ListItem>
          </List>
        </form>
      </div>
    </div>
  );
}
