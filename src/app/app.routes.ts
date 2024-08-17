import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
   {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'products',
    loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent), canActivate:[authGuard]
  },
  {
    path: '**',
    loadComponent: () => import('./shared/notfound/notfound.component').then(m => m.NotfoundComponent),
  },

];
