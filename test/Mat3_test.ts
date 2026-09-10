import { fileURLToPath } from "url";
import { createTester, EQUAL, NOT_EQUAL, EXPECT_THROW } from "./Testing.ts";
import { MAT_EQUAL } from "./Mat_helpers.ts";
import { Mat3 } from "../src/Mat3.ts";

const { TEST, RUN } = createTester("Mat3 Tests");

TEST("Mat3.LENGTH", ()=>{
    EQUAL(Mat3.LENGTH, 9);
});

TEST("Mat3.WIDTH", ()=>{
    EQUAL(Mat3.WIDTH, 3);
});

TEST("New() Empty", ()=>{
    const mat = new Mat3();
    MAT_EQUAL(mat.data, [1, 0, 0, 0, 1, 0, 0, 0, 1]);
});

TEST("New() Full", ()=>{
    const mat = new Mat3([11, 2, 3, 4, 5, 6, 7, 8, 9]);
    MAT_EQUAL(mat.data, [11, 2, 3, 4, 5, 6, 7, 8, 9]);
});

TEST("New() Short", ()=>{
    const mat = new Mat3([11, 12, 13]);
    MAT_EQUAL(mat.data, [11, 12, 13, 0, 1, 0, 0, 0, 1]);
});

TEST("New() Long", ()=>{
    const mat = new Mat3([-5, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    MAT_EQUAL(mat.data, [-5, 2, 3, 4, 5, 6, 7, 8, 9]);
});

TEST(".width", ()=>{
    const mat = new Mat3();
    EQUAL(mat.width, 3);
});

TEST("safeSet() Short", ()=>{
    const mat = new Mat3();
    const res = mat.safeSet([11, 12, 13]);
    EQUAL(mat, res);
    MAT_EQUAL(mat.data, [11, 12, 13, 0, 1, 0, 0, 0, 1]);
});

TEST("safeSet() Long", ()=>{
    const mat = new Mat3();
    const res = mat.safeSet([-5, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    EQUAL(mat, res);
    MAT_EQUAL(mat.data, [-5, 2, 3, 4, 5, 6, 7, 8, 9]);
});

TEST("set()", ()=>{
    const mat = new Mat3();
    const res = mat.set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    EQUAL(mat, res);
    MAT_EQUAL(mat.data, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

TEST("add()", ()=>{
    const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const arr2 = [11, 22, 33, 44, 55, 66, 77, 88, 99];
    const res = [12, 24, 36, 48, 60, 72, 84, 96, 108];

    const a = new Mat3(arr1);
    const b = new Mat3(arr2);
    const c = a.add(b);
    EQUAL(a, c);
    MAT_EQUAL(a.data, c.data);
    MAT_EQUAL(b.data, arr2);
    MAT_EQUAL(a.data, res);

    const d = new Mat3(arr1);
    const e = new Mat3(arr2);
    const f = e.add(d);
    EQUAL(e, f);
    MAT_EQUAL(d.data, arr1);
    MAT_EQUAL(e.data, f.data);
    MAT_EQUAL(e.data, res);
});

TEST("subtract()", ()=>{
    const arr1 = [11, 22, 33, 44, 55, 66, 77, 88, 99];
    const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const res1 = [10, 20, 30, 40, 50, 60, 70, 80, 90];
    const res2 = [-10, -20, -30, -40, -50, -60, -70, -80, -90];

    const a = new Mat3(arr1);
    const b = new Mat3(arr2);
    const c = a.subtract(b);
    EQUAL(a, c);
    MAT_EQUAL(a.data, c.data);
    MAT_EQUAL(b.data, arr2);
    MAT_EQUAL(a.data, res1);

    const d = new Mat3(arr1);
    const e = new Mat3(arr2);
    const f = e.subtract(d);
    EQUAL(e, f);
    MAT_EQUAL(d.data, arr1);
    MAT_EQUAL(e.data, f.data);
    MAT_EQUAL(e.data, res2);
});

TEST("multiply()", ()=>{
    const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const arr2 = [10, 11, 12, 13, 14, 15, 16, 17, 18];
    const res1 = [84, 90, 96, 201, 216, 231, 318, 342, 366];
    const res2 = [138, 171, 204, 174, 216, 258, 210, 261, 312];

    const a = new Mat3(arr1);
    const b = new Mat3(arr2);
    const c = a.multiply(b);
    EQUAL(a, c);
    MAT_EQUAL(a.data, c.data);
    MAT_EQUAL(b.data, arr2);
    MAT_EQUAL(a.data, res1);

    const d = new Mat3(arr1);
    const e = new Mat3(arr2);
    const f = e.multiply(d);
    EQUAL(e, f);
    MAT_EQUAL(d.data, arr1);
    MAT_EQUAL(e.data, f.data);
    MAT_EQUAL(e.data, res2);
});

TEST("multiply() Identity", ()=>{
    const data = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    const mat = new Mat3(data);
    const identity = new Mat3();
    const multRes = mat.multiply(identity);
    EQUAL(multRes, mat);
    MAT_EQUAL(mat.data, data);
});

TEST("determinant()", ()=>{
    const data = [4, 2, 6, 2, 5, 7, 9, 1, 3];
    const mat = new Mat3(data);
    const det = mat.determinant();
    MAT_EQUAL(mat.data, data);
    EQUAL(det, -112);
});

TEST("transpose()", ()=>{
    const mat = new Mat3([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const xpos = mat.transpose();
    EQUAL(mat, xpos);
    MAT_EQUAL(mat.data, xpos.data);
    MAT_EQUAL(xpos.data, [1, 4, 7, 2, 5, 8, 3, 6, 9]);
});

TEST("inverse() Zero Determinant", ()=>{
    const mat = new Mat3([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    EXPECT_THROW(()=>{
        const inv = mat.inverse();
        console.log("This should not print", inv);
    });
});

TEST("inverse()", ()=>{
    const mat = new Mat3([3, 0, 2, 2, 0, -2, 0, 1, 1]);
    const inverse = mat.inverse();
    EQUAL(mat, inverse);
    MAT_EQUAL(mat.data, inverse.data);
    MAT_EQUAL(inverse.data, [0.2, 0.2, 0, -0.2, 0.3, 1, 0.2, -0.3, 0]);
});

TEST("copy()", ()=>{
    const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const arr2 = [11, 12, 13, 14, 15, 16, 17, 18, 19];
    const a = new Mat3(arr1);
    const b = new Mat3(arr2);
    const c = a.copy(b);
    EQUAL(a, c);
    MAT_EQUAL(a.data, c.data);
    MAT_EQUAL(b.data, arr2);
    MAT_EQUAL(c.data, arr2);
});

TEST("clone()", ()=>{
    const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const arr2 = [10, 11, 12, 13, 14, 15, 16, 17, 18];
    const mat = new Mat3(arr1);
    const clone = mat.clone();
    NOT_EQUAL(mat, clone);
    MAT_EQUAL(mat.data, clone.data);

    mat.safeSet(arr2);

    MAT_EQUAL(clone.data, arr1);
});

if (fileURLToPath(import.meta.url) == process.argv[1]) {
    RUN();
}

export default RUN;
