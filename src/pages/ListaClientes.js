import React, { useEffect, useState } from 'react'
import './css/ListaClientes.css'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

import api from '../services/api'

const useStyles = makeStyles({
    table: {
        width: '100%',
    },
});

export default function ListaClientes({ history, match }) {

    const classes = useStyles();
    const [clientes, setClientes] = useState([])

    useEffect(() => {
        async function loadClientes() {
            const response = await api.get('/clientes')
            setClientes(response.data)
        }
        loadClientes();
    }, [match.params.msg])

    const alterar = async (cliente_id) => {
        history.push(`/cliente/${cliente_id}`)
    }

    const novo = async () => {
        history.push(`/cliente/novo`)
    }

    const deletar = async (id) => {
        await api.delete(`/cliente/${id}`).then(result => {
            const msg = "Registro excluido!"
            history.push(`/${msg}`)
        })
    }

    return (
        <Container maxWidth="lg">

            <Typography variant="h2" component="h2">
                Lista de Clientes
            </Typography>
            
            {match.params.msg ? <Alert severity="success">{match.params.msg}</Alert> : <></>}
            <Button variant="contained" color="primary" onClick={() => novo()} style={{margin: '10px 0'}}>
                Novo Cliente
            </Button>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Nome</TableCell>
                            <TableCell align="left">CPF</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Telefone</TableCell>
                            <TableCell align="center">Opções</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clientes.map((cliente) => (
                            <TableRow hover key={cliente._id}>
                                <TableCell align="left">{cliente.nome}</TableCell>
                                <TableCell align="left">{cliente.cpf}</TableCell>
                                <TableCell align="left">{cliente.email}</TableCell>
                                <TableCell align="left">{cliente.telefone}</TableCell>
                                <TableCell align="center">
                                    <IconButton aria-label="Deletar"  onClick={() => deletar(cliente._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton aria-label="Alterar" onClick={() => alterar(cliente._id)}>
                                        <CreateIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}