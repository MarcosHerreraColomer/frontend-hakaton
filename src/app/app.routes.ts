import { Routes, RouterModule } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { VotacionComponent } from './pages/votacion/votacion.component';
import { AdminComponent } from './pages/admin/admin.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { VotacionSelectorComponent } from './pages/votacion-selector/votacion-selector.component';

export const routes: Routes = [
  { path: '', component: MenuComponent, pathMatch: 'full' }, // Inicio
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'seleccionar-votacion', component: VotacionSelectorComponent },
  { path: 'votar/:tipo', component: VotacionComponent },

  { path: 'admin', component: AdminComponent }, // ✅ AÑADIDO

  { path: '**', component: NotFoundComponent }  // 404
];

export const RoutingModule = RouterModule.forRoot(routes);
