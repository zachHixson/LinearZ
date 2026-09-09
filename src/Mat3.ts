import { type Mat } from "./Mat";

type Mat3Data = [
    number, number, number,
    number, number, number,
    number, number, number,
];

export class Mat3 implements Mat<Mat3, Mat3Data> {
    static readonly LENGTH = 9;
    static readonly WIDTH = 3;

    private _data: Mat3Data = [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1,
    ];

    constructor(data?: Array<number>){
        if (!data) return;
        if (data.length == this._data.length) {
            this.set(data as Mat3Data);
        }
        else {
            this.safeSet(data);
        }
    }

    get data(){return this._data}
    get width(){return Mat3.WIDTH}

    safeSet(data: Readonly<Array<number>>): Mat3 {
        const minLen = Math.min(this._data.length, data.length);

        for (let i = 0; i < minLen; i++) {
            this._data[i] = data[i];
        }

        return this;
    }

    set(data: Readonly<Mat3Data>): Mat3 {
        this._data[0] = data[0];
        this._data[1] = data[1];
        this._data[2] = data[2];
        this._data[3] = data[3];
        this._data[4] = data[4];
        this._data[5] = data[5];
        this._data[6] = data[6];
        this._data[7] = data[7];
        this._data[8] = data[8];
        return this;
    }

    multiply(mat: Readonly<Mat3>): Mat3 {
        let swap1;
        let swap2;
        let swap3;

        swap1 = this._data[0];
        swap2 = this._data[1];
        swap3 = this._data[2];
        this._data[0] = swap1 * mat.data[0] + swap2 * mat.data[3] + swap3 * mat.data[6];
        this._data[1] = swap1 * mat.data[1] + swap2 * mat.data[4] + swap3 * mat.data[7];
        this._data[2] = swap1 * mat.data[2] + swap2 * mat.data[5] + swap3 * mat.data[8];

        swap1 = this._data[3];
        swap2 = this._data[4];
        swap3 = this._data[5];
        this._data[3] = swap1 * mat.data[0] + swap2 * mat.data[3] + swap3 * mat.data[6];
        this._data[4] = swap1 * mat.data[1] + swap2 * mat.data[4] + swap3 * mat.data[7];
        this._data[5] = swap1 * mat.data[2] + swap2 * mat.data[5] + swap3 * mat.data[8];

        swap1 = this._data[6];
        swap2 = this._data[7];
        swap3 = this._data[8];
        this._data[6] = swap1 * mat.data[0] + swap2 * mat.data[3] + swap3 * mat.data[6];
        this._data[7] = swap1 * mat.data[1] + swap2 * mat.data[4] + swap3 * mat.data[7];
        this._data[8] = swap1 * mat.data[2] + swap2 * mat.data[5] + swap3 * mat.data[8];

        return this;
    }

    determinant(): number {
        return (
            this._data[0] * (this._data[4] * this._data[8] - this._data[5] * this._data[7]) -
            this._data[1] * (this._data[3] * this._data[8] - this._data[5] * this._data[6]) +
            this._data[2] * (this._data[3] * this._data[7] - this._data[4] * this._data[6])
        );
    }

    inverse(): Mat3 {
        //calculate determinants using "matrix of minors" and apply "checkeerboard" +/-
        const data0 = this._data[0];
        const data1 = this._data[1];
        const data2 = this._data[2];
        const data3 = this._data[3];
        const data4 = this._data[4];
        const data5 = this._data[5];

        const det0 = data4 * this._data[8] - data5 * this._data[7];
        const det1 = data3 * this._data[8] - data5 * this._data[6];
        const det2 = data3 * this._data[7] - data4 * this._data[6];

        const det = this._data[0] * det0 - this._data[1] * det1 + this._data[2] * det2;

        if (det == 0){
            throw new Error("Cannot get inverse of matrix if determinant is 0");
        }

        this._data[0] = det0;
        this._data[1] = -det1;
        this._data[2] = det2;

        this._data[3] = -(data1 * this._data[8] - this._data[7] * data2);
        this._data[4] = data0 * this._data[8] - this._data[6] * data2;
        this._data[5] = -(data0 * this._data[7] - this._data[6] * data1);

        this._data[6] = data1 * data5 - data4 * data2;
        this._data[7] = -(data0 * data5 - data3 * data2);
        this._data[8] = data0 * data4 - data3 * data1;

        //transpose matrix and multiply all elements by inverse of the determinant
        const invDet = 1 / det;
        let swap;

        this._data[0] *= invDet;
        this._data[4] *= invDet;
        this._data[8] *= invDet;

        swap = this._data[1];
        this._data[1] = this._data[3] * invDet;
        this._data[3] = swap * invDet;

        swap = this._data[2];
        this._data[2] = this._data[6] * invDet;
        this._data[6] = swap * invDet;

        swap = this._data[5];
        this._data[5] = this._data[7] * invDet;
        this._data[7] = swap * invDet;

        return this;
    }

    transpose(): Mat3 {
        let swap;

        swap = this._data[1];
        this._data[1] = this._data[3];
        this._data[3] = swap;

        swap = this._data[2];
        this._data[2] = this._data[6];
        this._data[6] = swap;

        swap = this._data[5];
        this._data[5] = this._data[7];
        this._data[7] = swap;

        return this;
    }

    copy(mat: Readonly<Mat3>): Mat3 {
        this.set(mat.data);
        return this;
    }

    clone(): Mat3 {
        return new Mat3(this._data);
    }
}
