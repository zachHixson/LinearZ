function printMatrix(mat: Array<number>, tab: number): string {
    const width = Math.sqrt(mat.length);
    let longestNum = 1;
    let outStr = "";

    for (let i = 0; i < mat.length; i++) {
        longestNum = mat[i].toString().length;
    }

    for (let y = 0; y < width; y++) {
        outStr += new Array(tab).fill(' ').join('');
        for (let x = 0; x < width; x++) {
            const idx = y * width + x;
            outStr += mat[idx].toString().padStart(longestNum, ' ');
            outStr += ' ';
        }
        outStr += '\n';
    }

    return outStr;
}

export function MAT_EQUAL(a: Array<number>, b: Array<number>): void {
    if (a.length != b.length) {
        throw new Error(`Matrices not of equal length.\n\tExpected: ${a.length} == ${b.length}`);
    }

    const POW = Math.pow(10, 15);

    for (let i = 0; i < a.length; i++) {
        const ax = Math.round(a[i] * POW) / POW;
        const bx = Math.round(b[i] * POW) / POW;

        if (ax != bx) {
            throw new Error(`Matrices not equal.\n\tValue: a[${i}] = ${ax}, b[${i}] = ${bx}\na:\n${printMatrix(a, 1)}\nb:\n${printMatrix(b, 1)}`);
        }
    }
}
