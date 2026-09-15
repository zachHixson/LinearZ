# LinearZ: A simple, fast, Vector and Matrix library for Typescript

A simple, fast library for handling 2D, 3D, and 4D vector and matrix math.

## Install

1. Installable using NPM

```
npm install linearz
```

2. Installable through NPM using downloaded tarball

```
npm install path/to/tarball/location/linearz-x.x.x.tgz
```

3. Download the `.zip` release.

## Examples

### Basic Addition

```
import { Vec2 } from "linearz";

const vecA = new Vec3(1, 2);
const vecB = new Vec3(4, 5);

const result = vecA.add(vecB); // result = { x: 5, y: 7 };
```

### Chaining Operations

```
import { Vec3 } from "linearz";

const vecA = new Vec3(1, 2, 3);
const vecB = new Vec3(4, 5, 6);

vecA
    .add(vecB)
    .scale(3);

const result = vecA; // result = { x: 15, y: 21, z: 27 };
```

### Interoperability With Matrices

```
const vec = new Vec3(2, 3, 4);
const mat = new Mat3([1, 2, 3, 4, 5, 6, 7, 8, 9]);

const result = vec.multiplyMat3(mat); // result: { x: 42, y: 51, z: 60 };
```

## Vector API

- `.x` - X component of current vector
- `.y` - Y component of current vector
- `.z` - Z component of current vector (Vec3 and Vec4 only)
- `.w` - W component of current vector (Vec4 only)
- `.width` - Number of components of current vector
- `.add(vec)` - Adds provided vector to current vector
- `.addScalar(scalar)` - Adds scalar value to all components of current vector
- `.subtract(vec)` - Subtracts provided vector from current vector
- `.subtractScalar(scalar)` - Subtracts scalar value from all components of current vector
- `.multiply(vec)` - Multiplies current vector by a provided vector (component-wise)
- `.scale(scalar)` - Multiplies all components in current vector by scalar value
- `.multiplyScalar(scalar)` - (alias for `.scale()`)
- `.multiplyMat3(mat3)` - Multiplies current vector by Mat3
    - `Vec2.multiplyMat3(mat3)` - Multiplies vector by matrix, and assumes `vec.z = 1`
    - `Vec3.multiplyMat3(mat3)` - Multiplies vector by matrix as expected
    - `Vec4.multiplyMat3(mat3)` - Multiplies vector by matrix, but does not modify `vec.w`
- `.multiplyMat4(mat4)` - Multiplies current vector by Mat3
    - `Vec2.multiplyMat4(mat4)` - Multiplies vector by matrix, and assumes `vec.z = 1` and `vec.w = 1`
    - `Vec3.multiplyMat4(mat4)` - Multiplies vector by matrix, and assumes `vec.w = 1`
    - `Vec4.multiplyMat4(mat4)` - Multiplies vector by matrix as expected
- `.divide(vec)` - Divides current vector by provided vector (component-wise)
- `.divideScalar(scalar)` - Divides all components in current vector by scalar value
- `.dot(vec)` - Calculates dot product of current vector and provided vector
- `.cross(vec)` - Calculates cross product of current vector
    - `Vec2.cross(vec)` - Returns scalar value representing Z component of the resulting vector
    - `Vec3.cross(vec)` - Sets the current vector to the cross product of the current vector and the provided vector
- `.lengthNoSqrt()` - Calculates length of vector squared, without square root calculation
- `.magnitude()` - (alias for `.length()`);
- `.normalize()` - Normalizes current vector (sets length to 1 while preserving direction)
- `.copy(vec)` - Copies the components of a provided vector to the current vector
- `.set(x, y, z, w)` - Sets components of current vector
- `.clone()` - Creates new vector with copy of the current vector's components
- `.fromArray(numberArray)` - Copies elements of provided array into the components of the current vector
- `.floor()` - Floors (force rounds down) all components of current vector
- `.ceil()` - Ceilings (force rounds up) all components of current vector
- `.round()` - Rounds all components of current vector
- `.absolute()` - Sets all components of current vector to their absolute value
- `.distanceNoSqrt()` - Calculates distance between current vector and provided vector, without square root calculation
- `.distanceTo()` - Calculates distance between current vector and provided vector
- `.randomize(lowerBounds: vec, upperBounds: vec)` - Randomizes the components of the current vector so that they are between the provided upper and lower bounds
- `.zero()` - Sets all components of current vector to zero
- `.clamp(scalar)` - Clamps the current vector to the provided length
- `.edit(callback)` - Allows editing vector components via user provided callback (useful when chaining operations)
- `.map<T>(callback)` - Allows transforming vector into another type via user provided callback (useful when chaining operations)

## Matrix API

- `.data` - A linear array of all matrix components
- `.width` - Width of current matrix
- `.safeSet(array)` - Sets the matrix from any size number array
- `.set(array)` - Sets the matrix from array from fixed length array matching `mat.width^2`
- `.add(mat)` - Adds matrix to original matrix
- `.subtract(mat)` - Subtracts matrix from original matrix
- `.multiply(mat)` - Multiplies original matrix by provided matrix
- `.determinant()` - Calculates determinant of current matrix
- `.transpose()` - Transposes the current matrix
- `.invers()` - Sets the current matrix to its inverse
- `.copy(mat)` - Copies data from provided matrix into current matrix
- `.clone()` - Clones the current matrix to a new separate matrix
