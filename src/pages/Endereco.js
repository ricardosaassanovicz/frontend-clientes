import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

export default function DialogEndereco({ open, setOpen, endereco, salvarEndereco }) {

    const [enderecoEmAlteracao, setEnderecoEmAlteracao] = useState(false)

    const handleText = (event) => {
        const novo = { ...enderecoEmAlteracao };
        novo[event.target.name] = event.target.value
        setEnderecoEmAlteracao(novo)
    }

    const handleChangeTipo = (event) => {
        const novo = { ...enderecoEmAlteracao };
        novo.tipo = event.target.value
        setEnderecoEmAlteracao(novo)
    };

    const handleSalvarEndereco = () => {
        salvarEndereco(enderecoEmAlteracao)
    }

    useEffect(() => {
        console.log(endereco)
        setEnderecoEmAlteracao({ ...endereco })
    }, [open, endereco])

    return (
        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title" fullWidth>
            <form>
                <DialogTitle id="form-dialog-title">Endereço</DialogTitle>
                <DialogContent>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="tipo"
                                    name="tipo"
                                    value={enderecoEmAlteracao.tipo || ""}
                                    onChange={handleChangeTipo}
                                >
                                    <MenuItem value="COMERCIAL">Comercial</MenuItem>
                                    <MenuItem value="RESIDENCIAL">Residencial</MenuItem>
                                    <MenuItem value="RURAL">Rural</MenuItem>
                                    <MenuItem value="CASA_PRAIA">Casa de praia</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                id="estado"
                                required
                                label="Estado"
                                name="estado"
                                onChange={handleText}
                                value={enderecoEmAlteracao.estado || ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                id="cidade"
                                required
                                label="Cidade"
                                name="cidade"
                                onChange={handleText}
                                value={enderecoEmAlteracao.cidade || ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                id="cep"
                                required
                                label="Cep"
                                name="cep"
                                onChange={handleText}
                                value={enderecoEmAlteracao.cep || ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                id="rua"
                                required
                                label="Rua"
                                name="rua"
                                onChange={handleText}
                                value={enderecoEmAlteracao.rua || ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                id="bairro"
                                required
                                label="Bairro"
                                name="bairro"
                                onChange={handleText}
                                value={enderecoEmAlteracao.bairro || ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                id="numero"
                                required
                                type="number"
                                label="Número"
                                name="numero"
                                onChange={handleText}
                                value={enderecoEmAlteracao.numero || ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                id="complemento"
                                label="Complemento"
                                name="complemento"
                                onChange={handleText}
                                value={enderecoEmAlteracao.complemento || ""}
                            />
                        </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleSalvarEndereco} color="primary">
                        Salvar
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )

}