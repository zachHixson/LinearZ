import { type Mat } from "./Mat.js";

type Mat4Data = [
    number, number, number, number,
    number, number, number, number,
    number, number, number, number,
    number, number, number, number,
];

export class Mat4 implements Mat<Mat4, Mat4Data> {
    static readonly LENGTH = 16;
    static readonly WIDTH = 4;

    private _data: Mat4Data = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ];

    constructor(data?: Readonly<Array<number>>){
        if (!data) return;
        if (data.length == this._data.length) {
            this.set(data as Mat4Data);
        }
        else {
            this.safeSet(data);
        }
    }

    get data(){return this._data};
    get width(){return Mat4.WIDTH};

    safeSet(data: Readonly<Array<number>>): Mat4 {
        const minLen = Math.min(this._data.length, data.length);

        for (let i = 0; i < minLen; i++) {
            this._data[i] = data[i];
        }

        return this;
    }

    set(data: Readonly<Mat4Data>): Mat4 {
        this._data[0] = data[0];
        this._data[1] = data[1];
        this._data[2] = data[2];
        this._data[3] = data[3];
        this._data[4] = data[4];
        this._data[5] = data[5];
        this._data[6] = data[6];
        this._data[7] = data[7];
        this._data[8] = data[8];
        this._data[9] = data[9];
        this._data[10] = data[10];
        this._data[11] = data[11];
        this._data[12] = data[12];
        this._data[13] = data[13];
        this._data[14] = data[14];
        this._data[15] = data[15];
        return this;
    }

    add(mat: Readonly<Mat4>): Mat4 {
        this._data[0] += mat.data[0];
        this._data[1] += mat.data[1];
        this._data[2] += mat.data[2];
        this._data[3] += mat.data[3];
        this._data[4] += mat.data[4];
        this._data[5] += mat.data[5];
        this._data[6] += mat.data[6];
        this._data[7] += mat.data[7];
        this._data[8] += mat.data[8];
        this._data[9] += mat.data[9];
        this._data[10] += mat.data[10];
        this._data[11] += mat.data[11];
        this._data[12] += mat.data[12];
        this._data[13] += mat.data[13];
        this._data[14] += mat.data[14];
        this._data[15] += mat.data[15];
        return this;
    }

    subtract(mat: Readonly<Mat4>): Mat4 {
        this._data[0] -= mat.data[0];
        this._data[1] -= mat.data[1];
        this._data[2] -= mat.data[2];
        this._data[3] -= mat.data[3];
        this._data[4] -= mat.data[4];
        this._data[5] -= mat.data[5];
        this._data[6] -= mat.data[6];
        this._data[7] -= mat.data[7];
        this._data[8] -= mat.data[8];
        this._data[9] -= mat.data[9];
        this._data[10] -= mat.data[10];
        this._data[11] -= mat.data[11];
        this._data[12] -= mat.data[12];
        this._data[13] -= mat.data[13];
        this._data[14] -= mat.data[14];
        this._data[15] -= mat.data[15];
        return this;
    }

    multiply(mat: Readonly<Mat4>): Mat4 {
        let swap1;
        let swap2;
        let swap3;
        let swap4;

        swap1 = this._data[0];
        swap2 = this._data[1];
        swap3 = this._data[2];
        swap4 = this._data[3];
        this._data[0] = swap1 * mat.data[0] + swap2 * mat.data[4] + swap3 * mat.data[8] + swap4 * mat.data[12];
        this._data[1] = swap1 * mat.data[1] + swap2 * mat.data[5] + swap3 * mat.data[9] + swap4 * mat.data[13];
        this._data[2] = swap1 * mat.data[2] + swap2 * mat.data[6] + swap3 * mat.data[10] + swap4 * mat.data[14];
        this._data[3] = swap1 * mat.data[3] + swap2 * mat.data[7] + swap3 * mat.data[11] + swap4 * mat.data[15];

        swap1 = this._data[4];
        swap2 = this._data[5];
        swap3 = this._data[6];
        swap4 = this._data[7];
        this._data[4] = swap1 * mat.data[0] + swap2 * mat.data[4] + swap3 * mat.data[8] + swap4 * mat.data[12];
        this._data[5] = swap1 * mat.data[1] + swap2 * mat.data[5] + swap3 * mat.data[9] + swap4 * mat.data[13];
        this._data[6] = swap1 * mat.data[2] + swap2 * mat.data[6] + swap3 * mat.data[10] + swap4 * mat.data[14];
        this._data[7] = swap1 * mat.data[3] + swap2 * mat.data[7] + swap3 * mat.data[11] + swap4 * mat.data[15];

        swap1 = this._data[8];
        swap2 = this._data[9];
        swap3 = this._data[10];
        swap4 = this._data[11];
        this._data[8] = swap1 * mat.data[0] + swap2 * mat.data[4] + swap3 * mat.data[8] + swap4 * mat.data[12];
        this._data[9] = swap1 * mat.data[1] + swap2 * mat.data[5] + swap3 * mat.data[9] + swap4 * mat.data[13];
        this._data[10] = swap1 * mat.data[2] + swap2 * mat.data[6] + swap3 * mat.data[10] + swap4 * mat.data[14];
        this._data[11] = swap1 * mat.data[3] + swap2 * mat.data[7] + swap3 * mat.data[11] + swap4 * mat.data[15];

        swap1 = this._data[12];
        swap2 = this._data[13];
        swap3 = this._data[14];
        swap4 = this._data[15];
        this._data[12] = swap1 * mat.data[0] + swap2 * mat.data[4] + swap3 * mat.data[8] + swap4 * mat.data[12];
        this._data[13] = swap1 * mat.data[1] + swap2 * mat.data[5] + swap3 * mat.data[9] + swap4 * mat.data[13];
        this._data[14] = swap1 * mat.data[2] + swap2 * mat.data[6] + swap3 * mat.data[10] + swap4 * mat.data[14];
        this._data[15] = swap1 * mat.data[3] + swap2 * mat.data[7] + swap3 * mat.data[11] + swap4 * mat.data[15];

        return this;
    }

    determinant(): number {
        const det10_15_11_14 = this._data[10] * this._data[15] - this._data[11] * this._data[14];
        const det9_15_11_13 = this._data[9] * this._data[15] - this._data[11] * this._data[13];
        const det9_14_10_13 = this._data[9] * this._data[14] - this._data[10] * this._data[13];
        const det8_15_11_12 = this._data[8] * this._data[15] - this._data[11] * this._data[12];
        const det8_14_10_12 = this._data[8] * this._data[14] - this._data[10] * this._data[12];
        const det8_13_9_12 = this._data[8] * this._data[13] - this._data[9] * this._data[12];

        const sub00 = this._data[5] * (det10_15_11_14);
        const sub01 = this._data[6] * (det9_15_11_13);
        const sub02 = this._data[7] * (det9_14_10_13);

        const sub10 = this._data[4] * (det10_15_11_14);
        const sub11 = this._data[6] * (det8_15_11_12);
        const sub12 = this._data[7] * (det8_14_10_12);

        const sub20 = this._data[4] * (det9_15_11_13);
        const sub21 = this._data[5] * (det8_15_11_12);
        const sub22 = this._data[7] * (det8_13_9_12);

        const sub30 = this._data[4] * (det9_14_10_13);
        const sub31 = this._data[5] * (det8_14_10_12);
        const sub32 = this._data[6] * (det8_13_9_12);

        return (
            this._data[0] * (sub00 - sub01 + sub02) -
            this._data[1] * (sub10 - sub11 + sub12) +
            this._data[2] * (sub20 - sub21 + sub22) -
            this._data[3] * (sub30 - sub31 + sub32)
        );
    }

    transpose(): Mat4 {
        let swap;

        swap = this._data[1];
        this._data[1] = this._data[4];
        this._data[4] = swap;

        swap = this._data[2];
        this._data[2] = this._data[8];
        this._data[8] = swap;

        swap = this._data[3];
        this._data[3] = this._data[12];
        this._data[12] = swap;

        swap = this._data[6];
        this._data[6] = this._data[9];
        this._data[9] = swap;

        swap = this._data[7];
        this._data[7] = this._data[13];
        this._data[13] = swap;

        swap = this._data[11];
        this._data[11] = this._data[14];
        this._data[14] = swap;

        return this;
    }

    inverse(): Mat4 {
        const det = this.determinant();

        if (det == 0){
            throw new Error("Cannot get inverse of matrix if determinant is 0");
        }

        //calculate determinants using "matrix of minors" and apply "checkeerboard" +/-
        const data00 = this._data[0];
        const data01 = this._data[1];
        const data02 = this._data[2];
        const data03 = this._data[3];
        const data04 = this._data[4];
        const data05 = this._data[5];
        const data06 = this._data[6];
        const data07 = this._data[7];
        const data08 = this._data[8];
        const data09 = this._data[9];
        const data10 = this._data[10];
        const data11 = this._data[11];

        const det10_15_11_14 = data10 * this._data[15] - data11 * this._data[14];
        const det9_15_11_13 = data09 * this._data[15] - data11 * this._data[13];
        const det9_14_10_13 = data09 * this._data[14] - data10 * this._data[13];
        const det8_15_11_12 = data08 * this._data[15] - data11 * this._data[12];
        const det8_14_10_12 = data08 * this._data[14] - data10 * this._data[12];
        const det8_13_9_12 = data08 * this._data[13] - data09 * this._data[12];
        const det6_15_7_14 = data06 * this._data[15] - data07 * this._data[14];
        const det5_15_7_13 = data05 * this._data[15] - data07 * this._data[13];
        const det5_14_6_13 = data05 * this._data[14] - data06 * this._data[13];
        const det4_15_7_12 = data04 * this._data[15] - data07 * this._data[12];
        const det4_14_6_12 = data04 * this._data[14] - data06 * this._data[12];
        const det4_13_5_12 = data04 * this._data[13] - data05 * this._data[12];
        const det6_11_7_10 = data06 * data11 - data07 * data10;
        const det5_10_6_9 = data05 * data10 - data06 * data09;
        const det4_10_6_8 = data04 * data10 - data06 * data08;
        const det5_11_7_9 = data05 * data11 - data07 * data09;
        const det4_11_7_8 = data04 * data11 - data07 * data08;
        const det4_9_5_8 = data04 * data09 - data05 * data08;

        this._data[0] = (data05 * det10_15_11_14 - data06 * det9_15_11_13 + data07 * det9_14_10_13);
        this._data[1] = -(data04 * det10_15_11_14 - data06 * det8_15_11_12 + data07 * det8_14_10_12);
        this._data[2] = (data04 * det9_15_11_13 - data05 * det8_15_11_12 + data07 * det8_13_9_12);
        this._data[3] = -(data04 * det9_14_10_13 - data05 * det8_14_10_12 + data06 * det8_13_9_12);

        this._data[4] = -(data01 * det10_15_11_14 - data02 * det9_15_11_13 + data03 * det9_14_10_13);
        this._data[5] = (data00 * det10_15_11_14 - data02 * det8_15_11_12 + data03 * det8_14_10_12);
        this._data[6] = -(data00 * det9_15_11_13 - data01 * det8_15_11_12 + data03 * det8_13_9_12);
        this._data[7] = (data00 * det9_14_10_13 - data01 * det8_14_10_12 + data02 * det8_13_9_12);

        this._data[8] = (data01 * det6_15_7_14 - data02 * det5_15_7_13 + data03 * det5_14_6_13);
        this._data[9] = -(data00 * det6_15_7_14 - data02 * det4_15_7_12 + data03 * det4_14_6_12);
        this._data[10] = (data00 * det5_15_7_13 - data01 * det4_15_7_12 + data03 * det4_13_5_12);
        this._data[11] = -(data00 * det5_14_6_13 - data01 * det4_14_6_12 + data02 * det4_13_5_12);

        this._data[12] = -(data01 * det6_11_7_10 - data02 * det5_11_7_9 + data03 * (det5_10_6_9));
        this._data[13] = (data00 * det6_11_7_10 - data02 * det4_11_7_8 + data03 * (det4_10_6_8));
        this._data[14] = -(data00 * det5_11_7_9 - data01 * det4_11_7_8 + data03 * det4_9_5_8);
        this._data[15] = (data00 * det5_10_6_9 - data01 * det4_10_6_8 + data02 * det4_9_5_8);

        //transpose matrix and multiply all elements by inverse of the determinant
        const invDet = 1 / det;

        this._data[0] *= invDet;
        this._data[1] *= invDet;
        this._data[2] *= invDet;
        this._data[3] *= invDet;
        this._data[4] *= invDet;
        this._data[5] *= invDet;
        this._data[6] *= invDet;
        this._data[7] *= invDet;
        this._data[8] *= invDet;
        this._data[9] *= invDet;
        this._data[10] *= invDet;
        this._data[11] *= invDet;
        this._data[12] *= invDet;
        this._data[13] *= invDet;
        this._data[14] *= invDet;
        this._data[15] *= invDet;

        return this.transpose();
    }

    copy(mat: Mat4): Mat4 {
        this.set(mat._data);
        return this;
    }

    clone(): Mat4 {
        return new Mat4(this._data);
    }
}
