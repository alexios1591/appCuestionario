import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private httpClient = inject(HttpClient);

  getDashboardStats(): Observable<any> {
    return this.httpClient.get<any>(`/dashboard`);
  }

  getSurveysByPeriod( period: string): Observable<any> {
    return this.httpClient.get<any>(`/dashboard/surveys-by-period?period=${period}`);
  }

  getSurveysByUser(): Observable<any> {
    return this.httpClient.get<any>(`/dashboard/surveys-by-user`);
  }

}
