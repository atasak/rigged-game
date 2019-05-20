import {APPOWERUPPLUS, CHANCEPOWERUPTIMES}                      from '../config';
import {Player}                                                 from './player';
import {apModifierMarker, ParsedSpriteInfo, songModifierMarker} from './spritesheetinfo';

export interface PowerUp {
    logic: (player: Player) => void;
    text: string;
    icon: ParsedSpriteInfo;
}

function extraAP (player: Player) {
    player.ap += APPOWERUPPLUS;
}

function doubleChance (player: Player) {
    player.roomChanceModifier *= CHANCEPOWERUPTIMES;
}

export const powerUps: PowerUp[] = [
    {
        logic: extraAP,
        text : 'AP +1',
        icon : apModifierMarker,
    },
    {
        logic: doubleChance,
        text : 'x2',
        icon : songModifierMarker,
    },
];
