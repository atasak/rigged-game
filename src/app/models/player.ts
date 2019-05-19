import {ParsedSpriteInfo} from './spritesheetinfo';

export class Player {
    x: number;
    y: number;
    chanceModifier = 1;
    songs          = 0;

    constructor (public name: string, [x, y]: [number, number], public info: ParsedSpriteInfo) {
        this.x = x;
        this.y = y;
    }
}
