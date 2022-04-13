import * as asserts from '../src/utils/type-assert';

it('isFunction', () => {
  const { isFunction } = asserts;

  expect(isFunction(function () {})).toBe(true);
  expect(isFunction(Function)).toBe(true);
  expect(isFunction([])).toBe(false);
  expect(isFunction({})).toBe(false);
});

it('isObject', () => {
  const { isObject } = asserts;

  expect(isObject([])).toBe(false);
  expect(isObject({})).toBe(true);
});

it('isArray', () => {
  const { isArray } = asserts;

  expect(isArray([])).toBe(true);
  expect(isArray({})).toBe(false);
});

it('assertPromise', () => {
  const { assertPromise } = asserts;

  expect(assertPromise).toThrow(TypeError);
  expect(() => {
    assertPromise('andThen', []);
  }).toThrow('`andThen` expected a Promise, received []');
});
