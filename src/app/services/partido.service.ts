import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PartidoService {
  private baseUrl = 'http://localhost:8080/api/partidos';

  constructor(private http: HttpClient) {}

  obtenerPartidosMunicipalesPorToken(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/municipales`, { headers });
  }

  registrarVoto(voto: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/votos', voto);
  }
}
