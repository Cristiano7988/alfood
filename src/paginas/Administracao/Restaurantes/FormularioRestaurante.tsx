import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioRestaurante = () => {
    const parametros = useParams();

    useEffect(() => {
        if (parametros.id) {
            axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
            .then((resposta) => {
                setNomeRestaurante(resposta.data.nome);
            })
        }
    }, [parametros])

    const [nomeRestaurante, setNomeRestaurante] = useState('');

    const handleSubmit = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        if (parametros.id) {
            axios.put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
            .then(() => {
                alert("Restaurante atualizado")
            })
            .catch((erro) => {
                console.log(erro)
            })
        } else {
            axios.post("http://localhost:8000/api/v2/restaurantes/", {
                nome: nomeRestaurante
            })
            .then(() => {
                alert("Restaurante cadastrado")
            })
            .catch((erro) => {
                console.log(erro)
            })
        }
    }

    return (
        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
            <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField 
                    value={nomeRestaurante}
                    onChange={evento => setNomeRestaurante(evento.target.value)}
                    label="Nome do restaurante"
                    required
                    fullWidth
                />
                <Button sx={{ marginTop: 1 }} fullWidth type="submit" variant="outlined">Salvar</Button>
            </Box>
        </Box>
    );
}

export default FormularioRestaurante
