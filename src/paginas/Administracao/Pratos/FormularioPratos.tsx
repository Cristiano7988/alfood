import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";
import IRestaurante from "../../../interfaces/IRestaurante";
import ITag from "../../../interfaces/ITag";

const FormularioPrato = () => {
    const parametros = useParams();

    useEffect(() => {
        http.get<{ tags: ITag[] }>('tags/')
        .then(resposta => setTags(resposta.data.tags))

        http.get<IRestaurante[]>('restaurantes/')
        .then(resposta => setRestaurantes(resposta.data))

        if (parametros.id) {
            http.get<IPrato>(`pratos/${parametros.id}/`)
            .then((resposta) => {
                setNomePrato(resposta.data.nome);
                setDescricaoPrato(resposta.data.descricao);
                setTagPrato(resposta.data.tag);
                setImagem(resposta.data.imagem);
                setRestaurante(resposta.data.restaurante);
            })
        }
    }, [parametros])

    const [nomePrato, setNomePrato] = useState('');
    const [descricaoPrato, setDescricaoPrato] = useState('');
    const [tagPrato, setTagPrato] = useState('');
    const [tags, setTags] = useState<ITag[]>([]);
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
    const [restaurante, setRestaurante] = useState<number | null>(null);
    const [imagem, setImagem] = useState<File | string>("");

    const salvarImagem = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if (evento.target.files?.length) {
            setImagem(evento.target.files[0]);
        } else {
            setImagem("");
        }
    }

    const handleSubmit = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        const formData = new FormData();

        formData.append('nome', nomePrato);
        formData.append('tag', tagPrato);
        formData.append('descricao', descricaoPrato);
        if (restaurante) formData.append('restaurante', restaurante.toString());
        if (imagem) formData.append('imagem', imagem)
        
        if (parametros.id) {
            http.request({
                url: "pratos/"+parametros.id+"/",
                method: "PUT",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                data: formData
            })
            .then(() => {
                setNomePrato('');
                setDescricaoPrato('');
                setTagPrato('');
                setRestaurante(null);
                setImagem("");
                alert("Prato atualizado")
            })
            .catch((erro) => {
                console.log(erro)
            })
        } else {
            http.request({
                url: "pratos/",
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                data: formData
            })
            .then(() => {
                setNomePrato('');
                setDescricaoPrato('');
                setTagPrato('');
                setRestaurante(null);
                setImagem("");
                alert("Prato cadastrado")
            })
            .catch((erro) => {
                console.log(erro)
            })
        }
    }

    return (
        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
            <Typography component="h1" variant="h6">Formulário de pratos</Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField 
                    value={nomePrato}
                    onChange={evento => setNomePrato(evento.target.value)}
                    label="Nome do prato"
                    required
                    fullWidth
                    margin="dense"
                />
                <TextField 
                    value={descricaoPrato}
                    onChange={evento => setDescricaoPrato(evento.target.value)}
                    label="Descricao do prato"
                    required
                    fullWidth
                    margin="dense"
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel id="select-tag">Tags</InputLabel>
                    <Select labelId="select-tag" value={tagPrato} onChange={(e) => setTagPrato(e.target.value)}>
                        {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>{tag.value}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                    <InputLabel id="select-restaurante">Restaurantes</InputLabel>
                    <Select labelId="select-restaurante" value={restaurante} onChange={(e) => typeof e.target.value === "number" && setRestaurante(e.target.value)}>
                        {restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>{restaurante.nome}</MenuItem>)}
                    </Select>
                </FormControl>
                <input type="file" onChange={salvarImagem} />
                <Button sx={{ marginTop: 1 }} fullWidth type="submit" variant="outlined">Salvar</Button>
            </Box>
        </Box>
    );
}

export default FormularioPrato
