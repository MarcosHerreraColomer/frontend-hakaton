import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-votacion-selector',
  templateUrl: './votacion-selector.component.html',
  styleUrls: ['./votacion-selector.component.css']
})
export class VotacionSelectorComponent {
  constructor(private router: Router) {}

  irAVotacion(tipo: string): void {
    // Navega a la ruta según el tipo de votación
    this.router.navigate([`/votar/${tipo}`]);
  }
}
