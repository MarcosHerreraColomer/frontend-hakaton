import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {
  private apiUrl = 'http://localhost:8080/api/partidos';

  constructor(private http: HttpClient) {}

  // Municipales
  obtenerPartidosMunicipalesPorToken(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/municipales`);
  }

  // Autonómicos
  obtenerPartidosAutonomicosPorToken(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/autonomicos`);
  }

  // Nacionales
  obtenerPartidosNacionales(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/nacionales`);
  }

  // Registrar voto
  registrarVoto(voto: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/votos', voto);
  }
}
