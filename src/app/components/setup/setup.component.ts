import {Component}   from '@angular/core';
import {GameService} from '../../logic/game.service';

@Component({
               selector   : 'app-setup',
               templateUrl: './setup.component.html',
               styleUrls  : ['./setup.component.sass'],
           })
export class SetupComponent {

    names: string[] = [];

    constructor (private game: GameService) {
    }

    newName () {
        this.names.push('');
    }

    startGame () {
        this.game.start(this.names);
    }

    tracker (index: number): number {
        return index;
    }
}
