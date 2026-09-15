import { type Vec } from "./Vec.js";
import { type Mat3 } from "./Mat3.js";
import { type Mat4 } from "./Mat4.js";

/** @inheritdoc */
export class Vec3 implements Vec<Vec3>{
    static readonly WIDTH = 3;

    static fromArray(arr: Readonly<Array<number>>): Vec3 {
        return new Vec3(arr[0], arr[1], arr[2]);
    }

    static fromObject(obj: Readonly<{x?: number, y?: number, z?: number}>): Vec3 {
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

    multiplyScalar(scalar: number): Vec3 {
        return this.scale(scalar);
    }

    multiplyMat3(mat: Readonly<Mat3>): Vec3 {
        const x = this.x;
        const y = this.y;

        this.x = x * mat.data[0] + y * mat.data[3] + this.z * mat.data[6];
        this.y = x * mat.data[1] + y * mat.data[4] + this.z * mat.data[7];
        this.z = x * mat.data[2] + y * mat.data[5] + this.z * mat.data[8];

        return this;
    }

    multiplyMat4(mat: Readonly<Mat4>): Vec3 {
        const x = this.x;
        const y = this.y;

        this.x = x * mat.data[0] + y * mat.data[4] + this.z * mat.data[8] + mat.data[12];
        this.y = x * mat.data[1] + y * mat.data[5] + this.z * mat.data[9] + mat.data[13];
        this.z = x * mat.data[2] + y * mat.data[6] + this.z * mat.data[10] + mat.data[14];

        return this;
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

    /**
     * Sets the current vector to the cross product of the current vector and the provided vector
     * @param vec Second vector to cross with current vector
     * @returns Reference to self
     */
    cross(vec: Readonly<Vec3>): Vec3 {
        const x = this.x;
        const y = this.y;

        this.x = y * vec.z - this.z * vec.y;
        this.y = this.z * vec.x - x * vec.z;
        this.z = x * vec.y - y * vec.x

        return this;
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

    copy(vec: Readonly<{x: number, y: number, z: number}>): Vec3 {
        this.x = vec.x;
        this.y = vec.y;
        this.z = vec.z;
        return this;
    }

    /**
     * @param x X component
     * @param y Y Component
     * @param z Z component
     * @returns Reference to self
     */
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

    fromArray(arr: Readonly<Array<number>>): Vec3 {
        this.x = arr[0] ?? 0;
        this.y = arr[1] ?? 0;
        this.z = arr[2] ?? 0;
        return this;
    }

    toArray(): [number, number, number] {
        return [this.x, this.y, this.z];
    }

    fromObject(obj: Readonly<{x?: number, y?: number, z?: number}>): Vec3 {
        this.x = obj.x ?? 0;
        this.y = obj.y ?? 0;
        this.z = obj.z ?? 0;
        return this;
    }

    toObject(): {x: number, y: number, z: number} {
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

    distanceNoSqrt(vec: Readonly<Vec3>): number {
        const dx = this.x - vec.x;
        const dy = this.y - vec.y;
        const dz = this.z - vec.z;
        return dx * dx + dy * dy + dz * dz;
    }

    distanceTo(vec: Readonly<Vec3>): number {
        return Math.sqrt(this.distanceNoSqrt(vec));
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

    map<T>(callback: (vec: Readonly<Vec3>) => T): T {
        return callback(this);
    }
}
