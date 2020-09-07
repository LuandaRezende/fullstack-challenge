import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuAdmin from './menu-admin';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

export default function NewTransaction() {

  const [user] = useState('');
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('outcome');

  const history = useHistory();

  const token = localStorage.getItem('token');

  const classes = useStyles();

  function notifySuccess(){
    toast('Cadastrado com sucesso!');
  }

  function notifyError(){
      toast('Falha ao cadastrar nova transação');
  }

  async function handleNewTransaction(e) {
    e.preventDefault();

    const data = {
      user,
      title,
      value,
      type,
    };

    data.user = localStorage.getItem('id');

    try {
      await api.post('transactions/register', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(response => {
        setType(type);
        notifySuccess();
        setTimeout(() => {
            history.push('/dashboard')
         }, 5000);
      })
    } catch (error) {
      notifyError();
    }
  }

  return (
    <div className={classes.root}>
      <MenuAdmin title={'NOVA TRANSAÇÃO'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                <Grid item sm={12}>
                    <Paper className={classes.paper}>
                      <h1 className={classes.registration}>Cadastro de nova transação</h1>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                              <form onSubmit={handleNewTransaction}>
                                  <input placeholder="Nome do produto" value={title} onChange={e => setTitle(e.target.value)} />
                                  <input placeholder="Valor em R$ *sem (,) e (.)" value={value} onChange={e => setValue(e.target.value)} />
                                    <select onChange={event => setType(event.target.value)}>
                                      <option value="outcome" >Outcome</option>
                                      <option value="income" >Income</option>
                                    </select>
                                  <button className="button" type="submit">Cadastrar</button>
                                  <ToastContainer />
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