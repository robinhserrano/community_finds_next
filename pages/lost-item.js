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
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import useStyles from "../utils/styles";
import Image from "next/image";
import sideImage from "../public/images/search.png";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";

//

export default function LostItem() {
  const [startDate, setStartDate] = useState(new Date());

  const classes = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [imageInput, setImageInput] = useState("");
  const [image, setImage] = React.useState("");
  const imageRef = React.useRef(null);
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

  return (
    <Navbar>
      <div>
        <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Typography variant="h3">Submit Lost Items</Typography>
            <br /> <br />
            <Typography variant="h5">✔ </Typography>
            <br /> <br />
            <Typography variant="h5">
              ✔ Users are able to view found items.{" "}
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
          Date Lost
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
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
            <Controller
              name="category"
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
                  id="category"
                  label="Category"
                  error={Boolean(errors.category)}
                  helperText={
                    errors.category
                      ? errors.category.type === "minLength"
                        ? "Category length should be more than 1"
                        : "Categoryis required"
                      : ""
                  }
                  {...field}
                />
              )}
            />
          </List>
        </Grid>
        <Grid item xs={6}>
          Time Lost
          <div>
            <Datetime dateFormat={false} style={{ width: "100%" }} />
          </div>
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
        <Grid item xs={6}></Grid>

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
          Upload Image
          <Container
            style={{
              minWidth: 200,
              maxWidth: 200,
              minHeight: 250,
              maxHeight: 250,
            }}
          >
            <div className="App">
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                value={imageInput}
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  uploader(e);
                  setImageInput(event.target.value);
                }}
              />
              {result && (
                <Image
                  ref={imageRef}
                  src={result}
                  width={200}
                  height={250}
                  alt=""
                />
              )}
            </div>
          </Container>
        </Grid>
      </Grid>
    </Navbar>
  );
}
