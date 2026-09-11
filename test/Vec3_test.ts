import { fileURLToPath } from "url";
import { createTester, EXISTS, EQUAL, EQUAL_SOFT, NOT_EQUAL} from "./Testing.js";
import { VEC_EQUAL, VEC_WITHIN_BOUNDS, bitmaskOperation } from "./Vec_helpers.js";
import { Vec3 } from "../src/Vec3.js";
import { Mat3 } from "../src/Mat3.js";
import { Mat4 } from "../src/Mat4.js";

const { TEST, RUN } = createTester("Vec3 Tests");

TEST("New() Empty", ()=>{
    const vec = new Vec3();
    EXISTS(vec);
    VEC_EQUAL(vec, [0, 0, 0]);
});

TEST("New() Partial", ()=>{
    const vec1 = new Vec3(1);
    const vec2 = new Vec3(1, 2);
    EXISTS(vec1);
    EXISTS(vec2);
    VEC_EQUAL(vec1, [1, 0, 0]);
    VEC_EQUAL(vec2, [1, 2, 0]);
});

TEST("New() Full", ()=>{
    const vec = new Vec3(2, 3, 4);
    EXISTS(vec);
    VEC_EQUAL(vec, [2, 3, 4]);
});

TEST("Vec2.fromArray", ()=>{
    const vec = Vec3.fromArray([2, 3, 4]);
    EXISTS(vec);
    VEC_EQUAL(vec, [2, 3, 4]);
});

TEST("Vec2.fromObject", ()=>{
    const vec = Vec3.fromObject({x: 2, y: 3, z: 4});
    EXISTS(vec);
    VEC_EQUAL(vec, [2, 3, 4]);
});

TEST(".width", ()=>{
    EQUAL(Vec3.WIDTH, 3);
    const vec = new Vec3();
    EQUAL(vec.width, 3);
});

TEST("add()", ()=>{
    const a = new Vec3(2, 3, 4);
    const b = new Vec3(5, 6, 7);
    const c = a.add(b);
    EXISTS(c);
    EQUAL(a, c);
    VEC_EQUAL(b, [5, 6, 7]);
    VEC_EQUAL(c, [7, 9, 11]);
});

TEST("addScalar()", ()=>{
    const a = new Vec3(2, 3, 4);
    const b = a.addScalar(5);
    EXISTS(b);
    EQUAL(a, b);
    VEC_EQUAL(b, [7, 8, 9]);
});

TEST("subtract()", ()=>{
    const a = new Vec3(6, 7, 8);
    const b = new Vec3(2, 4, 5);
    const c = a.subtract(b);
    EXISTS(c);
    EQUAL(a, c);
    VEC_EQUAL(b, [2, 4, 5]);
    VEC_EQUAL(a, [4, 3, 3]);
});

TEST("subtractScalar()", ()=>{
    const a = new Vec3(4, 5, 6);
    const b = a.subtractScalar(3);
    EXISTS(b);
    EQUAL(a, b);
    VEC_EQUAL(b, [1, 2, 3]);
});

TEST("multiply()", ()=>{
    const a = new Vec3(2, 3, 4);
    const b = new Vec3(5, 6, 7);
    const c = a.multiply(b);
    EXISTS(c);
    EQUAL(a, c);
    VEC_EQUAL(b, [5, 6, 7]);
    VEC_EQUAL(c, [10, 18, 28]);
});

TEST("scale()", ()=>{
    const a = new Vec3(2, 3, 4);
    const b = a.scale(4);
    EXISTS(b);
    EQUAL(a, b);
    VEC_EQUAL(b, [8, 12, 16]);
});

TEST("multiplyScalar()", ()=>{
    const a = new Vec3(2, 3, 4);
    const b = a.scale(4);
    EXISTS(b);
    EQUAL(a, b);
    VEC_EQUAL(b, [8, 12, 16]);
});

TEST("multiplyMat3()", ()=>{
    const vec = new Vec3(2, 3, 4);
    const mat = new Mat3([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const res = vec.multiplyMat3(mat);
    EXISTS(res);
    EQUAL(vec, res);
    VEC_EQUAL(res, [42, 51, 60]);
});

TEST("multiplyMat4()", ()=>{
    const vec = new Vec3(2, 3, 4);
    const mat = new Mat4([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    const res = vec.multiplyMat4(mat);
    EXISTS(res);
    EQUAL(vec, res);
    VEC_EQUAL(res, [66, 76, 86]);
});

TEST("divide()", ()=>{
    const a = new Vec3(6, 12, 20);
    const b = new Vec3(2, 3, 4);
    const res = a.divide(b);
    EXISTS(res);
    EQUAL(a, res);
    VEC_EQUAL(b, [2, 3, 4]);
    VEC_EQUAL(res, [3, 4, 5]);
});

TEST("divideScalar()", ()=>{
    const a = new Vec3(15, 12, 30);
    const b = a.divideScalar(3);
    EXISTS(b);
    EQUAL(a, b);
    VEC_EQUAL(a, [5, 4, 10]);
});

TEST("dot()", ()=>{
    const a = new Vec3(3, 5, 8);
    const b = new Vec3(7, 2, 9);
    const res = a.dot(b);
    EXISTS(res);
    VEC_EQUAL(a, [3, 5, 8]);
    VEC_EQUAL(b, [7, 2, 9]);
    EQUAL(res, 103);
});

TEST("cross()", ()=>{
    const a = new Vec3(3, 5, 8);
    const b = new Vec3(7, 2, 12);
    const res = a.cross(b);
    EXISTS(res);
    EQUAL(a, res);
    VEC_EQUAL(b, [7, 2, 12]);
    VEC_EQUAL(res, [44, 20, -29]);
});

TEST("lengthNoSqrt()", ()=>{
    const a = new Vec3(-5, 20, -8);
    const res = a.lengthNoSqrt();
    EXISTS(res);
    VEC_EQUAL(a, [-5, 20, -8]);
    EQUAL(res, 489);
});

TEST("length()", ()=>{
    const a = new Vec3(-5, 20, -8);
    const res = a.length();
    EXISTS(res);
    VEC_EQUAL(a, [-5, 20, -8]);
    EQUAL_SOFT(res, 22.11334, 5);
});

TEST("magnitude()", ()=>{
    const a = new Vec3(-5, 20, -8);
    const res = a.length();
    EXISTS(res);
    VEC_EQUAL(a, [-5, 20, -8]);
    EQUAL_SOFT(res, 22.11334, 5);
});

TEST("normalize()", ()=>{
    const vec = new Vec3(-10, 7, 14);
    const res = vec.normalize();
    EXISTS(res);
    EQUAL(vec, res);
    EQUAL_SOFT(res.length(), 1, 10);
    EQUAL_SOFT(res.x, -0.53838, 5);
    EQUAL_SOFT(res.y, 0.37686, 5);
    EQUAL_SOFT(res.z, 0.75373, 5);
});

TEST("copy()", ()=>{
    const a = new Vec3(8, 9, 10);
    const b = new Vec3(3, 4, 5);
    const c = a.copy(b);
    EXISTS(c);
    EQUAL(a, c);
    VEC_EQUAL(b, [3, 4, 5]);
    VEC_EQUAL(c, [3, 4, 5]);
});

TEST("set()", ()=>{
    const vec = new Vec3(8, 9, 10);
    const res = vec.set(3, 4, 5);
    EXISTS(res);
    EQUAL(vec, res);
    VEC_EQUAL(res, [3, 4, 5]);
});

TEST("clone()", ()=>{
    const vec = new Vec3(8, 9, 10);
    const res = vec.clone();
    EXISTS(res);
    NOT_EQUAL(vec, res);
    VEC_EQUAL(res, [8, 9, 10]);
    vec.set(10, 11, 12);
    VEC_EQUAL(res, [8, 9, 10]);
    res.set(22, 33, 44);
    VEC_EQUAL(vec, [10, 11, 12]);
});

TEST("fromArray()", ()=>{
    const vec = new Vec3();
    const res = vec.fromArray([1, 2, 3]);
    EXISTS(res);
    EQUAL(vec, res);
    VEC_EQUAL(res, [1, 2, 3]);
});

TEST("toArray()", ()=>{
    const vec = new Vec3(2, 3, 4);
    const res = vec.toArray();
    EXISTS(res);
    EQUAL(res[0], 2);
    EQUAL(res[1], 3);
    EQUAL(res[2], 4);
});

TEST("fromObject()", ()=>{
    const vec = new Vec3();
    const res = vec.fromObject({x: 2, y: 3, z: 4});
    EXISTS(res);
    VEC_EQUAL(res, [2, 3, 4]);
});

TEST("toObject()", ()=>{
    const vec = new Vec3(2, 3, 4);
    const res = vec.toObject();
    EXISTS(res);
    EQUAL(res.x, 2);
    EQUAL(res.y, 3);
    EQUAL(res.z, 4);
});

TEST("floor()", ()=>{
    const vec = new Vec3(2.44, 9.82, -5.2);
    const res = vec.floor();
    EXISTS(res);
    EQUAL(vec, res);
    VEC_EQUAL(res, [2, 9, -6]);
});

TEST("ceil()", ()=>{
    const vec = new Vec3(2.44, 9.82, -5.2);
    const res = vec.ceil();
    EXISTS(res);
    EQUAL(vec, res);
    VEC_EQUAL(res, [3, 10, -5]);
});

TEST("round()", ()=>{
    const vec = new Vec3(2.44, 9.82, -5.2);
    const res = vec.round();
    EXISTS(res);
    EQUAL(vec, res);
    VEC_EQUAL(res, [2, 10, -5]);
});

TEST("absolute()", ()=>{
    const source = new Vec3(3, 4, 5);

    for (let i = 0; i < 9; i++) {
        const vec = Vec3.fromArray(
            bitmaskOperation(source.toArray(), i, val => {
                return -val;
            }
        ) as any);
        const res = vec.absolute();
        EXISTS(res);
        EQUAL(vec, res);
        VEC_EQUAL(res, [3, 4, 5]);
    }
});

TEST("equalTo()", ()=>{
    const a = new Vec3(2, 3, 4);
    const bSource = a.clone();

    const eqRes = a.equalTo(bSource);
    EXISTS(eqRes);
    VEC_EQUAL(bSource, [2, 3, 4]);
    EQUAL(eqRes, true);

    for (let i = 1; i < 8; i++) {
        const bAltered = bitmaskOperation(bSource.toArray(), i, (_, shift) => {
            return 7 + shift;
        });
        const b = Vec3.fromArray(bAltered as any);
        const res = a.equalTo(b);
        EXISTS(res);
        VEC_EQUAL(b, bAltered);
        EQUAL(res, false);
    }
});

TEST("distanceNoSqrt()", ()=>{
    const a = new Vec3(2, 3, 4);
    const b = new Vec3(-5, 6, -7);
    const res = a.distanceNoSqrt(b);
    EXISTS(res);
    VEC_EQUAL(a, [2, 3, 4]);
    VEC_EQUAL(b, [-5, 6, -7]);
    EQUAL(res, 179);
});

TEST("distanceTo()", ()=>{
    const a = new Vec3(2, 3, 4);
    const b = new Vec3(-5, 6, -7);
    const res = a.distanceTo(b);
    EXISTS(res);
    VEC_EQUAL(a, [2, 3, 4]);
    VEC_EQUAL(b, [-5, 6, -7]);
    EQUAL_SOFT(res, 13.37908, 5);
});

TEST("randomize()", ()=>{
    const lb = new Vec3(-7, 8, -9);
    const ub = new Vec3(5, 2, -3);

    for (let i = 0; i < 1000; i++) {
        const vec = new Vec3(3, 4, 5);
        const res = vec.randomize(lb, ub);
        EXISTS(res);
        EQUAL(vec, res);
        VEC_WITHIN_BOUNDS(res.toArray(), lb.toArray(), ub.toArray());
    }
});

TEST("zero()", ()=>{
    const vec = new Vec3(2, 3, 4);
    const res = vec.zero();
    EXISTS(res);
    EQUAL(vec, res);
    VEC_EQUAL(res, [0, 0, 0]);
});

TEST("clampLength()", ()=>{
    const a = new Vec3(9, 15, 18);
    const b = a.clone();
    const c = new Vec3(-9, -15, -18);
    const resShort = a.clampLength(3);
    const resLong = b.clampLength(5000);
    const resLongNeg = c.clampLength(5000);
    EXISTS(resShort);
    EXISTS(resLong);
    EQUAL(a, resShort);
    EQUAL(b, resLong);
    EQUAL_SOFT(resShort.x, 1.07570, 5);
    EQUAL_SOFT(resShort.y, 1.79284, 5);
    EQUAL_SOFT(resShort.z, 2.15141, 5);
    VEC_EQUAL(resLong, [9, 15, 18]);
    VEC_EQUAL(resLongNeg, [-9, -15, -18]);
});

TEST("edit()", ()=>{
    const vec = new Vec3(2, 3, 4);
    let boolRes = false;

    const res = vec.edit(vec => {
        vec.x *= 20;
        vec.x = vec.x + 5;

        if (vec.y == 3) {
            boolRes = true;
            vec.y = 12;
        }

        vec.z /= 2;
    });

    EXISTS(res);
    EQUAL(boolRes, true);
    EQUAL(vec, res);
    VEC_EQUAL(vec, [45, 12, 2]);
});

TEST("map()", ()=>{
    const vec = new Vec3(2, 3, 4);
    const res = vec.map<string>(vec => {
        return `this is a string ${vec.x} ${vec.y} ${vec.z}`;
    });
    EXISTS(res);
    EQUAL(res, "this is a string 2 3 4");
});

if (fileURLToPath(import.meta.url) == process.argv[1]) {
    RUN();
}

export default RUN;
