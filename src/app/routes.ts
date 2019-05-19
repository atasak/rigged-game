import {Routes}         from '@angular/router';
import {GameComponent}  from './components/game/game.component';
import {SetupComponent} from './components/setup/setup.component';

export const routes: Routes = [
  {
    path      : '',
    pathMatch : 'full',
    redirectTo: 'setup',
  },
  {
    path     : 'setup',
    component: SetupComponent,
  },
  {
    path     : 'game',
    component: GameComponent,
  },
];
