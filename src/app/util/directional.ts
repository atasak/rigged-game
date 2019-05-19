export function dirFromEvent (event: KeyboardEvent) {
    const directions: { [key: string]: [number, number] } = {
        'a': [-1, 0],
        's': [0, 1],
        'd': [1, 0],
        'w': [0, -1],
    };
    return directions[event.key] || [0, 0];
}
