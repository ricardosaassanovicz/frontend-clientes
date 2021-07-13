import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import DialogEndereco from './Endereco';
import api from '../services/api'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    buttomCancelar: {
        marginLeft: 10
    }
}));

export default function Editar({ history, match }) {
    const classes = useStyles();
    const [cliente, setCliente] = useState({ enderecos: [] })
    const [endereco, setEndereco] = useState({})
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('')
    const [indexEndereco, setIndexEndereco] = useState(0)

    const handleCancelar = () => {
        history.push("/")
    }

    const handleText = (event) => {
        const novo = JSON.parse(JSON.stringify(cliente))
        novo[event.target.name] = event.target.value
        setCliente(novo)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(event);
        if (cliente._id) {
            await api.put(`/clientes/`, cliente).then(result => {
                const msg = "Alterado com sucesso!"
                history.push(`/${msg}`)
            }).catch(error => {
                setMsg("Todos os campos devem ser preenchidos!");
            });
        } else {
            await api.post(`/clientes/`, cliente).then(result => {
                const msg = "Cliente adicionado com sucesso!"
                history.push(`/${msg}`)
            }).catch(error => {
                setMsg("Todos os campos devem ser preenchidos!");
            });
        }
    }

    const editarEndereco = (endereco) => {
        setEndereco(endereco)
        setOpen(true);
    }

    const deletarEndereco = (endereco) => {
        cliente.enderecos = cliente.enderecos.filter(e => e._id !== endereco._id ||e.indexEndereco !== endereco.indexEndereco)
        setCliente({...cliente})
    }

    const novoEndereco = () => {
        setEndereco({indexEndereco})
        setOpen(true);
        setIndexEndereco(1 + indexEndereco);
    }

    const handleSalvarEndereco = (novoEndereco) => {
        const novosEnderecos = cliente.enderecos.filter(e => e._id !== novoEndereco._id || e.indexEndereco !== novoEndereco.indexEndereco);
        novosEnderecos.push(novoEndereco);
        cliente.enderecos = novosEnderecos
        setOpen(false)
    }

    useEffect(() => {
        async function loadCliente() {
            const response = await api.get(`/cliente/${match.params.cliente_id}`)
            setCliente(response.data)
        }

        loadCliente();
    }, [match.params.cliente_id])

    return (<>
        <Container maxWidth="md">
            <Typography variant="h2" component="h2">
                {cliente._id ? 'Editar Cliente' : 'Novo Cliente'}
            </Typography>
            {msg ? <Alert severity="error">{msg}</Alert> : <></>}
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h5" component="h2">
                            Dados Gerais
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            fullWidth
                            id="filled-uncontrolled"
                            label="Nome"
                            required
                            name="nome"
                            onChange={handleText}
                            value={cliente.nome || ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            type="cpf"
                            required
                            name="cpf"
                            onChange={handleText}
                            id="filled-uncontrolled"
                            label="CPF"
                            value={cliente.cpf || ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            fullWidth
                            required
                            type="email"
                            name="email"
                            onChange={handleText}
                            id="filled-uncontrolled"
                            label="Email"
                            value={cliente.email || ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            fullWidth
                            type="number"
                            id="filled-uncontrolled"
                            label="Telefone"
                            name="telefone"
                            onChange={handleText}
                            value={cliente.telefone || ""}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h5" component="h2">
                            Endereço
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={() => novoEndereco()} style={{ margin: '10px 0' }}>
                            Novo Endereço
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Tipo</TableCell>
                                        <TableCell align="left">Rua</TableCell>
                                        <TableCell align="left">Número</TableCell>
                                        <TableCell align="left">Bairro</TableCell>
                                        <TableCell align="left">Cidade</TableCell>
                                        <TableCell align="center">Opções</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cliente.enderecos.map((endereco, index) =>
                                        <TableRow hover key={`${endereco._id}${index}`}>
                                            <TableCell align="left">{endereco.tipo}</TableCell>
                                            <TableCell align="left">{endereco.rua}</TableCell>
                                            <TableCell align="left">{endereco.numero}</TableCell>
                                            <TableCell align="left">{endereco.bairro}</TableCell>
                                            <TableCell align="left">{endereco.cidade}</TableCell>
                                            <TableCell align="center">
                                                <IconButton aria-label="Deletar" onClick={() => deletarEndereco(endereco)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton aria-label="Alterar" onClick={() => editarEndereco(endereco)}>
                                                    <CreateIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                    <Grid item xs={12}>
                        <Button variant="contained" type="submit" color="primary">Salvar</Button>
                        <Button variant="contained" className={classes.buttomCancelar} onClick={handleCancelar}>Cancelar</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
        <DialogEndereco open={open} endereco={{ ...endereco }} setOpen={setOpen} salvarEndereco={(novoEndereco) => handleSalvarEndereco(novoEndereco)} />
    </>
    )

}