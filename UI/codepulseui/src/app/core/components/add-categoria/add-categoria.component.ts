import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdicionarCategoriaModel } from '../categoria-models/add-categoria.model';
import { CategoriaServiceService } from '../services/categoria-service.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-categoria',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-categoria.component.html',
  styleUrl: './add-categoria.component.css'
})
export class AddCategoriaComponent implements OnDestroy {

  model: AdicionarCategoriaModel;
  private categoriaSubscription?: Subscription;

  constructor(private categoriaService: CategoriaServiceService, private router: Router) {
    this.model = {
      nome: '',
      urlCategoria: ''
    }
  }

  saveChanges():void {
    this.categoriaSubscription = this.categoriaService.adicionarCategoriaNaBaseDeDados(this.model)
    .subscribe({
      next: (res) => {
        this.router.navigate(['admin/list-all-categories']);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  ngOnDestroy(): void {
    this.categoriaSubscription?.unsubscribe();
  }

}
