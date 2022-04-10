import ChainedMap from '@/utils/Chainable/ChainedMap';

it('is Chainable', () => {
  const parent = { parent: true };
  const map = new ChainedMap(parent);

  expect(map.end()).toBe(parent);
});

it('creates a backing Map', () => {
  const map = new ChainedMap();

  expect(map.store instanceof Map).toBe(true);
});

it('set', () => {
  const map = new ChainedMap();

  expect(map.set('a', 'alpha')).toBe(map);
  expect(map.store.get('a')).toBe('alpha');
});

it('get', () => {
  const map = new ChainedMap();

  expect(map.set('a', 'alpha')).toBe(map);
  expect(map.get('a')).toBe('alpha');
});

it('getOrCompute', () => {
  const map = new ChainedMap();

  expect(map.get('a')).toBeUndefined();
  expect(map.getOrCompute('a', () => 'alpha')).toBe('alpha');
  expect(map.get('a')).toBe('alpha');
});

it('clear', () => {
  const map = new ChainedMap();

  map.set('a', 'alpha');
  map.set('b', 'beta');
  map.set('c', 'gamma');

  expect(map.store.size).toBe(3);
  expect(map.clear()).toBe(map);
  expect(map.store.size).toBe(0);
});

it('delete', () => {
  const map = new ChainedMap();

  map.set('a', 'alpha');
  map.set('b', 'beta');
  map.set('c', 'gamma');

  expect(map.delete('b')).toBe(map);
  expect(map.store.size).toBe(2);
  expect(map.store.has('b')).toBe(false);
});

it('has', () => {
  const map = new ChainedMap();

  map.set('a', 'alpha');
  map.set('b', 'beta');
  map.set('c', 'gamma');

  expect(map.has('b')).toBe(true);
  expect(map.has('d')).toBe(false);
  expect(map.has('b')).toBe(map.store.has('b'));
});

it('values', () => {
  const map = new ChainedMap();

  map.set('a', 'alpha');
  map.set('b', 'beta');
  map.set('c', 'gamma');

  expect(map.values()).toStrictEqual(['alpha', 'beta', 'gamma']);
});
