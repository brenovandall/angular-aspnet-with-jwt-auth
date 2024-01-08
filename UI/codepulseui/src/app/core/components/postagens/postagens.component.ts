import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Postagem } from '../postagem-models/postagem.model';
import { Observable } from 'rxjs';
import { PostagemService } from '../postagem-service/postagem.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-postagens',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './postagens.component.html',
  styleUrl: './postagens.component.css'
})
export class PostagensComponent implements OnInit {

  postagens$?: Observable<Postagem[]>;

  constructor(private service: PostagemService) {}


  ngOnInit(): void {
    this.postagens$ = this.service.listarPostagens();  
  }

}
