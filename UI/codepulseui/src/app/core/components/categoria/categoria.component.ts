import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriaServiceService } from '../services/categoria-service.service';
import { ListCategoria } from '../categoria-models/list-categoria';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AddCategoriaComponent } from '../add-categoria/add-categoria.component';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [RouterLink, AddCategoriaComponent, CommonModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent implements OnInit {

  categorias$?: Observable<ListCategoria[]>

  constructor(private service: CategoriaServiceService) {}
  
  ngOnInit(): void {
    this.categorias$ = this.service.listarCategorias();
  }
}
