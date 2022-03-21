import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import jason from "../public/images/jason.png";
import kevin from "../public/images/kevin.png";
import ian from "../public/images/ian.png";
import russel from "../public/images/russel.png";
//
export default function ContactUs() {
  return (
    <Navbar title={"Contact-Us"}>
      <div>
        <Typography
          style={{ textAlign: "center", marginTop: "20px" }}
          variant="h2"
        >
          Contact Us
        </Typography>
        <div style={{ marginTop: "30px" }}></div>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Image src={jason} height={350} width={350} />
              </CardContent>
              <CardContent>
                <Typography>Name: Jason G. Landayan Jr.</Typography>
              </CardContent>
              <CardContent>
                <Typography>Course: BSIT major in Web Development </Typography>
              </CardContent>
              <CardContent>
                <Typography>Contact No: 09774485163</Typography>
              </CardContent>
              <CardContent>
                <Typography>Email: landayanjason06@gmail.com</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Image src={kevin} height={350} width={350} />
              </CardContent>
              <CardContent>
                <Typography>Name: Kevin Charles A. Soriano</Typography>
              </CardContent>
              <CardContent>
                <Typography>Course: BSIT major in Web Development </Typography>
              </CardContent>
              <CardContent>
                <Typography>Contact No: 09558442291</Typography>
              </CardContent>
              <CardContent>
                <Typography>Email: sorianokevin1008@gmail.com</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Image src={ian} height={350} width={350} />
              </CardContent>
              <CardContent>
                <Typography>Name:Ian Roxas</Typography>
              </CardContent>
              <CardContent>
                <Typography>Course: BSIT major in Web Development </Typography>
              </CardContent>
              <CardContent>
                <Typography>Contact No: 09491061869</Typography>
              </CardContent>
              <CardContent>
                <Typography>Email: Iannroxas0@gmail.com</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Image src={russel} height={350} width={350} />
              </CardContent>
              <CardContent>
                <Typography>Name: Russel Sandy Flores </Typography>
              </CardContent>
              <CardContent>
                <Typography>Course: BSIT major in Web Development </Typography>
              </CardContent>
              <CardContent>
                <Typography>Contact No: 09605619325 </Typography>
              </CardContent>
              <CardContent>
                <Typography>Email: floresrussel2626@gmail.com </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Navbar>
  );
}
