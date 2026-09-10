import { runBatch } from "./Testing.ts";
import Mat3Test from "./Mat3_test.ts";
import Mat4Test from "./Mat4_test.ts";

runBatch([
    Mat3Test,
    Mat4Test
]);
