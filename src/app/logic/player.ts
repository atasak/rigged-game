import {COST}             from '../config';
import {PowerUp}          from './powerups';
import {ParsedSpriteInfo} from './spritesheetinfo';

export class Player {
    x: number;
    y: number;
    chanceModifier     = 1;
    roomChanceModifier = 1;
    songs: true[]      = [];
    ap                 = COST;

    powerups: PowerUp[]    = [];
    powerupTips: PowerUp[] = [];

    constructor (public name: string, [x, y]: [number, number], public info: ParsedSpriteInfo) {
        this.x = x;
        this.y = y;
    }

    resetRoom () {
        this.roomChanceModifier = 1;
    }
}
