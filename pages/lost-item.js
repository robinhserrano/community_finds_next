import { Grid, List, ListItem, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import useStyles from "../utils/styles";

//

export default function LostItem() {
  const classes = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  return (
    <Navbar>
      <div>
        <Typography variant="h3">Submit Lost Items</Typography>
        <Typography variant="h5">✔ </Typography>
        <Typography variant="h5">
          ✔ Users are able to view found items.{" "}
        </Typography>
        <Typography variant="h5">
          ✔ The Location Is Only Limited to Sto. Domingo Angeles City.
        </Typography>
      </div>
      {/* pasok sa grid para mahati screeen sosa */}
      <form>
        {/* item Lost */}
        <List className={classes.inputField}>
          <Typography>Item Lost *</Typography>
          <span>
            (Dog, Jacket, Smartphone, Wallet, etc.) This field may auto-populate
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
        {/* Primary Color */}
        <List className={classes.inputField}>
          <Typography>Primary Color *</Typography>
          <span>
            Please add the color that best represents the lost property (Black,
            Red, Blue, etc.)
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
                      : "Primary Color is required"
                    : ""
                }
                {...field}
              />
            )}
          />
        </List>
        {/* Secondary Item Color */}
        <List className={classes.inputField}>
          <Typography>Secondary Item Color *</Typography>
          <span>
            Please add a color that acts as a less dominant (Leave blank if not
            applicable.)
          </span>
          <div style={{ marginBottom: 10 }}></div>
          <Controller
            name="category"
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
      </form>
    </Navbar>
  );
}
