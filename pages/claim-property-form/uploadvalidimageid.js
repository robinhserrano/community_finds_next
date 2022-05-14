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
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { ITEM_OWNER_INFORMATION } from "../../redux/actionTypes";

var ValidPicture;

export default function ValidImageUploader(props) {
  const { itemvalidimageidValue } = useSelector((state) => state.page);
  const dispatch = useDispatch();

  const hiddenFileInput = useRef(null);
  const [pictureInput, setPictureInput] = useState("");
  const [imagepicture, setImagePicture] = useState("");

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

  function displayValidIdImage() {
    const [result, setValidImageId] = React.useState("");

    function uploader(i) {
      const imageFile = i.target.files[0];

      const reader = new FileReader();
      reader.addEventListener("load", (i) => {
        setValidImageId(i.target.result);
      });

      reader.readAsDataURL(imageFile);
    }

    return { result, uploader };
  }

  const { result, uploader } = displayValidIdImage();

  return (
    <div>
      <div style={{ marginBottom: 10 }}></div>
      <input
        type="file"
        ref={hiddenFileInput}
        value={pictureInput}
        onChange={(i) => {
          try {
            if (i.target.files[0].size < 900000) {
              console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
              console.log(i.target.files[0].size);
              console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
              setImagePicture(i.target.files[0]);
              uploader(i);
              setPictureInput(event.target.value);
              ValidPicture = event.target.value;
              console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
              console.log(ValidPicture);
              console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
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

      <Button
        style={{
          background: "#366e97",
          color: "white",
          width: "70px",
          height: "70px",
        }}
        onClick={() =>
          dispatch({
            type: ITEM_OWNER_INFORMATION,
            payload: {
              itemvalidimageidValue: result,
            },
          })
        }
      >
        Submit
      </Button>
    </div>
  );
}

export { ValidPicture };
