import { type Vec } from "./Vec.js";
import { type Mat3 } from "./Mat3.js";
import { type Mat4 } from "./Mat4.js";


type Vec2Obj = {x: number, y: number};
type Vec2Arr = [number, number];

export class Vec2 implements Vec<Vec2, Vec2Obj, Vec2Arr, Mat3> {
    static readonly WIDTH = 2;

    static fromArray(arr: Readonly<Vec2Arr>): Vec2 {
        return new Vec2(arr[0], arr[1]);
    }

    static fromObject(obj: Readonly<Vec2Obj>): Vec2 {
        return new Vec2(obj.x, obj.y);
    }

    x: number;
    y: number;

    get width() {return Vec2.WIDTH}

    constructor(x: number = 0, y: number = 0){
        this.x = x;
        this.y = y;
    }

    add(vec: Readonly<Vec2>): Vec2 {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }

    addScalar(scalar: number): Vec2 {
        this.x += scalar;
        this.y += scalar;
        return this;
    }

    subtract(vec: Readonly<Vec2>): Vec2 {
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    }

    subtractScalar(scalar: number): Vec2 {
        this.x -= scalar;
        this.y -= scalar;
        return this;
    }

    multiply(vec: Readonly<Vec2>): Vec2 {
        this.x *= vec.x;
        this.y *= vec.y;
        return this;
    }

    scale(scalar: number): Vec2 {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    multiplyScalar(scalar: number): Vec2 {
        return this.scale(scalar);
    }

    multiplyMat3(mat: Readonly<Mat3>): Vec2 {
        const x = this.x;

        this.x = x * mat.data[0] + this.y * mat.data[3] + mat.data[6];
        this.y = x * mat.data[1] + this.y * mat.data[4] + mat.data[7];

        return this;
    }

    multiplyMat4(mat: Readonly<Mat4>): Vec2 {
        const x = this.x;

        this.x = x * mat.data[0] + this.y * mat.data[4] + mat.data[8] + mat.data[12];
        this.y = x * mat.data[1] + this.y * mat.data[5] + mat.data[9] + mat.data[13];

        return this;
    }

    divide(vec: Readonly<Vec2>): Vec2 {
        this.x /= vec.x;
        this.y /= vec.y;
        return this;
    }

    divideScalar(scalar: number): Vec2 {
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }

    dot(vec: Readonly<Vec2>): number {
        return this.x * vec.x + this.y * vec.y;
    }

    cross(vec: Readonly<Vec2>): number {
        return this.x * vec.y - this.y * vec.x;
    }

    lengthNoSqrt(): number {
        return this.x * this.x + this.y * this.y;
    }

    length(): number {
        return Math.sqrt(this.lengthNoSqrt());
    }

    magnitude(): number {
        return this.length();
    }

    normalize(): Vec2 {
        const length = this.length();
        if (length == 0) return this;
        return this.scale(1/length);
    }

    copy(vec: Readonly<Vec2Obj>): Vec2 {
        this.x = vec.x;
        this.y = vec.y;
        return this;
    }

    set(x: number, y: number): Vec2 {
        this.x = x;
        this.y = y;
        return this;
    }

    clone(): Vec2 {
        return new Vec2(this.x, this.y);
    }

    fromArray(arr: Readonly<Vec2Arr>): Vec2 {
        this.x = arr[0];
        this.y = arr[1];
        return this;
    }

    toArray(): Vec2Arr {
        return [this.x, this.y];
    }

    fromObject(obj: Readonly<Vec2Obj>): Vec2 {
        this.x = obj.x;
        this.y = obj.y;
        return this;
    }

    toObject(): Vec2Obj {
        return {x: this.x, y: this.y};
    }

    floor(): Vec2 {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }

    ceil(): Vec2 {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    }

    round(): Vec2 {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }

    absolute(): Vec2 {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        return this;
    }

    equalTo(vec: Readonly<Vec2>): boolean {
        return (
            this.x == vec.x &&
            this.y == vec.y
        );
    }

    distanceNoSqrt(vec: Readonly<Vec2>): number {
        const dx = this.x - vec.x;
        const dy = this.y - vec.y;
        return dx * dx + dy * dy;
    }

    distanceTo(vec: Readonly<Vec2>): number {
        return Math.sqrt(this.distanceNoSqrt(vec));
    }

    randomize(lb: Readonly<Vec2>, ub: Readonly<Vec2>): Vec2 {
        const lbx = Math.min(lb.x, ub.x);
        const lby = Math.min(lb.y, ub.y);
        const ubx = Math.max(lb.x, ub.x);
        const uby = Math.max(lb.y, ub.y);
        const dx = ubx - lbx;
        const dy = uby - lby;
        this.x = Math.random() * dx + lbx;
        this.y = Math.random() * dy + lby;
        return this;
    }

    zero(): Vec2 {
        this.x = this.y = 0;
        return this;
    }

    clampLength(maxLength: number): Vec2 {
        const curLength = this.length();
        const scaleFac = maxLength / curLength;

        if (curLength > maxLength){
            this.x *= scaleFac;
            this.y *= scaleFac;
        }

        return this;
    }

    edit(callback: (vec: Vec2) => void): Vec2 {
        callback(this);
        return this;
    }

    map<T>(callback: (vec: Readonly<Vec2>) => T): T {
        return callback(this);
    }
}
