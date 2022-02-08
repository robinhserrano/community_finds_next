import React from "react";
import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { useRouter } from "next/router";
import NextLink from "next/link";
import useStyles from "../utils/styles";
import { Controller, useForm } from "react-hook-form";
import { auth, googleAuthProvider, firestore } from "../lib/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
    <div
      title="Login"
      style={{
        marginLeft: 700,
        marginTop: 150,
        backgroundColor: "white",
        width: 700,
        height: 500,
      }}
    >
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Typography component="h1" variant="h1" style={{ marginLeft: 180 }}>
          Login
        </Typography>
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
            <Button variant="contained" type="submit" fullWidth color="primary">
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
          <SignInButton />
        </List>
      </form>
    </div>
  );
}

//sign In with google
function SignInButton() {
  const router = useRouter();
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
    // Create refs for both documents
    const userDoc = firestore.doc(`users/${auth.currentUser.uid}`);
    //const usernameDoc = firestore.doc(usernames/${formValue});

    // Commit both docs together as a batch write.
    const batch = firestore.batch();
    batch.set(userDoc, {
      name: auth.currentUser.displayName,
      id: auth.currentUser.uid,
      email: auth.currentUser.email,
    });
    //batch.set(usernameDoc, { uid: user.uid });
    if (!userDoc) {
      throw new Error("There was an error in Login");
    }
    if (userDoc) {
      router.push("/lobby");
    }
    await batch.commit();
  };
  return (
    <Button onClick={signInWithGoogle} variant="contained">
      Sign in with Google
    </Button>
  );
}

// <Image src={googleIcon} height={50} width={50} alt="google icon" />
