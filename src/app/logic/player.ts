import {INITIALAP}                            from '../config';
import {PowerUp}                              from './powerups';
import {ParsedSpriteInfo, songModifierMarker} from './spritesheetinfo';

export class Player {
    x: number;
    y: number;
    chanceModifier     = 1;
    songs: true[]      = [];
    ap                 = INITIALAP;

    powerups: PowerUp[]    = [];
    powerupTips: PowerUp[] = [];

    constructor (public name: string, [x, y]: [number, number], public info: ParsedSpriteInfo) {
        this.x = x;
        this.y = y;
    }
}
