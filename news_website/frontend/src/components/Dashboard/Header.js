import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <Fragment className={classes.root}>
      <ul>
        <li><a> Name </a></li>
        <li><a> About Us </a></li>
        <li><a> Login</a></li>
        <li><a> Sign Up </a></li>
      </ul>
    </Fragment>
    // <div className={classes.root}>
    //   <AppBar position="static" style={{background: 'rgba(181, 98, 111, 1)'}}>
    //     <Toolbar>
    //         <Menu>

    //         </Menu>
    //         { /*Icon Here*/ }
    //       </IconButton>
    //       <Typography variant="h6" className='header1'>
    //         Test
    //       </Typography>
    //       <Button color="inherit">Login</Button>
    //     </Toolbar>
    //   </AppBar>
    // </div>
  );
}