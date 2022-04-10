import ChainedSet from '@/utils/Chainable/ChainedSet';

it('is Chainable', () => {
  const parent = { parent: true };
  const set = new ChainedSet(parent);

  expect(set.end()).toBe(parent);
});

it('creates a backing Set', () => {
  const set = new ChainedSet();

  expect(set.store instanceof Set).toBe(true);
});

it('set', () => {
  const set = new ChainedSet();

  expect(set.add('alpha')).toBe(set);
  expect(set.store.size).toBe(1);
});

it('delete', () => {
  const set = new ChainedSet();

  set.add('alpha');
  set.add('beta');
  set.add('gamma');

  expect(set.delete('alpha')).toBe(set);
  expect(set.store.size).toBe(2);
  expect(set.store.has('alpha')).toBe(false);
});

it('has', () => {
  const set = new ChainedSet();

  set.add('alpha');
  set.add('beta');

  expect(set.has('alpha')).toBe(true);
  expect(set.has('gamma')).toBe(false);
  expect(set.has('beta')).toBe(set.store.has('beta'));
});

it('clear', () => {
  const set = new ChainedSet();

  set.add('alpha');
  set.add('beta');
  set.add('gamma');

  expect(set.store.size).toBe(3);
  expect(set.clear()).toBe(set);
  expect(set.store.size).toBe(0);
});
