import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalidadService {
  private httpClient = inject(HttpClient);

  getDepartamento(): Observable<any> {
    return this.httpClient.get<any>(`/departamento`);
  }
  getProvincia(id: number): Observable<any> {
    return this.httpClient.get<any>(`/provincia/${id}`);
  }
  getDistrito(id: number): Observable<any> {
    return this.httpClient.get<any>(`/distrito/${id}`);
  }
}
