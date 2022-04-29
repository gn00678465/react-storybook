import storage from '../src/utils/storage';

const mockLocalStorage = (function () {
  let store = {};

  return {
    getItem: function (key) {
      return store[key] || null;
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    removeItem: function (key) {
      delete store[key];
    },
    clear: function () {
      store = {};
    },
  };
})();

describe('storage', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
    });
  });

  it('namespace undefined', () => {
    const store = storage();
    expect(store.namespacePrefix).toBe('');
  });

  it('set namespace', () => {
    const store = storage('__store_');
    expect(store.namespacePrefix).toBe('__store_');
  });

  it('invalid namespace', () => {
    expect(() => storage('__store/')).toThrow(TypeError);
    expect(() => storage('__store/')).toThrow(
      'namespace 只接受字母和數字以及 _ 和 -',
    );
  });

  it('_serialize', () => {
    const { _serialize } = storage();
    expect(_serialize({})).toBe('{}');
  });

  it('_deserialize without str', () => {
    const store = storage();
    expect(store._deserialize(null, 'defaultVal')).toBe('defaultVal');
  });

  it('_deserialize with str', () => {
    const { _deserialize } = storage();
    expect(_deserialize('{"one":1,"two":2}')).toEqual({ one: 1, two: 2 });
  });

  // it('_deserialize with invalid str', () => {
  //   const { _deserialize } = storage();
  //   expect(_deserialize('() =>/ {}', { one: 1, two: 2 })).toEqual({
  //     one: 1,
  //     two: 2,
  //   });
  // });

  const store = storage('__test_');

  it('set key', () => {
    const a = store.set('unit', { a: 'alpha', b: 'beta' });
    expect(a).toEqual({ a: 'alpha', b: 'beta' });
  });

  it('get non-exist key', () => {
    const a = store.get('unit', { a: 'alpha', b: 'beta' });
    expect(a).toEqual({ a: 'alpha', b: 'beta' });
  });

  it('get exist key', () => {
    store.set('unit', { a: 'alpha', b: 'beta' });
    const a = store.get('unit');
    expect(a).toEqual({ a: 'alpha', b: 'beta' });
  });

  it('remove key', () => {
    store.set('a', { a: 'alpha' });
    store.set('b', { b: 'beta' });
    store.remove('a');
    const a = store.get('a');
    const b = store.get('b');
    expect(a).toBeUndefined();
    expect(b).toEqual({ b: 'beta' });
  });

  it('clear all', () => {
    store.set('a', { a: 'alpha' });
    store.set('b', { b: 'beta' });
    store.clearAll();
    const a = store.get('a');
    const b = store.get('b');
    expect(a).toBeUndefined();
    expect(b).toBeUndefined();
  });
});
