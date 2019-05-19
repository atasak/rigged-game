export function init<T> (length: number, creator: (i: number) => T): T[] {
    const array = [];
    for (let i = 0; i < length; i++) {
        array.push(creator(i));
    }
    return array;
}

export function getRandom<T> (array: T[], n: number): T[] {
    if (n >= array.length) {
        return array;
    }

    const newArray = [];
    while (n > 0) {
        const selected = array[Math.floor(Math.random() * array.length)];
        if (checkInArray(newArray, selected)) {
            continue;
        }
        newArray.push(selected);
        n--;
    }

    return newArray;
}

export function checkInArray<T> (array: T[], selected: T): boolean {
    for (const thing of array) {
        if (selected === thing) {
            return true;
        }
    }
    return false;
}

export function twoDimensionalFind<T> (array: T[][], find: T): [number, number][] {
    const newArray: [number, number][] = [];
    for (let x = 0; x < array.length; x++) {
        const subArray = array[x];
        for (let y = 0; y < subArray.length; y++)
            if (subArray[y] === find)
                newArray.push([x, y]);
    }
    return newArray;
}
