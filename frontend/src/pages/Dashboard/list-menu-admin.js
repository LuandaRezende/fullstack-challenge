import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';

function handleLogout() {
  localStorage.clear();
}

export const mainListItems = (
    <div>
      <Link to="/dashboard" style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" component="a" style={{ textDecoration: 'none' }} />
        </ListItem>
      </Link>
      <Link to="/dashboard/new-transaction" style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon>
            <MonetizationOnIcon />
          </ListItemIcon>
          <ListItemText primary="Nova transação" component="a" style={{ textDecoration: 'none' }} />
        </ListItem>
      </Link>
    </div>
);

export const secondaryListItems = (
  <div>
    <Link to="/dashboard/profile" style={{ textDecoration: 'none' }}>
      <ListItem button>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Meu perfil" component="a" />
      </ListItem>
    </Link>
    <Link to="/" style={{ textDecoration: 'none' }}>
      <ListItem button>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon >
        <ListItemText component="a" onClick={handleLogout} primary="Logout" />
      </ListItem>
    </Link>
  </div>
);