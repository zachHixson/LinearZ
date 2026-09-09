type Test = [string, ()=>void];

class Tester {
    private _name: string;
    private _tests: Array<Test> = [];

    constructor(name: string) {
        this._name = name;
    }

    registerTest(test: Test): void {
        this._tests.push(test);
    }

    runTests(): boolean {
        console.log(`-- Running "${this._name}" --`);
        for (let i = 0; i < this._tests.length; i++) {
            const test = this._tests[i];

            try {
                test[1]();
            }
            catch (e) {
                console.error(`❌ ${test[0]}`);
                console.error(e);
                return false;
            }

            console.log(`✅ ${test[0]}`);
        }

        return true;
    }
}

export function createTester(name: string): {TEST: (name: Test[0], test: Test[1])=>void, RUN: ()=>boolean} {
    const tester = new Tester(name);

    return {
        TEST: (name: Test[0], test: Test[1])=>tester.registerTest([name, test]),
        RUN: ()=>tester.runTests(),
    };
}

export function EQUAL<T>(a: T, b: T): void {
    if (a != b) {
        throw new Error(`Values not equal.\n\tValues: a = ${a}, b = ${b}`);
    }
};

export function NOT_EQUAL<T>(a: T, b: T): void {
    if (a == b) {
        throw new Error(`Values are equal, but expected not to be.\n\tValues: a = ${a}, b = ${b}`);
    }
}

export function EXPECT_THROW(callback: ()=>void): void {
    try {
        callback();
    }
    catch(e) {
        return;
    }

    throw new Error(`Expected thrown error.`);
}
