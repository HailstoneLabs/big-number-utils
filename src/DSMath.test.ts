import { BigNumber, constants, utils } from "ethers";
import { MAX_LPTOKEN_SUPPLY_DIFFERENCE } from "../constants";
import {
  bnIntToRAY,
  bnIntToWAD,
  differenceComparesValue,
  getMinValue,
  getPercentageFromTwoWAD,
  nativeToWAD,
  RAY,
  rmul,
  rpow,
  sqrt,
  strToWad,
  sum,
  WAD,
  wadToNative,
  wdiv,
  wmul,
  wsqrt,
} from "./DSMath";
describe("DSMath sum", () => {
  test("sum two str 10 10 -> 20", () => {
    expect(sum("10.1", "10")).toBe("20.1");
  });

  test("sum two wad 10 10 -> 20", () => {
    expect(sum(strToWad("10.92"), strToWad("102"))).toBe("112.92");
  });
  test("sum two wad 10 str 10 -> 20", () => {
    expect(sum(strToWad("10"), "10")).toBe("20.0");
  });
  test("sum two wad 0 str 10 -> 10", () => {
    expect(sum(strToWad("0"), "10")).toBe("10.0");
  });
  test("sum two wad 0 str 10 -> 10", () => {
    expect(sum(strToWad("0"), "10")).toBe("10.0");
  });
  test('sum two "" "" -> 0.0', () => {
    expect(sum("", "")).toBe("0.0");
  });
  test("sum two wad 0 str 10 -> 10", () => {
    expect(sum(strToWad("0"), "10")).toBe("10.0");
  });
});
describe("DSMath differenceComparesValue", () => {
  test("BN 4 BN 2.9 BN MAX_LPTOKEN_SUPPLY_DIFFERENCE_BN lt return false", () => {
    const MAX_LPTOKEN_SUPPLY_DIFFERENCE_BN = strToWad(
      MAX_LPTOKEN_SUPPLY_DIFFERENCE
    );
    const lpTokenTotalSupplyBN = strToWad("2.9");
    const lpTokenMaxSupplyBN = strToWad("4");

    expect(
      differenceComparesValue(
        lpTokenMaxSupplyBN,
        lpTokenTotalSupplyBN,
        MAX_LPTOKEN_SUPPLY_DIFFERENCE_BN,
        "lt"
      )
    ).toBe(false);
  });
  test("BN 4 BN 2.9 BN MAX_LPTOKEN_SUPPLY_DIFFERENCE_BN gt return true", () => {
    const MAX_LPTOKEN_SUPPLY_DIFFERENCE_BN = strToWad(
      MAX_LPTOKEN_SUPPLY_DIFFERENCE
    );
    const lpTokenTotalSupplyBN = strToWad("2.9");
    const lpTokenMaxSupplyBN = strToWad("4");

    expect(
      differenceComparesValue(
        lpTokenMaxSupplyBN,
        lpTokenTotalSupplyBN,
        MAX_LPTOKEN_SUPPLY_DIFFERENCE_BN,
        "gt"
      )
    ).toBe(true);
  });
});
describe("DSMath originToWAD", () => {
  test("origin 6 decimal to WAD", () => {
    const x = utils.parseUnits("9.123467", 6);
    const a = nativeToWAD(x, 6);
    expect(a.eq(BigNumber.from("9123467000000000000"))).toBeTruthy();
  });
});

describe("DSMath wadToOrigin", () => {
  test("WAD to origin 6 decimal ", () => {
    const x = utils.parseUnits("9.123467", 18);
    const a = wadToNative(x, 6);
    expect(a.eq(BigNumber.from("9123467"))).toBeTruthy();
  });
});

describe("DSMath bnIntToWAD", () => {
  test("1 in WAD", () => {
    const a = bnIntToWAD(BigNumber.from(1));
    expect(a.eq(BigNumber.from("1000000000000000000"))).toBeTruthy();
  });
});

describe("DSMath bnIntToRAY", () => {
  test("1 in RAY", () => {
    const a = bnIntToRAY(BigNumber.from(1));
    expect(a.eq(BigNumber.from("1000000000000000000000000000"))).toBeTruthy();
  });
});

describe("DSMath wmul", () => {
  test("1*1", () => {
    const a = bnIntToWAD(BigNumber.from(1));
    const b = bnIntToWAD(BigNumber.from(1));
    const result = wmul(a, b);
    expect(result.eq(WAD)).toBeTruthy();
  });

  test("0*0", () => {
    const result = wmul(constants.Zero, constants.Zero);
    expect(result.eq(constants.Zero)).toBeTruthy();
  });

  test("56*37", () => {
    const a = bnIntToWAD(BigNumber.from(56));
    const b = bnIntToWAD(BigNumber.from(37));
    const result = wmul(a, b);
    expect(result.eq(bnIntToWAD(BigNumber.from(2072)))).toBeTruthy();
  });
});

describe("DSMath wdiv", () => {
  test("1/1", () => {
    const a = bnIntToWAD(BigNumber.from(1));
    const b = bnIntToWAD(BigNumber.from(1));
    const result = wdiv(a, b);
    expect(result.eq(WAD)).toBeTruthy();
  });

  test("1/100", () => {
    const a = bnIntToWAD(BigNumber.from(1));
    const b = bnIntToWAD(BigNumber.from(100));
    const result = wdiv(a, b);
    expect(result.eq(WAD.div(100))).toBeTruthy();
  });

  test("20/3", () => {
    const a = bnIntToWAD(BigNumber.from(20));
    const b = bnIntToWAD(BigNumber.from(3));
    const result = wdiv(a, b);
    expect(result.eq(BigNumber.from("6666666666666666667"))).toBeTruthy();
  });
});

describe("DSMath rmul", () => {
  test("1*1", () => {
    const a = bnIntToRAY(BigNumber.from(1));
    const b = bnIntToRAY(BigNumber.from(1));
    const result = rmul(a, b);
    expect(result.eq(RAY)).toBeTruthy();
  });

  test("56*37", () => {
    const a = bnIntToRAY(BigNumber.from(56));
    const b = bnIntToRAY(BigNumber.from(37));
    const result = rmul(a, b);
    expect(result.eq(bnIntToRAY(BigNumber.from(2072)))).toBeTruthy();
  });
});

describe("DSMath rpow", () => {
  test("1**1", () => {
    const a = bnIntToRAY(BigNumber.from(1));
    const b = BigNumber.from(100);
    const result = rpow(a, b);
    expect(result.eq(RAY)).toBeTruthy();
  });

  test("2**10", () => {
    const a = bnIntToRAY(BigNumber.from(2));
    const b = BigNumber.from(10);
    const result = rpow(a, b);
    expect(result.eq(bnIntToRAY(BigNumber.from(1024)))).toBeTruthy();
  });
});

describe("DSMath sqrt", () => {
  test("sqrt(1) = 1", () => {
    const x = BigNumber.from(1);
    const result = sqrt(x);
    expect(result.eq(BigNumber.from(1))).toBeTruthy();
  });
  test("sqrt(10) = 3", () => {
    const x = BigNumber.from(10);
    const result = sqrt(x);
    expect(result.eq(BigNumber.from(3))).toBeTruthy();
  });
});

describe("DSMath wsqrt", () => {
  test("wsqrt(WAD) = WAD", () => {
    const x = WAD;
    const result = wsqrt(x);
    expect(result.eq(WAD)).toBeTruthy();
  });
  test("wsqrt(9 WAD) = 3 WAD", () => {
    const x = strToWad("9");
    const result = wsqrt(x);
    expect(result.eq(strToWad("3"))).toBeTruthy();
  });
  test("wsqrt(10 WAD) = 3 WAD", () => {
    const x = strToWad("10");
    const result = wsqrt(x);
    expect(result.eq(strToWad("3.162277660168379331"))).toBeTruthy();
  });
});

describe("strToWad", () => {
  test('strToWad undefined -> "0.0"', () => {
    expect(strToWad(undefined)).toEqual(strToWad("0.0"));
  });
  test('strToWad "" -> "0.0"', () => {
    expect(strToWad("")).toEqual(strToWad("0.0"));
  });
  test("strToWad 10 -> 10 Wad", () => {
    expect(strToWad("10")).toEqual(strToWad("10"));
  });
});
describe("getPercentageFromTwoWAD", () => {
  test('getPercentageFromTwoWAD(1000 WAD, 0 WAD-> "0.0"', () => {
    expect(getPercentageFromTwoWAD(strToWad("1000"), strToWad("0"))).toEqual(
      "0.0"
    );
  });

  test('getPercentageFromTwoWAD(0 WAD, 1000 WAD-> "0.0"', () => {
    expect(getPercentageFromTwoWAD(strToWad("0"), strToWad("1000"))).toEqual(
      "0.0"
    );
  });

  test('getPercentageFromTwoWAD(50 WAD, 120 WAD-> "41.6666666666666667"', () => {
    expect(getPercentageFromTwoWAD(strToWad("50"), strToWad("120"))).toEqual(
      "41.6666666666666667"
    );
  });

  test('getPercentageFromTwoWAD(100 WAD, 100 WAD-> "100.0"', () => {
    expect(getPercentageFromTwoWAD(strToWad("100"), strToWad("100"))).toEqual(
      "100.0"
    );
  });

  test('getPercentageFromTwoWAD(100 WAD, 100 WAD, upperbound 80WAD-> "80.0"', () => {
    expect(
      getPercentageFromTwoWAD(strToWad("100"), strToWad("100"), strToWad("80"))
    ).toEqual("80.0");
  });
});

describe("getMinValue", () => {
  test("getMinValue(900, 1000) => 900", () => {
    const result = strToWad("900");
    expect(getMinValue("900", "1000").eq(result)).toBeTruthy();
  });

  test("getMinValue(100000, 1) => 1", () => {
    const result = strToWad("1");
    expect(getMinValue("100000", "1").eq(result)).toBeTruthy();
  });
});
