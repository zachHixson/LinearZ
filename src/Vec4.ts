import { type Vec } from "./Vec.js";
import { type Mat3 } from "./Mat3.js";
import { type Mat4 } from "./Mat4.js";

type Vec4Obj = {x: number, y: number, z: number, w: number};
type Vec4Arr = [number, number, number, number];

export class Vec4 implements Vec<Vec4, Vec4Obj, Vec4Arr, Mat3>{
    static readonly WIDTH = 4;

    static fromArray(arr: Readonly<Vec4Arr>): Vec4 {
        return new Vec4(arr[0], arr[1], arr[2], arr[3]);
    }

    static fromObject(obj: Readonly<Vec4Obj>): Vec4 {
        return new Vec4(obj.x, obj.y, obj.z, obj.w);
    }

    x: number;
    y: number;
    z: number;
    w: number;

    get width() {return Vec4.WIDTH}

    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    add(vec: Readonly<Vec4>): Vec4 {
        this.x += vec.x;
        this.y += vec.y;
        this.z += vec.z;
        this.w += vec.w;
        return this;
    }

    addScalar(scalar: number): Vec4 {
        this.x += scalar;
        this.y += scalar;
        this.z += scalar;
        this.w += scalar;
        return this;
    }

    subtract(vec: Readonly<Vec4>): Vec4 {
        this.x -= vec.x;
        this.y -= vec.y;
        this.z -= vec.z;
        this.w -= vec.w;
        return this;
    }

    subtractScalar(scalar: number): Vec4 {
        this.x -= scalar;
        this.y -= scalar;
        this.z -= scalar;
        this.w -= scalar;
        return this;
    }

    multiply(vec: Readonly<Vec4>): Vec4 {
        this.x *= vec.x;
        this.y *= vec.y;
        this.z *= vec.z;
        this.w *= vec.w;
        return this;
    }

    scale(scalar: number): Vec4 {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        this.w *= scalar;
        return this;
    }

    multiplyMat3(mat: Readonly<Mat3>): Vec4 {
        const x = this.x;
        const y = this.y;
        const z = this.z;

        this.x = x * mat.data[0] + y * mat.data[3] + z * mat.data[6];
        this.y = x * mat.data[1] + y * mat.data[4] + z * mat.data[7];
        this.z = x * mat.data[2] + y * mat.data[5] + z * mat.data[8];

        return this;
    }

    multiplyMat4(mat: Readonly<Mat4>): Vec4 {
        const x = this.x;
        const y = this.y;
        const z = this.z;
        const w = this.w;

        this.x = x * mat.data[0] + y * mat.data[4] + z * mat.data[8] + w * mat.data[12];
        this.x = x * mat.data[1] + y * mat.data[5] + z * mat.data[9] + w * mat.data[13];
        this.x = x * mat.data[2] + y * mat.data[6] + z * mat.data[10] + w * mat.data[14];
        this.x = x * mat.data[3] + y * mat.data[7] + z * mat.data[11] + w * mat.data[15];

        return this;
    }

    multiplyScalar(scalar: number): Vec4 {
        return this.scale(scalar);
    }

    divide(vec: Readonly<Vec4>): Vec4 {
        this.x /= vec.x;
        this.y /= vec.y;
        this.z /= vec.z;
        this.w /= vec.w;
        return this;
    }

    divideScalar(scalar: number): Vec4 {
        this.x /= scalar;
        this.y /= scalar;
        this.z /= scalar;
        this.w /= scalar;
        return this;
    }

    dot(vec: Readonly<Vec4>): number {
        return this.x * vec.x + this.y * vec.y + this.z * vec.z + this.w * vec.w;
    }

    cross(vec: Readonly<Vec4>): Vec4 {
        return new Vec4(
            this.y * vec.z - this.z * vec.y,
            this.z * vec.w - this.x * vec.w,
            this.w * vec.x - this.y * vec.x,
            this.x * vec.y - this.z * vec.y
        );
    }

    lengthNoSqrt(): number {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }

    length(): number {
        return Math.sqrt(this.lengthNoSqrt());
    }

    magnitude(): number {
        return this.length();
    }

    normalize(): Vec4 {
        const length = this.length();
        if (length == 0) return this;
        return this.scale(1/length);
    }

    copy(vec: Readonly<Vec4Obj>): Vec4 {
        this.x = vec.x;
        this.y = vec.y;
        this.z = vec.z;
        this.w = vec.w;
        return this;
    }

    set(x: number, y: number, z: number, w: number): Vec4 {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        return this;
    }

    clone(): Vec4 {
        return new Vec4(
            this.x,
            this.y,
            this.z,
            this.w
        );
    }

    fromArray(arr: Readonly<Vec4Arr>): Vec4 {
        this.x = arr[0];
        this.y = arr[1];
        this.z = arr[2];
        this.w = arr[3];
        return this;
    }

    toArray(): Vec4Arr {
        return [this.x, this.y, this.z, this.w];
    }

    fromObject(obj: Readonly<Vec4Obj>): Vec4 {
        this.x = obj.x;
        this.y = obj.y;
        this.z = obj.z;
        this.w = obj.w;
        return this;
    }

    toObject(): Vec4Obj {
        return {x: this.x, y: this.y, z: this.z, w: this.w};
    }

    floor(): Vec4 {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        this.w = Math.floor(this.w);
        return this;
    }

    ceil(): Vec4 {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        this.w = Math.ceil(this.w);
        return this;
    }

    round(): Vec4 {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        this.w = Math.round(this.w);
        return this;
    }

    absolute(): Vec4 {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        this.z = Math.abs(this.z);
        this.w = Math.abs(this.w);
        return this;
    }

    equalTo(vec: Readonly<Vec4>): boolean {
        return (
            this.x == vec.x &&
            this.y == vec.y &&
            this.z == vec.z &&
            this.w == vec.w
        );
    }

    distanceTo(vec: Readonly<Vec4>): number {
        const dx = this.x - vec.x;
        const dy = this.y - vec.y;
        const dz = this.z - vec.z;
        const dw = this.w - vec.w;
        return Math.sqrt(dx * dx + dy * dy + dz * dz + dw * dw);
    }

    distanceNoSqrt(vec: Readonly<Vec4>): number {
        const dx = this.x - vec.x;
        const dy = this.y - vec.y;
        const dz = this.z - vec.z;
        const dw = this.w - vec.w;
        return dx * dx + dy * dy + dz * dz + dw * dw;
    }

    randomize(lb: Readonly<Vec4>, ub: Readonly<Vec4>): Vec4 {
        const dx = ub.x - lb.x;
        const dy = ub.y - lb.y;
        const dz = ub.z - lb.z;
        const dw = ub.w - lb.w;
        this.x = Math.random() * dx + lb.x;
        this.y = Math.random() * dy + lb.y;
        this.z = Math.random() * dz + lb.z;
        this.w = Math.random() * dw + lb.w;
        return this;
    }

    zero(): Vec4 {
        this.x = this.y = this.z = this.w = 0;
        return this;
    }

    clampLength(maxLength: number): Vec4 {
        const curLength = this.length();
        const scaleFac = maxLength / curLength;

        if (curLength > maxLength) {
            this.x *= scaleFac;
            this.y *= scaleFac;
            this.z *= scaleFac;
            this.w *= scaleFac;
        }

        return this;
    }

    edit(callback: (vec: Vec4) => void): Vec4 {
        callback(this);
        return this;
    }

    map<T>(callback: (x: number, y: number, z: number, w: number) => T): T {
        return callback(this.x, this.y, this.z, this.w);
    }
}
