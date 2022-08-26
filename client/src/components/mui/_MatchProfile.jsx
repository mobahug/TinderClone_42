import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownIcon from "@mui/icons-material/ThumbDownAlt";
import Box from "@mui/material/Box";
import PhotoFinder from "../apis/Matcha";

const theme = createTheme();

export default function MatchProfile() {
  const { photo, setPhoto } = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PhotoFinder.get("photo/1");
        console.log(response.data.data);
        setPhoto(response.data.data.photo);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        />
        <Box>
          <Card sx={{ maxWidth: 345, marginLeft: 3 }}>
            <CardMedia
              component="img"
              height="248"
              image={photo.uri}
              alt="asd"
            />
            <CardHeader
              // action={
              //   <IconButton aria-label="settings">
              //     <MoreVertIcon />
              //   </IconButton>
              // }
              title="Anna, 25"
            />
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon fontSize="large" />
              </IconButton>
              <IconButton aria-label="share">
                <ThumbDownIcon fontSize="large" />
              </IconButton>
              {/* <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore> */}
            </CardActions>
            <CardContent>
              <Typography paragraph>
                Im studying at hive Helsinki, my hobbies are tennis
              </Typography>
              <Typography paragraph>
                <b>#tennis</b>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
