import React, { useState, useContext, useEffect, useRef } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";

export default function ValidImageUploader() {
  const hiddenFileInput = useRef(null);
  const [imageInput, setImageInput] = useState("");
  const [image, setImage] = useState("");

  const handleChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      const body = new FormData();

      body.append("image", i);
      console.log("bbbbbbbbbbbbbbbbbbbbbbbbb");
      console.log(i.size);
      console.log("bbbbbbbbbbbbbbbbbbbbbbbbb");
    }
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  function useDisplayImage() {
    const [result, setResult] = React.useState("");

    function uploader(i) {
      const imageFile = i.target.files[0];

      const reader = new FileReader();
      reader.addEventListener("load", (i) => {
        setResult(i.target.result);
      });

      reader.readAsDataURL(imageFile);
    }

    return { result, uploader };
  }

  const { result, uploader } = useDisplayImage();

  return (
    <div>
      <div style={{ marginBottom: 10 }}></div>
      <input
        type="file"
        ref={hiddenFileInput}
        value={imageInput}
        onChange={(i) => {
          try {
            if (i.target.files[0].size < 900000) {
              console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
              console.log(i.target.files[0].size);
              console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
              setImage(i.target.files[0]);
              uploader(i);
              setImageInput(event.target.value);
            } else {
              alert("Image size is too large");
            }
          } catch (err) {
            alert(err);
          }
        }}
        accept="image/*"
        style={{ display: "none" }}
      />

      <Button variant="contained" component="span" onClick={handleClick}>
        Upload
      </Button>
      <div>
        {result && (
          <Image
            ref={hiddenFileInput}
            src={result}
            width={200}
            height={250}
            alt=""
          />
        )}
      </div>
    </div>
  );
}
