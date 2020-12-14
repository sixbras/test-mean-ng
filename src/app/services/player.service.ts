import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getPlayersByTeam(teamid: string): Observable<Player[]> {
    return this.httpClient.get<Player[]>(
      `${environment.baseUrl}players/findByTeamId?teamId=${teamid}`
    );
  }
}
