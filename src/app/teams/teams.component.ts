import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Team } from '../models/team';
import { TeamService } from '../services/team.service';
import { League } from '../models/league';
import { LeagueService } from '../services/league.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent implements OnInit {
  public placeholder: string = 'Search by league';
  leagueListSub!: Subscription;
  leagues: League[] = [];

  showTeams = false;
  teamList$!: Observable<Team[]>;

  constructor(
    private teamService: TeamService,
    private leagueService: LeagueService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let currentLeague = this.route.snapshot.queryParamMap.get('leagueid');

    if (currentLeague != undefined) {
      this.teamList$ = this.teamService.getTeamsByLeague(currentLeague);
      this.showTeams = true;
    }

    this.leagueListSub = this.leagueService
      .getLeagues()
      .subscribe((leagues) => {
        this.leagues = leagues;
      });
  }

  ngOnDestroy() {
    this.leagueListSub.unsubscribe();
  }

  redirectToPlayers(teamId: string, teamName: string) {
    //slugify the team name
    teamName = teamName.toLowerCase().replace(/[^0-9a-z]/gi, '-');
    this.router.navigate([teamName, 'players', teamId]);
  }

  selectEvent(item: any) {
    this.teamList$ = this.teamService.getTeamsByLeague(item._id);
    this.showTeams = true;
    const queryParams: Params = { leagueid: item._id };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  onCleared(e: any) {
    this.showTeams = false;
    const queryParams: Params = {};
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
    });
  }
}
