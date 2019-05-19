import {TILEHEIGHT, TILEWIDTH}                                                                     from '../config';
import {cobble, obsidian, ParsedSpriteInfo, parseTileInfo, sand, soulStone, SpriteInfo, staircase} from './spritesheetinfo';

export enum TileType {
    Undefined,
    Open,
    Closed,
    Solid,
    Powerup,
    NextLevel,
}

const tileSprites: SpriteInfo[] = [
    obsidian,
    sand,
    cobble,
    obsidian,
    soulStone,
    staircase,
];

export class Tile {
    info: ParsedSpriteInfo;
    background: string;

    constructor (public type: TileType, public x: number, public y: number) {
        this.background = this.updateBackground();
    }

    updateBackground () {
        const parsedTileInfo = parseTileInfo(tileSprites[this.type]);
        this.info            = parsedTileInfo[Math.floor(Math.random() * parsedTileInfo.length)];
        this.background      = `-${this.info.col * TILEWIDTH}px -${this.info.row * TILEHEIGHT}px`;
        return this.background;
    }
}
