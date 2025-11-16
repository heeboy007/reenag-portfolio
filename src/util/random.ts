
//expects float values
function rangeRandom(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

function randomPastel() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 60%, 60%)`;
}

export { 
    rangeRandom,
    randomPastel
};