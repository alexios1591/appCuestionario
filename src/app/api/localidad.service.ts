import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalidadService {

  apiUrl = "http://127.0.0.1:8000/api"
  
    private httpClient = inject(HttpClient)
  
    getDepartamento(): Observable<any> {
      return this.httpClient.get<any>(`${this.apiUrl}/departamento`);  
    }
    getProvincia(id: number): Observable<any> {
      return this.httpClient.get<any>(`${this.apiUrl}/provincia/${id}`);  
    }
    getDistrito(id: number): Observable<any> {
      return this.httpClient.get<any>(`${this.apiUrl}/distrito/${id}`);  
    }
  
}
