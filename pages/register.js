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
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app, db, auth } from "../lib/firebase";
import { collection, addDoc, doc } from "firebase/firestore";
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
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAA");
        console.log(name);
        console.log(email);
        console.log(password);
        console.log(phone);
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAA");
        // const res = await createUserWithEmailAndPassword(auth, email, password);
        // const user = res.user;
        // console.log(user.uid);
        // console.log('YYYYYYYYYYYYYYYYYYYY');

        //let collRef = collection(db, 'users'); // returns a collection ref. ie. creates one if one does not exist.
        // let inputObject = { name : "trying to create a collection"}
        // await addDoc(collRef , inputObject , { merge : true})

        // db.collection('users').add({
        // 	uid: user.uid,
        // 	name: name,
        // 	email: email,
        // 	password: password,
        // 	phone: phone
        // });

        //console.log('YYYYYYYYYYYYYYYYYYYY');
        createUserWithEmailAndPassword(auth, email, password)
          .then((authUser) => {
            console.log(authUser.user.uid);

            // await addDoc(collection(db, 'users'), {
            // 	a: 'a'
            // })
            // 	.then(() => console.log('DATA'))
            // 	.catch(() => console.log('Failed'));

            addDoc(collection(db, "users"), {
              id: authUser.user.uid,
              name: name,
              email: email,
              password: password,
              phone: phone,
            })
              .then(() => console.log("DATA"))
              .catch(() => console.log("Failed"));
            console.log("Success. The user is created in firebase");
            router.push("/login");
          })
          .catch((error) => {
            console.log(error.message);
          });
      } catch (err) {
        alert(err);
      }
    }
  };
  return (
    <div
      title="Register"
      style={{
        marginLeft: 700,
        marginTop: 150,
        backgroundColor: "white",
        width: 700,
        height: 600,
      }}
    >
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Typography component="h1" variant="h1" style={{ marginLeft: 120 }}>
          Register
        </Typography>
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
            <Button
              variant="contained"
              type="submit"
              fullWidth
              color="primary"
              onClick={submitHandler}
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
  );
}
