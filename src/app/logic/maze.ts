import {ipc, MAZEHEIGHT, MAZEWIDTH, minimumOpenFields, pcd, SOULS} from '../config';
import {getRandom, init, twoDimensionalFind}                       from '../util/array';
import {Tile, TileType}                                            from './tile';

export function createMaze (players: number): [Tile[][], [number, number][]] {
    const board = init(MAZEWIDTH, () => init(MAZEHEIGHT, () => TileType.Undefined));

    addSoulBlocks(board);
    const beginPoints = addCenter(board);

    mazify(board, beginPoints);
    solidify(board);

    const playerPos = placePlayers(board, players);

    return [board.map((row: TileType[], x: number) =>
                          row.map((type: TileType, y: number) => new Tile(type, x, y))), playerPos];
}

function addSoulBlocks (board: TileType[][]) {
    for (let i = 0; i < SOULS; i++) {
        const x     = Math.floor(Math.random() * MAZEWIDTH);
        const y     = Math.floor(Math.random() * MAZEHEIGHT);
        board[x][y] = TileType.Powerup;
    }
}

function addBorder (board: TileType[][]) {
    for (let i = 0; i < MAZEWIDTH; i++) {
        board[i][0]              = TileType.Solid;
        board[i][MAZEHEIGHT - 1] = TileType.Solid;
    }
    for (let i = 0; i < MAZEHEIGHT; i++) {
        board[0][i]             = TileType.Solid;
        board[MAZEWIDTH - 1][i] = TileType.Solid;
    }
}

function addCenter (board: TileType[][]): [number, number][] {
    const centerX = Math.floor(MAZEWIDTH / 2);
    const centerY = Math.floor(MAZEHEIGHT / 2);
    forSurrounding(centerX, centerY, (x: number, y: number) =>
        board[x][y] = TileType.Open);

    board[centerX][centerY] = TileType.NextLevel;

    const initial: [number, number][] = [
        [centerX - 2, centerY - 1],
        [centerX + 1, centerY - 2],
        [centerX - 1, centerY + 2],
        [centerX + 2, centerY + 1],
    ];

    initial.forEach(([x, y]: [number, number]) => {
        board[x][y] = TileType.Closed;
    });

    return initial;
}

function mazify (board: TileType[][], queue: [number, number][]) {
    while (true) {
        addBorder(board);
        mazifyPass(board, queue);

        // @ts-ignore
        const closedFields = twoDimensionalFind(board, TileType.Closed);
        if (closedFields.length > minimumOpenFields)
            return;

        for (let i = 0; i < 4; i++)
            queue.push(closedFields[Math.floor(Math.random() * closedFields.length)]);
        queue.forEach(([x, y]: [number, number]) =>
                          forSurrounding(x, y, (offsetX: number, offsetY: number) => {
                              if (board[offsetX][offsetY] === TileType.Solid)
                                  board[offsetX][offsetY] = TileType.Undefined;
                          }));
    }
}

function mazifyPass (board: TileType[][], queue: [number, number][]) {
    while (queue.length !== 0) {
        const tile = queue.shift()!;

        const surrounding = [
            [tile[0], tile[1] - 1],
            [tile[0], tile[1] + 1],
            [tile[0] - 1, tile[1]],
            [tile[0] + 1, tile[1]],
        ];

        const filteredSurrounding = surrounding.filter(([x, y]: [number, number]) => board[x][y] === TileType.Undefined);

        const nEndpoints = pcd[Math.floor(Math.random() * pcd.length)];
        const endpoints  = getRandom(filteredSurrounding, nEndpoints);
        endpoints.forEach(([x, y]: [number, number]) => {
            queue.push([x, y]);
            board[x][y] = TileType.Closed;
        });

        if (Math.random() > ipc) {
            continue;
        }

        forSurrounding(tile[0], tile[1], (x: number, y: number) => {
            if (board[x][y] === TileType.Undefined)
                board[x][y] = TileType.Solid;
        });
    }
}

function solidify (board: TileType[][]) {
    for (let x = 0; x < MAZEWIDTH; x++)
        for (let y = 0; y < MAZEHEIGHT; y++)
            if (board[x][y] === TileType.Undefined)
                board[x][y] = TileType.Solid;
}

function forSurrounding (x: number, y: number, fn: (x: number, y: number) => void) {
    for (let dx = -1; dx < 2; dx++)
        for (let dy = -1; dy < 2; dy++)
            fn(x + dx, y + dy);
}

function placePlayers (board: TileType[][], players: number): [number, number][] {
    const spawnPos  = twoDimensionalFind(board, TileType.Closed);
    const playerPos = getRandom(spawnPos, players);
    for (const [x, y] of playerPos)
        board[x][y] = TileType.Open;
    return playerPos;
}
