import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  datosLogin = {
    dni: '',
    contrasena: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    this.http.post<any>('http://localhost:8080/api/auth/login', this.datosLogin)
      .subscribe({
        next: (res) => {
          if (res.token) {
            localStorage.setItem('token', res.token);
            console.log('✅ Token guardado:', res.token);

            // 🏙️ Guardar municipio si lo hay
            if (res.usuario && res.usuario.municipio && res.usuario.municipio.id) {
              localStorage.setItem('municipio_id', res.usuario.municipio.id);
              console.log('🏙️ municipio_id guardado:', res.usuario.municipio.id);
            }

            // 👑 Si es admin (DNI concreto), ir a /admin
            if (this.datosLogin.dni === '99999999Z') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/seleccionar-votacion']);
            }
          } else {
            console.error('❌ Login incorrecto:', res.error);
            alert('DNI o contraseña incorrectos');
          }
        },
        error: (err) => {
          console.error('❌ Error al iniciar sesión:', err);
          alert('Error en el servidor o credenciales incorrectas');
        }
      });
  }
}
