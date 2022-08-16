import React,{useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import Header from './../Header/Header';
import '../../styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 250;

// main div styling

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginTop:-40,
      marginLeft:-40,
    }),
  }),
);
// app bar styling
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingRight:20,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


// main function starts from here
export default function Dashboard(props) {

  var windowWidth = window.innerWidth;

  const theme = useTheme();
  const [open, setOpen] = useState(windowWidth>770 ? true : false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  var admin = JSON.parse(localStorage.getItem('admin'))

  let Dashboard_options  = [
      {name:'Dashboard', navigate_function:()=>navigate(`/dashboard/${admin._id}`)  },
      {name:'Vehicles Requests', navigate_function:()=>navigate(`/vehicle-requests`)  },
      {name :'Complaints', navigate_function:()=>navigate(`/complaints`)  }, 
      {name:'Account Requests', navigate_function:()=>navigate(`/account-requests`)  },
    ]


    return (
    <Box sx={{ width:'100%',display: 'flex',position:'absolute'}} >
      <AppBar position="fixed" open={open} style={{backgroundColor:'#1A2387'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
            style={{marginLeft:10}}
          >
            <MenuIcon />
          </IconButton>
          <div style={{position:'absolute',right:0}}>
          <Header/>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className="main_Dashboard"
        sx={{
          width: drawerWidth+40,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <div className="drawer_styled" >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} style={{color:'white'}} className="drawer-btn">
            {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <div className="Dashboard_profile_div">
        <h4>Admin</h4>
        </div>
        <List>
          {Dashboard_options.map((text, index) => (
            <ListItem  button key={index} onClick={text.navigate_function}>
              <div className="Dashboard_list_item">
              <p style={{color:'white'}}>
              {text.name}
              </p>
              </div>
            </ListItem>
          ))}
        </List>
        </div>
      </Drawer>

      <Main open={open} >
        <DrawerHeader />
        {props.children}
      </Main>
    </Box>
  );
}