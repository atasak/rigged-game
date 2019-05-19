import {Component, HostListener} from '@angular/core';
import {GameService}             from '../../services/game.service';

@Component({
               selector   : 'app-game',
               templateUrl: './game.component.html',
               styleUrls  : ['./game.component.sass'],
           })
export class GameComponent {

    constructor (public game: GameService) {
    }

    @HostListener('window:keydown', ['$event'])
    keyDown (event: KeyboardEvent) {
        this.game.keyDown(event);
    }

}
