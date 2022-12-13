import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const FormularioRestaurante = () => {
    const [nomeRestaurante, setNomeRestaurante] = useState('');

    const handleSubmit = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
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

    return (<form onSubmit={handleSubmit}>
        <TextField 
            onChange={evento => setNomeRestaurante(evento.target.value)}
            label="Nome do restaurante"
        />
        <Button type="submit">Salvar</Button>
    </form>);
}

export default FormularioRestaurante
