import React,{useState} from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import './Navbar.css';

export default function ShipperStatusBar({handleDataFilter}) {
  const [value, setValue] = useState(0);

  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group" className="carrier-status-bar">
      <Button style={{width:"170px"}} onClick={()=>handleDataFilter('All')}>All</Button>
      <Button style={{width:"170px"}} onClick={()=>handleDataFilter('Active')}>Active</Button>
      <Button style={{width:"170px"}} onClick={()=>handleDataFilter('Pending')}>Pending</Button>
      <Button style={{width:"170px"}} onClick={()=>handleDataFilter('Completed')}>Completed</Button>
    </ButtonGroup>
  );
}