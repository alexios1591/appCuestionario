import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValidateService {

  private httpClient = inject(HttpClient);

  validate(dni: string): Observable<any> {
    return this.httpClient.post<any>(`/validate`, { dni });
  }
}
