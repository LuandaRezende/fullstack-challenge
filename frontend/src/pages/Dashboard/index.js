import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MenuAdmin from './menu-admin';
import Button from '@material-ui/core/button';
import { Link } from 'react-router-dom';
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
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  MuiContainerMaxWidthLg: {
    maxWidth: 500,
  }
}));

export default function Dashboard() {

  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState([]);

  const id = localStorage.getItem('id');
  const token = localStorage.getItem('token');

  const classes = useStyles();

  useEffect(() => {
    api.get('transactions/' + id, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    }).then(response => {
      setTransactions(response.data.transactions);
      setBalance(response.data.balance);
    }).catch(error => {
      alert('Error')
    })
  });

  return (

    <div className={classes.root}>
      <MenuAdmin title={'DASHBOARD'} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <Link to="/dashboard/new-transaction" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="primary">
                    Nova transação
                   </Button>
                </Link>
              </Grid>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Descrição</TableCell>
                      <TableCell align="center">Valor(R$)</TableCell>
                      <TableCell align="center">Tipo</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions && transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell align="center">
                          {transaction.title}
                        </TableCell>
                        <TableCell align="center">
                          {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transaction.value)}
                        </TableCell>
                        <TableCell align="center">
                          {transaction.type}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <h1>Saldo atual: {balance.total}</h1>
            </Grid>
          </Container>
        </main>
    </div>
  );
}