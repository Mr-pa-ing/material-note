import React from 'react';
import {
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Avatar
} from '@material-ui/core';
import {
  SubjectOutlined,
  AddCircleOutlineOutlined
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';
import { useNavigate, useLocation } from 'react-router-dom';
import { format } from 'date-fns';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
  page: {
    background: '#f9f9f9',
    width: '100%',
    padding: theme.spacing(3)
  },
  drawer: {
    width: drawerWidth
  },
  drawerPage: {
    width: drawerWidth
  },
  root: {
    display: 'flex'
  },
  active: {
    background: '#f4f4f4'
  },
  title: {
    padding: theme.spacing(2)
  },
  appbar: {
    width: `calc(100% - ${drawerWidth}px)`
  },
  toolbar: theme.mixins.toolbar,
  date: {
    flexGrow: 1
  }
}
})

const Layout = ({children}) => {
  const classes = useStyles();
  let navigate = useNavigate();
  let location = useLocation();
  const menuItem = [
    {
      text: 'My Note',
      icon: <SubjectOutlined color='secondary' />,
      path: '/'
    },
    {
      text: 'Create Note',
      icon: <AddCircleOutlineOutlined color='secondary' />,
      path: '/create'
    }
  ]

  return (
    <div className={classes.root}>
      {/* app bar */}
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar>
          <Typography className={classes.date}>Today is the {format(new Date(), 'do MMMM Y')}</Typography>
          <Toolbar>Mario</Toolbar>
          <Avatar src='./image-avatar.png' />
        </Toolbar>
      </AppBar>
      {/* side drawer */}
      <Drawer
        variant='permanent'
        className={classes.drawer}
        anchor='left'
        classes={{ paper: classes.drawerPage }}
      >
        <div>
          <Typography variant='h5' className={classes.title}>P7 Notes</Typography>
        </div>
        {/* list/link */}
        <List>
          {
            menuItem.map(menu => (
              <ListItem 
                key={menu.text} 
                button
                onClick={() => navigate(menu.path)}
                className={location.pathname == menu.path ? classes.active : null}
              >
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.text} />
              </ListItem>
            ))
          }
        </List>
      </Drawer>

      <div className={classes.page}>
        <div className={classes.toolbar} />
        {children}
      </div>
    </div>
  )
}

export default Layout;
