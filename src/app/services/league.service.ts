import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { League } from '../models/league';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getLeagues(): Observable<League[]> {
    return this.httpClient.get<League[]>(`${environment.baseUrl}leagues`);
  }
}
