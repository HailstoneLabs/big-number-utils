# hailstonelabs/big-number-utils

hailstonelabs/big-number-utils is a library for BigNumber formatting and calculation, developed by Hailstone Labs.

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

### [.strToWad](src/DSMath.ts#L197)

It changes string to WAD if not undefined or ParsableString, else return constants.Zero

**Params**

- `wadString` **{string | undefined}**
- `returns` **{BigNumber}**

### [.getPercentageFromTwoWAD](src/DSMath.ts#L215)

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

### [.getMinValue](src/DSMath.ts#L239)

**Params**

- `x` **{string}**: x number in string
- `y` **{string}**: y number in string
- `returns` **{BigNumber}**: the minimum value in WAD

### [.sum](src/DSMath.ts#L15)

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

### [.differenceComparesValue](src/DSMath.ts#L27)

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

### [.lessThanZeroPointZeroOne](src/DSMath.ts#L42)

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

### [.changeDecimal](src/DSMath.ts#L55)

It changes tokenA amount (with tokenA decimal) to target value (with tokenB decimal).

**Params**

- `fromDecimal` **{number}**
- `toDecimal` **{number}**
- `fromAmount` **{BigNumber}**
- `returns` **{BigNumber}**

### [.nativeToWAD](src/DSMath.ts#L73)

**Params**

- `x` **{BigNumber}** x in BigNumber
- `decimal` **{number}**
- `returns` **{BigNumber}**: convertion to WAD

### [.wadToNative](src/DSMath.ts#L83)

**Params**

- `x` **{BigNumber}** x in WAD
- `decimal` **{number}**
- `returns` **{BigNumber}**: convertion to Origin

### [.bnIntToWAD](src/DSMath.ts#L93)

**Params**

- `x` **{BigNumber}** in BigNumber Int
- `returns` **{BigNumber}**: convertion to WAD

### [.bnIntToRAY](src/DSMath.ts#L101)

**Params**

- `x` **{BigNumber}** x in BigNumber Int
- `returns` **{BigNumber}**: convertion to RAY

### [.wadToRay](src/DSMath.ts#L109)

**Params**

- `x` **{BigNumber}** x in WAD
- `returns` **{BigNumber}**: convertion to RAY

### [.rayToWad](src/DSMath.ts#L117)

**Params**

- `x` **{BigNumber}** x in RAY
- `returns` **{BigNumber}**: convertion to WAD

### [.wmul](src/DSMath.ts#L126)

**Params**

- `x` **{BigNumber}** x in WAD
- `y` **{BigNumber}** y in WAD
- `returns` **{BigNumber}**: the product of x and y, in WAD

### [.wdiv](src/DSMath.ts#L135)

**Params**

- `x` **{BigNumber}** x in WAD
- `y` **{BigNumber}** y in WAD
- `returns` **{BigNumber}**: the quotient of x divided by y, in WAD

### [.rmul](src/DSMath.ts#L144)

**Params**

- `x` **{BigNumber}** x in RAY
- `y` **{BigNumber}** y in RAY
- `returns` **{BigNumber}**: the product of x and y, in RAY

### [.rpow](src/DSMath.ts#L153)

**Params**

- `x` **{BigNumber}** x in RAY
- `n` **{BigNumber}**
- `returns` **{BigNumber}**: the exponential of x to the power n, in RAY

### [.sqrt](src/DSMath.ts#L171)

**Params**

- `x` **{BigNumber}** x in BigNumber Int
- `returns` **{BigNumber}**: the square root of x, in BigNumber Int

### [.wsqrt](src/DSMath.ts#L188)

**Params**

- `x` **{BigNumber}** x in WAD
- `returns` **{BigNumber}**: the square root of x, in WAD

## Parsable String API Reference

### [.isParsableString](src/isParsableString.ts#L9)

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

### [.getParsableString](src/isParsableString.ts#L32)

**Params**

- `bnString` **{string}**
- `dp` **{number}** the decimals
- `isNonNegativeOnly` **{boolean}**
- `returns` **{BigNumber}**: If bnString is parsable, return bnStrin, else return 0

## Number Display Format API Reference

### [.getStringInput](src/numberDisplayFormat.ts#L40)

If a value is in WAD, it will format the value.

**Params**

- `value` **{string | BigNumber}**: a value in string or in WAD
- `returns` **{string}**: a formatted string value

**Example**

```js
getStringInput(strToWad('20000'))
//=> 20000
```

### [.getDpFormat](src/numberDisplayFormat.ts#L120)

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

### [.getMillifiedFormat](src/numberDisplayFormat.ts#L172)

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

### [.getCommifiedFormat](src/numberDisplayFormat.ts#L195)

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

### [.getDynamicFormat](src/numberDisplayFormat.ts#L223)

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
