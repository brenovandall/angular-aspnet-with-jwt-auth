import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoriaServiceService } from '../services/categoria-service.service';
import { ListCategoria } from '../categoria-models/list-categoria';
import { FormsModule } from '@angular/forms';
import { EditCategoria } from '../categoria-models/edit-categoria';

@Component({
  selector: 'app-edit-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-categoria.component.html',
  styleUrl: './edit-categoria.component.css'
})
export class EditCategoriaComponent implements OnInit, OnDestroy {

  id: string | null = null;
  paramsSubs?: Subscription;
  categoria?: ListCategoria;
  subs?: Subscription;
  delSubs?: Subscription;

  constructor(private route: ActivatedRoute, private service: CategoriaServiceService, private router: Router) {}

  ngOnInit(): void {
    this.paramsSubs = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          this.service.listarApenasUmaCategoria(this.id)
          .subscribe({
            next: (res) => {
              this.categoria = res;
            }
          })
        }
      }
    })
  }

  saveChanges() {
    const newModel: EditCategoria = {
      nome: this.categoria?.nome ?? '',
      urlCategoria: this.categoria?.urlCategoria ?? ''
    }

    if (this.id) {
      this.subs = this.service.editarCategoria(this.id, newModel) 
      .subscribe({
        next: (res) => {
          this.router.navigate(['admin/list-all-categories']);
        }
      })
    }
  }

  deleteItem() {
    if (this.id) {
      this.delSubs = this.service.deletarCategoria(this.id)
      .subscribe({
        next: (res) => {
          this.router.navigate(['admin/list-all-categories']);
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.paramsSubs?.unsubscribe();
    this.subs?.unsubscribe();
    this.delSubs?.unsubscribe();
  }
  
}
