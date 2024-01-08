import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddPostagemModel } from '../postagem-models/add-postagem-model';
import { Postagem } from '../postagem-models/postagem.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  criarPostagem(data: AddPostagemModel): Observable<Postagem> {
    return this.http.post<Postagem>(`${environment.apiBaseUrl}/api/Postagem`, data);
  }

  listarPostagens(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(`${environment.apiBaseUrl}/api/Postagem`);
  }

}
