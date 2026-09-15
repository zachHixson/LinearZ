export interface Mat<MatT, DataT> {
    /**
     * @return The internal matrix data
     */
    get data(): DataT;

    /**
     * @return Width of the matrix
     */
    get width(): number;

    /**
     * Sets the matrix from any size array
     * @param data Array of numbers to be copied into matrix
     * @return Reference to self
     */
    safeSet(data: Readonly<Array<number>>): MatT;

    /**
     * Sets the matrix from array from fixed length array
     * @param data Array of numbers with length matching Mat.data to be copied into matrix
     * @return Reference to self
     */
    set(data: Readonly<DataT>): MatT;

    /**
     * Adds matrix to original matrix
     * @param mat Readonly matrix to be added to current matrix
     * @return Reference to self
     */
    add(mat: Readonly<MatT>): MatT;

    /**
     * Subtracts matrix from original matrix
     * @param mat Readonly matrix to be subtracted from current matrix
     * @return Reference to self
     */
    subtract(mat: Readonly<MatT>): MatT;

    /**
     * Multiplies original matrix by provided matrix
     * @param mat Readonly matrix to be multiplied with current matrix
     * @return Reference to self
     */
    multiply(mat: Readonly<MatT>): MatT;

    /**
     * Calculates determinant of current matrix
     * @return Determinant
     */
    determinant(): number;

    /**
     * Transposes the current matrix
     * @return Reference to self
     */
    transpose(): MatT;

    /**
     * Sets the current matrix to its inverse
     * @return Reference to self
     */
    inverse(): MatT;

    /**
     * Copies data from provided matrix into current matrix
     * @param mat Matrix to copy from
     * @return Reference to self
     */
    copy(mat: Readonly<MatT>): MatT;

    /**
     * Clones the current matrix to a new separate matrix
     * @return New matrix containing identical data of current matrix
     */
    clone(): MatT;
}
