import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdicionarCategoriaModel } from '../categoria-models/add-categoria.model';
import { Observable } from 'rxjs';
import { ListCategoria } from '../categoria-models/list-categoria';
import { environment } from '../../../../environments/environment.development';
import { EditCategoria } from '../categoria-models/edit-categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaServiceService {

  constructor(private http: HttpClient) { }

  adicionarCategoriaNaBaseDeDados(model: AdicionarCategoriaModel): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/Categoria`, model);
  }
  
  listarCategorias(): Observable<ListCategoria[]> {
    return this.http.get<ListCategoria[]>(`${environment.apiBaseUrl}/api/Categoria`);
  }

  listarApenasUmaCategoria(id: string): Observable<ListCategoria> {
    return this.http.get<ListCategoria>(`${environment.apiBaseUrl}/api/Categoria/${id}`);
  }

  editarCategoria(id: string, request: EditCategoria): Observable<ListCategoria> {
    return this.http.put<ListCategoria>(`${environment.apiBaseUrl}/api/Categoria/${id}`, request);
  }

  deletarCategoria(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/api/Categoria/${id}`);
  }

}
