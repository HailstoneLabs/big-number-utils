# hailstonelabs/big-number-utils

hailstonelabs/big-number-utils is a library for BigNumber formatting and calculation, developed by Hailstone Labs.

## Local usage

To link big-number-utils to local repo

```sh
# for build dist folder
tsc

yarn link
```

You can now run `yarn link "@hailstonelabs/big-number-utils"` in the projects where you want to use this package and it will be used instead.

## Installation

To install and set up the library, run:

```sh
$ npm install @hailstonelabs/big-number-utils
```

Or if you prefer using Yarn:

```sh
$ yarn add @hailstonelabs/big-number-utils
```

## Use

_Big Number_

Many operations in Ethereum operate on numbers which are outside the range of safe values to use in JavaScript.

A BigNumber is an object which safely allows mathematical operations on numbers of any magnitude. Most operations which need to return a value will return a BigNumber and parameters which accept values will generally accept them.

This library is compatible with the BigNumber exported from ether.js [Source](https://docs.ethers.io/v5/api/utils/bignumber/).

_Safe Arithmetic_

Inspiring by DS Maths [Source](https://github.com/dapphub/ds-math/), @hailstonelabs/big-number-utils provides arithmetic functions for the common numerical primitive types of typescript. This package provides arithmetic functions for new two higher level numerical concepts called wad (18 decimals) and ray (27 decimals). These are used to represent fixed-point decimal numbers.

_WAD and RAY_

A wad is a decimal number with 18 digits of precision and a ray is a decimal number with 27 digits of precision. These functions are necessary to account for the difference between how integer arithmetic behaves normally, and how decimal arithmetic should actually work.

```js
const WAD = BigNumber.from(10).pow(18)
const RAY = BigNumber.from(10).pow(27)
```

## DS Math API Reference

### [.strToWad]

It changes string to WAD if not undefined or ParsableString, else return constants.Zero

**Params**

- `wadString` **{string | undefined}**
- `returns` **{BigNumber}**

### [.getPercentageFromTwoWAD]

It returns the percentage of x in y, in string and return upperBound if the value exceeds upperBound.

**Params**

- `x` **{BigNumber}**: x in WAD
- `y` **{BigNumber}**: t in WAD
- `upperBound` **{BigNumber}**: the upper bound percentage, in WAD
- `returns` **{string}**: the percentage of x in y, in string

```js
getPercentageFromTwoWAD(strToWad('20000'), strToWad('40000'))
//=> 50

getPercentageFromTwoWAD(strToWad('50000'), strToWad('40000'), strToWad('100'))
//=> 100
```

### [.getMinValue]

**Params**

- `x` **{string}**: x number in string
- `y` **{string}**: y number in string
- `returns` **{BigNumber}**: the minimum value in WAD

### [.sum]

It returns the summation of two values.

**Params**

- `x` **{string | BigNumber}**: BigNumber must be WAD
- `y` **{string | BigNumber}**: BigNumber must be WAD
- `returns` **{string}**: sum

**Example**

```js
sum(strToWad('20000'), strToWad('30000'))
//=> 50000
```

### [.differenceComparesValue]

It compare x - y with the value.

**Params**

- `x` **{BigNumber}**
- `y` **{BigNumber}**
- `value` **{BigNumber}**
- `operator` **{'lt' | 'eq' | 'gt'}** less than / equal to / greater than
- `returns` **{boolean}**

**Example**

```js
differenceComparesValue(BigNumber.from(20000), BigNumber.from(20000), 'eq')
//=> true

differenceComparesValue(BigNumber.from(40000), BigNumber.from(20000), 'lt')
//=> false
```

### [.lessThanZeroPointZeroOne]

It checks whether x is less than 0.01.

**Params**

- `x` **{BigNumber}**
- `decimal` **{number}**
- `returns` **{boolean}**

**Example**

```js
lessThanZeroPointZeroOne(BigNumber.from(0.00003), 5))
//=> true
```

### [.changeDecimal]

It changes tokenA amount (with tokenA decimal) to target value (with tokenB decimal).

**Params**

- `fromDecimal` **{number}**
- `toDecimal` **{number}**
- `fromAmount` **{BigNumber}**
- `returns` **{BigNumber}**

### [.nativeToWAD]

**Params**

- `x` **{BigNumber}** x in BigNumber
- `decimal` **{number}**
- `returns` **{BigNumber}**: convertion to WAD

### [.wadToNative]

**Params**

- `x` **{BigNumber}** x in WAD
- `decimal` **{number}**
- `returns` **{BigNumber}**: convertion to Origin

### [.bnIntToWAD]

**Params**

- `x` **{BigNumber}** in BigNumber Int
- `returns` **{BigNumber}**: convertion to WAD

### [.bnIntToRAY]

**Params**

- `x` **{BigNumber}** x in BigNumber Int
- `returns` **{BigNumber}**: convertion to RAY

### [.wadToRay]

**Params**

- `x` **{BigNumber}** x in WAD
- `returns` **{BigNumber}**: convertion to RAY

### [.rayToWad]

**Params**

- `x` **{BigNumber}** x in RAY
- `returns` **{BigNumber}**: convertion to WAD

### [.wmul]

**Params**

- `x` **{BigNumber}** x in WAD
- `y` **{BigNumber}** y in WAD
- `returns` **{BigNumber}**: the product of x and y, in WAD

### [.wdiv]

**Params**

- `x` **{BigNumber}** x in WAD
- `y` **{BigNumber}** y in WAD
- `returns` **{BigNumber}**: the quotient of x divided by y, in WAD

### [.safeWdiv]

**Params**

- `x` **{BigNumber}** x in WAD
- `y` **{BigNumber}** y in WAD
- `returns` **{BigNumber}**: the quotient of x divided by y, in WAD

### [.safeDiv]

**Params**

- `x` **{BigNumber}** x in BigNumber
- `y` **{BigNumber}** y in BigNumber
- `returns` **{BigNumber}**: the quotient of x divided by y, in BigNumber

### [.rmul]

**Params**

- `x` **{BigNumber}** x in RAY
- `y` **{BigNumber}** y in RAY
- `returns` **{BigNumber}**: the product of x and y, in RAY

### [.rpow]

**Params**

- `x` **{BigNumber}** x in RAY
- `n` **{BigNumber}**
- `returns` **{BigNumber}**: the exponential of x to the power n, in RAY

### [.sqrt]

**Params**

- `x` **{BigNumber}** x in BigNumber Int
- `returns` **{BigNumber}**: the square root of x, in BigNumber Int

### [.wsqrt]

**Params**

- `x` **{BigNumber}** x in WAD
- `returns` **{BigNumber}**: the square root of x, in WAD

## Parsable String API Reference

### [.isParsableString]

Check whether bnString can be parsed as a BigNumber.

**Params**

- `bnString` **{string}**
- `dp` **{number}** the decimals
- `isNonNegativeOnly` **{boolean}** whether the string is only a non negative value
- `returns` **{boolean}**: whether the string is parsable

```js
isParsableString(strToWad('100000000'), 18, false)
//=> true

isParsableString(strToWad('100000000000000000000'), 18, false)
//=> false
```

### [.getParsableString]

**Params**

- `bnString` **{string}**
- `dp` **{number}** the decimals
- `isNonNegativeOnly` **{boolean}**
- `returns` **{BigNumber}**: If bnString is parsable, return bnStrin, else return 0

## Number Display Format API Reference

### [.getStringInput]

If a value is in WAD, it will format the value.

**Params**

- `value` **{string | BigNumber}**: a value in string or in WAD
- `returns` **{string}**: a formatted string value

**Example**

```js
getStringInput(strToWad('20000'))
//=> 20000
```

### [.getDpFormat]

It trim extra decimals in order to avoid fractional component exceeds decimals.

**Params**

- `value` **{string | BigNumber}**: a value in string or in WAD
- `decimalPlace` **{number}**: decimal place, the default is 2
- `rounding` **{'down'|'off'}**: decimal place, the default is down
- `returns` **{string}**: a decimal trimmed value

**Example**

```js
getDpFormat(strToWad('1.1234567'), 6)
//=> 1.123456

getDpFormat(strToWad('1.1234567'), 6, 'off')
//=> 1.123457
```

### [.getMillifiedFormat]

It converts long numbers to human-readable string.

**Params**

- `value` **{string | BigNumber}**: a value in string or in WAD

- `returns` **{string}**: a millified value with 1 d.p.

**Example**

```js
getMillifiedFormat(strToWad('1424000'))
//=> 1.4M

getMillifiedFormat(strToWad('2500'))
//=> 2.5K
```

### [.getCommifiedFormat]

It always checks whether an actualValue is less than 0.01.

**Params**

- `actualValue` **{string | BigNumber}**: a value in string or in WAD
- `decimalPlace` **{number}**: decimal place, the default is 2
- `returns` **{string}**: readable string, rounded to x decimal places or if the actualValue is less than 0.01, it returns "< 0.01"

**Example**

```js
getCommifiedFormat(strToWad('0.00007'))
//=> < 0.01

getCommifiedFormat(strToWad('1255354.664'))
//=> 1,255,354.66
```

### [.getDynamicFormat]

If actualValue is greater than or equal to 100000 return millified format value, else return commified format value.

**Params**

- `actualValue` **{string | BigNumber}**: a value in string or in WAD
- `decimalPlace` **{number}**: decimal place, the default is 2
- `returns` **{string}**: readable string with millified format or commified format

**Example**

```js
getDynamicFormat(strToWad('1024000'))
//=> 1.02M

getDynamicFormat(strToWad('90000'))
//=> 90,000
```
