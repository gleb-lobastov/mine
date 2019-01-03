import { memoizeByLastArgs } from '..';

describe('memoizeByLastArgs', () => {
  it('should not execute fn for second call with same args', () => {
    const fn = jest.fn();
    const memoizedFn = memoizeByLastArgs(fn);
    const args = [true, 0, 'hello', {}, [], new Date()];
    memoizedFn(...args);
    memoizedFn(...args);
    expect(fn.mock.calls).toHaveLength(1);
  });

  it('should execute second call if arguments are changed', () => {
    const fn = jest.fn();
    const memoizedFn = memoizeByLastArgs(fn);
    memoizedFn(1);
    memoizedFn(2);
    expect(fn.mock.calls).toHaveLength(2);
  });

  it('should execute second call for different wrappers', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    const memoizedFn1 = memoizeByLastArgs(fn1);
    const memoizedFn2 = memoizeByLastArgs(fn2);
    memoizedFn1('same');
    memoizedFn2('same');
    expect(fn1.mock.calls).toHaveLength(1);
    expect(fn2.mock.calls).toHaveLength(1);
  });

  it('should execute second call if arguments are not identical', () => {
    const fn = jest.fn();
    const memoizedFn = memoizeByLastArgs(fn);
    memoizedFn({});
    memoizedFn({});
    expect(fn.mock.calls).toHaveLength(2);
  });

  it('should execute only first call, if no args present', () => {
    const fn = jest.fn();
    const memoizedFn = memoizeByLastArgs(fn);
    memoizedFn();
    memoizedFn();
    expect(fn.mock.calls).toHaveLength(1);
  });
});
