
//expects float values
function rangeRandom(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export { 
    rangeRandom 
};