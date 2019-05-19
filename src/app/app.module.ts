import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule}  from '@angular/router';
import {GameComponent} from './components/game/game.component';

import {MazeComponent}   from './components/maze/maze.component';
import {PlayerComponent} from './components/player/player.component';
import {RouterComponent} from './components/router/router.component';
import {SetupComponent}  from './components/setup/setup.component';
import {StatsComponent}  from './components/stats/stats.component';
import {routes}          from './routes';

@NgModule({
            declarations: [
              MazeComponent,
              PlayerComponent,
              SetupComponent,
              RouterComponent,
              GameComponent,
              StatsComponent,
            ],
            imports     : [
              BrowserModule,
              RouterModule.forRoot(routes),
            ],
            providers   : [],
            bootstrap   : [RouterComponent],
          })
export class AppModule {
}
