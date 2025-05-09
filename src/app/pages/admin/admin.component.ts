import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  nuevaEleccion = {
    nombre: '',
    tipo: '',
    fecha_inicio: '',
    fecha_fin: '',
    codigo_ambito: ''
  };

  nuevoPartido = {
    nombre: '',
    siglas: '',
    ambito: '',
    codigoAmbito: '',
    cabezaLista: ''
  };

  municipios: any[] = [];
  busquedaMunicipio: string = '';
  municipioSeleccionadoId: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/api/municipios').subscribe(data => {
      this.municipios = data;
    });
  }

  municipiosFiltrados(): any[] {
    if (!this.busquedaMunicipio.trim()) return this.municipios;
    const texto = this.busquedaMunicipio.toLowerCase();
    return this.municipios.filter(m =>
      m.nombre.toLowerCase().includes(texto) ||
      m.provincia?.toLowerCase().includes(texto) ||
      m.comunidad_autonoma?.toLowerCase().includes(texto)
    );
  }

  seleccionarMunicipio(id: string): void {
    const municipioSeleccionado = this.municipios.find(m => m.id == id);
    if (municipioSeleccionado) {
      this.nuevoPartido.codigoAmbito = municipioSeleccionado.id.toString();
      this.municipioSeleccionadoId = municipioSeleccionado.id.toString();
    }
  }

  crearEleccion() {
    const eleccionFormateada = {
      ...this.nuevaEleccion,
      fecha_inicio: this.nuevaEleccion.fecha_inicio + 'T00:00:00',
      fecha_fin: this.nuevaEleccion.fecha_fin + 'T00:00:00'
    };

    this.http.post('http://localhost:8080/api/admin/eleccion', eleccionFormateada)
      .subscribe({
        next: () => alert('✅ Elección creada correctamente'),
        error: (err) => {
          console.error('❌ Error al crear elección:', err);
          alert('❌ Error al crear elección. Revisa los campos.');
        }
      });
  }

  crearPartido() {
    console.log('📦 Enviando nuevo partido:', this.nuevoPartido);

    this.http.post('http://localhost:8080/api/admin/partido', this.nuevoPartido)
      .subscribe({
        next: () => alert('✅ Partido creado correctamente'),
        error: (err) => {
          console.error('❌ Error al crear partido:', err);
          alert('❌ Error al crear partido. Revisa los campos.');
        }
      });
  }
}
