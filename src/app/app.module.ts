import {NgModule}                from '@angular/core';
import {FormsModule}             from '@angular/forms';
import {BrowserModule}           from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule}            from '@angular/router';
import {GameComponent}           from './components/game/game.component';

import {MazeComponent}    from './components/maze/maze.component';
import {PlayerComponent}  from './components/player/player.component';
import {PowerupComponent} from './components/powerup/powerup.component';
import {RouterComponent}  from './components/router/router.component';
import {SetupComponent}   from './components/setup/setup.component';
import {StatsComponent}   from './components/stats/stats.component';
import {routes}           from './routes';

@NgModule({
              declarations: [
                  MazeComponent,
                  PlayerComponent,
                  SetupComponent,
                  RouterComponent,
                  GameComponent,
                  StatsComponent,
                  PowerupComponent,
              ],
              imports     : [
                  BrowserModule,
                  BrowserAnimationsModule,
                  FormsModule,
                  RouterModule.forRoot(routes),
              ],
              providers   : [],
              bootstrap   : [RouterComponent],
          })
export class AppModule {
}
