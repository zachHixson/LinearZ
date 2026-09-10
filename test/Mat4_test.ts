import { fileURLToPath } from "url";
import { createTester, EQUAL, NOT_EQUAL, EXPECT_THROW } from "./Testing.js";
import { MAT_EQUAL } from "./Mat_helpers.js";
import { Mat4 } from "../src/Mat4.js";

const { TEST, RUN } = createTester("Mat4 Tests");

TEST("Mat3.LENGTH", ()=>{
    EQUAL(Mat4.LENGTH, 16);
});

TEST("Mat3.WIDTH", ()=>{
    EQUAL(Mat4.WIDTH, 4);
});

TEST("New() Empty", ()=>{
    const mat = new Mat4();
    MAT_EQUAL(mat.data, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
});

TEST("New() Full", ()=>{
    const mat = new Mat4([-1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    MAT_EQUAL(mat.data, [-1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
});

TEST("New() Short", ()=>{
    const mat = new Mat4([11, 12, 13]);
    MAT_EQUAL(mat.data, [11, 12, 13, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
});

TEST("New() Long", ()=>{
    const mat = new Mat4([-5, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    MAT_EQUAL(mat.data, [-5, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
});

TEST(".width", ()=>{
    const mat = new Mat4();
    EQUAL(mat.width, 4);
});

TEST("safeSet() Short", ()=>{
    const mat = new Mat4();
    const res = mat.safeSet([11, 12, 13]);
    EQUAL(mat, res);
    MAT_EQUAL(mat.data, [11, 12, 13, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
});

TEST("safeSet() Long", ()=>{
    const mat = new Mat4();
    const res = mat.safeSet([-5, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    EQUAL(mat, res);
    MAT_EQUAL(mat.data, [-5, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
});

TEST("set()", ()=>{
    const mat = new Mat4();
    const res = mat.set([-1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    EQUAL(mat, res);
    MAT_EQUAL(mat.data, [-1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
});

TEST("add()", ()=>{
    const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    const arr2 = [11, 22, 33, 44, 55, 66, 77, 88, 99, 111, 222, 333, 444, 555, 666, 777];
    const res = [12, 24, 36, 48, 60, 72, 84, 96, 108, 121, 233, 345, 457, 569, 681, 793];

    const a = new Mat4(arr1);
    const b = new Mat4(arr2);
    const c = a.add(b);
    EQUAL(a, c);
    MAT_EQUAL(a.data, c.data);
    MAT_EQUAL(b.data, arr2);
    MAT_EQUAL(a.data, res);

    const d = new Mat4(arr1);
    const e = new Mat4(arr2);
    const f = e.add(d);
    EQUAL(e, f);
    MAT_EQUAL(d.data, arr1);
    MAT_EQUAL(e.data, f.data);
    MAT_EQUAL(e.data, res);
});

TEST("subtract()", ()=>{
    const arr1 = [11, 22, 33, 44, 55, 66, 77, 88, 99, 111, 222, 333, 444, 555, 666, 777];
    const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    const res1 = [10, 20, 30, 40, 50, 60, 70, 80, 90, 101, 211, 321, 431, 541, 651, 761];
    const res2 = [-10, -20, -30, -40, -50, -60, -70, -80, -90, -101, -211, -321, -431, -541, -651, -761];

    const a = new Mat4(arr1);
    const b = new Mat4(arr2);
    const c = a.subtract(b);
    EQUAL(a, c);
    MAT_EQUAL(a.data, c.data);
    MAT_EQUAL(b.data, arr2);
    MAT_EQUAL(a.data, res1);

    const d = new Mat4(arr1);
    const e = new Mat4(arr2);
    const f = e.subtract(d);
    EQUAL(e, f);
    MAT_EQUAL(d.data, arr1);
    MAT_EQUAL(e.data, f.data);
    MAT_EQUAL(e.data, res2);
});

TEST("multiply()", ()=>{
    const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    const arr2 = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
    const res1 = [180, 190, 200, 210, 436, 462, 488, 514, 692, 734, 776, 818, 948, 1006, 1064, 1122];
    const res2 = [342, 388, 434, 480, 454, 516, 578, 640, 566, 644, 722, 800, 678, 772, 866, 960];

    const a = new Mat4(arr1);
    const b = new Mat4(arr2);
    const c = a.multiply(b);
    EQUAL(a, c);
    MAT_EQUAL(a.data, c.data);
    MAT_EQUAL(b.data, arr2);
    MAT_EQUAL(a.data, res1);

    const d = new Mat4(arr1);
    const e = new Mat4(arr2);
    const f = e.multiply(d);
    EQUAL(e, f);
    MAT_EQUAL(d.data, arr1);
    MAT_EQUAL(e.data, f.data);
    MAT_EQUAL(e.data, res2);
});

TEST("multiply() Identity", ()=>{
    const data = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
    const mat = new Mat4(data);
    const identity = new Mat4();
    const multRes = mat.multiply(identity);
    EQUAL(multRes, mat);
    MAT_EQUAL(mat.data, data);
});

TEST("determinant()", ()=>{
    const data = [-5, 4, 1, 7, -9, 3, 2, -5, -2, 0, -1, 1, 1, 14, 0, 3];
    const mat = new Mat4(data);
    const det = mat.determinant();
    MAT_EQUAL(mat.data, data);
    EQUAL(det, 1693);
});

TEST("transpose()", ()=>{
    const mat = new Mat4([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    const xpos = mat.transpose();
    EQUAL(mat, xpos);
    MAT_EQUAL(mat.data, xpos.data);
    MAT_EQUAL(xpos.data, [1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15, 4, 8, 12, 16]);
});

TEST("inverse() Zero Determinant", ()=>{
    const mat = new Mat4([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    EXPECT_THROW(()=>{
        const inv = mat.inverse();
        console.log("This should not print", inv);
    });
});

TEST("inverse()", ()=>{
    const mat = new Mat4([1, 0, 0, 1, 0, 2, 1, 2, 2, 1, 0, 1, 2, 0, 1, 4]);
    const inverse = mat.inverse();
    EQUAL(mat, inverse);
    MAT_EQUAL(mat.data, inverse.data);
    MAT_EQUAL(inverse.data, [-2, -0.5, 1, 0.5, 1, 0.5, 0, -0.5, -8, -1, 2, 2, 3, 0.5, -1, -0.5]);
});

TEST("copy()", ()=>{
    const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    const arr2 = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
    const a = new Mat4(arr1);
    const b = new Mat4(arr2);
    const c = a.copy(b);
    EQUAL(a, c);
    MAT_EQUAL(a.data, c.data);
    MAT_EQUAL(b.data, arr2);
    MAT_EQUAL(c.data, arr2);
});

TEST("clone()", ()=>{
    const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    const arr2 = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
    const mat = new Mat4(arr1);
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
