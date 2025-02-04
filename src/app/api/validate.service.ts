import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValidateService {
  apiUrl = 'http://127.0.0.1:8000/api/validate';

  private httpClient = inject(HttpClient);

  validate(dni: string): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}`, {dni});
  }
}
