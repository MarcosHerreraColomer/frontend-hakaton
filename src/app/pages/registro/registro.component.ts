import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuario = {
    dni: '',
    nombre: '',
    email: '',
    cp: '',
    municipio_id: null,
    es_admin: false // siempre false por seguridad
  };

  municipios: any[] = [];
  municipiosFiltrados: any[] = [];
  busquedaMunicipio: string = '';
  contrasenaGenerada: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/api/municipios')
      .subscribe({
        next: data => {
          console.log('✅ Municipios cargados:', data);
          this.municipios = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
          this.municipiosFiltrados = [...this.municipios];
        },
        error: err => {
          console.error('❌ Error al cargar municipios:', err);
        }
      });
  }

  filtrarMunicipios(): void {
    const termino = this.busquedaMunicipio.toLowerCase();
    this.municipiosFiltrados = this.municipios.filter(m =>
      m.nombre.toLowerCase().includes(termino)
    );
  }

  registrarUsuario(): void {
    this.usuario.es_admin = false; // forzamos a false en el código

    console.log('📨 Enviando usuario:', this.usuario);
    this.http.post<any>('http://localhost:8080/api/usuarios', this.usuario)
      .subscribe({
        next: (response) => {
          this.contrasenaGenerada = response.contrasena;
          console.log('✅ Usuario registrado correctamente:', response);
        },
        error: (err) => {
          console.error('❌ Error al registrar usuario:', err);
        }
      });
  }
}
