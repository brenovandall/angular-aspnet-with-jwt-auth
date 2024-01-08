import { ListCategoria } from "../categoria-models/list-categoria";

export interface AddPostagemModel {
    titulo: string;
    descricao: string;
    conteudo: string;
    urlImagem: string;
    urlPostagem: string;
    dataAdicionada: Date;
    autor: string;
    status: boolean;
    categorias: string[];
}
