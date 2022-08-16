import Pending from '../Status/Pending';
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions ,Box} from '@mui/material';

export default function AccountRequestCard({myData,route}) {

  console.log(myData)
  const navigate = useNavigate();
  const setRoute = ()=>{
    navigate(route,{state:myData});
  }


  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent align="left">
          <Typography pt={2} pl={1} gutterBottom variant="h6" component="div">
          Request #{myData._id}
          </Typography>
          <Typography variant="body2" pt={1}  pl={1} color="text.secondary">
          AccountId : {myData.accountId}
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
      <CardActions>
      </CardActions>
    </Card>
  );
}