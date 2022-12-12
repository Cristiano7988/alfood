import { Paper, Table, TableContainer, TableHead, TableRow } from "@mui/material"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import axios from "axios"
import { useEffect, useState } from "react"
import Restaurante from "../../../componentes/ListaRestaurantes/Restaurante"
import IRestaurante from "../../../interfaces/IRestaurante"

const AdministracaoRestaurantes = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/v2/restaurantes/")
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map((restaurante) =>
                        <TableRow key={restaurante.id}>
                            <TableCell>
                                {restaurante.nome}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    </>)
}

export default AdministracaoRestaurantes
