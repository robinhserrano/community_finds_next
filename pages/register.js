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
import bgImage from "../public/images/register.png";
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
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [suffix, setSuffix] = useState("");

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
                firstname: firstname,
                lastname: lastname,
                suffix: suffix,
                email: email,
                phone: phone,
                password: password,
                role: "user",
              });
            //  .then((e) => e.sent alert("The User  was now saved."));
            console.log(firebase.auth().currentUser.emailVerified);
            var user = firebase.auth().currentUser;
            user.sendEmailVerification();
            alert("The verification has been sent to your email.");
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa");
            console.log(firebase.auth().currentUser.emailVerified);
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa");
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
          marginTop: 20,
          backgroundColor: "white",
          width: 700,
          height: 700,
          position: "absolute",
        }}
      >
        <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
          <Grid container spacing={3}>
            <Grid item xs={1}></Grid>
            <Grid item xs={10} textAlign="center">
              <Typography component="h1" variant="h3">
                Register
              </Typography>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>

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
                    style={{ width: " 200px", marginRight: "32px" }}
                    variant="outlined"
                    fullWidth
                    id="firstname"
                    label="First Name"
                    type={"firstname"}
                    value={firstname}
                    onInput={(e) => setFirstName(e.target.value)}
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
                    style={{ width: " 200px", marginRight: "32px" }}
                    variant="outlined"
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    type={"lastname"}
                    value={lastname}
                    onInput={(e) => setLastName(e.target.value)}
                    inputProps={{ type: "lastname" }}
                    error={Boolean(errors.lastname)}
                    helperText={
                      errors.lastname
                        ? errors.lastname.type === "minLength"
                          ? "Last Name length is more than 1"
                          : "Last Name is required"
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
                    style={{ width: " 200px" }}
                    variant="outlined"
                    fullWidth
                    id="suffix"
                    label="Suffix"
                    type={"suffix"}
                    value={suffix}
                    onInput={(e) => setSuffix(e.target.value)}
                    inputProps={{ type: "suffix" }}
                    error={Boolean(errors.suffix)}
                    helperText={
                      errors.suffix
                        ? errors.suffix.type === "minLength"
                          ? "Suffix length is more than 1"
                          : "Suffix is required"
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
                  maxLength: 11,
                  pattern: /^[0-9]*$/,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="num"
                    label="Mobile Number"
                    value={phone}
                    onInput={(e) => setPhone(e.target.value)}
                    error={Boolean(errors.phone)}
                    helperText={
                      errors.phone
                        ? errors.phone.type === "minLength" ||
                          errors.phone.type === "maxLength"
                          ? "Phone number length should be 11 digits"
                          : errors.phone.type === "pattern"
                          ? "Phone number must not contain characters"
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
                    label="Confirm Password"
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
