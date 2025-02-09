import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CuestionarioService {
  private httpClient = inject(HttpClient);

  insert(cuestionario: any): Observable<any> {
    return this.httpClient.post<any>(`/cuestionario`, cuestionario);
  }

  getById(id: number) {
    return this.httpClient.get<any>(`/cuestionario/${id}`);
  }
}
