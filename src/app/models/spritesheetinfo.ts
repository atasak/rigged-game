import {SPRITESHEETWIDTH} from '../config';

export interface SpriteInfo {
    col: number;
    row: number;
    variance: number;
}

export interface ParsedSpriteInfo {
    col: number;
    row: number;
}

export const cobble = {
    col     : 16,
    row     : 16,
    variance: 7,
};

export const darkBrick = {
    col     : 22,
    row     : 13,
    variance: 7,
};

export const darkCobble = {
    col     : 29,
    row     : 13,
    variance: 8,
};

export const redBrick = {
    col     : 8,
    row     : 16,
    variance: 8,
};

export const sand = {
    col     : 14,
    row     : 13,
    variance: 8,
};

export const soulStone = {
    col     : 56,
    row     : 16,
    variance: 12,
};

export const staircase = {
    col     : 41,
    row     : 15,
    variance: 1,
};

export const squareBrick = {
    col     : 17,
    row     : 14,
    variance: 4,
};

export const obsidian = {
    col     : 0,
    row     : 18,
    variance: 4,
};

export const players = [
    {col: 55, row: 5},
    {col: 57, row: 5},
    {col: 61, row: 5},
    {col: 21, row: 3},
    {col: 20, row: 4},
    {col: 0, row: 3},
    {col: 22, row: 1},
    {col: 28, row: 1},
    {col: 46, row: 2},
    {col: 48, row: 2},
    {col: 39, row: 3},
    {col: 33, row: 3},
];

export const songMarker = {
    col: 17,
    row: 47,
};

export function parseTileInfo (tileInfo: SpriteInfo): ParsedSpriteInfo[] {
    const parsed: ParsedSpriteInfo[] = [];
    for (let i = 0; i < tileInfo.variance; i++) {
        const base = tileInfo.col + i;
        parsed.push({
                        col: base % SPRITESHEETWIDTH,
                        row: tileInfo.row + Math.floor(base / 64),
                    });
    }
    return parsed;
}
