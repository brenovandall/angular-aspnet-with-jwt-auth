import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { CategoriaComponent } from './core/components/categoria/categoria.component';
import { AddCategoriaComponent } from './core/components/add-categoria/add-categoria.component';
import { EditCategoriaComponent } from './core/components/edit-categoria/edit-categoria.component';
import { PostagensComponent } from './core/components/postagens/postagens.component';
import { AddPostagemComponent } from './core/components/add-postagem/add-postagem.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { LoginComponent } from './core/auth/login/login.component';


export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'admin/list-all-categories',
        component: CategoriaComponent
    },
    {
        path: 'admin/add-categories',
        component: AddCategoriaComponent
    },
    {
        path: 'categorias/edit/:id',
        component: EditCategoriaComponent
    },
    {
        path: 'admin/list-all-posts',
        component: PostagensComponent
    },
    {
        path: 'admin/add-postagens',
        component: AddPostagemComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
];
