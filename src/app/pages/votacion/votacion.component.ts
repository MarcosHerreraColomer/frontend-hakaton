import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartidoService } from '../../services/partido.service';
import { EleccionService } from '../../services/eleccion.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  codigoAmbito: string = '';
  tipoEleccion: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private partidoService: PartidoService,
    private eleccionService: EleccionService
  ) {}

  ngOnInit(): void {
    const path = this.router.url;
    if (path.includes('municipal')) {
      this.tipoEleccion = 'municipal';
      this.partidoService.obtenerPartidosMunicipalesPorToken().subscribe({
        next: (data) => {
          this.partidos = data;
          console.log('✅ Partidos municipales cargados:', data);
        }
      });
    } else if (path.includes('autonomica')) {
      this.tipoEleccion = 'autonomica';
      this.partidoService.obtenerPartidosAutonomicosPorToken().subscribe({
        next: (data) => {
          this.partidos = data;
          console.log('✅ Partidos autonómicos cargados:', data);
        }
      });
    } else if (path.includes('nacional')) {
      this.tipoEleccion = 'nacional';
      this.partidoService.obtenerPartidosNacionales().subscribe({
        next: (data) => {
          this.partidos = data;
          console.log('✅ Partidos nacionales cargados:', data);
        }
      });
    }

    // Cargar elección activa según tipo
    this.eleccionService.getEleccionesPorTipo(this.tipoEleccion).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.codigoAmbito = data[0].codigo_ambito;
          console.log('📦 Código ámbito cargado:', this.codigoAmbito);
        }
      }
    });
  }

  votar(): void {
    if (this.partidoSeleccionado && this.codigoAmbito) {
      const voto = {
        partido_id: this.partidoSeleccionado,
        eleccion_id: this.codigoAmbito,
        tipo: this.tipoEleccion
      };

      this.partidoService.registrarVoto(voto).subscribe({
        next: () => {
          alert('✅ ¡Tu voto ha sido registrado!');
        },
        error: () => {
          alert('❌ Error al registrar el voto');
        }
      });
    } else {
      alert('⚠️ Selecciona un partido y espera a que se cargue la elección.');
    }
  }
}
