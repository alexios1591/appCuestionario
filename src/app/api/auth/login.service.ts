import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private httpClient = inject(HttpClient);

  login(NomUsu: string, PassUsu: string): Observable<any> {
    const log = { NomUsu, PassUsu };
    return this.httpClient.post<any>(`/login`, log);
  }
}
