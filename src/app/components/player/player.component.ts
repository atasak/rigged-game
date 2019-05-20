import {Component, Input, OnInit} from '@angular/core';
import {GameService}              from '../../logic/game.service';
import {Player}                   from '../../logic/player';
import {PowerUp}                  from '../../logic/powerups';
import {players}                  from '../../logic/spritesheetinfo';

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

    playerAP () {
        return this.game.playerOnTurn === this.index ? this.game.apLeft : this.player.ap;
    }

    powerupBackground (powerup: PowerUp): string {
        return `-${powerup.icon.col * 32}px -${powerup.icon.row * 32}px`;
    }
}
