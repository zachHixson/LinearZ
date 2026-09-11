type SimpleVec = {width: number, x: number, y: number, z?: number, w?: number};
type UniversalVec = SimpleVec | Array<number>;

function simpleVecToArr(vec: SimpleVec): Array<number> {
    const arr = new Array<number>(vec.x, vec.y);
    if (vec.z != undefined) arr.push(vec.z);
    if (vec.w != undefined) arr.push(vec.w);
    return arr;
}

export function VEC_EQUAL(a: Readonly<UniversalVec>, b: Readonly<UniversalVec>): void {
    const vecA = Array.isArray(a) ? a : simpleVecToArr(a as SimpleVec);
    const vecB = Array.isArray(b) ? b : simpleVecToArr(b as SimpleVec);

    if (vecA.length != vecB.length) {
        throw new Error("Cannot compare vectors of different sizes");
    }

    const keys = "xyzw";

    for (let i = 0; i < vecA.length; i++) {
        if (vecA[i] != vecB[i]) {
            throw new Error(`Error comparing two vectors, components not equal.\n\tValues: a.${keys[i]} = ${vecA[i]}, b.${keys[i]} = ${vecB[i]}`);
        }
    }
}

export function VEC_WITHIN_BOUNDS(vec: Readonly<Array<number>>, lb: Readonly<Array<number>>, ub: Readonly<Array<number>>): void {
    if (!(vec.length == lb.length && lb.length == ub.length)) {
        throw new Error(`Error checking vector bounds. vec, lb, and ub parameters must all be same length.`);
    }

    const lbArr = lb.map((v, i) => Math.min(v, ub[i]));
    const ubArr = lb.map((v, i) => Math.max(v, ub[i]));

    for (let i = 0; i < vec.length; i++) {
        if (vec[i] < lbArr[i] || vec[i] > ubArr[i]) {
            throw new Error(
                "Randomized result is out of bounds.\n" +
                `\tBounds: lb = <${lbArr.join(", ")}>, ub = <${ubArr.join(", ")}>\n` +
                `\tResult: vec = <${vec.join(", ")}>`
            );
        }
    }
}

export function bitmaskOperation(vec: Readonly<Array<number>>, bitmask: number, callback: (val: number, shift: number)=>number): Array<number> {
    const arr = new Array<number>();

    for (let i = 0; i < vec.length; i++) {
        const mask = 1 << i;

        if ((mask & bitmask) > 0) {
            arr.push(callback(vec[i], i));
        }
        else {
            arr.push(vec[i]);
        }
    }

    return arr;
}
