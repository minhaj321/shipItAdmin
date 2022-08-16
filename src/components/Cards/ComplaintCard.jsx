import Pending from '../Status/Pending.jsx';
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions,Box } from '@mui/material';

export default function ComplaintCard({myData,route}) {

  const navigate = useNavigate();
  const setRoute = ()=>{
    navigate(route,{state:myData});
  }

console.log(myData)
  return (
    <Card sx={{ maxWidth: 345 }} className="general-card">
      <CardActionArea>
        {/* <CardMedia
          component="img"
          height="140"
          image="https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297__340.jpg"
          alt="green iguana"
        /> */}
        <CardContent align="left">
          <Typography pt={2} pl={1} gutterBottom variant="h6" component="div">
          Complaint #{myData._id}
          </Typography>
          <Typography variant="body2" pt={1}  pl={1} color="text.secondary">
          ShipperId : {myData.shipperId}
          </Typography>
          <Typography variant="body2" pt={1}  pl={1} color="text.secondary">
          CarrierId : {myData.carrierId}
          </Typography>
          <Typography variant="body2" pt={1}  pl={1} color="text.secondary">
          ShipmentId : {myData.shipmentId} 
          </Typography>
          <Typography variant="body2" pt={1}  pl={1} color="text.secondary">
            Status : <Pending/>
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