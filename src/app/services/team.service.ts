import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getTeamsByLeague(leagueId: string): Observable<Team[]> {
    return this.httpClient.get<Team[]>(
      `${environment.baseUrl}teams/findByLeague?leagueId=${leagueId}`
    );
  }
}
