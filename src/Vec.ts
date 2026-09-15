import { type Mat3 } from "./Mat3.js";
import { type Mat4 } from "./Mat4.js";

export interface Vec<VecT> {
    /**
     * @returns Width (dimension) of current vector
     */
    get width(): number;

    /**
     * Adds provided vector to current vector
     * @param vec Vector to be added
     * @return Reference to self
     */
    add(vec: Readonly<VecT>): VecT;

    /**
     * Adds scalar value to all components of current vector
     * @param scalar Scalar value to be added
     * @return Reference to self
     */
    addScalar(scalar: number): VecT;

    /**
     * Subtracts provided vector from current vector
     * @param vec Vector to be subtracted
     * @return Reference to self
     */
    subtract(vec: Readonly<VecT>): VecT;

    /**
     * Subtracts scalar value from all components of current vector
     * @param scalar Scalar value to be subtracted
     * @return Reference to self
     */
    subtractScalar(scalar: number): VecT;

    /**
     * Multiplies current vector by a provided vector (component-wise)
     * @param vec Vector to be multiplied
     * @return Reference to self
     */
    multiply(vec: Readonly<VecT>): VecT;

    /**
     * Multiplies all components in current vector by scalar value
     * @param scalar Scalar value to multiply components by
     * @return Reference to self
     */
    scale(scalar: number): VecT;

    /**
     * Multiplies all components in current vector by scalar value
     * @param scalar Scalar value to multiply components by
     * @return Reference to self
     */
    multiplyScalar(scalar: number): VecT;

    /**
     * Multiplies current vector by Mat3
     *
     * If the size doesn't match, extra components will be treated as identity matrix
     *
     * @param mat
     * @return Reference to self
     */
    multiplyMat3(mat: Readonly<Mat3>): VecT;

    /**
     * Multiplies current vector by Mat4
     *
     * If the size doesn't match, extra components will be treated as identity matrix
     *
     * @param mat
     * @return Reference to self
     */
    multiplyMat4(mat: Readonly<Mat4>): VecT;

    /**
     * Divides current vector by provided vector (component-wise)
     * @param vec Vector to divide by
     * @return Reference to self
     */
    divide(vec: Readonly<VecT>): VecT;

    /**
     * Divides all components in current vector by scalar value
     * @param scalar Scalar value to divide components by
     * @return Reference to self
     */
    divideScalar(scalar: number): VecT;

    /**
     * Calculates dot product of current vector and provided vector
     * @param vec Second vector to be used to calculate dot product
     * @return Dot product
     */
    dot(vec: Readonly<VecT>): number;

    /**
     * @return Length of vector squared, without square root calculation
     */
    lengthNoSqrt(): number;

    /**
     * @return Length of vector
     */
    length(): number;

    /**
     * @return Magnitude of current vector
     */
    magnitude(): number;

    /**
     * Normalizes current vector (sets length to 1 while preserving direction)
     * @return Reference to self
     */
    normalize(): VecT;

    /**
     * Copies the components of a provided vector to the current vector
     * @param vec Vector to copy from
     */
    copy(vec: Readonly<VecT>): VecT;

    /**
     * Sets components of current vector
     */
    set(...args: unknown[]): VecT;

    /**
     * Creates new vector with copy of the current vector's components
     * @return New vector
     */
    clone(): VecT;

    /**
     * Copies elements of provided array into the components of the current vector
     * @param arr Array with size matching Vec.data to copy components from
     */
    copyArray(arr: Readonly<Array<number>>): VecT;

    /**
     * Creates new array from components of current vector
     * @return New array with elements matching components of current vector
     */
    toArray(): Array<number>;

    /**
     * Copies components of provided vector-like object into the components of the current vector
     * @param obj Vector-like object to copy components from
     */
    copyObject(obj: Readonly<{x?: number, y?: number, z?: number, w?: number}>): VecT;

    /**
     * Creates new object from components of current vector
     * @return New object with components matching components of current vector
     */
    toObject(): unknown;

    /**
     * Floors (force rounds down) all components of current vector
     * @return Reference to self
     */
    floor(): VecT;

    /**
     * Ceilings (force rounds up) all components of current vector
     * @return Reference to self
     */
    ceil(): VecT;

    /**
     * Rounds all components of current vector
     * @return Reference to self
     */
    round(): VecT;

    /**
     * Sets all components of current vector to their absolute value
     * @return Reference to self
     */
    absolute(): VecT;

    /**
     * Calculates distance between current vector and provided vector, without square root calculation
     * @param vec Second vector to use in distance calculation
     * @return Distance between the two vectors squared
     */
    distanceNoSqrt(vec: Readonly<VecT>): number;

    /**
     * Calculates distance between current vector and provided vector
     * @param vec Second vector to use in distance calculation
     * @return Distance between the two vectors
     */
    distanceTo(vec: Readonly<VecT>): number;

    /**
     * Randomizes the components of the current vector so that they are between the provided upper and lower bounds
     * @param lb Vector representing the lower bounds of each component
     * @param ub Vector representing the upper bounds of each component
     * @return Reference to self
     */
    randomize(lb: Readonly<VecT>, ub: Readonly<VecT>): VecT;

    /**
     * Sets all components of current vector to zero
     * @return Reference to self
     */
    zero(): VecT;

    /**
     * Clamps the current vector to the provided length
     *
     * Vectors smaller than provided length will not be modified
     * @param maxLength Max length of vector
     */
    clampLength(maxLength: number): VecT;

    /**
     * Edits the components of the current vector using provided callback
     * @param callback Callback function used to edit current vector
     * @return Reference to self
     */
    edit(callback: (vec: VecT) => void): VecT;

    /**
     * Creates new data or object from current vector using provided callback
     * @param callback Callback function used to create new data
     * @return New data or object
     */
    map<T>(callback: (vec: Readonly<VecT>) => T): T;
}
