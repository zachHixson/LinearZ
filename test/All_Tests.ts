import { runBatch } from "./Testing.js";
import Mat3Test from "./Mat3_test.js";
import Mat4Test from "./Mat4_test.js";
import Vec2Test from "./Vec2_test.js";
import Vec3Test from "./Vec3_test.js";
import Vec4Test from "./Vec4_test.js";

runBatch([
    Mat3Test,
    Mat4Test,
    Vec2Test,
    Vec3Test,
    Vec4Test
]);
