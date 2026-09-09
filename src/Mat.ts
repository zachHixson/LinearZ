export interface Mat<MatT, DataT> {
    get data(): DataT;
    get width(): number;

    safeSet(data: Readonly<Array<number>>): MatT;
    set(data: Readonly<DataT>): MatT;
    multiply(mat: Readonly<MatT>): MatT;
    determinant(): number;
    inverse(): MatT;
    transpose(): MatT;
    copy(mat: Readonly<MatT>): MatT;
    clone(): MatT;
}
