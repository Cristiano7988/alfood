import { Button, Paper, Table, TableContainer, TableHead, TableRow } from "@mui/material"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import http from "../../../http"
import IRestaurante from "../../../interfaces/IRestaurante"

const AdministracaoRestaurantes = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    const excluir = (restauranteASerExcluido: IRestaurante) => {
        http.delete(`restaurantes/${restauranteASerExcluido.id}/`)
            .then(() => {
                const listaRestaurantes = restaurantes.filter(restaurante => restaurante.id != restauranteASerExcluido.id);
                setRestaurantes(listaRestaurantes);
            })
    }

    useEffect(() => {
        http.get("restaurantes/")
            .then((resposta) => {
                setRestaurantes(resposta.data);
            })
            .catch((erro) => {
                console.log(erro)
            })
    }, []);

    return (<>
        <h1>Adm restaurantes</h1>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map((restaurante) =>
                        <TableRow key={restaurante.id}>
                            <TableCell>
                                {restaurante.nome}
                            </TableCell>
                            <TableCell>
                                [ <Link to={`/admin/restaurantes/${restaurante.id}/`}>editar</Link> ]
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" color="error" onClick={() => excluir(restaurante)}>excluir</Button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    </>)
}

export default AdministracaoRestaurantes
