import { type Vec } from "./Vec.ts";
import { type Mat3 } from "./Mat3.ts";
import { type Mat4 } from "./Mat4.ts";

type Vec3Obj = {x: number, y: number, z: number};
type Vec3Arr = [number, number, number];

export class Vec3 implements Vec<Vec3, Vec3Obj, Vec3Arr, Mat3>{
    static readonly WIDTH = 3;

    static fromArray(arr: Readonly<Vec3Arr>): Vec3 {
        return new Vec3(arr[0], arr[1], arr[2]);
    }

    static fromObject(obj: Readonly<Vec3Obj>): Vec3 {
        return new Vec3(obj.x, obj.y, obj.z);
    }

    x: number;
    y: number;
    z: number;

    get width() {return Vec3.WIDTH}

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(vec: Readonly<Vec3>): Vec3 {
        this.x += vec.x;
        this.y += vec.y;
        this.z += vec.z;
        return this;
    }

    addScalar(scalar: number): Vec3 {
        this.x += scalar;
        this.y += scalar;
        this.z += scalar;
        return this;
    }

    subtract(vec: Readonly<Vec3>): Vec3 {
        this.x -= vec.x;
        this.y -= vec.y;
        this.z -= vec.z;
        return this;
    }

    subtractScalar(scalar: number): Vec3 {
        this.x -= scalar;
        this.y -= scalar;
        this.z -= scalar;
        return this;
    }

    multiply(vec: Readonly<Vec3>): Vec3 {
        this.x *= vec.x;
        this.y *= vec.y;
        this.z *= vec.z;
        return this;
    }

    scale(scalar: number): Vec3 {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    }

    multiplyMat3(mat: Readonly<Mat3>): Vec3 {
        const x = this.x;
        const y = this.y;
        const z = this.z;

        this.x = x * mat.data[0] + y * mat.data[3] + z * mat.data[6];
        this.y = x * mat.data[1] + y * mat.data[4] + z * mat.data[7];
        this.z = x * mat.data[2] + y * mat.data[5] + z * mat.data[8];

        return this;
    }

    multiplyMat4(mat: Readonly<Mat4>): Vec3 {
        const x = this.x;
        const y = this.y;
        const z = this.z;

        this.x = x * mat.data[0] + y * mat.data[3] + z * mat.data[6] + mat.data[12];
        this.y = x * mat.data[1] + y * mat.data[4] + z * mat.data[7] + mat.data[13];
        this.z = x * mat.data[2] + y * mat.data[5] + z * mat.data[8] + mat.data[14];

        return this;
    }

    multiplyScalar(scalar: number): Vec3 {
        return this.scale(scalar);
    }

    divide(vec: Readonly<Vec3>): Vec3 {
        this.x /= vec.x;
        this.y /= vec.y;
        this.z /= vec.z;
        return this;
    }

    divideScalar(scalar: number): Vec3 {
        this.x /= scalar;
        this.y /= scalar;
        this.z /= scalar;
        return this;
    }

    dot(vec: Readonly<Vec3>): number {
        return this.x * vec.x + this.y * vec.y + this.z * vec.z;
    }

    cross(vec: Readonly<Vec3>): Vec3 {
        return new Vec3(
            this.y * vec.z - this.z * vec.y,
            this.z * vec.x - this.x * vec.z,
            this.x * vec.y - this.y * vec.x
        );
    }

    lengthNoSqrt(): number {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    length(): number {
        return Math.sqrt(this.lengthNoSqrt());
    }

    magnitude(): number {
        return this.length();
    }

    normalize(): Vec3 {
        const length = this.length();
        if (length == 0) return this;
        return this.scale(1/length);
    }

    copy(vec: Readonly<Vec3Obj>): Vec3 {
        this.x = vec.x;
        this.y = vec.y;
        this.z = vec.z;
        return this;
    }

    set(x: number, y: number, z: number): Vec3 {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    clone(): Vec3 {
        return new Vec3(
            this.x,
            this.y,
            this.z
        );
    }

    fromArray(arr: Readonly<Vec3Arr>): Vec3 {
        this.x = arr[0];
        this.y = arr[1];
        this.z = arr[2];
        return this;
    }

    toArray(): Vec3Arr {
        return [this.x, this.y, this.z];
    }

    fromObject(obj: Readonly<Vec3Obj>): Vec3 {
        this.x = obj.x;
        this.y = obj.y;
        this.z = obj.z;
        return this;
    }

    toObject(): Vec3Obj {
        return {x: this.x, y: this.y, z: this.z};
    }

    floor(): Vec3 {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        return this;
    }

    ceil(): Vec3 {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        return this;
    }

    round(): Vec3 {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        return this;
    }

    absolute(): Vec3 {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        this.z = Math.abs(this.z);
        return this;
    }

    equalTo(vec: Readonly<Vec3>): boolean {
        return (
            this.x == vec.x &&
            this.y == vec.y &&
            this.z == vec.z
        );
    }

    distanceTo(vec: Readonly<Vec3>): number {
        const dx = this.x - vec.x;
        const dy = this.y - vec.y;
        const dz = this.z - vec.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    distanceNoSqrt(vec: Readonly<Vec3>): number {
        const dx = this.x - vec.x;
        const dy = this.y - vec.y;
        const dz = this.z - vec.z;
        return dx * dx + dy * dy + dz * dz;
    }

    randomize(lb: Readonly<Vec3>, ub: Readonly<Vec3>): Vec3 {
        const dx = ub.x - lb.x;
        const dy = ub.y - lb.y;
        const dz = ub.z - lb.z;
        this.x = Math.random() * dx + lb.x;
        this.y = Math.random() * dy + lb.y;
        this.z = Math.random() * dz + lb.z;
        return this;
    }

    zero(): Vec3 {
        this.x = this.y = this.z = 0;
        return this;
    }

    clampLength(maxLength: number): Vec3 {
        const curLength = this.length();
        const scaleFac = maxLength / curLength;

        if (curLength > maxLength) {
            this.x *= scaleFac;
            this.y *= scaleFac;
            this.z *= scaleFac;
        }

        return this;
    }

    edit(callback: (vec: Vec3) => void): Vec3 {
        callback(this);
        return this;
    }

    map<T>(callback: (x: number, y: number, z: number) => T): T {
        return callback(this.x, this.y, this.z);
    }
}
