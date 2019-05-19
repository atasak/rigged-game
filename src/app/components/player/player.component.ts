import {Component, Input, OnInit} from '@angular/core';
import {Player}                   from '../../models/player';
import {players}                  from '../../models/spritesheetinfo';
import {GameService}              from '../../services/game.service';

@Component({
               selector   : 'app-player',
               templateUrl: './player.component.html',
               styleUrls  : ['./player.component.sass'],
           })
export class PlayerComponent implements OnInit {
    @Input() player!: Player;
    @Input() index = 0;

    constructor (public game: GameService) {
    }

    ngOnInit () {
    }

    style () {
        return {
            'background-position': `right -${(this.index % 4) * 90}px`,
        };
    }

    spritePos () {
        return `-${players[this.index].col * 72}px -${players[this.index].row * 72}px`;
    }

    * songs () {
        for (let i = 0; i < this.player.songs; i++)
            yield i;
    }
}
