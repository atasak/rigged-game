import {Component}             from '@angular/core';
import {TILEHEIGHT, TILEWIDTH} from '../../config';
import {Player}                from '../../models/player';
import {Tile}                  from '../../models/tile';
import {GameService}           from '../../services/game.service';

@Component({
               selector   : 'app-maze',
               templateUrl: './maze.component.html',
               styleUrls  : ['./maze.component.sass'],
           })
export class MazeComponent {

    constructor (public game: GameService) {
    }

    tileTop (tile: Tile): string {
        return (tile.y * TILEHEIGHT) + 'px';
    }

    tileLeft (tile: Tile): string {
        return (tile.x * TILEWIDTH) + 'px';
    }

    tileBackground (tile: Tile): string {
        return `-${tile.info.col * TILEWIDTH}px -${tile.info.row * TILEHEIGHT}px`;
    }

    styleOfPlayer (player: Player): { [key: string]: string } {
        return {
            top                  : (player.y * TILEHEIGHT) + 'px',
            left                 : (player.x * TILEWIDTH) + 'px',
            'background-position': `-${player.info.col * TILEWIDTH}px -${player.info.row * TILEHEIGHT}px`,
        };
    }
}
