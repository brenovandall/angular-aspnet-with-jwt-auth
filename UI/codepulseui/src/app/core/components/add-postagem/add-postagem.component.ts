import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { AddPostagemModel } from '../postagem-models/add-postagem-model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostagemService } from '../postagem-service/postagem.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ListCategoria } from '../categoria-models/list-categoria';
import { CategoriaServiceService } from '../services/categoria-service.service';

@Component({
  selector: 'app-add-postagem',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-postagem.component.html',
  styleUrl: './add-postagem.component.css'
})
export class AddPostagemComponent implements OnDestroy, OnInit {
  model: AddPostagemModel;
  subs?: Subscription;
  categorias$?: Observable<ListCategoria[]>;
  constructor(
    private service: PostagemService, 
    private router: Router,
    private categoriasService: CategoriaServiceService) {
    this.model = {
      titulo: '',
      descricao: '',
      conteudo: '',
      urlImagem: '',
      urlPostagem: '',
      dataAdicionada: new Date(),
      autor: '',
      status: true,
      categorias: []
    }
  }
  ngOnInit(): void {
    this.categorias$ = this.categoriasService.listarCategorias();
  }

  saveData(): void {
    console.log(this.model);
     this.model
    this.subs = this.service.criarPostagem(this.model)
    .subscribe({
      next: (res) => {
        this.router.navigate(['/admin/list-all-posts']);
      }
    })
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }

}
