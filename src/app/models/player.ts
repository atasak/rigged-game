import {COST}             from '../config';
import {ParsedSpriteInfo} from './spritesheetinfo';

export class Player {
    x: number;
    y: number;
    chanceModifier = 1;
    songs: true[]  = [];
    ap             = COST;

    constructor (public name: string, [x, y]: [number, number], public info: ParsedSpriteInfo) {
        this.x = x;
        this.y = y;
    }
}
