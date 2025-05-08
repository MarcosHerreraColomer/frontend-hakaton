// src/app/services/eleccion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EleccionService {
  private apiUrl = 'http://localhost:8080/api/elecciones';

  constructor(private http: HttpClient) {}

  getEleccionesPorTipo(tipo: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${tipo}`);
  }
}
