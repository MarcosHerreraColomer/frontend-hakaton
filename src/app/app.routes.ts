import { Routes } from '@angular/router';

// Importación de todos tus componentes
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { VotacionComponent } from './pages/votacion/votacion.component';
import { AdminComponent } from './pages/admin/admin.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { VotacionSelectorComponent } from './pages/votacion-selector/votacion-selector.component';

export const routes: Routes = [
  { path: '', component: MenuComponent },                               // Raíz: menú principal
  { path: 'registro', component: RegistroComponent },                   // Registro de usuarios
  { path: 'login', component: LoginComponent },                         // Inicio de sesión
  { path: 'menu', component: MenuComponent },                           // Menú del votante o admin
  { path: 'seleccionar-votacion', component: VotacionSelectorComponent }, // Selector de tipo de votación
  { path: 'votar/:tipo', component: VotacionComponent },                // Votación municipal/autonómica/nacional
  { path: 'admin', component: AdminComponent },                         // Panel de administración
  { path: '**', component: NotFoundComponent }                          // Página 404
];
