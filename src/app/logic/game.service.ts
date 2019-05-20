import {Injectable}                                                             from '@angular/core';
import {Router}                                                                 from '@angular/router';
import {CHANCEMODIFIER, NEXTROOMTIME, SONGBASECHANCE, SONGMODALTIME, TURNDELAY} from '../config';
import {dirFromEvent}                                                           from '../util/directional';
import {Maybe}                                                                  from '../util/types';
import {createMaze}                                                             from './maze';
import {Player}                                                                 from './player';
import {powerUps}                                                               from './powerups';
import {ParsedSpriteInfo, players, songMarker, staircase}                       from './spritesheetinfo';
import {Tile, TileType}                                                         from './tile';

@Injectable({
                providedIn: 'root',
            })
export class GameService {
    players: Player[] = [];
    board: Tile[][]   = [];

    locked       = 0;
    playerOnTurn = 0;
    apLeft       = 0;

    showModal                   = false;
    modalIcon: ParsedSpriteInfo = songMarker;
    modalText1                  = 'Hoi, ik ben een modal';
    modalText2                  = 'Blijkbaar ben ik kapot';

    constructor (private router: Router) {
        //this.start(['Stefan', 'Bas', 'Berend', 'Kas', 'Bart', 'Niek']);
    }

    start (names: string[]) {
        const [board, playerpos] = createMaze(names.length);
        this.board               = board;
        this.players             = names.map((name: string, i: number) => new Player(name, playerpos[i], players[i]));
        this.router.navigateByUrl('game');
        this.nextTurn();
    }

    async nextRoom () {
        await this.modal(staircase, 'Next room', 'Walking down....', NEXTROOMTIME);
        const [board, playerpos] = createMaze(this.players.length);
        this.board               = board;
        for (let i = 0; i < playerpos.length; i++) {
            this.players[i].x = playerpos[i][0];
            this.players[i].y = playerpos[i][1];
        }
    }

    nextTurn () {
        this.locked++;
        this.playerOnTurn = (this.playerOnTurn + 1) % this.players.length;
        this.apLeft       = this.players[this.playerOnTurn].ap;
        for (const player of this.players)
            player.resetRoom();
        setTimeout(() => {
            this.locked--;
        }, TURNDELAY);
    }

    keyDown (event: KeyboardEvent) {
        if (this.locked !== 0)
            return;
        const player   = this.players[this.playerOnTurn];
        const [dx, dy] = dirFromEvent(event);
        if (dx === 0 && dy === 0) {
            if (event.key === 'Enter')
                this.nextTurn();
            return;
        }

        const gotoTile                                 = this.board[player.x + dx][player.y + dy];
        const {move, apCost, end, songChance, powerUp} = movementAction(gotoTile);

        if (!move || this.apLeft < apCost)
            return;

        this.handleMovement(player, dx, dy, apCost);

        if (end) {
            this.nextRoom();
        }

        if (songChance) {
            this.maybeChooseSong(player);
        }

        if (powerUp) {
            this.powerUp();
        }
    }

    handleMovement (player: Player, dx: number, dy: number, cost: number) {
        player.x += dx;
        player.y += dy;
        const tile = this.board[player.x][player.y];
        if (tile.type === TileType.Closed || tile.type === TileType.Powerup)
            tile.type = TileType.Open;
        tile.updateBackground();
        this.locked++;
        setTimeout(() => {
            this.locked--;
        }, 200);
        this.apLeft -= cost;
    }

    maybeChooseSong (player: Player) {
        const chance = SONGBASECHANCE * player.chanceModifier * player.roomChanceModifier;
        if (Math.random() > chance)
            return;
        const dpc = player.chanceModifier * CHANCEMODIFIER;
        player.chanceModifier -= dpc;
        const doc = dpc / (this.players.length);
        for (const p of this.players)
            p.chanceModifier += doc;
        player.songs.push(true);

        this.modal(songMarker, 'Choose a song!', this.players[this.playerOnTurn].name, SONGMODALTIME);
    }

    powerUp () {
        const currentPlayer = this.players[this.playerOnTurn];
        const powerUpId     = Math.floor(Math.random() * powerUps.length);
        const powerup       = powerUps[powerUpId];
        powerup.logic(currentPlayer);
        currentPlayer.powerups.push(powerup);
        currentPlayer.powerupTips.push(powerup);
        setTimeout(() => currentPlayer.powerupTips.shift(), 2000);
    }

    modal (icon: ParsedSpriteInfo, text1: string, text2: string, duration: number) {
        return new Promise((resolve: () => void) => {
            this.modalIcon  = icon;
            this.modalText1 = text1;
            this.modalText2 = text2;
            this.showModal  = true;
            this.locked++;
            setTimeout(() => {
                this.showModal = false;
                this.locked--;
                resolve();
            }, duration);
        });
    }
}

class MA {
    move       = false;
    apCost     = 0;
    end        = false;
    songChance = false;
    powerUp    = false;

    constructor (init: Maybe<MA>) {
        for (const key in init)
            if (init.hasOwnProperty(key))
                this[key as keyof MA] = init[key as keyof Maybe<MA>]!;
    }
}


function movementAction (tile: Tile): MA {
    if (tile.type === TileType.Closed)
        return new MA({move: true, apCost: 4, songChance: true});
    if (tile.type === TileType.Open)
        return new MA({move: true, apCost: 1});
    if (tile.type === TileType.Powerup)
        return new MA({move: true, apCost: 4, powerUp: true});
    if (tile.type === TileType.NextLevel)
        return new MA({move: true, apCost: 1, end: true});
    return new MA({});
}
