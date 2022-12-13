import { Button, TextField } from '@mui/material';
import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

interface IParametrosDeBusca {
  search?: string
  ordering?: string
}

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState("");
  const [paginaAnterior, setPaginaAnterior] = useState("");
  const [busca, setBusca] = useState("");

  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {
    axios.get<IPaginacao<IRestaurante>>(url, opcoes)
      .then((resposta) => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
        setPaginaAnterior(resposta.data.previous);
      })
      .catch((erro) => {
        console.log(erro)
      })
  }

  const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const opcoes = {
      params: {

      } as IParametrosDeBusca
    }

    if (busca) opcoes.params.search = busca
    carregarDados("http://localhost:8000/api/v1/restaurantes/", opcoes);
  }

  useEffect(() => {
    carregarDados("http://localhost:8000/api/v1/restaurantes/")
  }, [])

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    <form onSubmit={buscar}>
      <TextField value={busca} onChange={evento => setBusca(evento.target.value)} />
      <Button type="submit">Buscar</Button>
    </form>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {proximaPagina && <button onClick={() => carregarDados(proximaPagina)}>
      Próxima página
    </button>}
    {paginaAnterior && <button onClick={() => carregarDados(paginaAnterior)}>
      Página Anterior
    </button>}
  </section>)
}

export default ListaRestaurantes