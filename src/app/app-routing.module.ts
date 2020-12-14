import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { PlayersComponent } from './players/players.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
	{ path: '', component: TeamsComponent },
	{ path: ':teamname/players/:teamid', component: PlayersComponent },
	{ path: '**', component: ErrorpageComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
