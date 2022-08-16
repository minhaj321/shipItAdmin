import Open from '../Status/Open';
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions,Box } from '@mui/material';
import './Cards.css';

export default function TripCard({tripData,route}) {

  const navigate = useNavigate();
  const setRoute = ()=>{
    navigate(route);
  }


  return (
    <Card sx={{ maxWidth: 345 }}  className="general-card">
      <CardActionArea>
        {/* <CardMedia
        className="card_image"
          component="img"
          height="140"
          image="https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297__340.jpg"
          alt="green iguana"
        /> */}
        <CardContent align="left">
          <Typography pt={2} pl={1} gutterBottom variant="p" component="div">
          Trip Id#{tripData._id}
          </Typography>
          <Typography variant="body2" pt={1}  pl={1} color="text.secondary">
            From : {tripData.departureCity}
          </Typography>
          <Typography variant="body2" pt={1}  pl={1} color="text.secondary">
            To : {tripData.destinationCity}
          </Typography>
          <Typography variant="body2" pt={1}  pl={1} color="text.secondary">
            Status : <Open/>
          </Typography>
        </CardContent>
      <Box style={{cursor:'pointer'}} 
            onClick={()=>setRoute()}>
      <Typography  align="right" pr={2} variant="body2">View Details  &gt;</Typography>
      </Box>
      </CardActionArea>
      <CardActions/>
    </Card>
  );
}