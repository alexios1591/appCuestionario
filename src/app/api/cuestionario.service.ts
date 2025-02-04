import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {

  apiUrl = "http://127.0.0.1:8000/api"
  
    private httpClient = inject(HttpClient)
  
    insert(cuestionario: any): Observable<any>{
      return this.httpClient.post<any>(`${this.apiUrl}/cuestionario`, cuestionario); 
    }

    getById(id: number){
      return this.httpClient.get<any>(`${this.apiUrl}/cuestionario/${id}`)
    }
}
