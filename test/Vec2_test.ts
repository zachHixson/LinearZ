import { fileURLToPath } from "url";
import { createTester, EXISTS, EQUAL, EQUAL_SOFT, NOT_EQUAL} from "./Testing.js";
import { VEC_EQUAL, VEC_WITHIN_BOUNDS, bitmaskOperation } from "./Vec_helpers.js";
import { Vec2 } from "../src/Vec2.js";
import { Mat3 } from "../src/Mat3.js";
import { Mat4 } from "../src/Mat4.js";

const { TEST, RUN } = createTester("Vec2 Tests");

TEST("New() Empty", ()=>{
    const vec = new Vec2();
    EXISTS(vec);
    VEC_EQUAL(vec, [0, 0]);
});

TEST("New() Partial", ()=>{
    const vec = new Vec2(1);
    EXISTS(vec);
    VEC_EQUAL(vec, [1, 0]);
});

TEST("New() Full", ()=>{
    const vec = new Vec2(2, 3);
    EXISTS(vec);
    VEC_EQUAL(vec, [2, 3]);
});

TEST("Vec2.fromArray() empty", ()=>{
    const vec = Vec2.fromArray([]);
    EXISTS(vec);
    VEC_EQUAL(vec, [0, 0]);
});

TEST("Vec2.fromArray() partial", ()=>{
    const vec = Vec2.fromArray([1]);
    EXISTS(vec);
    VEC_EQUAL(vec, [1, 0]);
});

TEST("Vec2.fromArray() full", ()=>{
    const vec = Vec2.fromArray([2, 3]);
    EXISTS(vec);
    VEC_EQUAL(vec, [2, 3]);
});

TEST("Vec2.fromArray() overfull", ()=>{
    const vec = Vec2.fromArray([2, 3, 4, 5, 6]);
    EXISTS(vec);
    VEC_EQUAL(vec, [2, 3]);
});

TEST("Vec2.fromObject() empty", ()=>{
    const vec = Vec2.fromObject({});
    EXISTS(vec);
    VEC_EQUAL(vec, [0, 0]);
});

TEST("Vec2.fromObject() partial", ()=>{
    const vecX = Vec2.fromObject({x: 1});
    const vecY = Vec2.fromObject({y: 1});
    EXISTS(vecX);
    EXISTS(vecY);
    VEC_EQUAL(vecX, [1, 0]);
    VEC_EQUAL(vecY, [0, 1]);
});

TEST("Vec2.fromObject() full", ()=>{
    const vec = Vec2.fromObject({x: 2, y: 3});
    EXISTS(vec);
    VEC_EQUAL(vec, [2, 3]);
});

TEST("Vec2.fromObject() overfull", ()=>{
    const obj = {x: 2, y: 3, randomProp: "hello"};
    const vec = Vec2.fromObject(obj);
    EXISTS(vec);
    VEC_EQUAL(vec, [2, 3]);
});

TEST(".width", ()=>{
    EQUAL(Vec2.WIDTH, 2);
    const vec = new Vec2();
    EQUAL(vec.width, 2);
});

TEST("add()", ()=>{
    const a = new Vec2(2, 3);
    const b = new Vec2(4, 5);
    const c = a.add(b);
    EXISTS(c);
    EQUAL(a, c);
    VEC_EQUAL(b, [4, 5]);
    VEC_EQUAL(c, [6, 8]);
});

TEST("addScalar()", ()=>{
    const a = new Vec2(2, 3);
    const b = a.addScalar(5);
    EXISTS(b);
    EQUAL(a, b);
    VEC_EQUAL(b, [7, 8]);
});

TEST("subtract()", ()=>{
    const a = new Vec2(5, 6);
    const b = new Vec2(2, 4);
    const c = a.subtract(b);
    EXISTS(c);
    EQUAL(a, c);
    VEC_EQUAL(b, [2, 4]);
    VEC_EQUAL(a, [3, 2]);
});

TEST("subtractScalar()", ()=>{
    const a = new Vec2(4, 5);
    const b = a.subtractScalar(3);
    EXISTS(b);
    EQUAL(a, b);
    VEC_EQUAL(b, [1, 2]);
});

TEST("multiply()", ()=>{
    const a = new Vec2(2, 3);
    const b = new Vec2(4, 5);
    const c = a.multiply(b);
    EXISTS(c);
    EQUAL(a, c);
    VEC_EQUAL(b, [4, 5]);
    VEC_EQUAL(c, [8, 15]);
});

TEST("scale()", ()=>{
    const a = new Vec2(2, 3);
    const b = a.scale(4);
    EXISTS(b);
    EQUAL(a, b);
    VEC_EQUAL(b, [8, 12]);
});

TEST("multiplyScalar()", ()=>{
    const a = new Vec2(2, 3);
    const b = a.multiplyScalar(4);
    EXISTS(b);
    EQUAL(a, b);
    VEC_EQUAL(b, [8, 12]);
});

TEST("multiplyMat3()", ()=>{
    const vec = new Vec2(2, 3);
    const mat = new Mat3([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const res = vec.multiplyMat3(mat);
    EXISTS(res);
    EQUAL(vec, res);
    VEC_EQUAL(res, [21, 27]);
});

TEST("multiplyMat4()", ()=>{
    const vec = new Vec2(2, 3);
    const mat = new Mat4([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    const res = vec.multiplyMat4(mat);
    EXISTS(res);
    EQUAL(vec, res);
    VEC_EQUAL(res, [39, 46]);
});

TEST("divide()", ()=>{
    const a = new Vec2(6, 12);
    const b = new Vec2(2, 3);
    const res = a.divide(b);
    EXISTS(res);
    EQUAL(a, res);
    VEC_EQUAL(b, [2, 3]);
    VEC_EQUAL(res, [3, 4])
});

TEST("divideScalar()", ()=>{
    const a = new Vec2(15, 12);
    const b = a.divideScalar(3);
    EXISTS(b);
    EQUAL(a, b);
    VEC_EQUAL(a, [5, 4]);
});

TEST("dot()", ()=>{
    const a = new Vec2(3, 5);
    const b = new Vec2(7, 2);
    const res = a.dot(b);
    EXISTS(res);
    VEC_EQUAL(a, [3, 5]);
    VEC_EQUAL(b, [7, 2]);
    EQUAL(res, 31);
});

TEST("cross()", ()=>{
    const a = new Vec2(3, 5);
    const b = new Vec2(7, 2);
    const res = a.cross(b);
    EXISTS(res);
    VEC_EQUAL(a, [3, 5]);
    VEC_EQUAL(b, [7, 2]);
    EQUAL(res, -29);
});

TEST("lengthNoSqrt()", ()=>{
    const a = new Vec2(-5, 20);
    const res = a.lengthNoSqrt();
    EXISTS(res);
    VEC_EQUAL(a, [-5, 20]);
    EQUAL(res, 425);
});

TEST("length()", ()=>{
    const a = new Vec2(-5, 20);
    const res = a.length();
    EXISTS(res);
    VEC_EQUAL(a, [-5, 20]);
    EQUAL_SOFT(res, 20.61552, 5);
});

TEST("magnitude()", ()=>{
    const a = new Vec2(-5, 20);
    const res = a.magnitude();
    EXISTS(res);
    VEC_EQUAL(a, [-5, 20]);
    EQUAL_SOFT(res, 20.61552, 5);
});

TEST("normalize()", ()=>{
    const vec = new Vec2(-10, 7);
    const res = vec.normalize();
    EXISTS(res);
    EQUAL(vec, res);
    EQUAL_SOFT(res.length(), 1, 10);
    EQUAL_SOFT(res.x, -0.81923, 5);
    EQUAL_SOFT(res.y, 0.57346, 5);
});

TEST("copy()", ()=>{
    const a = new Vec2(8, 9);
    const b = new Vec2(3, 4);
    const c = a.copy(b);
    EXISTS(c);
    EQUAL(a, c);
    VEC_EQUAL(b, [3, 4]);
    VEC_EQUAL(c, [3, 4]);
});

TEST("set()", ()=>{
    const vec = new Vec2(8, 9);
    const res = vec.set(3, 4);
    EXISTS(res);
    EQUAL(vec, res);
    VEC_EQUAL(res, [3, 4]);
});

TEST("clone()", ()=>{
    const vec = new Vec2(8, 9);
    const res = vec.clone();
    EXISTS(res);
    NOT_EQUAL(vec, res);
    VEC_EQUAL(res, [8, 9]);
    vec.set(10, 11);
    VEC_EQUAL(res, [8, 9]);
    res.set(22, 33);
    VEC_EQUAL(vec, [10, 11]);
});

TEST("copyArray() empty", ()=>{
    const vec = new Vec2();
    const res = vec.copyArray([]);
    EXISTS(res);
    EQUAL(vec, res);
    VEC_EQUAL(res, [0, 0]);
});

TEST("copyArray() partial", ()=>{
    const vec = new Vec2();
    const res = vec.copyArray([1]);
    EXISTS(res);
    EQUAL(vec, res);
    VEC_EQUAL(res, [1, 0]);
});

TEST("fromArray() full", ()=>{
    const vec = new Vec2();
    const res = vec.copyArray([1, 2]);
    EXISTS(res);
    EQUAL(vec, res);
    VEC_EQUAL(res, [1, 2]);
});

TEST("copyArray() overFull", ()=>{
    const vec = new Vec2();
    const res = vec.copyArray([1, 2, 3, 4, 5, 6]);
    EXISTS(res);
    EQUAL(vec, res);
    VEC_EQUAL(res, [1, 2]);
});

TEST("toArray()", ()=>{
    const vec = new Vec2(2, 3);
    const res = vec.toArray();
    EXISTS(res);
    EQUAL(res[0], 2);
    EQUAL(res[1], 3);
});

TEST("copyObject() empty", ()=>{
    const vec = new Vec2();
    const res = vec.copyObject({});
    EXISTS(res);
    VEC_EQUAL(res, [0, 0]);
});

TEST("copyObject() partial", ()=>{
    const vecX = new Vec2().copyObject({x: 1});
    const vecY = new Vec2().copyObject({y: 1});
    EXISTS(vecX);
    EXISTS(vecY);
    VEC_EQUAL(vecX, [1, 0]);
    VEC_EQUAL(vecY, [0, 1]);
});

TEST("copyObject() full", ()=>{
    const vec = new Vec2();
    const res = vec.copyObject({x: 2, y: 3});
    EXISTS(res);
    VEC_EQUAL(res, [2, 3]);
});

TEST("copyObject() overfull", ()=>{
    const vec = new Vec2();
    const obj = {x: 2, y: 3, randomProp: "hello"};
    const res = vec.copyObject(obj);
    EXISTS(res);
    VEC_EQUAL(res, [2, 3]);
    EQUAL((res as any)["randomProp"] == undefined, true);
});

TEST("toObject()", ()=>{
    const vec = new Vec2(2, 3);
    const res = vec.toObject();
    EXISTS(res);
    EQUAL(res.x, 2);
    EQUAL(res.y, 3);
});

TEST("floor()", ()=>{
    const vec = new Vec2(2.44, 9.82);
    const res = vec.floor();
    EXISTS(res);
    EQUAL(vec, res);
    VEC_EQUAL(res, [2, 9]);
});

TEST("ceil()", ()=>{
    const vec = new Vec2(2.44, 9.82);
    const res = vec.ceil();
    EXISTS(res);
    EQUAL(vec, res);
    VEC_EQUAL(res, [3, 10]);
});

TEST("round()", ()=>{
    const vec = new Vec2(2.44, 9.82);
    const res = vec.round();
    EXISTS(res);
    EQUAL(vec, res);
    VEC_EQUAL(res, [2, 10]);
});

TEST("absolute()", ()=>{
    const source = new Vec2(3, 4);

    for (let i = 0; i < 4; i++) {
        const vec = Vec2.fromArray(
            bitmaskOperation(source.toArray(), i, val => {
                return -val;
            }
        ) as any);
        const res = vec.absolute();
        EXISTS(res);
        EQUAL(vec, res);
        VEC_EQUAL(res, [3, 4]);
    }
});

TEST("equalTo()", ()=>{
    const a = new Vec2(2, 3);
    const bSource = a.clone();

    const eqRes = a.equalTo(bSource);
    EXISTS(eqRes);
    VEC_EQUAL(bSource, [2, 3]);
    EQUAL(eqRes, true);

    for (let i = 1; i < 4; i++) {
        const bAltered = bitmaskOperation(bSource.toArray(), i, (_, shift) => {
            return 7 + shift;
        });
        const b = Vec2.fromArray(bAltered as any);
        const res = a.equalTo(b);
        EXISTS(res);
        VEC_EQUAL(b, bAltered);
        EQUAL(res, false);
    }
});

TEST("distanceNoSqrt()", ()=>{
    const a = new Vec2(2, 3);
    const b = new Vec2(-4, 5);
    const res = a.distanceNoSqrt(b);
    EXISTS(res);
    VEC_EQUAL(a, [2, 3]);
    VEC_EQUAL(b, [-4, 5]);
    EQUAL(res, 40);
});

TEST("distanceTo()", ()=>{
    const a = new Vec2(2, 3);
    const b = new Vec2(-4, 5);
    const res = a.distanceTo(b);
    EXISTS(res);
    VEC_EQUAL(a, [2, 3]);
    VEC_EQUAL(b, [-4, 5]);
    EQUAL_SOFT(res, 6.3245, 4);
});

TEST("randomize()", ()=>{
    const lb = new Vec2(-7, 8);
    const ub = new Vec2(5, 2);

    for (let i = 0; i < 1000; i++) {
        const vec = new Vec2(3, 4);
        const res = vec.randomize(lb, ub);
        EXISTS(res);
        EQUAL(vec, res);
        VEC_WITHIN_BOUNDS(res.toArray(), lb.toArray(), ub.toArray());
    }
});

TEST("zero()", ()=>{
    const vec = new Vec2(2, 3);
    const res = vec.zero();
    EXISTS(res);
    EQUAL(vec, res);
    VEC_EQUAL(res, [0, 0]);
});

TEST("clampLength()", ()=>{
    const a = new Vec2(9, 15);
    const b = a.clone();
    const c = new Vec2(-9, -15);
    const resShort = a.clampLength(3);
    const resLong = b.clampLength(5000);
    const resLongNeg = c.clampLength(5000);
    EXISTS(resShort);
    EXISTS(resLong);
    EQUAL(a, resShort);
    EQUAL(b, resLong);
    EQUAL_SOFT(resShort.x, 1.54348, 5);
    EQUAL_SOFT(resShort.y, 2.57247, 5);
    VEC_EQUAL(resLong, [9, 15]);
    VEC_EQUAL(resLongNeg, [-9, -15]);
});

TEST("edit()", ()=>{
    const vec = new Vec2(2, 3);
    let boolRes = false;

    const res = vec.edit(vec => {
        vec.x *= 20;
        vec.x = vec.x + 5;

        if (vec.y == 3) {
            boolRes = true;
            vec.y = 12;
        }
    });

    EXISTS(res);
    EQUAL(boolRes, true);
    EQUAL(vec, res);
    VEC_EQUAL(vec, [45, 12]);
});

TEST("map()", ()=>{
    const vec = new Vec2(2, 3);
    const res = vec.map<string>(vec => {
        return `this is a string ${vec.x} ${vec.y}`;
    });
    EXISTS(res);
    EQUAL(res, "this is a string 2 3");
});

if (fileURLToPath(import.meta.url) == process.argv[1]) {
    RUN();
}

export default RUN;
