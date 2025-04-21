import { Routes } from '@angular/router';

// Importación de todos tus componentes
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { VotacionComponent } from './pages/votacion/votacion.component';
import { AdminComponent } from './pages/admin/admin.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: MenuComponent },               // raíz → menú principal (si ya ha iniciado sesión)
  { path: 'registro', component: RegistroComponent },   // página de registro de usuarios
  { path: 'login', component: LoginComponent },         // página de inicio de sesión
  { path: 'menu', component: MenuComponent },           // menú principal del votante o admin
  { path: 'votar', component: VotacionComponent },      // página de votación (muestra listas por tipo)
  { path: 'admin', component: AdminComponent },         // panel de administración para gestionar elecciones
  { path: '**', component: NotFoundComponent }          // página 404 para rutas inexistentes
];
