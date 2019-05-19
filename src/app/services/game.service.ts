import {Injectable}                       from '@angular/core';
import {Router}                           from '@angular/router';
import {noop}                             from 'rxjs';
import {CHANCEMODIFIER, COST, SONGCHANCE} from '../config';
import {createMaze}                       from '../logic/maze';
import {Player}                           from '../models/player';
import {players}                          from '../models/spritesheetinfo';
import {Tile, TileType}                   from '../models/tile';
import {dirFromEvent}                     from '../util/directional';
import {Maybe}                            from '../util/types';

@Injectable({
                providedIn: 'root',
            })
export class GameService {
    players: Player[] = [];
    board: Tile[][]   = [];

    locked       = false;
    playerOnTurn = 0;
    costLeft     = 0;

    constructor (private router: Router) {
        this.start(['Stefan', 'Bas', 'Berend', 'Kas', 'Bart', 'Niek', '1', '2', '3', '4', '5', '6']);
    }

    start (names: string[]) {
        const [board, playerpos] = createMaze(names.length);
        this.board               = board;
        this.players             = names.map((name: string, i: number) => new Player(name, playerpos[i], players[i]));
        this.router.navigateByUrl('game');
        this.nextTurn();
    }

    restart () {
        const [board, playerpos] = createMaze(this.players.length);
        this.board               = board;
        for (let i = 0; i < playerpos.length; i++) {
            this.players[i].x = playerpos[i][0];
            this.players[i].y = playerpos[i][1];
        }
    }

    nextTurn () {
        this.locked   = false;
        this.costLeft = COST;
    }

    keyDown (event: KeyboardEvent) {
        if (this.locked)
            return;
        const player   = this.players[this.playerOnTurn];
        const [dx, dy] = dirFromEvent(event);
        if (dx === 0 && dy === 0) {
            if (event.key === 'Enter') {
                this.locked       = true;
                this.playerOnTurn = (this.playerOnTurn + 1) % this.players.length;
                setTimeout(() => this.nextTurn(), 1000);
            }
            return;
        }

        const gotoTile                               = this.board[player.x + dx][player.y + dy];
        const {move, cost, end, songChance, powerUp} = movementAction(gotoTile);

        if (!move || this.costLeft < cost)
            return;

        this.handleMovement(player, dx, dy, cost);

        if (end) {
            setTimeout(() => this.restart(), 1000);
        }

        if (songChance) {
            this.maybeChooseSong(player);
        }

        if (powerUp) {
            noop();
        }
    }

    handleMovement (player: Player, dx: number, dy: number, cost: number) {
        player.x += dx;
        player.y += dy;
        this.board[player.x][player.y].type = TileType.Open;
        this.board[player.x][player.y].updateBackground();
        this.locked = true;
        setTimeout(() => {
            this.locked = false;
        }, 200);
        this.costLeft -= cost;
    }

    maybeChooseSong (player: Player) {
        const chance = SONGCHANCE * player.chanceModifier;
        if (Math.random() > chance)
            return;
        const dpc = player.chanceModifier * CHANCEMODIFIER;
        player.chanceModifier -= dpc;
        const doc = dpc / (this.players.length);
        for (const p of this.players)
            p.chanceModifier += doc;
        player.songs++;
    }
}

class MA {
    move       = false;
    cost       = 0;
    end        = false;
    songChance = false;
    powerUp    = false;

    constructor (init: Maybe<MA>) {
        for (const key in init)
            if (init.hasOwnProperty(key))
            // @ts-ignore
                this[key] = init[key];
    }
}


function movementAction (tile: Tile): MA {
    if (tile.type === TileType.Closed)
        return new MA({move: true, cost: 4, songChance: true});
    if (tile.type === TileType.Open)
        return new MA({move: true, cost: 1});
    if (tile.type === TileType.Powerup)
        return new MA({move: true, cost: 4, powerUp: true});
    if (tile.type === TileType.NextLevel)
        return new MA({move: true, cost: 1, end: true});
    return new MA({});
}
