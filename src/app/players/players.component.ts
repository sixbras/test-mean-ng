import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Player } from '../models/player';
import { PlayerService } from '../services/player.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
})
export class PlayersComponent implements OnInit, OnDestroy {
  playerList$!: Observable<Player[]>;
  playerListSub!: Subscription;
  teamName?: string;

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.teamName = '';
  }

  ngOnInit() {
    let teamid = this.route.snapshot.params.teamid;
    this.playerList$ = this.playerService.getPlayersByTeam(teamid);
    this.playerListSub = this.playerList$.subscribe((playerList) => {
      if (playerList != undefined && playerList.length > 0) {
        this.teamName = playerList[0].team;
      }
    });
  }

  ngOnDestroy() {
    this.playerListSub.unsubscribe();
  }

  back() {
    this.location.back();
  }
}
