import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartidoService } from '../../services/partido.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-votacion',
  standalone: true,
  templateUrl: './votacion.component.html',
  styleUrls: ['./votacion.component.css'],
  imports: [CommonModule, FormsModule]
})
export class VotacionComponent implements OnInit {
  partidos: any[] = [];
  partidoSeleccionado: number = 0;

  constructor(private partidoService: PartidoService) {}

  ngOnInit(): void {
    this.partidoService.obtenerPartidosMunicipalesPorToken().subscribe({
      next: (data) => {
        this.partidos = data;
        console.log('✅ Partidos cargados:', data);
      },
      error: (err) => {
        console.error('❌ Error al cargar partidos:', err);
      }
    });
  }

  votar(): void {
    if (this.partidoSeleccionado) {
      const voto = {
        partido_id: this.partidoSeleccionado,
        eleccion_id: this.partidoSeleccionado, // puedes ajustar esto si tienes ID diferente
        tipo: 'municipal'
      };

      this.partidoService.registrarVoto(voto).subscribe({
        next: () => {
          alert('✅ ¡Tu voto ha sido registrado para el partido ID: ' + this.partidoSeleccionado + '!');
        },
        error: (err) => {
          console.error('❌ Error al registrar el voto en backend:', err);
          alert('Error al registrar el voto en backend');
        }
      });
    } else {
      alert('⚠️ Selecciona un partido para poder votar.');
    }
  }
}
