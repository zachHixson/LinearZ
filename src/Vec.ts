import { type Mat3 } from "./Mat3.js";
import { type Mat4 } from "./Mat4.js";

export interface Vec<VecT, ObjT, ArrT, MatT> {
    get width(): number;

    add(vec: Readonly<VecT>): VecT;
    addScalar(scalar: number): VecT;
    subtract(vec: Readonly<VecT>): VecT;
    multiply(vec: Readonly<VecT>): VecT;
    scale(scalar: number): VecT;
    multiplyScalar(scalar: number): VecT;
    multiplyMat3(mat: Readonly<Mat3>): VecT;
    multiplyMat4(mat: Readonly<Mat4>): VecT;
    divide(vec: Readonly<VecT>): VecT;
    divideScalar(scalar: number): VecT;
    dot(vec: Readonly<VecT>): number;
    lengthNoSqrt(): number;
    magnitude(): number;
    normalize(): VecT;
    copy(vec: Readonly<ObjT>): VecT;
    set(...args: unknown[]): VecT;
    clone(): VecT;
    fromArray(arr: Readonly<ArrT>): VecT;
    toArray(): ArrT;
    fromObject(obj: Readonly<ObjT>): VecT;
    toObject(): ObjT;
    floor(): VecT;
    ceil(): VecT;
    round(): VecT;
    absolute(): VecT;
    distanceTo(vec: Readonly<VecT>): number;
    distanceNoSqrt(vec: Readonly<VecT>): number;
    randomize(lb: Readonly<VecT>, ub: Readonly<VecT>): VecT;
    zero(): VecT;
    clampLength(maxLength: number): VecT;
    edit(callback: (vec: VecT) => void): VecT;
    map<T>(callback: (vec: Readonly<VecT>) => T): T;
}
