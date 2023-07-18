# hailstonelabs/big-number-utils

hailstonelabs/big-number-utils is a library for bigint formatting and calculation, developed by Hailstone Labs.

## Introduction

There are two versions of the Big Number Utils library.

- **Version 1**: This version uses the `ethers` library and its `bignumber` module.
- **Version 2**: This version uses the `viem` library and the native JavaScript `bigin` library.

If you want to develop using Version 1, please checkout to the `main` branch. </br>
If you want to develop using Version 2, please checkout to the `main-v2` branch.

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

_bigint_

Many operations in Ethereum operate on numbers which are outside the range of safe values to use in JavaScript.

The BigInt.js Native package is a powerful JavaScript library that provides support for arbitrary precision integer arithmetic. It allows you to work with extremely large integers beyond the limitations of the native Number type in JavaScript.

_Safe Arithmetic_

Inspiring by DS Maths [Source](https://github.com/dapphub/ds-math/), @hailstonelabs/big-number-utils provides arithmetic functions for the common numerical primitive types of typescript. This package provides arithmetic functions for new two higher level numerical concepts called wad (18 decimals) and ray (27 decimals). These are used to represent fixed-point decimal numbers.

_WAD and RAY_

A wad is a decimal number with 18 digits of precision and a ray is a decimal number with 27 digits of precision. These functions are necessary to account for the difference between how integer arithmetic behaves normally, and how decimal arithmetic should actually work.

```js
const WAD = 10n ** 18
const RAY = 10n ** 27
```

## DS Math API Reference

### [.strToWad]

It changes string to WAD if not undefined or ParsableString, else return constants.Zero

**Params**

- `wadString` **{string | undefined}**
- `returns` **{bigint}**

### [.getPercentageFromTwoWAD]

It returns the percentage of x in y, in string and return upperBound if the value exceeds upperBound.

**Params**

- `x` **{bigint}**: x in WAD
- `y` **{bigint}**: t in WAD
- `upperBound` **{bigint}**: the upper bound percentage, in WAD
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
- `returns` **{bigint}**: the minimum value in WAD

### [.sum]

It returns the summation of two values.

**Params**

- `x` **{string | bigint}**: bigint must be WAD
- `y` **{string | bigint}**: bigint must be WAD
- `returns` **{string}**: sum

**Example**

```js
sum(strToWad('20000'), strToWad('30000'))
//=> 50000
```

### [.differenceComparesValue]

It compare x - y with the value.

**Params**

- `x` **{bigint}**
- `y` **{bigint}**
- `value` **{bigint}**
- `operator` **{'lt' | 'eq' | 'gt'}** less than / equal to / greater than
- `returns` **{boolean}**

**Example**

```js
differenceComparesValue(bigint.from(20000), bigint.from(20000), 'eq')
//=> true

differenceComparesValue(bigint.from(40000), bigint.from(20000), 'lt')
//=> false
```

### [.lessThanZeroPointZeroOne]

It checks whether x is less than 0.01.

**Params**

- `x` **{bigint}**
- `decimal` **{number}**
- `returns` **{boolean}**

**Example**

```js
lessThanZeroPointZeroOne(bigint.from(0.00003), 5))
//=> true
```

### [.changeDecimal]

It changes tokenA amount (with tokenA decimal) to target value (with tokenB decimal).

**Params**

- `fromDecimal` **{number}**
- `toDecimal` **{number}**
- `fromAmount` **{bigint}**
- `returns` **{bigint}**

### [.nativeToWAD]

**Params**

- `x` **{bigint}** x in bigint
- `decimal` **{number}**
- `returns` **{bigint}**: convertion to WAD

### [.wadToNative]

**Params**

- `x` **{bigint}** x in WAD
- `decimal` **{number}**
- `returns` **{bigint}**: convertion to Origin

### [.bnIntToWAD]

**Params**

- `x` **{bigint}** in bigint Int
- `returns` **{bigint}**: convertion to WAD

### [.bnIntToRAY]

**Params**

- `x` **{bigint}** x in bigint Int
- `returns` **{bigint}**: convertion to RAY

### [.wadToRay]

**Params**

- `x` **{bigint}** x in WAD
- `returns` **{bigint}**: convertion to RAY

### [.rayToWad]

**Params**

- `x` **{bigint}** x in RAY
- `returns` **{bigint}**: convertion to WAD

### [.wmul]

**Params**

- `x` **{bigint}** x in WAD
- `y` **{bigint}** y in WAD
- `returns` **{bigint}**: the product of x and y, in WAD

### [.wdiv]

**Params**

- `x` **{bigint}** x in WAD
- `y` **{bigint}** y in WAD
- `returns` **{bigint}**: the quotient of x divided by y, in WAD

### [.safeWdiv]

**Params**

- `x` **{bigint}** x in WAD
- `y` **{bigint}** y in WAD
- `returns` **{bigint}**: the quotient of x divided by y, in WAD

### [.safeDiv]

**Params**

- `x` **{bigint}** x in bigint
- `y` **{bigint}** y in bigint
- `returns` **{bigint}**: the quotient of x divided by y, in bigint

### [.rmul]

**Params**

- `x` **{bigint}** x in RAY
- `y` **{bigint}** y in RAY
- `returns` **{bigint}**: the product of x and y, in RAY

### [.rpow]

**Params**

- `x` **{bigint}** x in RAY
- `n` **{bigint}**
- `returns` **{bigint}**: the exponential of x to the power n, in RAY

### [.sqrt]

**Params**

- `x` **{bigint}** x in bigint Int
- `returns` **{bigint}**: the square root of x, in bigint Int

### [.wsqrt]

**Params**

- `x` **{bigint}** x in WAD
- `returns` **{bigint}**: the square root of x, in WAD

## Parsable String API Reference

### [.isParsableString]

Check whether bnString can be parsed as a bigint.

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
- `returns` **{bigint}**: If bnString is parsable, return bnStrin, else return 0

## Number Display Format API Reference

### [.getStringInput]

If a value is in WAD, it will format the value.

**Params**

- `value` **{string | bigint}**: a value in string or in WAD
- `returns` **{string}**: a formatted string value

**Example**

```js
getStringInput(strToWad('20000'))
//=> 20000
```

### [.getDpFormat]

It trim extra decimals in order to avoid fractional component exceeds decimals.

**Params**

- `value` **{string | bigint}**: a value in string or in WAD
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

- `value` **{string | bigint}**: a value in string or in WAD

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

- `actualValue` **{string | bigint}**: a value in string or in WAD
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

- `actualValue` **{string | bigint}**: a value in string or in WAD
- `decimalPlace` **{number}**: decimal place, the default is 2
- `returns` **{string}**: readable string with millified format or commified format

**Example**

```js
getDynamicFormat(strToWad('1024000'))
//=> 1.02M

getDynamicFormat(strToWad('90000'))
//=> 90,000
```
