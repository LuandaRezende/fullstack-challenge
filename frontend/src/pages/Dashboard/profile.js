import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuAdmin from './menu-admin';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  registration: {
    paddingBottom: 20,
  },
  paper: {
    padding: 100,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    borderRadius: 20
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function NewTransation() {

  const classes = useStyles();

  const id = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const [name, setName] = useState(localStorage.getItem('name'));
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [password, setPassword] = useState(localStorage.getItem('password'));

  const [profile, setProfile] = useState('');

  const history = useHistory();

  useEffect(() => {
    api.get('users/data/:id', {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }).then(response => {
      setProfile(response.data);
    }).catch(err => {
      console.log(err.message);
    })
  });

  async function handleUpdate(event) {

    event.preventDefault();

    try {
      const response = await api.put('/users/' + id, { name, email, password }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);

      alert(`Editado com sucesso`);

      history.push('/dashboard/profile');

    } catch (error) {
      alert(`Falha ao editar`);
    }
  }
  return (

    <div className={classes.root}>
      <MenuAdmin title={'PROFILE'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
              <Grid item sm={12}>
                  <Paper className={classes.paper}>
                    <h1 className={classes.registration}>Meu perfil</h1>
                      <Grid container spacing={3}>
                          <Grid item xs={12}>
                              <form onSubmit={handleUpdate}>
                                  <input name="name" id="name" type="text" onChange={event => setName(event.target.value)} placeholder={profile.name} />
                                  <input type="email" id="email" name="email" onChange={event => setEmail(event.target.value)} placeholder={profile.email} />
                                  <input type="password" id="password" name="password" onChange={event => setPassword(event.target.value)} placeholder="Digite sua nova senha" />
                                  <button className="button" type="submit">Editar</button>
                              </form>
                          </Grid>
                      </Grid>
                  </Paper>
              </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}